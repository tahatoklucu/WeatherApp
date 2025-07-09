import React, { useEffect, useState } from 'react'
import SettingsIcon from '@mui/icons-material/Settings';
import axios from 'axios';
import Rainy from '../assets/Rainy.png';
import Sunny from '../assets/Sunny.png';
import Cloudy from '../assets/Cloudy.png';
import Mist from '../assets/mist.png';
import PartlyClody from '../assets/PartlyCloudy.png';
import Thunder from '../assets/Thunderstorm.png';

function Main() {
    const [weather, setWeather] = useState([]);
    const [location, setLocation] = useState('London');
    const [error, setError] = useState(null);
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
    const [weatherImage, setWeatherImage] = useState('');

    const getWeatherImage = (condition) => {
      if (!condition) return Default;
        
        const normalizedCondition = condition.toLowerCase();
        switch(normalizedCondition) {
            case 'sunny':
            case 'clear':
                return Sunny;
            case 'rain':
            case 'drizzle':
            case 'rainy':
            case 'patchy rain nearby':
                return Rainy;
            case 'cloudy':
            case 'overcast':
                return Cloudy;
            case 'partly cloudy':
                return PartlyClody;
            case 'mist':
            case 'fog':
                return Mist;
            case 'thunder':
            case 'thundery outbreaks in nearby':
                return Thunder;
            default:
                return Default;
        }
    };

    useEffect(() => {
      const fetchWeather = async () => {
        try {
          const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=6b7f05213ac44dc49e3235528250807&q=${location}&aqi=no`);
          console.log(response.data);
          setWeather(response.data);
          const condition = response.data.current?.condition?.text;
          setWeatherImage(getWeatherImage(condition));
        } catch (error) {
          console.error("API ERROR", error);
          setWeatherImage(Default);
        }
      };
      fetchWeather();
    },[location, apiKey])
  return (
    <>
    <div className='container p-5 w-full justify-center mx-auto'>
        <div className='text-center justify-center flex rounded-lg border-1 border-[#749BC2] inset-shadow-sm w-full p-5 shadow-md'>
            <label className='text-left justify-left m-2 text-[#dee0ea] text-xl h-auto md:h-5vh drop-shadow-lg'>Weather App</label>
            <input type='text' onChange={(e) => setLocation(e.target.value)} placeholder='Enter a city' className='w-310 mx-auto bg-[#dee0ea] p-2 rounded-md shadow-lg' />
            <SettingsIcon className='text-white m-2 cursor-pointer mr-5 md:h-5px' />
        </div>
        <div>
            {weather && weather.location ? (
              <div className='p-10 border-1 mt-10 border-[#749BC2] rounded-lg inset-shadow-sm shadow-md'>
                  <div className='flex relative'>
                    <img src={weatherImage} className='w-80 h-80 text-center' />
                    <div className='border-l-1 border-[#dee0ea] ml-10 drop-shadow-xs'>
                      <h4 className='text-white text-shadow-lg text-2xl ml-10 uppercase drop-shadow'>5 day weather forecast:</h4>
                    </div>
                  </div>
                  <div className='p-2 text-2xl'>
                    <h2 className='text-white text-shadow-lg text-6xl mb-5 mt-5 drop-shadow-lg'>{weather.location.name}, {weather.location.country}</h2>
                    <p className='text-white text-shadow-lg text-3xl drop-shadow-lg'>Temperature: {weather.current.temp_c}°C</p>
                    <p className='text-white text-shadow-lg text-3xl mt-4 drop-shadow-lg'>Condition: {weather.current.condition.text}</p>
                  </div>
              </div>
            ):
              <p>Data loading or not found.</p>
            }
        </div>
    </div>
    </>
  )
}

export default Main