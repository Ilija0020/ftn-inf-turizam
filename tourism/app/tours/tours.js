class Tour {
    constructor(name, description, length, tags) {
        this.name = name;
        this.description = description;
        this.length = length;
        this.tags = tags;
    }
}

let tours = [];

function initializeTours() {
    tours = [
        new Tour("City Exploration", "Explore the city's historic landmarks and vibrant culture.", 5, ["city", "culture", "history"]),
        new Tour("Mountain Adventure", "Experience thrilling hikes and breathtaking views in the mountains.", 10, ["adventure", "nature", "hiking"]),
        new Tour("Beach Relaxation", "Unwind on pristine beaches with crystal-clear waters.", 3, ["relaxation", "beach", "sun"]),
    ];
    createToursRows();
}

function createToursRows() {
    let table = document.querySelector("#tours-body");
    for (let i=0; i < tours.length; i++) {
        let tr= document.createElement("tr");
        let tdName = document.createElement("td");
        let tdLength = document.createElement("td");

        tdName.textContent = tours[i].name;
        tdLength.textContent = tours[i].length + " km";
        tr.appendChild(tdName);
        tr.appendChild(tdLength);

        tr.addEventListener('click', function() {
            displayTourDetails(tours[i])
        });

        table.appendChild(tr);
    }
}

document.addEventListener("DOMContentLoaded", initializeTours);

function displayTourDetails(tour) {
    let details = document.querySelector("#tour-details");
    details.innerHTML = `
        <h2>${tour.name}</h2>
        <p>Description: ${tour.description}</p>
        <p>Length: ${tour.length} km</p>
        <p>Tags: ${tour.tags.join(", ")}</p>
    `;
    details.style.display = "block";

    if (details.firstChild) { 
        details.firstChild.remove()
    }
}