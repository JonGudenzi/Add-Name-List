const nameInput = document.getElementById("nameInput");
const addBtn = document.getElementById("addBtn");
const nameList = document.getElementById("nameList");
const errMessage = document.getElementById("errMessage");

function addName() {
    const name = nameInput.value.trim();
    if (name === "") {
        errMessage.textContent = "You must enter a name";
        return;
    } else {
        const li = document.createElement("li");
        const spanEl = document.createElement("span");
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
        nameList.appendChild(li);
        nameInput.value = "";
        errMessage.textContent = "";
        nameInput.focus();
    }
}

function nameOptions(e) {
    if (e.target.matches(".del-btn")) {
        const li = e.target.closest("li");
        li.remove();
        nameInput.focus();
    } else if
        (e.target.matches(".edit-btn") && e.target.textContent === "Edit") {
        const li = e.target.closest("li");
        const span = li.querySelector("span");
        const editInput = document.createElement("input");
        editInput.value = span.textContent;
        span.replaceWith(editInput);
        e.target.textContent = "Save";
        editInput.focus();
    } else if
        (e.target.matches(".edit-btn") && e.target.textContent === "Save"){
            const li = e.target.closest("li");
            const input = li.querySelector("input");
            const span = document.createElement("span");
            span.textContent = input.value;
            input.replaceWith(span);
            e.target.textContent = "Edit";
            nameInput.focus();
        }
}
nameList.addEventListener("click", nameOptions);


addBtn.addEventListener("click", addName);

nameInput.addEventListener("input", function () {
    const name = nameInput.value.trim();
    if (name) {
        errMessage.textContent = "";
    }
});
