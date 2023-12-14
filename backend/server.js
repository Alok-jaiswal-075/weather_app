const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors')

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.post('/getWeather', async (req, res) => {
  try {
    const { cities } = req.body;
    const weatherData = {};

    for (const city of cities) {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=40eae1b8a86646fb70029a8371f0218c`;
      const response = await fetch(url);
      const data = await response.json();

      if(data.cod === '404') weatherData[city] = 'No Data Found!'

      else weatherData[city] = `${data.main.temp}°C`;
    }

    res.json({ weather: weatherData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
