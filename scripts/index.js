import data from "./amazing.js";

let events = data.events;

let checkFoodFair = document.getElementById("catefoodfair");
let checkMuseum = document.getElementById("catemuseum");
let checkCostumeParty = document.getElementById("catecostumeparty");
let checkMusicConcert = document.getElementById("catemusiconcert");
let checkRace = document.getElementById("caterace");
let checkBookExchange = document.getElementById("catebookexchange");
let checkCinema = document.getElementById("catecinema");

let cardsSection = document.getElementById("cards");

for (let i = 0; i < events.length; i++) {
    let div =
        document.createElement("div");
        div.classList.add('card');
        div.classList.add('d-flex');
        div.classList.add('flex-column');
        div.setAttribute('id', `card${events[i]._id}`);
        div.innerHTML =
            `<div class="card-image" id="event${events[i]._id}"></div>  
            <div class="card-body">
                <h5 class="card-title text-center">${events[i].name}</h5>
                <p class="text-center">${events[i].description}</p>
            </div>
            <div class="row card-bottom d-flex align-items-baseline">
                <div class="col text-center">
                    <p>Price: $ ${events[i].price}</p>
                </div>
                <div class="col btn-details p-0">
                    <a href="#" class="btn btn-sm w-100">Details</a>
                </div>
            </div>`;
        document.getElementById("cards").appendChild(div);
        document.getElementById(`event${events[i]._id}`).style.backgroundImage = `url(${events[i].image})`;
}

let checkedCategories = [
    {checkbox: checkFoodFair, category: "Food Fair"},
    {checkbox: checkMuseum, category: "Museum"},
    {checkbox: checkCostumeParty, category: "Costume Party"},
    {checkbox: checkMusicConcert, category: "Music Concert"},
    {checkbox: checkRace, category: "Race"},
    {checkbox: checkBookExchange, category: "Book Exchange"},
    {checkbox: checkCinema, category: "Cinema"}]

for (let checkedCategory of checkedCategories) {
    (checkedCategory.checkbox).addEventListener("change", function() {
    
        if (!(checkedCategory.checkbox).checked) {
            for (let i = 0; i < events.length; i++){
                if (checkedCategory.category == (events[i].category)) {
                    document.getElementById(`card${events[i]._id}`).classList.remove('d-flex');
                    document.getElementById(`card${events[i]._id}`).style.display = `none`;
                }
            }
        } else {
            for (let i = 0; i < events.length; i++){
                if (checkedCategory.category == (events[i].category)) {
                    document.getElementById(`card${events[i]._id}`).classList.add('d-flex');
                     document.getElementById(`card${events[i]._id}`).removeAttribute('style');
                }
            }
            
        }
})
}


   