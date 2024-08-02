const newTaskInput = document.querySelector("#new-task input");
const tasksDiv = document.querySelector("#tasks");
// Function to fetch tasks from the server
const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:8000/task/gettask');
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      const tasks = await response.json();
      displayTasks(tasks);
    } catch (err) {
      console.error('Error fetching tasks:', err);
    }
  };
// Function to display tasks in the UI
const displayTasks = (tasks) => {
    tasksDiv.innerHTML = "";
  
    tasks.forEach((task) => {
      const taskDiv = document.createElement("div");
      taskDiv.classList.add("task");
      if (task.completed) {
        taskDiv.classList.add("completed");
      }
  
      const taskNameSpan = document.createElement("span");
      taskNameSpan.textContent = task.task;
      taskDiv.appendChild(taskNameSpan);
  
      const editButton = document.createElement("button");
      editButton.classList.add("edit");
      editButton.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
      taskDiv.appendChild(editButton);
  
      const deleteButton = document.createElement("button");
      deleteButton.classList.add("delete");
      deleteButton.innerHTML = `<i class="fa-solid fa-trash"></i>`;
      taskDiv.appendChild(deleteButton);
  
      tasksDiv.appendChild(taskDiv);
    });
  };

// Function to add a new task
const addTask = async () => {
    try {
      const task = newTaskInput.value;
      if (!task) {
        alert("Please enter a task");
        return;
      }
      const response = await fetch('http://localhost:8000/task/createtask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ task }),
      });
      if (!response.ok) {
        throw new Error('Failed to add task');
      }
      fetchTasks();
      newTaskInput.value = "";
    } catch (err) {
      console.error('Error adding task:', err);
    }
  };
document.querySelector("#push").addEventListener("click", addTask);
window.onload = fetchTasks;



  