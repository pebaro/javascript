// get the puzzle for the hangman game 
const getPuzzle = (callback) => {
    
    const request = new XMLHttpRequest()

    request.addEventListener('readystatechange', (e) => {
        if (e.target.readyState === 4 && e.target.status === 200) {
            const data = JSON.parse(e.target.responseText)
            callback(undefined, data.puzzle)
        } else if (e.target.readyState === 4) {
           callback('Something went wrong with the puzzle', undefined)
        }
    })

    request.open('GET', 'http://puzzle.mead.io/puzzle?wordCount=4')
    request.send()
}

// get country information when info alpha code matches the one specified
const alpha2Code = 'GB'
const countryRequest = new XMLHttpRequest()
countryRequest.addEventListener('readystatechange', (e) => {
    if (e.target.readyState === 4 && e.target.status === 200) {
        const data = JSON.parse(e.target.responseText)
        const country = data.find((item) => item.alpha2Code === alpha2Code)
        console.log(country.name)
    } else if (e.target.readyState === 4) {
        console.log(`unable to fetch data`)
    }
})
countryRequest.open('GET', 'https://restcountries.eu/rest/v2/all')
countryRequest.send()


