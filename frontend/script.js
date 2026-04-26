const API_URL = "http://localhost:5000/api/tasks";

// LOAD TASKS
async function loadTasks() {
  const response = await fetch(API_URL);
  const tasks = await response.json();

  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach(task => {
    const li = document.createElement("li");

    li.innerHTML = `
        <span>${task.title}</span>
        `;

    if (task.completed) {
      li.style.textDecoration = "line-through";
    }

    // Toggle complete
    li.onclick = async () => {
      await fetch(`${API_URL}/${task._id}`, {
        method: "PUT"
      });
      loadTasks();
    };

    // Delete button
    const delBtn = document.createElement("button");
    delBtn.textContent = "X";

    delBtn.onclick = async (e) => {
      e.stopPropagation();
      await fetch(`${API_URL}/${task._id}`, {
        method: "DELETE"
      });
      loadTasks();
    };

    li.appendChild(delBtn);
    list.appendChild(li);
  });
}

// ADD TASK
async function addTask() {
  const input = document.getElementById("taskInput");

  await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      title: input.value
    })
  });

  input.value = "";
  loadTasks();
}

// LOAD ON START
loadTasks();