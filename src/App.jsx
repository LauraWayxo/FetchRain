import { useEffect, useState } from 'react';
import './App.css';
import { getData } from './WeatherService';

//render data on the screen through html element?
// const renderData = document.getElementById('root');

function App() {
const [userInput, setUserInput] = useState('New York'); 
const [city, setCity] = useState(userInput); 
const [weatherData, setWeatherData] = useState(null); 
const [error, setError] = useState(null); 

useEffect ( () => {
  try {
  const fetchData = async() => {
    const data = await getData(city);
    setWeatherData(data); 
    console.log(data); 
  } catch (error) {
  console.error(error.message); 
  setError('Weather data unavaiable at this time. Please try again later or contact your system administrator');

  fetchData();
}, [city]); 


return (
  <div className ="App">
    <header className = "App-header">
      <h1>Weather</h1>
      <label htmlFor = "city-name">
        <input id = "city-name" name = "cityName" value = {userInput} onChange = {(e) => setUserInput(e.target.value)} />
      </label>
      <button onClick = {() => {setCity(userInput)}}>Submit</button>

      //Display Error Messages 
      {error && <p>{error}</p>}
      {weatherData && (
    <div>
      <h2>City: {weatherData.name}</h2>
      <p>Temperature: {weatherData.main.temp} °C</p>
      {/* <p>Humidity: {weatherData.main.humidity}</p> */}
      <p>Weather: {weatherData.weather[0].description}</p>
    </div>
)}
);
}
export default App;

{/* function App() {
//   //
// const [userInput, setUserInput] = useState('New York');
// const [city, setCity] = useState(userInput);

//   useEffect (() => {
//     const getData = async () => {
//       const APIKEY = import.meta.env.VITE_API_KEY;
//       const url = `https://api.openweathermap.org/data/2.5/weather?q=New+York&appid=${APIKEY}`;
//     try {
//       const res = await fetch(url);
//       if (!res.ok) {
//         throw new Error(`Response status: ${res.status}`);
//       }
//       const data = await res.json();
//       console.log(data); 

//     } catch(error) {
//       console.error(error.message);    
//     }
//   };

//   getData();
// }, [])
// return (
//   <div className="App">
//     <header className="App-header">
//       <h1>Weather</h1>
//       <label htmlFor='city-name'>
//         <input id ='city-name' name ='cityName' value = {userInput} onChange = {(e) => setUserInput(e.targetValue)}/>    
//       </label>
//       <button onClick = {() => {setUserInput}}>Submit</button>
//     </header>
//   </div>
// );
// }

// const [count, setCount] = useState(0);
//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>Counter</h1>
//         <p>Current Count {count}</p>
//         <button type='button' onClick={() => setCount((prev) => prev + 1)}>Increment Count</button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to reload.
//         </p>
//       </header>
//     </div>
//   ); </header> */}



 

