import { detailsCardCreator } from "./functions.js";
let detailsContainer = document.getElementById('cardsDetails');

async function startDetails(){
    await fetch("/json/amazing.json")
        .then(response => response.json())
        .then(data => {
            const events = data.events; 
            let queryString = location.search;
            let param = new URLSearchParams(queryString);
            let eventId = param.get('id');
            let event = events.find(event => event._id == eventId);
            if (!event) {
                detailsContainer.innerHTML= `<h1 class="d-flex justify-content-center">No results found.</h1>`
            }
            detailsCardCreator (event,detailsContainer);
        })
        .catch(error => alert("Error. Couldn't load data. ", error));
}
startDetails();