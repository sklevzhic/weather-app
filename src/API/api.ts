import axios from "axios";
import {WeatherData} from "../../models/WeatherData";

const KEY = '96f477dba027460fb37237c09f9e4a12'

export default class WeatherService {
    static async getWeatherByCity(city = 'minsk', cnt = 4) {
        const response = await axios.get<WeatherData>(`https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&utils=m&lang=ru&days=${cnt}&key=${KEY}`)
        return response.data
    }
}
