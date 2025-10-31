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
        li.textContent = name;
        nameList.appendChild(li);
        nameInput.value = "";
        errMessage.textContent = "";
        nameInput.focus();
    }
}

addBtn.addEventListener("click", addName);

nameInput.addEventListener("input", function() {
    const name = nameInput.value.trim();
    if (name) {
        errMessage.textContent = "";
    }
})