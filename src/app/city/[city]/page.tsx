
"use client"
import { fetchSearchGeo } from "@/api/FetchWeather";
import WeatherHome from "@/components/WeatherHome";
import React, { useEffect, useState } from "react";

const Page = ({ params }: { params: { city: string } }) => {
  const [paramsCity, paramsCountry] = params.city.split('-')
  const city = paramsCity.replace('%20', ' ')
  const country = paramsCountry.replace('%20', ' ')
  
  const [cityLatitude, setCityLatitude] = useState<number>(0)
  const [cityLongitude, setCityLongitude] = useState<number>(0)

  useEffect(() => {
    if (city) {
      const fetchCity = async () => {
        try {
          const searchResults = await fetchSearchGeo(city);
          if (searchResults.length > 0) {
            const cityData = searchResults.find((result) => result.name.toLowerCase() === city.toLowerCase() && result.country.toLowerCase() === country.toLowerCase());
            if (cityData) {
              setCityLatitude(cityData.lat);
              setCityLongitude(cityData.lon);
            } else if (searchResults.length > 0) {
              setCityLatitude(searchResults[0].lat);
              setCityLongitude(searchResults[0].lon);
            }            
            else {
              console.error('No search results found for city:', city);
            }
          } else {
            console.error('No search results found for city:', city);
          }
        } catch (error) {
          console.error('Error fetching weather data:', error);
        }
      };
      fetchCity();
    }
  }
  , [params.city]);

  if (!cityLatitude || !cityLongitude) {
    return (
      <div>
        <h1>Invalid city</h1>
      </div>
    )
  }
  return (
    <WeatherHome cityLatitude={cityLatitude} cityLongitude={cityLongitude} />
  );
}

export default Page