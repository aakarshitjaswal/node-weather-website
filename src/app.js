const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')
const express = require('express')
const path = require('path')
const hbs = require('hbs')

const app = express()
const publicDirectoryPath = path.join(__dirname,'../public' )
const viewDirectoryPath = path.join(__dirname,'../templates/views' )
const partialsPath = path.join(__dirname,'../templates/partials' )

app.use(express.static(publicDirectoryPath))
app.set('view engine', 'hbs')
app.set('views', viewDirectoryPath)
hbs.registerPartials(partialsPath)

app.get('', (req,res) => {
  res.render('index', {
    title: "Weather",
    name: "Aakarshit"
  })
})

app.get('/about', (req,res) => {
  res.render(('about'), {
    title: "About Me",
    name: "Aakarshit"
  })
})

app.get('/help', (req,res) => {
  res.render(('help'), {
    title: "Help",
    message: "This is a weather app that uses javascript",
    name: "Aakarshit",
  })
})

app.get('/weather', (req, res) => {

  if(!req.query.address) {
    res.send({
      error: "Please provide an address",
    })
  } else {
    geocode(req.query.address, (error, {lattitude, longitude, location} = {}) => {
      if (error) {
        return res.send({error})
      }
        forecast(lattitude, longitude, (error, forecastData) => {
          if (error) {
            return res.send({error})
          }
          console.log(forecastData)
          res.send({
            forecast: forecastData,
            location,
            address: req.query.address,
          })
        })

    })
  }
})

app.get('/help/*',(req, res) => {
  res.render(("errorTemplate"), {
    title: "Help",
    errorMessage: "The Help Page you are looking for does not exist",
    name: "Aakarshit"
  })
})

app.get('*',(req, res) => {
  res.render(("errorTemplate"), {
    title: "Error 404",
    errorMessage: "The page does not exist",
    name: "Aakarshit"
  })
})



app.listen(3000, () => {
  console.log('The server is up on port 3000.')
})
