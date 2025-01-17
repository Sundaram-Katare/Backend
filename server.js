const express = require("express");
const axios = require("axios");
const cors = require("cors");

require('dotenv').config();

const app = express();
const port = 5000;
app.use(cors());
const API_KEY = process.env.API_KEY;

const message = [{
    name: "London",
    description : "Clear Sky",
    temp: "21 C",
    wind: "4 km/h",
    humidity: "90%",
    clouds : 1,
}];

console.log(message);

app.get('/', (req, res) => {
    const address = req.query.address;
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${address}&units=metric&appid=${API_KEY}`;

    axios.get(url)
        .then(response => {
            const data = response.data;
            const cityName = data.name;
            const temperature = data.main.temp;
            const pressure = data.main.pressure;
            const wind = data.wind.speed;
            const description = data.weather[0].description;
            const clouds = data.clouds.all;
            const humidity = data.main.humidity;
            const feelsLike = data.main.feels_like;

            message[0].name = cityName;
            message[0].temp = `${temperature}°C`;
            message[0].wind = `${wind} km/h`;
            message[0].humidity = `${humidity} %`;
            message[0].description = `${description}`;
            message[0].clouds = `${clouds} `;
            message[0].pressure = `${pressure} mbar`;
            message[0].feelsLike = `${feelsLike} °C`;

            console.log(message);

            res.json(message);
        })
        .catch(error => {
            res.status(500).json({ error: "Error occurred while fetching weather data." });
        });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
