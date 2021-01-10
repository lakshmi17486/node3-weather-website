const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const port = process.env.PORT || 3000;

const app = express();

//Define paths for express config
const publicDir = path.join(__dirname,'../public');
// renamed views to templates/views
const viewsPath = path.join(__dirname, '../templates/views');
// get the partials path
const partialsPath = path.join(__dirname, '../templates/partials');

app.use(express.static(publicDir));
app.set('view engine', 'hbs');
//set views to templates path
app.set('views', viewsPath);

hbs.registerPartials(partialsPath);

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Lakshmi'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Lakshmi'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Lakshmi'
    })

})
//app.com/weather
app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send( {
            error: 'Please provide an address'
        })
    }
    geocode(req.query.address, (error, {weather_descriptions, temperature, feelslike} = {}) => {
        if (error) {
            return res.send( {
                error: error
            })
        } else {
            res.send({
                forecast: `${weather_descriptions[0]}. It is currently ${temperature} degrees out. It feels like ${feelslike} out`,
                address: req.query.address,
                temperature: temperature,
                feelslike: feelslike
            })
        }
    });
});

// routes for 404 pages
app.get('/help/*', (req, res) => {
    res.render('error', {
        message: 'Help article not found',
        title: '404',
        name: 'Lakshmi'
    })
})
app.get('*', (req, res) => {
    res.render('error', {
        message: 'Page not found',
        title: '404',
        name: 'Lakshmi'
    })
})

app.listen(port, () => {
    console.log('Serve is up and running');
})

