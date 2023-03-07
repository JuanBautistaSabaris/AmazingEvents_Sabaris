import data from "./amazing.js";

let events = data.events;
let date = data.currentDate;

function arrayUpcomingEvents(events) {
    let upEvents = [];
    for (let event of events) {
        if (Date.parse(event.date) > Date.parse(date)) {
            upEvents.push(event);
        }
    }
    return upEvents;
}
console.log(arrayUpcomingEvents(events));

let checkFoodFair = document.getElementById("catefoodfair");
let checkMuseum = document.getElementById("catemuseum");
let checkCostumeParty = document.getElementById("catecostumeparty");
let checkMusicConcert = document.getElementById("catemusiconcert");
let checkRace = document.getElementById("caterace");
let checkBookExchange = document.getElementById("catebookexchange");
let checkCinema = document.getElementById("catecinema");

function cardCreator(eventsArray) {
    let dFrag = document.createDocumentFragment();
    for (let i = 0; i < eventsArray.length; i++) {
        let div = document.createElement("div");
        div.classList.add('card', 'd-flex', 'flex-column');
        div.setAttribute('id', `card${eventsArray[i]._id}`);
        div.innerHTML =
            `<div class="card-image" id="bg-event${eventsArray[i]._id}"></div>  
            <div class="card-body">
                <h5 class="card-title text-center">${eventsArray[i].name}</h5>
                <p class="text-center">${eventsArray[i].description}</p>
            </div>
            <div class="row card-bottom d-flex align-items-baseline">
                <div class="col text-center">
                    <p>Price: $ ${eventsArray[i].price}</p>
                </div>
                <div class="col btn-details p-0">
                    <a href="../pages/details.html" class="btn btn-sm w-100">Details</a>
                </div>
            </div>`;
        dFrag.appendChild(div)
        dFrag.getElementById(`bg-event${eventsArray[i]._id}`).style.backgroundImage = `url(${eventsArray[i].image})`;
    }
    document.getElementById("cardsupcomingevents").appendChild(dFrag);
}

let checkedCategories = [
    {checkbox: checkFoodFair, category: "Food Fair"},
    {checkbox: checkMuseum, category: "Museum"},
    {checkbox: checkCostumeParty, category: "Costume Party"},
    {checkbox: checkMusicConcert, category: "Music Concert"},
    {checkbox: checkRace, category: "Race"},
    {checkbox: checkBookExchange, category: "Book Exchange"},
    {checkbox: checkCinema, category: "Cinema"}]

function visibleCards(eventsArray) {
    for (let checkedCategory of checkedCategories) {
        (checkedCategory.checkbox).addEventListener("change", function changeDisplay() {
        
            if (!(checkedCategory.checkbox).checked) {
                for (let i = 0; i < eventsArray.length; i++){
                    if (checkedCategory.category == (eventsArray[i].category)) {
                        document.getElementById(`card${eventsArray[i]._id}`).classList.remove('d-flex');
                        document.getElementById(`card${eventsArray[i]._id}`).style.display = `none`;
                    }
                }
            } else {
                for (let i = 0; i < eventsArray.length; i++){
                    if (checkedCategory.category == (eventsArray[i].category)) {
                        document.getElementById(`card${eventsArray[i]._id}`).classList.add('d-flex');
                        document.getElementById(`card${eventsArray[i]._id}`).removeAttribute('style');
                    }
                }
            }
        })
    }
}

cardCreator(arrayUpcomingEvents(events));
visibleCards(arrayUpcomingEvents(events));