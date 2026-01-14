class Restoran
{
    constructor(naziv,opis,kuhinja)
    {
        this.naziv = naziv
        this.opis = opis
        this.kuhinja = kuhinja
    }
}
let restorani = []

function createRestoranRows()
{
    let table = document.querySelector("#restorani-body")
    table.innerHTML = "";
    for(let i = 0; i < restorani.length; i++)
    {
        let tr = document.createElement("tr")

        let naziv = document.createElement("td")
        let opis = document.createElement("td")

        naziv.textContent = restorani[i].naziv
        opis.textContent = restorani[i].opis

        tr.appendChild(naziv)
        tr.appendChild(opis)
        tr.addEventListener('click', function(){
            displayRestoranDetails(restorani[i])
        })

        table.appendChild(tr)
    }

}
function displayRestoranDetails(restoran) {
    let detalji = document.querySelector("#restoranDetails");
    detalji.innerHTML = "";

    let table = document.createElement("table");

    let tbody = document.createElement("tbody");

    function addRow(label, value) {
        let tr = document.createElement("tr");

        let tdLabel = document.createElement("td");
        tdLabel.textContent = label;
        tdLabel.style.fontWeight = "bold";

        let tdValue = document.createElement("td");
        tdValue.textContent = value;

        tr.appendChild(tdLabel);
        tr.appendChild(tdValue);
        tbody.appendChild(tr);
    }

    addRow("Naziv", restoran.naziv);
    addRow("Opis", restoran.opis);
    addRow("Kuhinje", restoran.kuhinja.join(", "));

    table.appendChild(tbody);
    detalji.appendChild(table);
    detalji.style.display = "block";
}
function initializeRestorani()
{
    loadRestoraniFromStorage()
    if(restorani.length ===0)
    {   
        restorani = [
            new Restoran("Gondola", "Restoran u ulici Bulevar Mihajla Pupina 18, sluzi fuziju italijansko/srpske hrane",["italijanska","domaca"]),
            new Restoran("Dva stapica","Restoran u ulici Branka Bajica 9n, pretezno istocnjacka kuhinja",["kineska", "japanska", "korejska"]),
            new Restoran("Sarajevski cevap", "Restoran u ulici Njegoseva 4, sluzi najsocnije junece cevape sa kajmakom.", ["domaca"]),
        ]
        saveRestoraniToStorage();
    }   
    createRestoranRows(); 
}
document.addEventListener('DOMContentLoaded', initializeRestorani);

function saveRestoraniToStorage()
{
    localStorage.setItem("restorani",JSON.stringify(restorani))
}
function loadRestoraniFromStorage()
{
    const data = localStorage.getItem("restorani")
    if(data)
    {
        restorani = JSON.parse(data)
    }
}
