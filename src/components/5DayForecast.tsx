"use client"
import React, { useEffect, useState } from "react";
import { weekDayNames, weatherIcons } from "@/constants/module";
import { ForecastResponseData } from "@/types/ForecastResponseType";
import { WeatherResponseData } from "@/types/WeatherResponseType";
import { fetchForecast } from "@/api/FetchWeather";
import Card from "./Card";


interface Props {
    data: WeatherResponseData;
}

interface FilteredForecast {
    temp_max: number;
    temp_min: number;
    dt_txt: string;
    weather: {
        icon: string;
    }[];
}

const FiveDayForecast: React.FC<Props> = ({ data }) => {
    const [forecastList, setForecastList] = useState<FilteredForecast[]>([]);
    const [CityForecast, setCityForecast] = useState<ForecastResponseData>();
    console.log("CityForecast", data);


    useEffect(() => {
        console.log('5 day')
        const fetchWeather = async () => {
            const forecast = await fetchForecast(data.coord.lat, data.coord.lon)
            console.log("forecast", forecast);
            setCityForecast(forecast);
            console.log("forecast", forecast);
            const {
                list: forecastList,
                city: { timezone }
            } = forecast;
            const filteredForecast: FilteredForecast[] = forecastList.filter((item, index) => (index >= 7 && (index % 8) === 7)).map((item) => ({
                temp_max: item.main.temp_max,
                temp_min: item.main.temp_min,
                dt_txt: item.dt_txt,
                weather: item.weather
            }));
            setForecastList(filteredForecast);
        };
        fetchWeather();
    }, [data]);


    return (
        <div className="shadow py-6 px-4 sm:px-4 overflow-x-visible dark:bg-gray-900 w-full flex h-full max-h-48 gap-4 max-w-full rounded-xl">
        {forecastList.map((forecast, index) => {
            const { temp_max, temp_min, dt_txt } = forecast;
            const dayDate = new Date(dt_txt);
            return (
                <div className="flex flex-col items-center" key={weekDayNames[dayDate.getUTCDay()] + index}>
                    <p className="dark:text-white text-gray-900 font-semibold">{weekDayNames[dayDate.getUTCDay()].slice(0, 3)}</p>
                    <img className="w-[90px] h-[90px]" src={weatherIcons[CityForecast?.list[0].weather[0].icon ?? "01d"]} alt="Weather Icon" />
                    <p className="dark:text-white text-gray-800 font-semibold">{parseInt(temp_max.toString())}°c</p>
                    <p className="dark:text-gray-400 text-gray-600 font-semibold">{parseInt(temp_min.toString())}°c</p>
                </div>
            );
        })}
    </div>
    );
};

export default FiveDayForecast;
