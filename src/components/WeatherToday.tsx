import React from 'react'
import {WeatherData} from "../../models/WeatherData";
import {Title} from "./Title";

interface WeatherTodayProps {
    weatherList: WeatherData
}

export const WeatherToday: React.FC<WeatherTodayProps> = ({weatherList}) => {
    return             <div className={"weatherToday"}>
        <Title days={"сегодня"}/>
        <p className={"activeCity"}>{weatherList?.city_name}</p>
        <p className={"temperature"}> {weatherList?.data[0].max_temp}°</p>
        <img src={`https://www.weatherbit.io/static/img/icons/${weatherList?.data[0].weather.icon}.png`}
             alt={`Погода на ${weatherList?.data[0].datetime}`}/>
        <p className={"description"}>{weatherList?.data[0].weather.description}</p>
    </div>;
};