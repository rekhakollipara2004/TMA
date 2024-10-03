const taskInput = document.getElementById('task-input');
const addTaskButton = document.getElementById('add-task');
const pendingTasksList = document.getElementById('pending-tasks');
const completedTasksList = document.getElementById('completed-tasks');
const progressText = document.getElementById('progress');
const progressFill = document.getElementById('progress-fill');
const themeToggleButton = document.getElementById('theme-toggle');
const searchInput = document.getElementById('search-input');

let tasks = [];

function updateProgress() {
   const totalTasks = tasks.length;
   const completedTasks = tasks.filter(task => task.completed).length;
   const progress = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
   progressText.innerText = `${Math.round(progress)}%`;
   progressFill.style.width = `${progress}%`;
}

function renderTasks() {
   pendingTasksList.innerHTML = '';
   completedTasksList.innerHTML = '';

   tasks.forEach(task => {
       const li = document.createElement('li');
       const taskNameSpan = document.createElement('span');
       taskNameSpan.textContent = task.name;

       const completeButton = document.createElement('button');
       completeButton.textContent = task.completed ? 'Undo' : 'Complete';
       completeButton.className = 'complete-task';
       completeButton.onclick = () => {
           task.completed = !task.completed;
           renderTasks();
           updateProgress();
       };

       const editButton = document.createElement('button');
       editButton.textContent = 'Edit';
       editButton.className = 'edit-task';
       editButton.onclick = () => {
           const newTaskName = prompt("Edit Task Name:", task.name);
           if (newTaskName !== null && newTaskName.trim() !== "") {
               task.name = newTaskName.trim();
               renderTasks();
           }
       };

       const deleteButton = document.createElement('button');
       deleteButton.textContent = 'Delete';
       deleteButton.className = 'delete-task';
       deleteButton.onclick = () => {
           tasks = tasks.filter(t => t !== task);
           renderTasks();
           updateProgress();
       };

       li.appendChild(taskNameSpan);
       li.appendChild(completeButton);
       li.appendChild(editButton);
       li.appendChild(deleteButton);

       if (task.completed) {
           completedTasksList.appendChild(li);
       } else {
           pendingTasksList.appendChild(li);
       }
   });

   updateProgress();
}

function filterTasks() {
   const filterValue = searchInput.value.toLowerCase();
   const filteredTasks = tasks.filter(task => 
      task.name.toLowerCase().includes(filterValue)
   );

   pendingTasksList.innerHTML = '';
   completedTasksList.innerHTML = '';

   filteredTasks.forEach(task => {
      const li = document.createElement('li');
      li.textContent = task.name;

      const completeButton = document.createElement('button');
      completeButton.textContent = task.completed ? 'Undo' : 'Complete';
      completeButton.className = 'complete-task'; 
      completeButton.onclick = () => {
          task.completed = !task.completed; 
          renderTasks(); 
          updateProgress();
      };

      const editButton = document.createElement('button');
      editButton.textContent = 'Edit';
      editButton.className = 'edit-task'; 
      editButton.onclick = () => {
          const newTaskName = prompt("Edit Task Name:", task.name);
          if (newTaskName !== null && newTaskName.trim() !== "") {
              task.name = newTaskName.trim();
              renderTasks();
          }
      };

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.className = 'delete-task'; 
      deleteButton.onclick = () => {
          tasks.splice(tasks.indexOf(task), 1); 
          renderTasks(); 
          updateProgress();
      };

      li.appendChild(completeButton);
      li.appendChild(editButton);
      li.appendChild(deleteButton);

      if (task.completed) {
          completedTasksList.appendChild(li);
      } else {
          pendingTasksList.appendChild(li);
      }
   });

   updateProgress();
}

addTaskButton.addEventListener('click', () => {
   const taskName = taskInput.value.trim();
   
   if (taskName) {
       tasks.push({ name: taskName, completed: false });
       taskInput.value = ''; 
       renderTasks(); 
   }
});

let isDarkMode = false;

themeToggleButton.addEventListener('click', () => {
   isDarkMode = !isDarkMode;

   if (isDarkMode) {
       document.body.classList.add('dark-mode');
       document.body.classList.remove('light-mode');
       themeToggleButton.innerText = 'Switch to Light Mode';
   } else {
       document.body.classList.add('light-mode');
       document.body.classList.remove('dark-mode');
       themeToggleButton.innerText = 'Switch to Dark Mode';
   }
});
