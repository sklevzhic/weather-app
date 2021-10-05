import React, {useEffect, useState} from 'react'
import WeatherService from "../API/api";
import {WeatherData} from "../../models/WeatherData";
import {Link} from 'react-router-dom';
import {WeatherCardList} from "../components/WeatherCardList";
import {WeatherToday} from '../components/WeatherToday';
import {Title} from "../components/Title";
import {Preloader} from "../components/Preloader";

export const HomePage: React.FC = () => {

    const [weatherList, setWeatherList] = useState<WeatherData | undefined>()
    const [activeCity, setActiveCity] = useState<string>(() => {
        const city: string | null = localStorage.getItem("city-active");
        if (typeof city === "string") {
            const initialValue = JSON.parse(city);
            return initialValue;

        } else {
            return 'minsk'
        }
    })
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        fetchWeatherByCity(activeCity, 4)

    }, [activeCity])

    async function fetchWeatherByCity(str: string, cnt: number) {
        setIsLoading(true)
        const response = await WeatherService.getWeatherByCity(str, cnt)
        setWeatherList(response)
        setIsLoading(false)
    }

    const handleActiveCity = (el: string) => {
        setActiveCity(el)
        localStorage.setItem("city-active", JSON.stringify(el))
    }
    return <>
        <ul className={"cities"}>
            {
                ["Moscow", "Minsk", "Bratislava"].map(el => {
                    return <li key={el} onClick={() => handleActiveCity(el)}>{el}</li>
                })
            }
        </ul>

        {
            !isLoading ? <div className={"weather"}>
                {
                    weatherList && <WeatherToday weatherList={weatherList}/>
                }

                <div className={"weatherNextDays weatherMiniCardItems"}>
                    <Title days={"3 дня"}/>
                    {
                        weatherList && <WeatherCardList isVisibleFirstElem={false} weatherList={weatherList.data}/>
                    }
                </div>

            </div> : <Preloader/>
        }

        <div className={"actions"}>
            <Link to={`/weather/${activeCity}`} className={"btn"}>Погода на 10 дней</Link>
        </div>

    </>
        ;
};

