/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/



/*
This function creates and inserts/appends the elements needed to display a "page" of nine students.
The function takes two parameters, an array of student data & a page number
*/

function showPage(list, page){
   const startIndex = (page * 9)-9;
   const endIndex = page * 9;
   const studentList = document.querySelector('ul.student-list');
   studentList.innerHTML = '';
   for (let i = 0; i < list.length; i += 1){
      if(i >= startIndex && i < endIndex){
         studentList.innerHTML += 
         `<li class="student-item cf">
            <div class="student-details">
               <img class = "avatar" src="${list[i]["picture"]["medium"]}" alt="Profile Picture">
               <h3>${list[i]["name"]["first"]} ${list[i]["name"]["last"]}</h3>
               <span class="email">${list[i]["email"]}</span>
            </div>
            <div class="joined-details">
               <span class="date">Joined ${list[i]["registered"]["date"]}</span>
            </div>
         </li>`;
      }
   }
}

/*
This function creates and inserts/appends the elements needed for the pagination buttons.
It also adds functionality by changing the page when a pagination button is clicked.
The function takes one parameter, an array of student data.
*/

function addPagination(list){
   const numButtons = Math.ceil(list.length/9);
   const linkList = document.querySelector('ul.link-list');
   linkList.innerHTML = '';
   for (let i = 1; i <= numButtons; i += 1){
      linkList.innerHTML += 
      `<li>
         <button type="button">${i}</</button>
       </li>`;
   }
   const firstButton = document.querySelectorAll('button')[0];
   firstButton.className = 'active';
   
   linkList.addEventListener('click', (e)=>{
      const clickedElement = e.target;
      if(clickedElement.type == 'button'){
         const currActive = document.getElementsByClassName('active')[0];
         currActive.className = '';
         clickedElement.className = 'active';
         showPage(list, clickedElement.textContent);
      }
   });
}

/*
This function creates and inserts a search bar. 
It also adds functionality by making the search button clickable and filters the list in real-time.
*/

function addSearchBar(list){
   const header = document.querySelector('header'); 
   const searchBar = document.createElement('label');
   const studentList = document.querySelector('ul.student-list');

   searchBar.className = 'student-search'
   searchBar.for = 'search';
   searchBar.innerHTML = 
   `<span>Search by name</span>
    <input id="search" placeholder="Search by name...">
    <button type="button" id="searchButton"><img src="img/icn-search.svg" alt ="Search icon"></button>`;
    header.insertAdjacentElement("beforeend", searchBar);

   function returnMatches(search){
      const matched = [];
      for (let i = 0; i < list.length; i += 1){
         const student = list[i];
         if(student["name"]["title"].toLowerCase().includes(search)|| 
            student["name"]["first"].toLowerCase().includes(search) || 
            student["name"]["last"].toLowerCase().includes(search)){
            console.log(student);
            matched.push(student);
         }
      }
      return matched;
   };
   //handle button click
   const searchButton = document.getElementById('searchButton');
   searchButton.addEventListener('click', (e)=>{
      const search = document.querySelector('input').value.toLowerCase();
      const matches = returnMatches(search);
      showPage(matches, 1);
      addPagination(matches);
      if(matches.length < 1){
         studentList.innerHTML = 'No results found';
      }
    });
   //handle real time typing 
   searchBar.addEventListener('keyup', (e)=>{
      const search = document.querySelector('input').value.toLowerCase();
      const matches = returnMatches(search);
      showPage(matches, 1);
      addPagination(matches);
      if(matches.length < 1){
         studentList.innerHTML = 'No results found';
      }
   });

}

// Call functions to set up page
showPage(data, 1);
addPagination(data);
addSearchBar(data);