import data from "./amazing.js";
import { visibleEvents, cardCreator, showCategoriesInCheckboxes } from './functions.js';

const divCardsUpcomingEvents = document.getElementById('cardsUpcomingEvents');
const upcomingEvents = data.events.filter((event) => {
    return event.date > data.currentDate;});
let cards = visibleEvents(upcomingEvents, divCardsUpcomingEvents, cardCreator);

let checkboxesCategories = showCategoriesInCheckboxes(upcomingEvents);

const searchForm = document.querySelector('.formSearch');
const searchInput = document.querySelector('.formSearch > input');
const searchButton = document.querySelector('.formSearch > button');
const checkContainer = document.getElementById('formCategories');

//Funcion para el Search
function filterBySearch(array, name){
    let filtersArray = array.filter(e => e.name.toLowerCase().includes(name.toLowerCase()));
    return filtersArray;
}
//Filtrado por categorias
function filterByCategories(array){
    const checkedValues = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(input => input.value);
    return checkedValues.length > 0 ? array.filter(e => checkedValues.includes(e.category)) : array;
}

//Función para que funcionen juntos
function filtersUnited(event){
    event.preventDefault();
    divCardsUpcomingEvents.innerHTML=``;
    let filterArrayName = filterBySearch(upcomingEvents, searchInput.value);
    let filterAll = filterByCategories(filterArrayName);
    visibleEvents(filterAll, divCardsUpcomingEvents, cardCreator);
}

searchInput.addEventListener('input', filtersUnited);
searchForm.addEventListener('submit', filtersUnited);
searchButton.addEventListener('click', filtersUnited);
checkContainer.addEventListener('change', filtersUnited);