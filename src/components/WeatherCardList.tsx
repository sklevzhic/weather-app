import React from 'react'
import { WeatherCardMini } from './WeatherCardMini';
import {WeatherItem} from "../../models/WeatherData";

interface WeatherCardMiniProps {
    weatherList: WeatherItem[],
    isVisibleFirstElem: boolean
}

export const WeatherCardList: React.FC<WeatherCardMiniProps> = ({weatherList, isVisibleFirstElem}) => {
    return <>
        {
            weatherList.map((el, i: number) => {
                el = weatherList[i]
                if (i === 0 && (isVisibleFirstElem === false)) {
                    return null
                }
                return <WeatherCardMini
                    key={el.datetime}
                    icon={el.weather.icon}
                    datetime={el.datetime}
                    maxTemp={el.max_temp}
                />
            })
        }

    </>;
};