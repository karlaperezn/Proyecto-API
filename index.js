const { start, end } = getLast7Days();
const nasaKey = "IIYyn4oPoU1LOKO0qz0JDdgTaKSI0m1GfNeUysTk"

//Fecha puesta por usuario
function inputDate() {
    let year = getId("year").value;
    let month = getId("month").value;
    let day = getId("day").value;

    let date = `${year}-${month}-${day}`;

    astronomyImg(date, "hero")
}

//Fecha de hoy
function todayDate() {
    const hoy = new Date();

    let year = hoy.getFullYear();
    let month = String(hoy.getMonth() + 1).padStart(2, '0');
    let day = String(hoy.getDate()).padStart(2, '0');


    let date = `${year}-${month}-${day}`;

    astronomyImg(date, "hero")
}

//Hero
function astronomyImg(date, id) {
    const nasaKey = "IIYyn4oPoU1LOKO0qz0JDdgTaKSI0m1GfNeUysTk"
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${nasaKey}&date=${date}`).then(res => res.json()).then(data => {
        getId(id).style.backgroundImage = `url(${data.url})`;
        getId("titleImg").innerText = data.title;
        getId("description").innerHTML = `<p>${data.explanation}</p>`


    })
}

todayDate()

//Seccion Galeria ultimas 5 imagenes
function getLast7Days() {
    const today = new Date();
    const past = new Date();

    past.setDate(today.getDate() - 6);
    today.setDate(today.getDate() - 1);

    const format = (date) => date.toISOString().split("T")[0];

    return {
        start: format(past),
        end: format(today)
    };
}

fetch(`https://api.nasa.gov/planetary/apod?api_key=${nasaKey}&start_date=${start}&end_date=${end}`)
    .then(res => res.json())
    .then(data => {
        renderGallery(data);
    });

function renderGallery(data) {
    const gallery = getId("gallery");

    gallery.innerHTML = "";

    data.reverse().forEach(item => {
        if (item.media_type !== "image") return;

        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
      <img src="${item.url}" alt="${item.title}" />
      <p>${item.date}</p>
    `;

        gallery.appendChild(card);
    });
}

//Get ID
function getId(id) {
    return document.getElementById(id)
}
