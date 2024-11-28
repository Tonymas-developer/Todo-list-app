// Define the UI var
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.list-group');
const clearBtn = document.querySelector('.clear-task');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


// Load all event listeners
loadEventListeners();


// Load all event listeners
function loadEventListeners() {
  // DOM Load Event
  document.addEventListener('DOMContentLoaded', getTasks);

  // add Task
  form.addEventListener('submit', addTask);

  // Remove Task Event
  taskList.addEventListener('click', removeTasks);

  // Clear Task Event
  clearBtn.addEventListener('click', clearTasks);

  // Filter Task Event
  filter.addEventListener('keyup', filterTasks);

}


// Get tasks from Local storage
function getTasks() {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  }
  else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function (task) {
    // Create Li
    const li = document.createElement('li');
    // Add className
    li.className = 'list-group-item list-group-item-action';


    // Create Divs and spans
    const div1 = document.createElement('div');
    const div2 = document.createElement('div');
    const span1 = document.createElement('span');
    const span2 = document.createElement('span');

    // Add class name
    div1.className = 'w-50 me-5 d-inline-block ms-3';
    div2.className = 'w-25 ms-5 d-inline-block text-end';
    span1.className = 'me-5';


    // Create Link
    const editLink = document.createElement('a');
    // Add Class
    editLink.className = 'edit';
    // set attribute
    editLink.setAttribute('href', '#');
    // Add icon
    editLink.innerHTML = '<i class="fa fa-edit"></i>'

    // Create delte link
    const deleteLink = document.createElement('a');
    // Add class name
    deleteLink.className = 'delete text-danger';
    // Set attribute
    deleteLink.setAttribute('href', '#');
    // Add icon 
    deleteLink.innerHTML = '<i class="fa fa-close"></i>'


    // Append textnode to div1
    div1.appendChild(document.createTextNode(task));

    // append link to span1 and span2
    span1.appendChild(editLink);
    span2.appendChild(deleteLink);

    // Append span1 and span2 to div2
    div2.appendChild(span1);
    div2.appendChild(span2);
    // Append Span to li
    li.appendChild(div1);
    li.appendChild(div2);

    // Append Li to ol
    taskList.appendChild(li);
  })
}



// Add Task Event Handler
function addTask(e) {
  if (taskInput.value == '') {
    alert('Please Enter a Task!!!');
  }
  else {
    // Create Li
    const li = document.createElement('li');
    // Add className
    li.className = 'list-group-item list-group-item-action';

    // Create Divs and spans
    const div1 = document.createElement('div');
    const div2 = document.createElement('div');
    const span1 = document.createElement('span');
    const span2 = document.createElement('span');

    div1.className = 'w-50 me-5 d-inline-block ms-3';
    div2.className = 'w-25 ms-5 d-inline-block text-end';
    span1.className = 'me-5';

    // Create Link
    const editLink = document.createElement('a');
    // Add Class
    editLink.className = 'edit';
    // // set attribute
    editLink.setAttribute('href', '#');
    // // Add icon
    editLink.innerHTML = '<i class="fa fa-edit"></i>'

    // Create delte link
    const deleteLink = document.createElement('a');
    // Add class name
    deleteLink.className = 'delete text-danger';
    // Set attribute
    deleteLink.setAttribute('href', '#');
    // Add icon 
    deleteLink.innerHTML = '<i class="fa fa-close"></i>'

    // Append textnode to div1
    div1.appendChild(document.createTextNode(taskInput.value));

    // append link to span1 and span2
    span1.appendChild(editLink);
    span2.appendChild(deleteLink);

    // Append span1 and span2 to div2
    div2.appendChild(span1);
    div2.appendChild(span2);
    // Append Span to li
    li.appendChild(div1);
    li.appendChild(div2);

    // Append Li to ol
    taskList.appendChild(li);

    // Store to local storage
    storeToLocalStorage(taskInput.value);



    // clear input
    taskInput.value = '';
  }


  e.preventDefault();
}

// Store to Localstorage
function storeToLocalStorage(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  }
  else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}


// Remove Task Event Handler
function removeTasks(e) {
  if (e.target.parentElement.classList.contains('delete')) {
    if (confirm('Are you sure?')) {

      let taskToRemove = e.target.parentElement.parentElement.parentElement.parentElement;

      taskToRemove.remove();

      // Remove task from local storage
      removeTaskFromLocalStorage(taskToRemove);
    }

  }

  e.preventDefault();
}


// Remove task from local storage
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  }
  else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  console.log(tasks);

  tasks.forEach(function(task, index) {
    if (taskItem.textContent === task) {
      // console.log(task);
      // console.log(index);
      // console.log(taskItem);
      // console.log(tasks.splice(index, 1));
      tasks.splice(index, 1);
    }
  })

  localStorage.setItem('tasks', JSON.stringify(tasks));
}



// Clear Task Event Handler
function clearTasks(e) {
  // taskList.innerHTML = '';



  // // faster method
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

    // Clear from LS
    clearTasksFromLocalStorage();


  e.preventDefault();

}


// Clear From LS
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

// Filter Task Event Handler
function filterTasks(e) {
  // Get the values inputed in the filter input box
  const text = e.target.value.toLowerCase();

  // Get all the list items
  const listItems = document.querySelectorAll('.list-group-item');

  // loop through all the list items
  listItems.forEach(function (task) {
    const item = task.firstChild.textContent.toLowerCase();
    if (item.indexOf(text) != -1) {
      task.style.display = 'block';
      console.log(item.indexOf(text));
    }
    else {
      task.style.display = 'none';
      console.log(item.indexOf(text));
    }
  })



} 
