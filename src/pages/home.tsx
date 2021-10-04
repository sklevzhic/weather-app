import React, {useEffect, useState} from 'react'
import WeatherService from "../API/api";
import {WeatherData} from "../../models/WeatherData";
import { Link } from 'react-router-dom';

interface ComponentProps {

}

export const HomePage: React.FC<ComponentProps> = () => {
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
        <Link to={`/weather/${activeCity}`} >на 10 дней</Link>
        <p>
            Напишите SPA для отображения погоды в указанном городе. Для получения данных
            найдите и используйте любое отрытое API.
            <br/>

            Приложение должно состоять из двух страниц:
            <br/>

            - Главная страница, с указанием текущей погоды и прогноза на ближайшие 3 дня
            в городе Минске (по умолчанию). На странице должны находится 3 кнопки, с
            помощью которых происходит переключение городов (Минск, Москва, Братислава)
            с последующей актуализацией страницы. Выбранный город должен оставаться
            сохраненным так, чтобы после перезагрузки страницы оставался выбранным.
            - Побочная страница, отображающая почасовой (если API позволяет) и 10 дневный
            прогноз погоды для указанного города. При инициализации, страница берет город
            из URL (путь может быть, например, таким: /in/Milan). Так же, на странице
            должно находиться текстовое поле, заполнив которое можно поменять город.
            <br/>
        </p>

    </>
        ;
};

