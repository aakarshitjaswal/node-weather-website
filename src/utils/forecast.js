const request = require('request')

const forecast = (lattitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=2f73283b6f9efbf95acbbf2390068038&query=${longitude},${lattitude}&units=m`

  request({url, json: true},(error, response) => {
    const {body} = response
    if (error) {
      callback('unable to connect to weather service!')
    } else if (body.error){
      callback(body.error.info)
    } else {
      callback(undefined, `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike}`)
    }
  })
}

module.exports = forecast
