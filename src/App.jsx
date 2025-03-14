import  FetchRainLogo2 from './assets/FetchRainLogo2.png'; 
import { getData } from './WeatherService';
import { useEffect, useState } from 'react';
import './App.css';



function App() {
const [userInput, setUserInput] = useState(''); 
const [sCity, setCity] = useState(userInput); 
const [weatherData, setWeatherData] = useState([]); 
const [error, setError] = useState(null);

const fetchData = async(city) => {
  try {
    const data = await getData(city);
    setWeatherData(data); 
    console.log(data);
  }  catch (error) {
  console.error(error.message); 
  setError('Weather data delay at this time. Please try again later or contact your API Key admin');
}
  }

useEffect ( () => {

fetchData(sCity);
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
      <h2>City: {weatherData?.name}</h2>
      <p>Temperature: {weatherData?.main?.temp} °C</p>
      {/* <p>Humidity: {weatherData.main.humidity}</p> */}
      {/*<p>Weather: {weatherData?.weather[0]?.description}</p>*/}
    </div> 
      )
}
</header>
</div>

);

}

export default App;