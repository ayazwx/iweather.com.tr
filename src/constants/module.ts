import { WeatherResponseData } from "@/types/WeatherResponseType";

export const apiUrl = process.env.WEATHER_API_URL
export const apiKey = process.env.WEATHER_API_KEY

export const weatherIcons = {
    "01d" : "/weather-images/day-clear.svg",
    "02d" : "/weather-images/day-cloudy.svg",
    "03d" : "/weather-images/day-few-clouds.svg",
    "04d" : "/weather-images/day-rain.svg",
    "09d" : "/weather-images/day-cloudy.svg",
    "10d" : "/weather-images/day-cloudy.svg",
    "11d" : "/weather-images/day-storm.svg",
    "13d" : "/weather-images/day-storm.svg",
    "50d" : "/weather-images/day-clear.svg",
    
    "01n" : "/weather-images/night-clear.svg",
    "02n" : "/weather-images/night-cloudy.svg",
    "03n" : "/weather-images/night-few-clouds.svg",
    "04n" : "/weather-images/night-rain.svg",
    "09n" : "/weather-images/night-cloudy.svg",
    "10n" : "/weather-images/night-cloudy.svg",
    "11n" : "/weather-images/night-storm.svg",
    "13n" : "/weather-images/night-storm.svg",
    "50n" : "/weather-images/night-clear.svg"
}
export const weatherImages = {
    "01d" : "/weather-icons/day-clear.svg",
    "02d" : "/weather-icons/day-few-clouds.svg",
    "03d" : "/weather-icons/day-cloudy.svg",
    "04d" : "/weather-icons/day-cloudy.svg",
    "09d" : "/weather-icons/day-rain.svg",
    "10d" : "/weather-icons/day-sun-rain.svg",
    "11d" : "/weather-icons/day-storm.svg",
    "13d" : "/weather-icons/13d.png",
    "50d" : "/weather-icons/50d.png",

    "01n" : "/weather-icons/night-clear.svg",
    "02n" : "/weather-icons/night-few-clouds.svg",
    "03n" : "/weather-icons/night-cloudy.svg",
    "04n" : "/weather-icons/night-cloudy.svg",
    "09n" : "/weather-icons/night-rain.svg",
    "10n" : "/weather-icons/night-sun-rain.svg",
    "11n" : "/weather-icons/night-storm.svg",
    "13n" : "/weather-icons/13n.png",
    "50n" : "/weather-icons/50n.png"
}
export const weekDayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
export const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export const getDate = function(dateUnix: number, timezone: number): string {
    const date: Date = new Date((dateUnix + timezone) * 1000);
    const weekDayName: string = weekDayNames[date.getDay()];
    const monthName: string = monthNames[date.getMonth()];

    return `${weekDayName}, ${monthName} ${date.getDate()}, ${date.getFullYear()}`
}
export const mpsToKph = function(mps: number): number {
    return mps * 3.6;
}

export function formatWeatherContent(data: WeatherResponseData): { icon: string; text: string; value: string | number }[] {
    return [
        {
            icon: '/icons/thermometer-simple.png',
            text: "Thermal sensation",
            value: data.main.feels_like + "°c",
        },
        {
            icon: '/icons/cloud-rain.png',
            text: "Probability of rain",
            value: data.main.humidity + "%",
        },
        {
            icon: '/icons/wind.png',
            text: "Wind speed",
            value: data.wind.speed + " km/h",
        },
        {
            icon: '/icons/drop.png',
            text: "Air humidity",
            value: data.main.humidity + "%",
        },
        {
            icon: '/icons/sun-dim.png',
            text: "UV Index",
            value: data.main.feels_like,
        },
    ];
}