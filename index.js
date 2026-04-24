function inputDate() {
    let year = getId("year").value;
    let month = getId("month").value;
    let day = getId("day").value;

    let date = `${year}-${month}-${day}`;

    astronomyImg(date, "hero")
}

function todayDate() {
    const hoy = new Date();

    let year = hoy.getFullYear();
    let month = String(hoy.getMonth() + 1).padStart(2, '0');
    let day = String(hoy.getDate()).padStart(2, '0');


    let date = `${year}-${month}-${day}`;

    astronomyImg(date, "hero")
}

function astronomyImg(date, id) {

    const nasaKey = "IIYyn4oPoU1LOKO0qz0JDdgTaKSI0m1GfNeUysTk"
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${nasaKey}&date=${date}`).then(res => res.json()).then(data => {
        getId(id).style.backgroundImage = `url(${data.url})`;
        getId("titleImg").innerText = data.title;


})
}

todayDate ()

function getId(id) {
            return document.getElementById(id)
        }
