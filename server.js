"use strict";

const express=require('express');
const app=express();
const cors = require('cors');
const axios=require('axios');
app.use(cors());
require('dotenv').config();
const weatherInfo = require('./data/weather.json');
const PORT=process.env.PORT;

app.listen(PORT, ()=>{
    // console.log("Hello world");
})
let getWeather= async (req,res)=>{
    let lat = Number(req.query.lat);
    let lon = Number(req.query.lon);
    
    let apiUrl=`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`;
    let info = await axios.get(apiUrl);
    let weatherInfo = info.data
    let cleanedInfo = weatherInfo.data.map(item=>{
        return new ForeCast(item.datetime, item.weather.description);
    })
    res.status(200).json(cleanedInfo);
}

class ForeCast{
    constructor(date, description){
        this.date = date;
        this.description = description;
    }
}

app.get('/weather',getWeather)

app.get('/', (req, res) => {
    res.send('Home Route')
})



// app.get('/weather',(req,res)=>{
//     let lat=Number(req.query.lat);
//     let lon=Number(req.query.lon);
//     let searchQuery = req.query.display_name;
    
//     if (lat&&lon||searchQuery){
//         let cityValue=[];
//         weatherInfo.find(item=>{
//             if(item.lat===lat&&item.lon===lon || searchQuery===item.searchQuery){
//                 cityValue.push(item)
//             }
//         })
//         let city=cityValue[0];
//         if (cityValue.length>0){
//             let foreCast=city.data.map(item=>{
//                 return {
//                     date:item.datetime,
//                     description:item.weather.description
//                 }
//             })
//             res.status(200).json(foreCast);
//         }else{
//             res.status(404).send("Error: Your enter not math name of real city")
//         }

//     }else{
//         res.status(400).send("Error: Some of data came from you it's worng");
//     }

// })