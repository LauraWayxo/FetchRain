//User adds extra spacing in the city name, this function will remove the extra spacing
const sanitizeCityName = (cityName) => {
    // if (!cityName.includes('')) {
    //     return cityName; 
    // }


let trimmedCity = cityName.trim();
if (cityName.includes('')) {
    trimmedCity = trimmedCity.replaceAll(' ', '+') }

while (trimmedCity.includes('++')) {
    trimmedCity = trimmedCity.replaceAll('++', '+'); //prevent double +
}

return trimmedCity; 
}

//use API to retrieve weather data
const getData = async (cityName) => {
    const apiKEY = import.meta.env.VITE_API_KEY; 
    const sCity = sanitizeCityName(cityName); //use properly formatted city name for API call 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${sCity}&appid=${apiKEY}`; 

    try {
        const res = await fetch (url); 
        if (!res.ok) {
            if (res.status === 404) {
                throw new Error (`Response status: ${res.status}. Assure the city name is spelled correctly`); 
            }
            if (res.status === 401) {
                throw new Error (`Response status ${res.status}. Assure the API key is correct`); 
            }
        }
        const data = await res.json(); 
        return data; 
    } catch (error) {
        console.error(error.message);
        throw error; //need fetchData in App.jsx to also catch this error 
    }
}

export { getData }; 
