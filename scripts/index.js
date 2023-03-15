import data from "./amazing.js";
import { visibleEvents, cardCreator, showCategoriesInCheckboxes } from './functions.js';


const divCardsIndex = document.getElementById('cardsIndex');
const route = "./pages/";
let cards = visibleEvents(data.events, divCardsIndex, cardCreator, route);
let checkboxesCategories = showCategoriesInCheckboxes(data.events);

const searchForm = document.querySelector('.formSearch');
const searchInput = document.querySelector('.formSearch > input');
const searchButton = document.querySelector('.formSearch > button');
const checkContainer = document.getElementById('formCategories');

function filterBySearch(array, name){
    let filtersArray = array.filter(e => e.name.toLowerCase().includes(name.toLowerCase()));
    return filtersArray;
}

function filterByCategories(array){
    const checkedValues = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(input => input.value);
    return checkedValues.length > 0 ? array.filter(e => checkedValues.includes(e.category)) : array;
}

function filtersUnited(event){
    event.preventDefault();
    divCardsIndex.innerHTML=``;
    let filterArrayName = filterBySearch(data.events, searchInput.value);
    let filterAll = filterByCategories(filterArrayName);
    visibleEvents(filterAll, divCardsIndex, cardCreator, route);
}

searchInput.addEventListener('input', filtersUnited);
searchForm.addEventListener('submit', filtersUnited);
searchButton.addEventListener('click', filtersUnited);
checkContainer.addEventListener('change', filtersUnited);