import React, { useEffect, useState } from 'react'
import SettingsIcon from '@mui/icons-material/Settings';
import axios from 'axios';
import Rainy from '../assets/Rainy.png';
import Sunny from '../assets/Sunny.png';
import Cloudy from '../assets/Cloudy.png';
import Mist from '../assets/mist.png';
import PartlyCloudy from '../assets/PartlyCloudy.png';
import Thunder from '../assets/Thunderstorm.png';
import debounce from 'lodash.debounce';

function Main() {
    const [weather, setWeather] = useState([]);
    const [forecast, setForecast] = useState([]);
    const [location, setLocation] = useState('London');
    const [error, setError] = useState(null);
    const [weatherImage, setWeatherImage] = useState('');
    const [airQuality, setAirQuality] = useState(null);

    const getWeatherImage = (condition) => {
        const normalizedCondition = condition.toLowerCase();
        switch(normalizedCondition) {
            case 'sunny':
            case 'clear':
                return Sunny;
            case 'rain':
            case 'drizzle':
            case 'rainy':
            case 'patchy rain nearby':
            case 'patchy light rain':
            case 'light rain shower':
            case 'light drizzle':
            case 'light rain':
            case 'moderate rain':
            case 'heavy rain':
                return Rainy;
            case 'cloudy':
            case 'overcast':
                return Cloudy;
            case 'partly cloudy':
            case 'partly':
                return PartlyCloudy;
            case 'mist':
            case 'fog':
                return Mist;
            case 'thunder':
            case 'thundery outbreaks in nearby':
            case 'moderate or heavy rain with thunder':
                return Thunder;
            default:
                return PartlyCloudy;
        }
    };

    const searchLocation = debounce((query) => {
      if (query.length >= 2) {
          setLocation(query);
      }
    }, 500);

    useEffect(() => {
      const fetchWeather = async () => {
        if (!location || location.length < 2) return;

        try {
          const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=6b7f05213ac44dc49e3235528250807&q=${location}&aqi=yes`);
          setWeather(response.data);
          setAirQuality(response.data.current.air_quality);

          const condition = response.data.current?.condition?.text;
          setWeatherImage(getWeatherImage(condition));

          const futureResponse = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=6b7f05213ac44dc49e3235528250807&q=${location}&days=3&aqi=no`);
          setForecast(futureResponse.data.forecast.forecastday);
          console.log(futureResponse.data.forecast.forecastday);

        } catch (error) {
          console.error("API ERROR", error);
          setWeatherImage(Default);
        }
      };
      fetchWeather();
    },[location])

  return (
    <div className='min-h-screen bg-cover bg-no-repeat bg-center bg-fixed font-[Open_Sans] max-sm:h-100vh background'>
      <div className='container p-5 w-402 justify-center mx-auto max-sm:w-auto'>
          <div className='text-center justify-center flex rounded-lg border-1 border-gray-600/90 inset-shadow-sm w-full p-5 shadow-md'>
              <label className='text-left justify-left m-3 text-[#dee0ea] text-xl h-auto md:h-5vh drop-shadow-lg max-sm:hidden'>Weather App</label>
              <input type='text' onChange={(e) => searchLocation(e.target.value)} placeholder='Enter a city' className='w-310 mx-auto bg-transparent p-0 rounded-md shadow-lgw-full py-3 pl-12 pr-4 text-white bg-gray-800/30 backdrop-blur-md border border-gray-600/50 rounded-xl shadow-lg focus:outline-none focus:ring-1 focus:ring-blue-400/50 focus:border-blue-400/30 transition-all duration-200 placeholder-gray-300' />
              <SettingsIcon className='text-white m-3 cursor-pointer mr-5 md:h-5px max-sm:ml-7' />
          </div>
          <div>
              {weather && weather.location ? (
                <div className='p-10 border-1 mt-10 border-gray-600/90 shadow-lg bg-gray-800/10 rounded-lg inset-shadow-sm shadow-md'>
                    <div className='flex relative max-sm:flex max-sm:justify-center'>
                      <img src={weatherImage} className='w-80 h-80 text-center max-sm:w-40 max-sm:h-40' />
                      <div className='border-l-1 border-gray-600/90 ml-10 drop-shadow-xs max-sm:border-none max-sm:hidden'>
                        <h4 className='text-white text-shadow-lg text-2xl ml-10 uppercase drop-shadow max-sm:ml-0'>3 day weather forecast:</h4>
                        <div className='ml-10 grid grid-cols-1 sm:grid-cols-3 max-sm:grid-cols-3 max-md:grid-cols-5 mt-10 gap-20 max-sm:ml-0'>
                          {forecast && forecast.map((day, index) => (
                            <div key={index} className='border-1 border-gray-400/30 p-3 rounded-lg shadow drop-shadow-xl text-center drop-shadow-lg w-50'>
                              <p className='font-semibold text-white drop-shadow-lg'>
                                {new Date(day.date).toLocaleDateString('en-US', {weekday: 'short'})}
                              </p>
                              <img src={getWeatherImage(day.day.condition.text)} />
                              <p className='text-sm mt-1 text-white capitalize drop-shadow-lg'>
                                {day.day.condition.text.toLowerCase()}
                              </p>
                              <p className='text-sm mt-1 text-white drop-shadow-lg'>
                                {day.day.mintemp_c}°C / {day.day.maxtemp_c}°C 
                              </p>
                            </div>
                          ))}   
                        </div>
                        </div>
                    </div>
                    <div className='p-2 text-xl'>
                      <h2 className='text-white text-shadow-lg text-6xl mb-5 mt-5 drop-shadow-lg max-sm:text-[30px]'>{weather.location.name}, {weather.location.country}</h2>
                      <p className='text-white text-shadow-lg text-2xl drop-shadow-lg max-sm:text-[18px]'>Temperature: {weather.current.temp_c}°C</p>
                      <p className='text-white text-shadow-lg text-2xl mt-4 drop-shadow-lg max-sm:text-[18px]'>Condition: {weather.current.condition.text}</p>
                      {airQuality && (
                          <div className="mt-6 bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                            <h4 className="text-white text-md mb-2 max-sm:text-[18px]">Air Quality</h4>
                            <div className="grid grid-cols-2 gap-4 text-white">
                              <div>
                                <p className='max-sm:text-[18px]'>PM2.5: <span className='max-sm:text-[18px]'>{airQuality.pm2_5.toFixed(1)} µg/m³</span></p>
                                <p className='max-sm:text-[18px]'>CO: <span className='max-sm:text-[18px]'>{airQuality.co.toFixed(1)} ppm</span></p>
                              </div>
                              <div>
                                <p className='max-sm:text-[18px]'>O₃: <span className='max-sm:text-[18px]'>{airQuality.o3.toFixed(1)} µg/m³</span></p>
                                <p className='max-sm:text-[18px]'>NO₂: <span className='max-sm:text-[18px]'>{airQuality.no2.toFixed(1)} µg/m³</span></p>
                              </div>
                          </div>
                            <p className="text-white mt-2 text-sm max-sm:text-[18px]">
                              {airQuality["us-epa-index"] === 1 ? "Good 🌱" : 
                              airQuality["us-epa-index"] === 2 ? "Moderate 🌼" : 
                              "Unhealthy 🏭"}
                            </p>
                        </div>
                      )}
                    </div>
                </div>
              ):
              <div className='p-10 border-1 mt-10 border-gray-600/90 shadow-lg bg-gray-800/10 rounded-lg inset-shadow-sm shadow-md'>
                <p className='text-white text-center text-2xl p-20'>Data loading or not found.</p>
              </div>
              }
          </div>
      </div>
    </div>
  )
}

export default Main