import axios from "axios";
import { apiUrl, apiKey } from "@/constants/module";
import { WeatherResponseData } from "@/types/WeatherResponseType";
import { ForecastResponseData } from "@/types/ForecastResponseType";
import { AirQualityResponseData } from "@/types/AirQualityResponseType";
import { ReverseGeocodeResponseData } from "@/types/ReverseGeocodeResponseType";
import { SearchGeoResponseData } from "@/types/SearchGeoResponseType";

const fetchData = async (url: string) => {
    try {
        const response =  await axios.get(url + `&appid=${apiKey}`);
        console.log("Data fetched successfully", url, response);
        return response.data;
    } catch (error) {
        console.error('axios error:', error, url);
    }
};

export const fetchWeather = async (lon: number, lat: number): Promise<WeatherResponseData> => {
        const response = await fetchData(`${apiUrl}/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric`);
        return response as WeatherResponseData;
};

export const fetchForecast = async (lon: number, lat: number): Promise<ForecastResponseData> => {
        console.log("fetchForecast", lon, lat);
        const response = await fetchData(`${apiUrl}/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric`);
        console.log(response)
        return response as ForecastResponseData;
}

export const fetchAirQuality = async (lon: number, lat: number): Promise<AirQualityResponseData> => {
        const response = await fetchData(`${apiUrl}/data/2.5/air_pollution?lat=${lat}&lon=${lon}&units=metric`);
        return response as AirQualityResponseData;
}

export const fetchReverseGeocode = async (lon: number, lat: number): Promise<ReverseGeocodeResponseData> => {
        const response = await fetchData(`${apiUrl}/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=5`);
        return response as ReverseGeocodeResponseData;
}

export const fetchSearchGeo = async (query: string): Promise<SearchGeoResponseData> => {
        const response = await fetchData(`${apiUrl}/geo/1.0/direct?q=${query}&limit=5`);
        return response as SearchGeoResponseData;
}