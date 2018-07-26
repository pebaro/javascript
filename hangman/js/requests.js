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
const getPuzzleSync = () => {
    const request = new XMLHttpRequest()
    request.open('GET', 'http://puzzle.mead.io/puzzle?wordCount=4', false)
    request.send()

    if (request.readyState === 4 && request.status === 200) {
        const data = JSON.parse(request.responseText)
        return data.puzzle
    } else if (request.readyState === 4) {
        throw new Error(`Something went wrong - This puzzle won't work!`)
    }
}


// const alpha2Code = 'GB'
// const countryRequest = new XMLHttpRequest()
// countryRequest.addEventListener('readystatechange', (e) => {
//     if (e.target.readyState === 4 && e.target.status === 200) {
//         const data = JSON.parse(e.target.responseText)
//         const country = data.find((item) => item.alpha2Code === alpha2Code)
//         console.log(country.name)
//     } else if (e.target.readyState === 4) {
//         console.log(`unable to fetch data`)
//     }
// })
// countryRequest.open('GET', 'https://restcountries.eu/rest/v2/all')
// countryRequest.send()


 