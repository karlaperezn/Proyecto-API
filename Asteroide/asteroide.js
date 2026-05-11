const nasaKey = "IIYyn4oPoU1LOKO0qz0JDdgTaKSI0m1GfNeUysTk";

function getId(id) {
    return document.getElementById(id);
}

// Carga la semana actual al iniciar
document.addEventListener("DOMContentLoaded", () => {
    const today = new Date();
    const week = new Date();
    week.setDate(today.getDate() - 6);

    const format = (d) => d.toISOString().split("T")[0];

    getId("startDate").value = format(week);
    getId("endDate").value = format(today);

    asteroideInfo(format(week), format(today));
});

function buscarAsteroides() {
    const start = getId("startDate").value;
    const end = getId("endDate").value;
    if (!start || !end) return;
    asteroideInfo(start, end);
}

function asteroideInfo(date1, date2) {
    getId("asteroidList").innerHTML = "<p>Cargando...</p>";

    fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${date1}&end_date=${date2}&api_key=${nasaKey}`)
        .then(res => res.json())
        .then(data => {
            // Juntamos todos los asteroides de todos los días en un array
            const all = Object.values(data.near_earth_objects).flat();
            renderAsteroides(all);
        });
}

function renderAsteroides(asteroides) {
    const list = getId("asteroidList");
    list.innerHTML = "";

    getId("counter").innerText = `${asteroides.length} asteroides encontrados`;

    asteroides.forEach(a => {
        const diametro = a.estimated_diameter.kilometers;
        const distancia = a.close_approach_data[0].miss_distance.kilometers;
        const velocidad = a.close_approach_data[0].relative_velocity.kilometers_per_hour;
        const peligroso = a.is_potentially_hazardous_asteroid;

        const card = document.createElement("div");
        card.className = `card ${peligroso ? "dangerous" : ""}`;

        card.innerHTML = `
            <h3>${a.name}</h3>
            <p>📏 Diámetro estimado: ${Math.round(diametro.estimated_diameter_min * 100) / 100} – ${Math.round(diametro.estimated_diameter_max * 100) / 100} km</p>
            <p>🌍 Distancia a la Tierra: ${Math.round(distancia).toLocaleString()} km</p>
            <p>💨 Velocidad: ${Math.round(velocidad).toLocaleString()} km/h</p>
            <p>${peligroso ? "⚠️ Potencialmente peligroso" : "✅ No peligroso"}</p>
        `;

        list.appendChild(card);
    });
}