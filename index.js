function getId(id) {
    return document.getElementById(id);
}

const nasaKey = "IIYyn4oPoU1LOKO0qz0JDdgTaKSI0m1GfNeUysTk";

// ── Hero ──
function todayDate() {
    const hoy = new Date();
    const year = hoy.getFullYear();
    const month = String(hoy.getMonth() + 1).padStart(2, '0');
    const day = String(hoy.getDate()).padStart(2, '0');
    astronomyImg(`${year}-${month}-${day}`, "hero");
}

function inputDate() {
    const year = getId("year").value;
    const month = getId("month").value;
    const day = getId("day").value;
    astronomyImg(`${year}-${month}-${day}`, "hero");
}

function astronomyImg(date, id, attempt = 0) {
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${nasaKey}&date=${date}`)
        .then(res => res.json())
        .then(data => {
            if (data.code || data.media_type !== "image") {
                if (attempt < 5) astronomyImg(getPreviousDay(date), id, attempt + 1);
                return;
            }
            getId(id).style.backgroundImage = `url(${data.url})`;
            getId("titleImg").innerText = data.title;
            getId("description").innerHTML = `<p>${data.explanation}</p>`;
        });
}

function getPreviousDay(dateStr) {
    const date = new Date(dateStr);
    date.setDate(date.getDate() - 1);
    return date.toISOString().split("T")[0];
}

// ── Galería ──
function getLast7Days() {
    const today = new Date();
    const past = new Date();
    past.setDate(today.getDate() - 6);
    today.setDate(today.getDate() - 1);
    const format = (d) => d.toISOString().split("T")[0];
    return { start: format(past), end: format(today) };
}

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
        card.querySelector("img").addEventListener("click", () => openPopup(item));
        gallery.appendChild(card);
    });
}

// ── Popup ──
function openPopup(item) {
    getId("popupImg").src = item.url;
    getId("popupImg").alt = item.title;
    getId("popupTitle").innerText = item.title;
    getId("popupDate").innerText = item.date;
    getId("popup").classList.add("active");
    document.body.style.overflow = "hidden";
}

function closePopup() {
    getId("popup").classList.remove("active");
    document.body.style.overflow = "";
}

// ── Init — espera a que el DOM esté listo ──
document.addEventListener("DOMContentLoaded", () => {
    todayDate();

    const { start, end } = getLast7Days();
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${nasaKey}&start_date=${start}&end_date=${end}`)
        .then(res => res.json())
        .then(data => renderGallery(data));

    getId("popupClose").addEventListener("click", closePopup);
    getId("popup").addEventListener("click", (e) => {
        if (e.target === getId("popup")) closePopup();
    });
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closePopup();
    });
});