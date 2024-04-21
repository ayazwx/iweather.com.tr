export type ForecastResponseData = {
    cod: string;
    message: number;
    cnt: number;
    list: {
        dt: number;
        main: {
            temp: number;
            feels_like: number;
            temp_min: number;
            temp_max: number;
            pressure: number;
            sea_level: number;
            grnd_level: number;
            humidity: number;
            temp_kf: number;
        };
        weather: {
            id: number;
            main: string;
            description: string;
            icon:
            | "01d"
            | "01n"
            | "02d"
            | "02n"
            | "03d"
            | "03n"
            | "04d"
            | "04n"
            | "09d"
            | "09n"
            | "10d"
            | "10n"
            | "11d"
            | "11n"
            | "13d"
            | "13n"
            | "50d"
            | "50n";
        }[];
        clouds: {
            all: number;
        };
        wind: {
            speed: number;
            deg: number;
            gust: number;
        };
        visibility: number;
        pop: number;
        sys: {
            pod: string;
        };
        dt_txt: string;
    }[];
    city: {
        id: number;
        name: string;
        coord: {
            lat: number;
            lon: number;
        };
        country: string;
        population: number;
        timezone: number;
        sunrise: number;
        sunset: number;
    };
}