const path = require('path');
const express = require('express');
const hbs = require('hbs');

require('dotenv').config();

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

const dirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
const name = 'Chris Juckes';

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(dirPath));

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name,
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name,
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name,
    message: 'This is the help page.',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You need to provide an address',
    });
  }
    
  geocode(req.query.address, (error, { latitude, longitudeL, location } = {}) => {
    if (error) {
      return res.send({ error });
    }
  
    forecast(latitude, longitudeL, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }

      res.send({
        location,
        forecastData
      });
    });
  });
});

app.get('/products', (req, res) => {
  res.send({
    products: [],
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    message: 'Help file not found.',
    name,
  })
})

app.get('/*', (req, res) => {
  res.render('404', {
    title: '404',
    message: 'Page not found.',
    name,
  });
});

app.listen(port, () => {
  console.log('Server is up on port 3000');
});
