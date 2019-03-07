const express = require('express');
const hbs = require('hbs');
const fs = require('fs')

const app = express();

hbs.registerPartials(__dirname + '/views/partials')
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
})
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
})
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
  let now = new Date().toString();
  let log = `${now}: ${req.method} ${req.url}`
  
  console.log(log);
  fs.appendFile('app.log', `${log} \n`, (err) => {
    if (err) {
      console.log('could not append to app.log');
    }
  });
  next();
})

app.use((req, res, next) => {
  res.render('maintenance.hbs');
})

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Welome page',
    tag: 'Welkomen',
  })
})

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About page',
  })
})

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'bad request'
  })
})

app.listen(5000, () => console.log('app started on port 5000'));