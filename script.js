
const addtask=document.getElementById('addTaskButton');
const tasktable=document.querySelector('.task-table tbody');
const taskSearch=document.getElementById('tasksearch');
const sortSelect=document.getElementById('sort-tasks');
let currentSortCriteria='';
let currentRow=null;

function clearInputs() {
   document.getElementById('taskTitle').value = '';
   document.getElementById('taskDescription').value = '';
   document.getElementById('taskDueDate').value = '';
   document.getElementById('taskPriority').value = '';
}

function sortTasks(criteria) {
   const rows = Array.from(tasktable.rows);
 
   const sortedRows = rows.sort((rowA, rowB) => {
     let valA, valB;
 
     switch (criteria) {
       case 'title':
         valA = rowA.cells[1].textContent.toLowerCase();
         valB = rowB.cells[1].textContent.toLowerCase();
         return valA.localeCompare(valB); 
 
       case 'due-date':
         valA = new Date(rowA.cells[3].textContent);
         valB = new Date(rowB.cells[3].textContent);
         return valA - valB; 
 
       case 'priority':
         const priorityMap = { High: 3, Medium: 2, Low: 1 };
         valA = priorityMap[rowA.cells[4].textContent];
         valB = priorityMap[rowB.cells[4].textContent];
         return valB - valA; 
     }
   });
 
   tasktable.innerHTML = '';
   sortedRows.forEach(row => tasktable.appendChild(row));

 }
 
 sortSelect.addEventListener('change', (event) => {
   sortTasks(event.target.value);
   
 });

function addTask(){

   const title = document.getElementById('taskTitle').value;
        const description = document.getElementById('taskDescription').value;
        const dueDate = document.getElementById('taskDueDate').value;
        const priority = document.getElementById('taskPriority').value;


if (currentRow) {

   currentRow.cells[1].textContent = title;  
   currentRow.cells[2].textContent = description || 'No Description'; 
   currentRow.cells[3].textContent = dueDate || 'No Due Date'; 
   currentRow.cells[4].textContent = priority.charAt(0).toUpperCase() +priority.slice(1) ; 

   addTaskButton.textContent = 'Add Task'; 
   currentRow = null; 

   if(currentSortCriteria){
      sortTasks(currentSortCriteria);
   }

  
   
} else {

   const row = document.createElement('tr');
   row.innerHTML = `
       <td><input type="checkbox" class="mark-complete"> </td>
       <td>${title}</td>
       <td>${description || 'No Description'}</td>
       <td>${dueDate || 'No Due Date'}</td>
       <td>${priority.charAt(0).toUpperCase() + priority.slice(1)}</td>
       <td class="button">
           <button class="edit-button">Edit</button>
           <button class="delete-button">Delete</button>
       </td>
   `;

   row.querySelector('.edit-button').addEventListener('click', () => editTask(row));
   row.querySelector('.delete-button').addEventListener('click', () => deleteTask(row));

   
   tasktable.appendChild(row);

   
}

clearInputs(); 


const checkbox = row.querySelector('.mark-complete');
checkbox.addEventListener('change', function() {
  if (this.checked) {
    row.classList.add('completed');
  } else {
    row.classList.remove('completed');
  }
});
}


function deleteTask(row) {
   const confirmation=confirm('Are you sure you want to delete this task?');

   if(confirmation){
   tasktable.removeChild(row);
   }

}

function editTask(row) {

   currentRow = row;

   const title = row.cells[1].textContent;
   const description = row.cells[2].textContent === 'No Description' ? '' : row.cells[2].textContent;
   const dueDate = row.cells[3].textContent === 'No Due Date' ? '' : row.cells[3].textContent;
   const priority = row.cells[4].textContent.toLowerCase();

   document.getElementById('taskTitle').value = title;
   document.getElementById('taskDescription').value = description;
   document.getElementById('taskDueDate').value = dueDate;
   document.getElementById('taskPriority').value = priority;

   addTaskButton.textContent = 'Update';
}



taskSearch.addEventListener('input', function () {
   const searchText = taskSearch.value.toLowerCase(); 
   const rows = tasktable.getElementsByTagName('tr'); 

   
   Array.from(rows).forEach((row) => {
       const taskName = row.cells[1].textContent.toLowerCase(); 

       row.style.display = taskName.includes(searchText) ? '' : 'none';

   });

});


addTaskButton.addEventListener('click', addTask);