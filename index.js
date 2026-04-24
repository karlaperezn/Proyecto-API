function date() {
    let year = getId("year").value;
    let month = getId("month").value
    let day = getId("day").value

    let date = `${year}-${month}-${day}`;

    astronomyImg(date)
}


function astronomyImg(date) {
    

    const nasaKey = "IIYyn4oPoU1LOKO0qz0JDdgTaKSI0m1GfNeUysTk"
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${nasaKey}&date=${date}`).then(res => res.json()).then(data => {
    console.log(data)
})
}

astronomyImg("2015-10-08")

function getId(id) {
            return document.getElementById(id)
        }
