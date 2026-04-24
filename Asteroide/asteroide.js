function asteroideInfo(date1, date2) {
    const nasaKey = "IIYyn4oPoU1LOKO0qz0JDdgTaKSI0m1GfNeUysTk"
    fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${date1}&end_date=${date2}&api_key=${nasaKey}`).then(res => res.json()).then(data => {
    console.log(data)
})

}

asteroideInfo("2015-09-07", "2015-09-08")