import {groupByCategory, introduceData,} from "./functions.js";
let firstTable = document.getElementById("firstTable");
let upcomingEventsTBody= document.getElementById("upcomingEventsStatsByCategories")
let pastEventsTBody= document.getElementById("pastEventsStatsByCategories")

async function startStats(){
    await fetch("/json/amazing.json")
        .then(response => response.json())
        .then(data => {
            const currentDate = data.currentDate; 
            const events = data.events; 
            let upcomingEvents = events.filter((event) => {
                return event.date > currentDate;});
            let pastEvents = data.events.filter((event) => {
                return event.date < currentDate;});
            introduceData(events,firstTable); 
            groupByCategory(upcomingEvents, upcomingEventsTBody)
            groupByCategory(pastEvents, pastEventsTBody)
        })
        .catch(error => alert("Couldn't load data. Error: ", error));
}
startStats()