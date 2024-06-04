const passwordBox = document.getElementById("password");

const length = 12;

const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerCase = "abcdefghijklmnopqrstuvwxyz";
const number = "0123456789";
const symbol = "@#$%^&*()_+{}|\<>?~";
const addBtn= document.querySelector("#addBtn");
const main = document.querySelector("#main");

const allChar = upperCase + lowerCase + number + symbol;

function createPassword(){
    let password = "";
  /*  password += upperCase[Math.floor(Math.random() * upperCase.length)];
    password += lowerCase[Math.floor(Math.random() * lowerCase.length)];
    password += number[Math.floor(Math.random() * number.length)];
    password += symbol[Math.floor(Math.random() * symbol.length)];*/

    while(length > password.length){
        password += allChar[Math.floor(Math.random()*allChar.length)];
    }
    passwordBox.value = password;

}

function copyPW() {
   navigator.clipboard.writeText(passwordBox.value);
   alert("copied");
} 

function crtNote() {
    alert("Note Created; Please scroll down Add Your Password Along With a Detail Note Where It Belongs To and Make Sure You Click Save For Password to Save in Local Storage");
}
const saveNotes = () => {
    const notes = document.querySelectorAll(".note textarea");
    const data = [];
    notes.forEach(
        (note) => {
            data.push(note.value)
        }
    )
    if(data.length === 0){
        localStorage.removeItem("notes")
    } else 
    localStorage.setItem("notes", JSON.stringify(data))
}


addBtn.addEventListener(
    "click" ,
    function(){
        addNote()
    }
)
const addNote = (text ="") => {
    const note =document.createElement("div");
    note.classList.add("note")
    note.innerHTML = `
    <div class="tool">
                <p id=save>save</p>
                <p id=trash>delete</p>
            </div>
            <textarea>${text}</textarea>
    `
    ;
    note.querySelector("#trash").addEventListener(
        "click",
        function() {
            note.remove()
            saveNotes()
        }
    )

    note.querySelector("#save").addEventListener(
        "click", 
        function() {
            saveNotes()
        }
    )

    note.querySelector("textarea").addEventListener(
        "focusout",
        function(){
            saveNotes()
        }
    )

     
    main.appendChild(note);
    saveNotes()
}



(
    function() {
        const lsNotes = JSON.parse(localStorage.getItem("notes"));
        if (lsNotes === null){
            addNote()
 }else {
        lsNotes.forEach(
            (lsNote) => {
                addNote(lsNote)
            }
        )
    }

}
)()