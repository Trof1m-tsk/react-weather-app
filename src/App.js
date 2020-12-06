import React from "react";
import Info from "./components/info"
import Form from "./components/form"
import Weather from "./components/weather"

const API_KEY = "1f5aaa6a54168c4ab4c9b098cfffd434";
const OK = 200;

class App extends React.Component {

  state = {
    city: undefined,
    temp: undefined,
    windSpeed: undefined,
    clouds: undefined,
    error: undefined
  }

  getWeather = async (evt) => {
    evt.preventDefault();
    const city = evt.target.elements.city.value;
    const urlData = await 
      fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
    const weatherData = await urlData.json();

    if (city && weatherData.cod === OK) {
      console.log(weatherData);
      const cloudness = weatherData.clouds.all < 20 ? "Clear" :
                        weatherData.clouds.all >= 70 ? "Cloudy" :
                        "Cloudy, clear at times";

      this.setState({
        city: weatherData.name,
        temp: weatherData.main.temp,
        windSpeed: weatherData.wind.speed,
        clouds: cloudness,
        error: undefined
      });
    } else if (city && weatherData.cod !== OK) {
      this.setState({
        city: undefined,
        temp: undefined,
        windSpeed: undefined,
        clouds: undefined,
        error: weatherData.message
      });
    } else {
      this.setState({
        city: undefined,
        temp: undefined,
        windSpeed: undefined,
        clouds: undefined,
        error: "Enter city name"
      });
    }
  }

  render() {
    return (
      <div className="wrapper">
        <div className="main">
          <div className="col-sm-5 info">
            <Info />
          </div>
          <div className="col-sm-7 form">
            <Form weatherMethod={this.getWeather} />
            <Weather 
              city={this.state.city}
              temp={this.state.temp}
              windSpeed={this.state.windSpeed}
              clouds={this.state.clouds}
              error={this.state.error}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
