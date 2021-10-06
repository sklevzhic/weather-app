import React from 'react'

interface TitleProps {
    days: string
}

export const Title: React.FC<TitleProps> = ({days}) => {
    return <p className={"weather__title"}>Погода на {days}</p>;
};