// weatherapi key: 202edb0b15af4ea7bbf54437232101

import fetch from 'node-fetch'

export default async function getWeather(req, res){
    const {q} = req.query
    const request = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=202edb0b15af4ea7bbf54437232101&q=${q}&days=1`)
    const response = await request.json()
    res.json(response)
}