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

// Add value
const inputText = document.getElementById("input-text");
const listTodo = document.getElementById("list-todo");
const listDone = document.getElementById("list-done");
const listOverdue = document.getElementById("list-overdue");
const priority = document.getElementById("selected-priority");

function addTask() {
  if (inputText.value === "") {
    alert("Isi dulu tasknya");
  } else {
    const taskText = inputText.value;
    const taskPriority = priority.innerText;
    const taskDate = new Date(formattedDate); // Simpan tanggal dalam format Date
    let li = document.createElement("li");
    li.innerHTML = `${formattedDate} ${taskText} dengan priority ${taskPriority}`;
    li.dataset.id = Date.now();
    li.dataset.date = taskDate.toISOString(); // Simpan tanggal sebagai data atribut dalam format ISO string
    listTodo.appendChild(li);

    // Tambahkan event listener untuk memindahkan item ke Done ketika diklik
    li.addEventListener("click", function () {
      li.classList.toggle("checked");

      const existingItem = Array.from(listDone.children).find(
        (item) => item.dataset.id === li.dataset.id
      );

      if (existingItem) {
        listDone.removeChild(existingItem); // Hapus dari listDone jika sudah ada
      } else {
        let doneLi = document.createElement("li");
        doneLi.innerHTML = li.innerHTML; // Gunakan innerHTML dari li yang diklik
        doneLi.dataset.id = li.dataset.id;
        doneLi.classList.add("done");
        listDone.appendChild(doneLi);
      }
    });

    function overdue() {
      if (Date.now < formattedDate) {
        let li = document.createElement("li");
        li.innerHTML = `${formattedDate} ${taskText} dengan priority ${taskPriority}`;
        li.dataset.id = Date.now();
        li.dataset.date = taskDate.toISOString(); // Simpan tanggal sebagai data atribut dalam format ISO string
        listOverdue.appendChild(li);

        li.addEventListener("click", function () {
          li.classList.toggle("checked");
          const existingItem = Array.from(listDone.children).find(
            (item) => item.dataset.id === li.dataset.id
          );
          if (existingItem) {
            listDone.removeChild(existingItem);
          } else {
            let doneLi = document.createElement("li");
            doneLi.innerHTML = li.innerHTML; // Gunakan innerHTML dari li yang diklik
            doneLi.dataset.id = li.dataset.id;
            doneLi.classList.add("done");
            listDone.appendChild(doneLi);
          }
        });
      }
    }
  }
  overdue();

  inputText.value = "";
}
