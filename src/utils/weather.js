const request = require('request')

const weather = (latitude, longitude, callback) => {
    const query = latitude + ',' + longitude
    const url = 'http://api.weatherstack.com/current?access_key=c67b92e3ddd39ece9c87224ddb9638f4&query=' + query;
    request({ url, json : true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect weather services!')
        } else if (body.error) {
            callback('Unable to find location, please change the search term!')
        } else {
            callback(undefined, 'It is currently ' + body.current.temperature + ' degrees, but feels like ' + body.current.feelslike + ' degrees')
        }
    })
}

module.exports = weather