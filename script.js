//kalender
const today = new Date();
const day = today.getDate();
const month = today.getMonth() + 1;
const year = today.getFullYear();
const daysOfWeek = [
  "Minggu",
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jumat",
  "Sabtu",
];
const dayName = daysOfWeek[today.getDay()];
const monthsOfYear = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

const monthName = monthsOfYear[today.getMonth()];
const formattedDate = `${dayName}, ${day} ${monthName} ${year}`;
document.getElementById("today").textContent = formattedDate;

//dropdown
const dropdowns = document.querySelectorAll(".dropdown");
dropdowns.forEach((dropdown) => {
  const select = dropdown.querySelector(".select");
  const caret = dropdown.querySelector(".caret");
  const menu = dropdown.querySelector(".menu");
  const options = dropdown.querySelectorAll(".menu li");
  const selected = dropdown.querySelector(".selected");

  select.addEventListener("click", () => {
    select.classList.toggle("select-clicked");
    caret.classList.toggle("caret-rotate");
    menu.classList.toggle("menu-open");
  });

  options.forEach((option) => {
    option.addEventListener("click", () => {
      selected.innerText = option.innerText;
      select.classList.remove("select-clicked");
      caret.classList.remove("caret-rotate");
      menu.classList.remove("menu-open");
      options.forEach((option) => {
        // Perbaikan: options.forEach
        option.classList.remove("active");
      });
      option.classList.add("active");
    });
  });
});

//add value
const inputText = document.getElementById("input-text");
const listContainer = document.getElementById("list-container");
const priority = document.getElementById("selected-priority");
const listTodo = document.getElementById("list-todo");
const listDone = document.getElementById("list-done");
const listOverdue = document.getElementById("list-overdue");

function addTask() {
  if (inputText.value === "") {
    alert("Isi dulu tasknya");
  } else {
    let li = document.createElement("li");
    li.innerHTML = `${formattedDate} ${inputText.value} dengan priority ${priority.innerText}`;
    listTodo.appendChild(li);
    inputText.value = "";
  }
  listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI" && !e.target.classList.contains("done")) {
      e.target.classList.toggle("checked");

      const existingItem = Array.from(listDone.children).find(
        (item) => item.dataset.id === e.target.dataset.id
      );
      if (existingItem) {
        listDone.removeChild(existingItem);
      } else {
        let li = document.createElement("li");
        li.innerHTML = `${formattedDate} ${inputText.value} dengan priority ${priority.innerText}`;
        li.dataset.id = e.target.dataset.id;
        li.classList.add("done");
        listDone.appendChild(li);

        const currentDate = new Date();
        const itemDate = new Date(formattedDate);

        if (itemDate < currentDate) {
          listTodo.removeChild(li);
          listOverdue.appendChild(li);
        }
      }
    }
  });
  listDone.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
      e.preventDefault();
    }
  });
  listOverdue.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
      e.preventDefault();
    }
  });
}
