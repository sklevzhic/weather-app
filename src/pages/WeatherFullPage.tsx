import React, {useEffect, useState} from 'react'
import WeatherService from "../API/api";
import {WeatherData} from "../../models/WeatherData";
import { useHistory } from 'react-router-dom';
import {useInput} from "../hooks/useInput";

interface ComponentProps {

}

export const WeatherFullPage: React.FC<ComponentProps> = () => {
    const history = useHistory();
    let valueCity = useInput("")
    const [weatherList, setWeatherList] = useState<WeatherData | undefined>()
    const [activeCity, setActiveCity] = useState<string>('minsk')

    useEffect(() => {
        fetchWeatherByCity(activeCity, 4)
    }, [activeCity])

    async function fetchWeatherByCity(str: string, cnt: number) {
        const response = await WeatherService.getWeatherByCity(str, cnt)
        setWeatherList(response)
    }

    return <>
        <button onClick={() => history.goBack()}>Назад</button>
        <input {...valueCity} type="text"/>
        <button onClick={() => {setActiveCity(valueCity.value)}}>показать</button>

        <ul className={"cities"}>
            {
                ["Moscow", "Minsk", "Bratislava"].map(el => {
                    return <li key={el} onClick={() => setActiveCity(el)}>{el}</li>
                })
            }

        </ul>
        <div className={"weather"}>
            <div className={"weatherToday"}>
                <p className={"weatherTodayTitle"}>Погода на сегодня</p>
                <p className={"activeCity"}>{weatherList?.city_name}</p>
                <p className={"temperature"}> {weatherList?.data[0].max_temp}°</p>
                <img src={`https://www.weatherbit.io/static/img/icons/${weatherList?.data[0].weather.icon}.png`}
                     alt={`Погода на ${weatherList?.data[0].datetime}`}/>
                <p className={"description"}>{weatherList?.data[0].weather.description}</p>
            </div>

            <div className={"weatherNextDays"}>
                <p className={"weatherTodayTitle"}>Погода на 3 дня</p>
                {
                    weatherList && <>
                        {
                            weatherList.data.map((el,i) => {
                                el = weatherList.data[i]
                                if (i === 0) {
                                    return null
                                }
                                return <div className={"weatherMiniDay"} key={el.datetime}>
                                    <img
                                        src={`https://www.weatherbit.io/static/img/icons/${el.weather.icon}.png`}
                                        alt={`Погода на ${weatherList?.data[0].datetime}`}/>
                                    <div className={"weatherMiniDayText"}>
                                        <p className={"miniCardTemperature"}>{el.max_temp}°</p>
                                        <p className={"miniCardDate"}>{el.datetime} </p>
                                        </div>
                                    </div>
                            })
                        }
                    </>
                }
            </div>

        </div>
    </>
        ;
};

