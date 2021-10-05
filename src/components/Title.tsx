import React from 'react'

interface TitleProps {
    days: string
}

export const Title: React.FC<TitleProps> = ({days}) => {
    return <p className={"weatherTodayTitle"}>Погода на {days}</p>;
};