// weatherapi key: 202edb0b15af4ea7bbf54437232101

import fetch from 'node-fetch'

export default async function searchLocation(req, res){
    const {q} = req.query
    const request = await fetch(`http://api.weatherapi.com/v1/search.json?key=202edb0b15af4ea7bbf54437232101&q=${q}`)
    const response = await request.json()
    res.json(response)
}