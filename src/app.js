const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const weather = require('./utils/weather')

const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Set up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Set up static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: "Home Page",
        author: "Rahul"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Page",
        author: "Rahul"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help Page",
        message: "let us know if you need some help...",
        author: "Rahul"
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error : 'Please provide the address'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, place} = {}) => {
        if (error) {
            return res.send({ error })
        }
        weather(latitude, longitude, (error, response) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                place : place,
                forecastData : response,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage : 'Help article not found!',
        author: 'Rahul',
        title: '404 Page'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage : 'Page not found',
        author: 'Rahul',
        title: '404 Page'
    })
})

app.listen(port, () => {
    console.log('Server is running on port ' + port)
})