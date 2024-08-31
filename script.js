// Kalender
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
const formattedDate = `${year}-${String(month).padStart(2, "0")}-${String(
  day
).padStart(2, "0")}`;
document.getElementById(
  "today"
).textContent = `${dayName}, ${day} ${monthName} ${year}`;

// Dropdown
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
        option.classList.remove("active");
      });
      option.classList.add("active");
    });
  });
});

const inputText = document.getElementById("input-text");
const listTodo = document.getElementById("list-todo");
const listDone = document.getElementById("list-done");
const listOverdue = document.getElementById("list-overdue");
const priority = document.getElementById("selected-priority");

// Simpan data ke localStorage
function saveToLocalStorage() {
  const todos = Array.from(listTodo.children).map((li) => ({
    id: li.dataset.id,
    text: li.innerHTML,
    date: li.dataset.date,
    priority: li.dataset.priority,
  }));

  const dones = Array.from(listDone.children).map((li) => ({
    id: li.dataset.id,
    text: li.innerHTML,
    date: li.dataset.date,
    priority: li.dataset.priority,
  }));

  const overdues = Array.from(listOverdue.children).map((li) => ({
    id: li.dataset.id,
    text: li.innerHTML,
    date: li.dataset.date,
    priority: li.dataset.priority,
  }));

  localStorage.setItem("todos", JSON.stringify(todos));
  localStorage.setItem("dones", JSON.stringify(dones));
  localStorage.setItem("overdues", JSON.stringify(overdues));
}

// Muat data dari localStorage
function loadFromLocalStorage() {
  const todos = JSON.parse(localStorage.getItem("todos") || "[]");
  const dones = JSON.parse(localStorage.getItem("dones") || "[]");
  const overdues = JSON.parse(localStorage.getItem("overdues") || "[]");

  todos.forEach((task) => {
    let li = document.createElement("li");
    li.innerHTML = task.text;
    li.dataset.id = task.id;
    li.dataset.date = task.date;
    li.dataset.priority = task.priority;
    listTodo.appendChild(li);
    addClickListener(li);
  });

  dones.forEach((task) => {
    let li = document.createElement("li");
    li.innerHTML = task.text;
    li.dataset.id = task.id;
    li.dataset.date = task.date;
    li.dataset.priority = task.priority;
    li.classList.add("done");
    listDone.appendChild(li);
    addClickListener(li);
  });

  overdues.forEach((task) => {
    let li = document.createElement("li");
    li.innerHTML = task.text;
    li.dataset.id = task.id;
    li.dataset.date = task.date;
    li.dataset.priority = task.priority;
    listOverdue.appendChild(li);
    addClickListener(li);
  });
}

// Tambahkan event listener klik ke setiap task
function addClickListener(li) {
  li.addEventListener("click", function () {
    li.classList.toggle("checked");

    const existingItem = Array.from(listDone.children).find(
      (item) => item.dataset.id === li.dataset.id
    );

    if (existingItem) {
      listDone.removeChild(existingItem);
    } else {
      let doneLi = document.createElement("li");
      doneLi.innerHTML = li.innerHTML;
      doneLi.dataset.id = li.dataset.id;
      doneLi.dataset.date = li.dataset.date;
      doneLi.dataset.priority = li.dataset.priority;
      doneLi.classList.add("done");
      listDone.appendChild(doneLi);
    }
    saveToLocalStorage();
  });
}

// Panggil fungsi loadFromLocalStorage saat halaman dimuat
window.onload = function () {
  loadFromLocalStorage();
};

// Panggil saveToLocalStorage() setiap kali task ditambahkan
function addTask() {
  if (inputText.value === "") {
    alert("Isi dulu tasknya");
  } else {
    const taskText = inputText.value;
    const taskPriority = priority.innerText;
    const taskDate = new Date(formattedDate);

    let li = document.createElement("li");
    li.innerHTML = `${formattedDate} ${taskText} dengan priority ${taskPriority}`;
    li.dataset.id = Date.now();
    li.dataset.date = taskDate.toISOString();
    li.dataset.priority = taskPriority;
    listTodo.appendChild(li);

    addClickListener(li);

    inputText.value = "";
    saveToLocalStorage();
  }
}
