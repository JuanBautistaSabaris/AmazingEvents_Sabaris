const uniqueCategories = (events) => {
    return events.reduce((acc, curr) => {
        if (!acc.includes(curr.category)) {
            acc.push(curr.category);
        }
        return acc;
    }, []);
};

const createCategoryCheckboxes = (array) => {
    const fragmentForm = document.createDocumentFragment();
    const categories = uniqueCategories(array);
    categories.map(category => {
        const div = document.createElement('div');
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

const showCategoriesInCheckboxes = (array) => {
    const formCategories = document.getElementsByClassName('formCategories')[0];
    const fragmentForm = createCategoryCheckboxes(array);
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
        const card = renderFunction(element,route);
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

export { cardCreator, renderCards, visibleEvents, showCategoriesInCheckboxes, detailsCardCreator, };