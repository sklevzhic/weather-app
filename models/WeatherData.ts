
export interface WeatherItem {
    datetime: string
    max_temp: number
    weather: {icon: string, code: number, description: string}
}

export interface WeatherData {
    data: WeatherItem[];
    city_name: string

}