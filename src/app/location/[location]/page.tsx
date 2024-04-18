
"use client"
import React from "react";
import WeatherHome from "@/components/WeatherHome";

const Page = ({ params }: { params: { location: string } }) => {
  const [longitude, latitude] = params.location.split('_')
  console.log(longitude, latitude)



  if (!longitude || !latitude) {
    return (
      <div>
        <h1>Invalid location</h1>
      </div>
    )
  }


  return (
    <WeatherHome cityLatitude={Number(latitude)} cityLongitude={Number(longitude)} />
  );
}

export default Page