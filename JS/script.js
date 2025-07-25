window.addEventListener("DOMContentLoaded", () => {
  loadTasks();
  updateNoTaskMessage();
});

document.getElementById("add-btn").addEventListener("click", function () {
  const taskInput = document.getElementById("task-input");
  const dateInput = document.getElementById("date-input");
  const task = taskInput.value.trim();
  const date = dateInput.value;

  if (task === "" || date === "") {
    alert("Keduanya harus diisi");
    return;
  }

  const tbody = document.getElementById("todo-body");

  // Buat baris baru
  const newRow = document.createElement("tr");
  newRow.innerHTML = `
    <td>${task}</td>
    <td>${date}</td>
    <td class="status">Pending</td>
    <td>
      <button onclick="completeTask(this)">Complete</button>
      <button onclick="deleteTask(this)">Delete</button>
    </td>
  `;
  tbody.appendChild(newRow);

  // Kosongkan input
  taskInput.value = "";
  dateInput.value = "";

  updateNoTaskMessage();
});

// Fungsi untuk hapus task
function deleteTask(btn) {
  const row = btn.parentElement.parentElement;
  row.remove();
  updateNoTaskMessage();
}

function completeTask(btn) {
  const row = btn.parentElement.parentElement;
  const statusCell = row.querySelector(".status");

  if (statusCell.textContent.trim() === "Pending") {
    statusCell.textContent = "Selesai";
    statusCell.style.color = "green";

    // Nonaktifkan tombol Complete
    btn.disabled = true;
    btn.textContent = "✔ Done";
  }
}



// Tampilkan atau sembunyikan "No task found"
function updateNoTaskMessage() {
  const tbody = document.getElementById("todo-body");
  const rows = tbody.querySelectorAll("tr:not(.no-task)");
  const noTaskRow = tbody.querySelector(".no-task");

  if (rows.length === 0) {
    noTaskRow.style.display = "table-row";
  } else {
    noTaskRow.style.display = "none";
  }
}

// Fungsi untuk hapus semua task
document.getElementById("deleteAllBtn").addEventListener("click", function () {
  const tbody = document.getElementById("todo-body");

  // Hapus semua task (kecuali baris .no-task)
  const rows = tbody.querySelectorAll("tr:not(.no-task)");
  rows.forEach(row => row.remove());

  updateNoTaskMessage();
});

document.getElementById("filterBtn").addEventListener("click", function () {
  const rows = document.querySelectorAll("#todo-body tr:not(.no-task)");

  rows.forEach(row => {
    const status = row.querySelector(".status").textContent.trim();
    if (status === "Pending") {
      row.style.display = "table-row"; // tampilkan
    } else {
      row.style.display = "none"; // sembunyikan
    }
  });
});


// Fungsi untuk menampilkan kembali semua task
document.getElementById("resetBtn").addEventListener("click", function () {
  const rows = document.querySelectorAll("#todo-body tr:not(.no-task)");
  rows.forEach(row => {
    row.style.display = "table-row";
  });
});


// Jalankan saat pertama kali halaman dibuka
updateNoTaskMessage();
