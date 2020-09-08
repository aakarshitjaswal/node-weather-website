const request = require('request')

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?proximity=-74.70850,40.78375&access_token=pk.eyJ1IjoiYWFrYXJzaGl0amFzd2FsIiwiYSI6ImNrZWJhcHM1ZTA3MWkycW1rcWt1NHE2dDcifQ.wSk69AUJaWNFbw8Vx0YydQ&limit=1`

  request({url, json: true}, (error, response) => {
    const {body} = response
    if (error) {
      callback('Unable to connect to location services', undefined)
    } else if(body.features.length === 0) {
      callback('Please provide a valid location', undefined)
    } else {
      callback(undefined , {
        lattitude: body.features[0].center[0],
        longitude: body.features[0].center[1],
        location: body.features[0].place_name,
      })
    }
  })

}

module.exports = geocode
