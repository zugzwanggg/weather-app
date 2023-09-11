import React, { useEffect, useState } from 'react'
import Forecast from './Forecast'

export default function weatherInfo(props) {

  const [measureSystem, setMeasureSystem] = useState(false)
  const [currentDate,setCurrentDate] = useState(new Date())


  useEffect(()=>{
    setTimeout(() => setCurrentDate(new Date()), 60000)
  },[currentDate])

  
  let nthDt = ''
  if (currentDate.getDate() > 3 && currentDate.getDate() < 21);
    switch (currentDate.getDate() % 10) {
        case 1:  nthDt = "st";
        case 2:  nthDt = "nd";
        case 3:  nthDt = "rd";
        default: nthDt = "th";
    }


  let icon = ''
  if (props.desc == 'Clouds') {
    icon = './img/Clouds.svg'
  } else if (props.desc == 'Rain') {
    icon = './img/WeatherRain.svg'
  } else if (props.desc == 'Clear') {
    icon = './img/WeatherClear.svg'
  } else if (props.desc == 'Snow') {
    icon = './img/WeatherSnow.svg'
  }

  return (
    <div className='weather-info'>
      <img className='weather-icon' src={icon} alt={props.desc}/>
      <div className='weather-info__toggle'>
        <span style={{transform: `translateX(${measureSystem ? '0%' : '100%'})`}} className='active'></span>
        <button onClick={()=>setMeasureSystem(true)}>F</button>
        <button onClick={()=>setMeasureSystem(false)}>C</button>
      </div>
      {measureSystem 
      ? 
      <h1>{(props.temp*1.8-459.67).toFixed(0)}°F</h1>
      :
      <h1>{(props.temp-273.15).toFixed(0)}°C</h1>
      }
      <div className='date'>
        <p>{currentDate.getDate()+nthDt} {currentDate.toLocaleString('en-US',{month: 'short'})} '{currentDate.toLocaleString('en-US',{year: '2-digit'})}</p>
        <small>{currentDate.toLocaleString('en-US',{weekday: 'long'})} <hr/> {currentDate.toLocaleString('en-US',{hour: 'numeric', minute: 'numeric'})}</small>
      </div>
      <ul className="weather-info__list">
        <li className="list-items">
          <img src="./img/wind-direction-icon.svg" alt="wind" />
          <p>Wind: {props.wind}km/h</p>
        </li>
        <hr />
        <li className="list-items">
          <img src="./img/hum.svg" alt="humidity" />
          <p>Hum: {props.hum}%</p>
        </li>
        <hr />
        <li className="list-items">
          <img src="./img/rain.svg" alt="rain" />
          <p>Rain: {props.rain}%</p>
        </li>
      </ul>
      <ul className='forecast-info'>
        {props.forecast.map(obj=> <Forecast 
                                  key={obj.temp}
                                  obj={obj.temp} 
                                  measurement={measureSystem} 
                                  temp={obj.temp} 
                                  desc={obj.desc}
                                  date={obj.date}
        />)}
      </ul>
    </div>
  )
}
