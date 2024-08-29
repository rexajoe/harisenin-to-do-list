//kalender
const today = new Date();
const day = today.getDate();
const month = today.getMonth() + 1;
const year = today.getFullYear();
const formattedDate = `${day}/${month}/${year}`;
document.getElementById("today").textContent = formattedDate;

//dropdown
const dropdowns = document.querySelectorAll(".dropdown");
dropdowns.forEach((dropdown) => {
  const select = dropdown.querySelector(".select");
  const caret = dropdown.querySelector(".caret");
  const menu = dropdown.querySelector(".menu");
  const options = dropdown.querySelectorAll(".menu li"); // Perbaikan: querySelectorAll untuk mendapatkan semua <li>
  const selected = dropdown.querySelector(".selected");

  select.addEventListener("click", () => {
    select.classList.toggle("select-clicked"); // Perbaikan: classList
    caret.classList.toggle("caret-rotate"); // Perbaikan: classList
    menu.classList.toggle("menu-open"); // Perbaikan: classList
  });

  options.forEach((option) => {
    option.addEventListener("click", () => {
      selected.innerText = option.innerText;
      select.classList.remove("select-clicked"); // Perbaikan: classList
      caret.classList.remove("caret-rotate"); // Perbaikan: classList
      menu.classList.remove("menu-open"); // Perbaikan: classList
      options.forEach((option) => {
        // Perbaikan: options.forEach
        option.classList.remove("active"); // Perbaikan: classList
      });
      option.classList.add("active"); // Perbaikan: classList
    });
  });
});

//add value
const inputText = document.getElementById("input-text");
const listContainer = document.getElementById("list-container");
const priority = document.getElementById("selected-priority");
const subTitle = document.getElementById("list-todo");

function addTask() {
  if (inputText.value === "") {
    alert("Isi dulu tasknya");
  } else {
    subTitle.style.display = "block";
    let li = document.createElement("li");
    li.innerHTML = `Tanggal ${formattedDate} ${inputText.value} dengan priority ${priority.innerText}`;
    listContainer.appendChild(li);
    inputText.value = "";
  }
}
