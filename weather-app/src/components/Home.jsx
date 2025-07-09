import React, { useEffect, useState } from 'react'
import SettingsIcon from '@mui/icons-material/Settings';
import axios from 'axios';
import Rainy from '../assets/Rainy.png';

function Main() {
    const [weather, setWeather] = useState([]);
    const [location, setLocation] = useState('London');
    const [error, setError] = useState(null);
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
    const [weatherImage, setWeatherImage] = useState('');

    useEffect(() => {
      const fetchWeather = async () => {
        try {
          const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=6b7f05213ac44dc49e3235528250807&q=${location}&aqi=no`);
          console.log(response.data);
          setWeather(response.data);
        } catch (error) {
          console.error("API ERROR", error);
        }
      };
      fetchWeather();
    },[location, apiKey])
  return (
    <>
    <div className='container p-5 w-full justify-center mx-auto'>
        <div className='text-center justify-center flex rounded-lg border-1 border-[#749BC2] inset-shadow-sm w-full p-5 shadow-md'>
            <label className='text-left justify-left p-2 text-[#dee0ea] text-xl h-auto md:h-5vh'>Weather App</label>
            <input type='text' onChange={(e) => setLocation(e.target.value)} placeholder='Select country or city' className='w-310 mx-auto bg-[#dee0ea] p-2 rounded-md shadow-lg' />
            <SettingsIcon className='text-white m-2 cursor-pointer mr-5 md:h-5px' />
        </div>
        <div className='left-side'>
            {weather && weather.location ? (
              <div className='p-10 border-1 mt-10 border-[#749BC2] rounded-lg inset-shadow-sm shadow-md'>
                  <img src={Rainy} className='w-75 h-75 text-center'></img>
                  <div className='p-2 text-2xl'>
                    <h2 className='text-white'>{weather.location.name}, {weather.location.country}</h2>
                    <p className='text-white'>Temperature: {weather.current.temp_c}°C</p>
                    <p className='text-white'>Condition: {weather.current.condition.text}</p>
                  </div>
              </div>
            ):
              <p>Veri yükleniyor veya bulunamadı.</p>
            }
        </div>
    </div>
    </>
  )
}

export default Main