import React, { useEffect, useState } from 'react'


export default function Forecast(props) {



  const [dates,setDates] = useState(new Date(props.date*1000))





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
    <div className='forecast-container'>
      {props.measurement
      ? 
      <p>{(props.temp*1.8-459.67).toFixed(0)}°F</p>
      :
      <p>{(props.temp-273.15).toFixed(0)}°C</p>
     }
      <img src={icon} alt={props.desc} />
      <p>{dates.toLocaleString('en-US',{weekday: 'short'})}</p>
    </div>
  )
}