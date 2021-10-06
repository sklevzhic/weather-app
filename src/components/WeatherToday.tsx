import React from 'react'
import {WeatherData} from "../../models/WeatherData";
import {Title} from "./Title";

interface WeatherTodayProps {
    weatherList: WeatherData
}

export const WeatherToday: React.FC<WeatherTodayProps> = ({weatherList}) => {
    return             <div className={"weather-today"}>
        <Title days={"сегодня"}/>
        <p className={"weather__city-name"}>{weatherList?.city_name}</p>
        <p className={"weather-today__temperature"}> {weatherList?.data[0].max_temp}°</p>
        <img src={`https://www.weatherbit.io/static/img/icons/${weatherList?.data[0].weather.icon}.png`}
             alt={`Погода на ${weatherList?.data[0].datetime}`}/>
        <p className={"weather-today__description"}>{weatherList?.data[0].weather.description}</p>
    </div>;
};