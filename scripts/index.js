import { visibleEvents, cardCreator, showCategoriesInCheckboxes, filtersUnited } from './functions.js';
let divCardsIndex = document.getElementById('cardsIndex');
let searchForm = document.querySelector('.formSearch');
let searchInput = document.querySelector('.formSearch > input');
let searchButton = document.querySelector('.formSearch > button');
let checkContainer = document.getElementById('formCategories');
let route = "./pages/";

async function startIndex(){
    await fetch("/json/amazing.json")
        .then(response => response.json())
        .then(data => {
            const events = data.events; 
            visibleEvents(events, divCardsIndex, cardCreator, route);
            showCategoriesInCheckboxes(events, checkContainer);
            searchInput.addEventListener('input', () => {
                filtersUnited(divCardsIndex, events, searchInput.value, route)
            });
            searchForm.addEventListener('submit', () => {
                filtersUnited(divCardsIndex, events, searchInput.value, route)
            });
            searchButton.addEventListener('click', () => {
                filtersUnited(divCardsIndex, events, searchInput.value, route)
            });
            checkContainer.addEventListener('change', () => {
                filtersUnited(divCardsIndex, events, searchInput.value, route)
            });
        })
        .catch(error => alert(" Error. Couldn't load data.", error));
}
startIndex();