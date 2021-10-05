import React, {useEffect, useState} from 'react'
import WeatherService from "../API/api";
import {WeatherData} from "../../models/WeatherData";
import {Link, useHistory} from 'react-router-dom';
import {useInput} from "../hooks/useInput";
import {WeatherCardList} from "../components/WeatherCardList";
import {Title} from "../components/Title";
import {Preloader} from "../components/Preloader";

export const WeatherCityFullPage: React.FC = () => {
    const history = useHistory();
    let cityName = history.location.pathname.replace("/weather/", "")
    const [isLoading, setIsLoading] =useState<boolean>(false)
    let valueCity = useInput(cityName)

    const [weatherList, setWeatherList] = useState<WeatherData | undefined>()

    const [activeCity, setActiveCity] = useState<string>(cityName)
    useEffect(() => {
        setActiveCity(cityName)
    }, [history.location.pathname])

    useEffect(() => {
        fetchWeatherByCity(activeCity, 10)
    }, [activeCity])

    async function fetchWeatherByCity(str: string, cnt: number) {
        setIsLoading(true)
        const response = await WeatherService.getWeatherByCity(str, cnt)
        setWeatherList(response)
        setIsLoading(false)
    }

    return <>
        <button onClick={() => history.push('/')}>На главную</button>
        <div className={"inputCityForm"}>
            <input {...valueCity} type="text"/>
            <Link className={`btn ${((valueCity.value)) ? "" : "disabled"}`}
                  to={`/weather/${valueCity.value}`}>Показать</Link>
        </div>
        <Title days={`10 дней [${cityName}]`}/>
        {
            isLoading
                ? <Preloader />
                : <div className={"weatherMiniCardItems weatherMiniCardTenDays"}>
                    {
                        weatherList
                            ? <WeatherCardList isVisibleFirstElem={true} weatherList={weatherList.data}/>
                            : <>Город не найден(</>
                    }

                </div>
        }

    </>
        ;
};

