const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoicndhZGVrYXIiLCJhIjoiY2thdXA5OWhsM2RzZTJzcDZobm44ZXF0OSJ9.PZS7RiT2qOc87wrvNWtT3Q'
    request({url, json : true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect location services!')
        } else if (body.features.length === 0) {
            callback('Unable to find location, please change the search term!')
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                place: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode