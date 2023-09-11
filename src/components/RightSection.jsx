import React, { useEffect, useState } from 'react'


export default function RightSection(props) {

  const [onSearch,setOnSearch] = useState(true)
  const [city,setCity]= useState('')




  function handleCityName(e) {
    e.preventDefault()
    if (onSearch) {
      setOnSearch(false)
      props.cityName(city)
    } else {
      props.cityName(city)
      setOnSearch(prev=>!prev)
      props.correct(false)
    }
  }

  return (
    <div className='right-section'>
      <div className="right-section__action">
      {onSearch 
      && 
      <div className="right-section__city">
        <img src="./img/location.png" alt="" />
        <p style={{fontSize: '2rem'}} className='city-name'>{props.city}, {props.country}</p>
      </div>
      }
      <form onSubmit={(e)=>handleCityName(e)} className="input-part">

        <button><img className='search-icon' src="./img/search.svg" alt="" /></button>
        <input className={!onSearch ? 'active' : undefined} onChange={(e)=>setCity(e.target.value)} type="text" />
        {props.incorrect 
        &&
        <small><img src="./img/error-sign.png" alt="" />Incorrect city name</small>
        }
      </form>
      </div>
      <ul className="right-section__hours">
        <li className='hours-item sunrise'>
          <h4>Sunrise</h4>
          <div className="hours-item__info">
          <img src="./img/clock.svg" alt="" />
            <div className="clock">
              <h2>{props.sunrise}</h2>
            </div>
          </div>
        </li>
        <li className='hours-item golden-hour'>
          <h4>Golden Hour</h4>
          <div className="hours-item__info">
          <img src="./img/clock.svg" alt="" />
          <div className="clock">
          <h2>{props.golden_hour_begin}</h2>
            <h2>{props.golden_hour_end}</h2>
          </div>
          </div>
        </li>
        <li className='hours-item sunset'>
          <h4>Sunset</h4>
          <div className="hours-item__info">
          <img src="./img/clock.svg" alt="" />
          <div className="clock">
              <h2>{props.sunset}</h2>
            </div>
          </div>
        </li>
      </ul>
    </div>
  )
}
