import  FetchRainLogo2 from './assets/FetchRainLogo2.png'; 
import { getData } from './WeatherService';
import { useEffect, useState } from 'react';
import './App.css';




function App() {
const [userInput, setUserInput] = useState(''); //user input for city name
const [sCity, setCity]  = useState(userInput); //sCity = userInput for API call
const [weatherData, setWeatherData] = useState([]); //store weather data from API
const [error, setError] = useState(null); //tracks and display error message

const fetchData = async(cityName) => {
  try {
    const data = await getData(cityName); //retrieve data from API
    setCity(cityName); //set city name for API call
    setWeatherData(data); 
    console.log(data);
  }  catch (error) {
  console.error(error.message); 
  setError('Weather data delay at this time. Please try again later');
}
  }

useEffect ( () => {

fetchData(sCity); // city = userInput 
}, [sCity]);  


return (
  <div className ="App">
    <header className = "App-header">
      <img src={FetchRainLogo2} alt='FetchRain Logo' />
      <div className="App-Instructions">
        <p>Step One: Input your City into the textbox.</p>
        <p>Step Two: Click FetchRain Button to retrieve WeatherData.</p>
      </div>
      <label htmlFor = "city-name">
        <input id = "city-name" name = "cityName" value = {userInput} onChange = {(e) => setUserInput(e.target.value)} />
      </label>
    {/* Display Weather data once button is clicked*/}
      <button onClick = {() => {fetchData(userInput)}}>FetchRain</button>


{/*Display Error Messages*/}
      {error && <p>{error}</p>}
      {weatherData && (
    <div>
      <h3>City: {weatherData?.name}</h3>
      <p>Temperature: {weatherData?.main?.temp} °C</p>
      <p>feeling more like... {weatherData?.main?.feels_like} °C outside</p> 
      <p>your hair will be affected by...{weatherData?.main?.humidity}% humidity levels</p>
    </div> 
      )
}
</header>
</div>

);

}

export default App;