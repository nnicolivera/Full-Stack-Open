import { useState, useEffect } from 'react'
import httpClient from '../../lib/httpClient'
const API_KEY = process.env.REACT_APP_API_KEY

export default function Weather({ list }) {
    const [weather, setWeather] = useState({})
    const filter = document.getElementById("filter")

    let filteredList = []
    filteredList = list.filter(item => item.name.common.toLocaleLowerCase().includes(filter.value))

    let url = ''
    if (filteredList.length === 1) {
        url = filteredList.map(item => {
            return `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${item.latlng[0]},${item.latlng[1]}&aqi=no`
        })
    }

    const getWeather = async () => {
        try {
            const data = await httpClient.get(url[0]);
            setWeather(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        async function fetchData() {
            await getWeather()
        }
        fetchData()
    }, [url[0]]);

    return (
        <>
            {
                weather.location && <>
                    <h2>Weather in {weather.location.region}</h2>
                    <p>temperature {weather.current.temp_c}° Celcius</p>
                    <img src={`${weather.current.condition.icon}`} alt="" />
                    <p>wind {(weather.current.wind_kph / 3.6).toFixed(2)} m/s</p>
                </>
            }
        </>
    )
}
