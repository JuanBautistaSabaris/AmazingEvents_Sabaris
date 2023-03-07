import data from "./amazing.js";
const divcardspastevents = document.getElementById('cardspastevents');
let cardspastevents = '';
function pastEvents(events, date){
    for (let event of events) {
        if (event.date < date) {
            cardspastevents += `<div class="card mx-2 my-2">
                <img src="${event.image}" class="card-img-top" alt="${event.category}">
                <div class="card-body text-center">
                    <h5 class="card-title">${event.name}</h5>
                    <p class="card-text">${event.description}</p>
                    <div class="d-flex justify-content-between">
                        <p class="pt-2">Price: $${event.price}</p>
                        <a href="./pages/details.html" class="btn btn-nav align-self-center go">Let's Go</a>
                    </div>
                </div>
            </div>`;
        }
    }
    return cardspastevents;
}

divcardspastevents.innerHTML= pastEvents(data.events, data.currentDate)