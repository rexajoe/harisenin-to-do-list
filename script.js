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
    text: li.textContent,
    date: li.dataset.date,
    priority: li.dataset.priority,
  }));

  const dones = Array.from(listDone.children).map((li) => ({
    id: li.dataset.id,
    text: li.textContent,
    date: li.dataset.date,
    priority: li.dataset.priority,
  }));

  const overdues = Array.from(listOverdue.children).map((li) => ({
    id: li.dataset.id,
    text: li.textContent,
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
    li.textContent = task.text;
    li.dataset.id = task.id;
    li.dataset.date = task.date;
    li.dataset.priority = task.priority;
    listTodo.appendChild(li);
    addClickListener(li);
  });

  dones.forEach((task) => {
    let li = document.createElement("li");
    li.textContent = task.text;
    li.dataset.id = task.id;
    li.dataset.date = task.date;
    li.dataset.priority = task.priority;
    li.classList.add("done");
    listDone.appendChild(li);
    addClickListener(li);
  });

  overdues.forEach((task) => {
    let li = document.createElement("li");
    li.textContent = task.text;
    li.dataset.id = task.id;
    li.dataset.date = task.date;
    li.dataset.priority = task.priority;
    listOverdue.appendChild(li);
    addClickListener(li);
  });
}

// Tambahkan event listener klik ke setiap task
function addClickListener(li) {
  // Event listener untuk span
  const span = li.querySelector("span");
  if (span) {
    span.addEventListener("click", function (event) {
      event.stopPropagation(); // Hentikan event agar tidak bubble ke parent li
      li.remove();
      saveToLocalStorage();
    });
  }

  // Event listener untuk li
  li.addEventListener("click", function (event) {
    // Jangan lakukan apa-apa jika klik pada span
    if (event.target.tagName === "SPAN") return;

    li.classList.toggle("checked");

    const existingItem = Array.from(listDone.children).find(
      (item) => item.dataset.id === li.dataset.id
    );

    if (existingItem) {
      listDone.removeChild(existingItem);
    } else {
      let doneLi = document.createElement("li");

      // Ambil teks konten li tanpa elemen span
      // Hapus elemen span dari li
      const textContent = li.cloneNode(true); // Clone li untuk menghindari perubahan langsung
      const span = textContent.querySelector("span");
      if (span) span.remove(); // Hapus span dari clone

      doneLi.textContent = `${textContent.textContent.trim()}`;
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
    li.textContent = `${formattedDate} ${taskText} dengan priority ${taskPriority}`;
    li.dataset.id = Date.now();
    li.dataset.date = taskDate.toISOString();
    li.dataset.priority = taskPriority;

    let span = document.createElement("span");
    span.textContent = "\u00d7";
    li.appendChild(span);

    listTodo.appendChild(li);
    addClickListener(li);

    inputText.value = "";
    saveToLocalStorage();
  }
}

// Button Delete All
const deleteAllButton = document.getElementById("delete-all");

deleteAllButton.addEventListener("click", function () {
  listTodo.innerHTML = "To-Do-List";
  listDone.innerHTML = "Done";
  listOverdue.innerHTML = "To-Do-List Overdue";

  // Hapus data dari localStorage
  localStorage.removeItem("todos");
  localStorage.removeItem("dones");
  localStorage.removeItem("overdues");
});
