const uniqueCategories = (events) => {
    return events.reduce((acc, curr) => {
        if (!acc.includes(curr.category)) {
            acc.push(curr.category);
        }
        return acc;
    }, []);
};

const createCategoryCheckboxes = (array) => {
    let fragmentForm = document.createDocumentFragment();
    let categories = uniqueCategories(array);
    categories.map(category => {
        let div = document.createElement('div');
        div.classList="d-flex flex-wrap form-check form-switch";
        div.innerHTML=` 
        <label class="d-inline-flex my-2 mx-2">
        <input class="form-check-input me-3" value="${category}" 
        name="categories" role="switch" for="${category}" id="${category}" type="checkbox">${category}
        </label>`;
    fragmentForm.appendChild(div);
    });
    return fragmentForm;
}

const showCategoriesInCheckboxes = (array,container) => {
    let formCategories = container;
    let fragmentForm = createCategoryCheckboxes(array);
    let showCategories = formCategories.appendChild(fragmentForm);
}

function cardCreator(event, route) {
    let div = document.createElement("div");
    div.classList = "card mx-2 my-2";
    div.innerHTML = `
          <img src="${event.image}" class="card-image" alt="${event.category}">
          <div class="card-body">
              <h5 class="card-title text-center">${event.name}</h5>
              <p class="text-center">${event.description}</p>
              <div class="row card-bottom d-flex align-items-baseline">
               <div class="col text-center">
                  <p>Price: $${event.price}</p>
                </div>
               <div class="col btn-details p-0">
                  <a href="${route}details.html?id=${event._id}" class="btn btn-sm w-100">Details</a>
                </div>
              </div>
          </div>`;
    return div;
  }

function renderCards(elements, container, renderFunction, route="./") {
    let fragmento = document.createDocumentFragment();
    elements.forEach(element => {
        let card = renderFunction(element,route);
        fragmento.appendChild(card);
    });
    container.appendChild(fragmento);
}

function visibleEvents(events, container, renderFunction, route) {
    if (events.length == 0) {
        container.innerHTML= `<h2>Event not found. Check that it is well written.</h2>`
    }
    renderCards(events, container, renderFunction, route);
}

function detailsCardCreator(event, container) {
    let div = document.createElement('div');
    div.classList='row g-0';
    div.innerHTML=`
    <div class="col-md-6 d-flex justify-content-center align-items-center">
        <img src="${event.image}" id="cardImg" class="img-fluid borderRadius " alt="${event.name}">
    </div>
    <div class="col-md-6">
        <div class="card-body">
            <dl class="card-text">
                <dt>Name</dt>
                <dd>${event.name}</dd>
                <dt>Date</dt>
                <dd>${event.date}</dd>
                <dt>Description</dt>
                <dd>${event.description}</dd>
                <dt>Category</dt>
                <dd>${event.category}</dd>
                <dt>Place</dt>
                <dd>${event.place}</dd>
                <dt>Capacity</dt>
                <dd>${event.capacity}</dd>
                <dt>${event.assistance ? "Asistence" : "Estimate"}</dt>
                <dd>${event.assistance ? event.assistance : event.estimate}</dd>
                <dt>Price</dt>
                <dd>${event.price}</dd>
            </dl>
            <div class="d-flex justify-content-end">
                <a href="../index.html" class="btn btn-details align-self-center go">Go Home</a>
            </div>
        </div>
    </div>`;
    return container.appendChild(div)
}

function filterBySearch(array, name){
    let filtersArray = array.filter(e => e.name.toLowerCase().includes(name.toLowerCase()));
    return filtersArray;
}

function filterByCategories(array){
    let checkedValues = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(input => input.value);
    return checkedValues.length > 0 ? array.filter(e => checkedValues.includes(e.category)) : array;
}


function filtersUnited(container, array, name, route="./"){
    window.event.preventDefault();
    container.innerHTML=``;
    let filterArrayName = filterBySearch(array, name);
    let filterAll = filterByCategories(filterArrayName);
    visibleEvents(filterAll, container, cardCreator, route);
}

function eventMostAssistance(array){
    let eventHighestAttendance = "";
    let highestAttendancePercentage = -1;
    array.forEach((event) => {
        const percentage = ((event.assistance ? event.assistance : event.estimate) / event.capacity) * 100;
        if (percentage > highestAttendancePercentage) {
        highestAttendancePercentage = percentage;
        eventHighestAttendance = event.name;
        }
    });
    return eventHighestAttendance 
}

function eventLowestAssistance(array) {
    let eventsLowestAttendance = "";
    let lowestAttendancePercentage = 101;
    array.forEach((event) => {
        const percentage = ((event.assistance ? event.assistance : event.estimate)/ event.capacity) * 100;
        if (percentage < lowestAttendancePercentage) {
            lowestAttendancePercentage = percentage;
            eventsLowestAttendance = event.name;
        } 
    });
    return eventsLowestAttendance;
}

function eventLargerCapacity(array) {
    let eventLargestCapacity = array.reduce((prevEvent, actualEvent) => {
        return (prevEvent.capacity > actualEvent.capacity) ? prevEvent : actualEvent;
    }).name;
    return eventLargestCapacity;
}

function introduceData(array,container){
    const tr = document.createElement("tr");
    tr.innerHTML = `<td class="text-center">${eventMostAssistance(array)}</td>
                    <td class="text-center">${eventLowestAssistance(array)}</td>
                    <td class="text-center">${eventLargerCapacity(array)}</td>`;
    container.appendChild(tr);
}

function calculateRevenues(events){
    let revenues = 0;
    events.forEach(event => {
        const revenue = event.price * ((event.assistance ? event.assistance : event.estimate));
        revenues += revenue;
    });
    return revenues;
}

function calculateAttendancePercentage(events){
    let totalAssistance = events.reduce((total, event) => {
        return total + ((event.assistance ? event.assistance : event.estimate));
    }, 0);
    let capacity = events.reduce((cap, event) => {
        return cap + (event.capacity);
    }, 0);
    return ((totalAssistance / capacity) * 100).toFixed(2);
}

function tableRowCreator(category, revenues, attendancePercentage, container){
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${category}</td>
                    <td class="text-end">$${revenues}</td>
                    <td class="text-end">${attendancePercentage}%</td>`;
    container.appendChild(tr);
}

function groupByCategory(array, container) {
    const groupedCategories = {};
    array.forEach((event) => {
        if (!groupedCategories[event.category]) {
        groupedCategories[event.category] = [];
        }
        groupedCategories[event.category].push(event);
    });

    for (const category in groupedCategories) {
        let events = groupedCategories[category];
        let revenues = calculateRevenues(events);
        let attendancePct = calculateAttendancePercentage(events);
        tableRowCreator(category, revenues, attendancePct, container);
    }
}



export { cardCreator, renderCards, visibleEvents, showCategoriesInCheckboxes, detailsCardCreator, filtersUnited, introduceData, groupByCategory,};