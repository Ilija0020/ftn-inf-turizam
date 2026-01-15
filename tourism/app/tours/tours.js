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
    const savedTours = localStorage.getItem("tours");
    if (savedTours) {
        tours = JSON.parse(savedTours);
    } else {
    tours = [
        new Tour(
                "Tajne Petrovaradinske tvrđave", 
                "Istražite podzemne vojne galerije, posetite sat-kulu i uživajte u najlepšem panoramskom pogledu na Novi Sad i Dunav.", 
                4, 
                ["istorija", "tvrđava", "kultura"]
            ),
            new Tour(
                "Šetnja starim jezgrom grada", 
                "Lagana tura kroz Zmaj Jovinu i Dunavsku ulicu. Obilazak Vladičanskog dvora, Saborne crkve i opuštanje u Dunavskom parku.", 
                2, 
                ["centar", "arhitektura", "šetnja"]
            ),
            new Tour(
                "Dunavski raj - Štrand i Ribarac", 
                "Rekreativna tura uz obalu Dunava. Poseta najlepšoj gradskoj plaži Štrand i ručak u čardama na Ribarskom ostrvu.", 
                6, 
                ["priroda", "reka", "gastronomija"]
            ),    ];
            localStorage.setItem("tours", JSON.stringify(tours));
        }
    createToursRows();
    handleFormSubmission();
}

function createToursRows() {
    let table = document.querySelector("#tours-body");
    table.innerHTML = "";
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
        <p>Opis: ${tour.description}</p>
        <p>Duzina: ${tour.length} km</p>
        <p>Oznake: ${tour.tags.join(", ")}</p>
    `;
    details.style.display = "block";

    // if (details.firstChild) { 
    //     details.firstChild.remove()
    // }
}

function handleFormSubmission(tour) {
    let submitbtn = document.querySelector("#submitBtn");
    submitbtn.addEventListener('click', function(){
        const form = document.querySelector(".form");
        const formData = new FormData(form);
        const name = formData.get("tour-name");
        const description = formData.get("tour-description");
        const length = formData.get("tour-length");
        let tagString = formData.get("tour-tags");

        if (name === "" || description === "" || length === "" || tagString === "") {
            alert("Molimo vas popunite sva polja pre dodavanja!");
            return;
        }
        let rawTags = tagString.split(",");
        let tags = [];
        for (let i=0; i < rawTags.length; i++) {
            let oneTag = rawTags[i];
            let cleanTag = oneTag.trim().toLowerCase();
            if (cleanTag.length > 0) {
                tags.push(cleanTag);
            }
        }

        for (let i=0; i < tours.length; i++) {
            if (tours[i].name === name) {
                alert("Tura sa ovim imenom već postoji!");
                return;
            }
        }

        let newTour = new Tour(name, description, length, tags);
        tours.push(newTour);
        localStorage.setItem("tours", JSON.stringify(tours));
        createToursRows();
        form.reset();
    
    });
}