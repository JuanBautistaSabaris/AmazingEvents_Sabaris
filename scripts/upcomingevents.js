import { visibleEvents, cardCreator, showCategoriesInCheckboxes, filtersUnited } from './functions.js';
let divCardsUpcomingEvents = document.getElementById('cardsUpcomingEvents');
let searchForm = document.querySelector('.formSearch');
let searchInput = document.querySelector('.formSearch > input');
let searchButton = document.querySelector('.formSearch > button');
let checkContainer = document.getElementById('formCategories');

async function startUpcoming(){
    await fetch("/json/amazing.json")
        .then(response => response.json())
        .then(data => {
            const currentDate = data.currentDate; 
            const events = data.events; 
            let upcomingEvents = events.filter((event) => {
                return event.date > currentDate;});
            visibleEvents(upcomingEvents, divCardsUpcomingEvents, cardCreator);
            showCategoriesInCheckboxes(upcomingEvents, checkContainer);
            searchInput.addEventListener('input', ()=>{
                filtersUnited(divCardsUpcomingEvents, upcomingEvents, searchInput.value)
            });
            searchForm.addEventListener('submit', ()=>{
                filtersUnited(divCardsUpcomingEvents, upcomingEvents, searchInput.value)
            });
            searchButton.addEventListener('click', ()=>{
                filtersUnited(divCardsUpcomingEvents, upcomingEvents, searchInput.value)
            });
            checkContainer.addEventListener('change', ()=>{
                filtersUnited(divCardsUpcomingEvents, upcomingEvents, searchInput.value)
            });
        })
        .catch(error => alert("Error. Couldn't load data.", error));
}
startUpcoming()