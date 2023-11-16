const request = require('request')

const geoCode = (address, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=ec882d464935cde6d01de02e98cf507d&query='+encodeURIComponent(address)
    request({url, json: true}, (error, {body})=>{
        if(error){
            callback('Unable to connect, check network connections!',undefined)
        }else if(body.error){
            callback('Unable to find location, Try another search',undefined)
        }else{
            callback(undefined,{
                latitude: body.location.lat,
                longitude: body.location.lon,
                location: body.location.name+ ', '+body.location.region+', '+body.location.country
            })
        }
    })
}

module.exports = geoCode