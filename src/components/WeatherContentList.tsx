import React from 'react';
import Image from 'next/image';
import { WeatherResponseData } from '@/types/WeatherResponseType';
import { formatWeatherContent } from '@/constants/module';

interface WeatherContentListProps {
    data: WeatherResponseData;
}

const WeatherContentList: React.FC<WeatherContentListProps> = ({ data }) => {
    return (
        <div className=" w-full shadow sm:px-4  dark:bg-gray-900 max-w-full h-[292px] px-4 rounded-lg overflow-hidden relative min-w-[">
            {formatWeatherContent(data).map((content, index) => (
                <div className="flex justify-between items-center h-full px-4 max-h-[58px] border-b border-gray-700" key={index}>
                    <div className="flex items-center">
                        <Image src={content.icon} alt="Weather Icon" width={24} height={24} className='dark:invert'/>
                        <p className="text-base font-semibold text-gray-800 dark:text-gray-300 ml-2">{content.text}</p>
                    </div>
                    <p className="text-base font-semibold text-gray-950 dark:text-white ">{content.value}</p>
                </div>
            ))}
        </div>
    );
};

export default WeatherContentList;
