import { visibleEvents, cardCreator, showCategoriesInCheckboxes, filtersUnited } from './functions.js';
let divCardsPastEvents = document.getElementById('cardsPastEvents');
let searchForm = document.querySelector('.formSearch');
let searchInput = document.querySelector('.formSearch > input');
let searchButton = document.querySelector('.formSearch > button');
let checkContainer = document.getElementById('formCategories');

async function startPast(){
    await fetch("/json/amazing.json")
        .then(response => response.json())
        .then(data => {
            const currentDate = data.currentDate; 
            const events = data.events; 
            let pastEvents = events.filter((event) => {
                return event.date < currentDate;});
            visibleEvents(pastEvents, divCardsPastEvents, cardCreator);
            showCategoriesInCheckboxes(pastEvents, checkContainer);
            searchInput.addEventListener('input', ()=>{
                filtersUnited(divCardsPastEvents, pastEvents, searchInput.value)
            });
            searchForm.addEventListener('submit', ()=>{
                filtersUnited(divCardsPastEvents, pastEvents, searchInput.value)
            });
            searchButton.addEventListener('click', ()=>{
                filtersUnited(divCardsPastEvents, pastEvents, searchInput.value)
            });
            checkContainer.addEventListener('change', ()=>{
                filtersUnited(divCardsPastEvents, pastEvents, searchInput.value)
            });
        })
        .catch(error => alert("Error. Couldn't load data.", error));
}
startPast();