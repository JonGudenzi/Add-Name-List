const nameInput = document.getElementById("nameInput");
const addBtn = document.getElementById("addBtn");
const nameList = document.getElementById("nameList");
const errorMsg = document.getElementById("errMessage");
const STORAGE_KEY = "nameList";

function createListItem(name) {
    const li = document.createElement("li");
    const spanEl = document.createElement("span");
    spanEl.classList.add("name-text");
    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-btn");
    const delBtn = document.createElement("button");
    delBtn.classList.add("del-btn");
    spanEl.textContent = name;
    li.appendChild(spanEl);
    editBtn.textContent = "Edit";
    li.appendChild(editBtn);
    delBtn.textContent = "X";
    li.appendChild(delBtn);
    return li;
}

// ========  Add Name to list ========
function addName() {
    const name = nameInput.value.trim();
    if (name === "") {
        errorMsg.textContent = "You must enter a name";
        return;
    } else {
        const li = createListItem(name);
        nameList.appendChild(li);
        saveNames();
        nameInput.value = "";
        errorMsg.textContent = "";
        nameInput.focus();
    }
}

// ======== Edit or Delete a name from the list ========
function nameOptions(e) {
    if (e.target.matches(".del-btn")) {
        const li = e.target.closest("li");
        li.remove();
        saveNames();
        nameInput.focus();
    } else if
        (e.target.matches(".edit-btn") && e.target.textContent === "Edit") {
        const li = e.target.closest("li");
        const nameSpan = li.querySelector(".name-text");
        const editInput = document.createElement("input");
        editInput.value = nameSpan.textContent;
        editInput.dataset.original = nameSpan.textContent; 
        nameSpan.replaceWith(editInput);
        e.target.textContent = "Save";
        editInput.focus();
    } else if
        (e.target.matches(".edit-btn") && e.target.textContent === "Save") {
        const li = e.target.closest("li");
        const input = li.querySelector("input");
        const nameSpan = document.createElement("span");
        nameSpan.classList.add("name-text");
        nameSpan.textContent = input.value;
        input.replaceWith(nameSpan);
        saveNames();
        e.target.textContent = "Edit";
        nameInput.focus();
    }
}

// ======== Saving each li to local storage ========
function saveNames() {
    const namesArr = [];
    const nameSpan = nameList.querySelectorAll(".name-text");
    for (let names of nameSpan) {
        namesArr.push(names.textContent);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(namesArr));
}

function loadNames() {
    if (localStorage.getItem(STORAGE_KEY) === null) {
        return;
    } else {
        const returnNames = JSON.parse(localStorage.getItem(STORAGE_KEY))
        for (let name of returnNames) {
            const li = createListItem(name);
            nameList.appendChild(li);
        }
    }
}

// ======== Event Listeners ========
nameList.addEventListener("click", nameOptions);

addBtn.addEventListener("click", addName);

nameInput.addEventListener("input", function () {
    const name = nameInput.value.trim();
    if (name) {
        errorMsg.textContent = "";
    }
});

nameInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        addName();
    }
})

nameList.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && e.target.matches("input")) {
        const li = e.target.closest("li");
        const btn = li.querySelector(".edit-btn");
        if (btn.textContent === "Save") {
            btn.click();
            e.preventDefault();
        }
    }
    if (e.key === "Escape" && e.target.matches("input")) {
        const li = e.target.closest("li");
        const nameSpan = document.createElement("span");
        nameSpan.classList.add("name-text");
        nameSpan.textContent = e.target.dataset.original;
        e.target.replaceWith(nameSpan);
        li.querySelector(".edit-btn").textContent = "Edit";

    }
})

// ======== Loads the saved names when page loads ========
loadNames();
