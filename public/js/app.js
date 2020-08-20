console.log('Client side script loaded...')

const formSelector = document.querySelector('form')
const inputSelector = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

formSelector.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = inputSelector.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.place
                messageTwo.textContent = data.forecastData
            }
        })
    })
})