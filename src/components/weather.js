import React from "react";

const Weather = props => (
  <div>
    { props.city &&
      <div className="weather">
        <p>The weather in {props.city}:</p>
        <p>Temperature: {props.temp} &deg;C</p>
        <p>Speed of wind: {props.windSpeed} m/s</p>
        <p>{props.clouds}</p>
      </div>
    }
    <p className="error">{ props.error }</p>
  </div>
);

export default Weather;
