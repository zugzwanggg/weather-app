import { useEffect, useRef, useState } from 'react'
import './App.scss'
import axios from 'axios';
import WeatherInfo from './components/weatherInfo';
import RightSection from './components/RightSection';


function App() {

  const [isLoading,setIsLoading] = useState(false)
  const [forecast,setForecast] = useState([])
  const [weatherDataCity,setWeatherDataCity] = useState([])
  const [currentWeather,setCurrentWeather] = useState([])
  const [cityName,setCityName] = useState('')
  const [incorrectCity, setIncorrectCity] = useState(false)
  const [coords,setCoords] = useState({
    lat: 0,lng: 0
  })
  const [hours,setHours] = useState({
    sunrise: '',sunset: '',civil_twilight_begin: 0,civil_twilight_end: 0
  })


  useEffect(()=>{
    setIsLoading(true)
    axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName.length > 1 ? cityName : 'Almaty'}&appid=d7257e9d9f7fbff716825152c1f57f42`)
    .then(res => 
    {
      setWeatherDataCity(
        res.data.city
      )
      setCurrentWeather(
        {...currentWeather, 
          temp: res.data.list[0].main.temp, 
          wind: res.data.list[0].wind.speed,
          humidity: res.data.list[0].main.humidity,
          icon: res.data.list[0].weather[0].icon,
          desc: res.data.list[0].weather[0].main,
          rain: res.data.list[0].rain ? res.data.list[0].rain['3h'] : 0
        }
      )
      setForecast(
        [
          {
            temp: res.data.list[7].main.temp, 
            wind: res.data.list[7].wind.speed,
            humidity: res.data.list[7].main.humidity,
            icon: res.data.list[7].weather[0].icon,
            desc: res.data.list[7].weather[0].main,
            date: res.data.list[7].dt
          },
          {
            temp: res.data.list[15].main.temp, 
            wind: res.data.list[15].wind.speed,
            humidity: res.data.list[15].main.humidity,
            icon: res.data.list[15].weather[0].icon,
            desc: res.data.list[15].weather[0].main,
            date: res.data.list[15].dt
          },
          {
            temp: res.data.list[23].main.temp, 
            wind: res.data.list[23].wind.speed,
            humidity: res.data.list[23].main.humidity,
            icon: res.data.list[23].weather[0].icon,
            desc: res.data.list[23].weather[0].main,
            date: res.data.list[23].dt
          },
          {
            temp: res.data.list[31].main.temp, 
            wind: res.data.list[31].wind.speed,
            humidity: res.data.list[31].main.humidity,
            icon: res.data.list[31].weather[0].icon,
            desc: res.data.list[31].weather[0].main,
            date: res.data.list[31].dt
          },
          {
            temp: res.data.list[39].main.temp, 
            wind: res.data.list[39].wind.speed,
            humidity: res.data.list[39].main.humidity,
            icon: res.data.list[39].weather[0].icon,
            desc: res.data.list[39].weather[0].main,
            date: res.data.list[39].dt
          }
        ]
      )
      setCoords({lng: res.data.city.coord.lng, lat: res.data.city.coord.lat})
    })
    .catch(()=>setIncorrectCity(true))
    .finally(()=>{
      setIsLoading(false)
    })

  axios.get(`https://api.sunrise-sunset.org/json?lat=${coords.lat}&lng=${coords.lng}`)
  .then(res => setHours(
    {
      sunrise: res.data.results.sunrise, 
      sunset: res.data.results.sunset,
      civil_twilight_begin: res.data.results.civil_twilight_begin,
      civil_twilight_end: res.data.results.civil_twilight_end,
    }
    ))

    
  }, [cityName])

  return (
    <>
      <div className='container'>
        {isLoading && <div className='loading'></div>}
        <div className='sections'>
          <WeatherInfo
            temp={currentWeather.temp}
            wind={currentWeather.wind}
            hum={currentWeather.humidity}
            rain={currentWeather.rain}
            desc={currentWeather.desc}
            forecast={forecast}
          />
          <RightSection 
            country={weatherDataCity.country}
            cityName={setCityName}
            city={weatherDataCity.name}
            incorrect={incorrectCity}
            correct={setIncorrectCity}
            sunrise={hours.sunrise}
            sunset={hours.sunset}
            golden_hour_begin={hours.civil_twilight_begin}
            golden_hour_end={hours.civil_twilight_end}
          />
        </div>
      </div>
    </>
  )
}

export default App
