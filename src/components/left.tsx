"use client"

import Image from "next/image"
import Cloudy from "../../public/icons/animated/cloudy.svg"
import { Show } from "../solid/solidCopy"
import { useWeatherStore } from "../store"

const url = "https://images.unsplash.com/photo-1685362926801-d97120f56465?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8OXx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"

export default function LeftComponent(){
    const info = useWeatherStore((state) => state.weatherInfo);
    return (
	  <div style={{"background": `url(${url})`}} className="relative h-full w-full lg:w-[350px] border-0 flex flex-row-reverse lg:flex-col items-center lg:items-start justify-between p-6 text-lg rounded-t-xl lg:rounded-tr-none lg:rounded-tl-xl lg:rounded-bl-xl">
	    <div className="absolute top-0 bottom-0 right-0 left-0 bg-black/10 rounded-tl-xl rounded-bl-xl"></div>

	    <div className="text-right mt-5 lg:text-left">
	      <h1 className="font-bold text-3xl">{!info ? "Day" : info.header.day}</h1>
	      <span>
		<i className='bx bx-current-location pr-2'></i>
		{!info ? "geo" : info.header.formattedGeo} 
	      </span>
	    </div>

	    <div className="mb-5 flex flex-col gap-1">
	      <Image src={Cloudy} width="350px" height="350px" alt="weather-icon" />
	      <h1 className="font-bold text-5xl">{!info ? "temp" : Math.floor(info.main.temp)}°C</h1>
	      <span>{!info ? "description" : info.header.description}</span>
	    </div>
	  </div>
    )
}
