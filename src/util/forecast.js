const request = require('request')

const forecast = (latitude, longitude, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=ec882d464935cde6d01de02e98cf507d&query='+encodeURIComponent(latitude)+','+encodeURIComponent(longitude)

    request({url, json:true},(error, {body})=>{
        if(error){
            callback('Unable to connect, check network connections!', undefined)
        }else if(body.error){
            callback('Unable to get the forecast, check the location cordinates and try again.')
        }else{
            callback(undefined,body.current.weather_descriptions[0]+'. Current temparateure for given cordinates is '+body.current.temperature+' degrees with '+body.current.feelslike+'% probability of rain.')
        }
    })
}

module.exports = forecast