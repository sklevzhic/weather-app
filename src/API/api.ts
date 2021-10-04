import axios from "axios";
import {WeatherData} from "../../models/WeatherData";

const KEY = '97cdf86ac93c496ea212ca59e6ffb118'

export default class WeatherService {
    static async getWeatherByCity(city = 'minsk', cnt = 4) {
        const response = await axios.get<WeatherData>(`https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&utils=m&lang=ru&days=${cnt}&key=${KEY}`)
        return response.data
    }
}
