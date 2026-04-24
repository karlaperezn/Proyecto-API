function astronomyImg() {
    const nasaKey = "IIYyn4oPoU1LOKO0qz0JDdgTaKSI0m1GfNeUysTk"
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${nasaKey}`).then(res => res.json()).then(data => {
    console.log(data)
})
}