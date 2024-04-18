import { notifyLoading, notifySuccess } from "@/components/Toast";
import React, { useState, useEffect } from "react";

interface LocationData {
    latitude: number;
    longitude: number;
}

interface LocationHook {
    locationPermission: boolean;
    setLocationPermission: React.Dispatch<React.SetStateAction<boolean>>;
    geoLocation: LocationData | null;
    getLocationPermission: () => Promise<boolean>;
}

export const useLocation = (): LocationHook => {
    const [locationPermission, setLocationPermission] = useState<boolean>(false);
    const [geoLocation, setGeoLocation] = useState<LocationData | null>(null);


    function success(pos: any) {
        setLocationPermission(true)
        var crd = pos.coords;
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        setGeoLocation({ latitude: crd.latitude, longitude: crd.longitude });
        console.log(`More or less ${crd.accuracy} meters.`);
      }
      function errors(err :any) {
        setLocationPermission(false)
        console.warn(`ERROR(${err.code}): ${err.message}`);
      }
      var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      };

    const getLocationPermission = async () => {
        if (navigator.geolocation) {
            navigator.permissions
                .query({ name: "geolocation" })
                .then(function (result) {
                    if (result.state === "granted") {
                        navigator.geolocation.getCurrentPosition(success, errors, options);
                    //If granted then you can directly call your function here
                    } else if (result.state === "prompt") {
                        notifyLoading('Getting location. Please allow')
                        navigator.geolocation.getCurrentPosition(success, errors, options);
                    //If prompt then the user will be asked to give permission
                    } else if (result.state === "denied") {
                        // notifyError('Location denied')
                    //If denied then you have to show instructions to enable location
                    }
                });
                setLocationPermission(true)
            return true;
        }
        else {
            console.log("Geolocation is not supported by this browser.");
        }
        setLocationPermission(false)
        return false;
    };


    return {
        locationPermission,
        setLocationPermission,
        geoLocation,
        getLocationPermission,
    };
};
