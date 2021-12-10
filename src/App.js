import React, { useState } from 'react';
import { Months, Days } from './arrays';

const api = {
  key: "304d7576c1a04df278377d9106ceb42f",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(false);

  const search = evt => {
    if (evt.key === "Enter") {
      setLoading(true);
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setLoading(false);
          setWeather(result);
          console.log(result);
        });
    }
  }

  
  const dateBuilder = (d) => {
    const day = Days[d.getDay()];
    const date = d.getDate();
    const month = Months[d.getMonth()];
    const year = d.getFullYear();
    return `${day} ${date} ${month} ${year}`
  }


  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
      <main>

        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        
        {(!loading) ? ( (typeof weather.main != "undefined") ?
          (
            <div>
              <div className="location-box">
                <div className="location">{weather.name}, {weather.sys.country}</div>
                <div className="date">{dateBuilder(new Date())}</div>
              </div>
              <div className="weather-box">
                <div className="temp">
                  {Math.round(weather.main.temp)}°c
                </div>
                <div className="weather">{weather.weather[0].main}</div>
              </div>
            </div> 
          )
          :
          (<h2 className="notice">
            
            {(typeof weather.message != "undefined") ? (weather.message+`: ${query}`) : ('Find the weather of some place!')}
            
            </h2>)) 
          :
           (<h2 className="notice">Loading data weather...</h2>)
        }
      </main>
    </div>
  );
} 

export default App;
