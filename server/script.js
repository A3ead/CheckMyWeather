// weatherapi key: 202edb0b15af4ea7bbf54437232101

const axios = require('axios').default
let express = require('express')
let app = express()
let cors = require('cors')
let fs = require('fs')

app.use(cors())
app.use(express.json())

app.get('/daily',(req,res)=>{
    console.log('get request received in server')
    axios.get(`http://api.weatherapi.com/v1/forecast.json?key=202edb0b15af4ea7bbf54437232101&q=auto:ip&days=1`)
    .then(response=>{
        console.log(response.data)
        res.json(response.data)
    })
})

app.get('/ip',(req,res)=>{
    const userIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
    console.log(userIP)
    console.log('get request received in server')
    axios.get(`http://api.weatherapi.com/v1/forecast.json?key=202edb0b15af4ea7bbf54437232101&q=auto:ip&days=7`)
    .then(response=>{
        //console.log(response.data)
        res.json(response.data)
    })
})


app.listen(3000,()=>
{
    console.log('listening')
})