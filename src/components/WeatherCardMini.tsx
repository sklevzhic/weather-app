import React from 'react'

interface WeatherCardMiniProps {
    datetime: string,
    icon: string
    maxTemp: number,
}

export const WeatherCardMini: React.FC<WeatherCardMiniProps> = ({datetime,icon,maxTemp}) => {
    return <div className={"weatherMiniDay"} key={datetime}>
        <img
            src={`https://www.weatherbit.io/static/img/icons/${icon}.png`}
            alt={`Погода на ${new Date(datetime)}`}/>
        <div className={"weatherMiniDayText"}>
            <p className={"miniCardTemperature"}>{maxTemp}°</p>
            <p className={"miniCardDate"}>{new Date(datetime).toLocaleDateString().slice(0,-5)} </p>
        </div>
    </div>;
};