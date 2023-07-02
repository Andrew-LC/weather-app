"use client"

import { Show } from "../solid/solidCopy"
import { useWeatherStore } from "../store"
import { useState } from "react"
import { fetchWeather } from "../lib/api"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function RightComponent(){
    const info = useWeatherStore((state) => state.weatherInfo)
    const setInfo = useWeatherStore((state) => state.setWeatherInfo)
    const [city, setCity] = useState("");


    const handleValue = (e: any) => {
	setCity(e.currentTarget.value);
    }


    const submit = async (e: any) => {
	e.preventDefault();
	const response = await fetchWeather(city);

	if(response.cod == "404") {
	    toast.warn(response.message, {
		position: "top-center",
		autoClose: 5000,
		hideProgressBar: true,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: "colored",
	    });
	    setCity("")
	} else {
	    setInfo(response)
	}
    }

    return(
	  <div className="bg-gray-800/75 backdrop-blur-md text-gray-300 border-0 outline-none h-full lg:flex-1 flex flex-col justify-between gap-8 p-6 text-lg rounded-b-xl lg:rounded-bl-none lg:rounded-br-xl lg:rounded-tr-xl">
	    <ToastContainer
		position="top-center"
		autoClose={5000}
		hideProgressBar={false}
		newestOnTop={false}
		closeOnClick
		rtl={false}
		pauseOnFocusLoss
		draggable
		pauseOnHover
		theme="colored"
	    />
	    <ul className="w-full pt-5 flex flex-col gap-[.3rem]">
	      <li className="flex justify-between">
		<span className="font-bold">PRESSURE</span>
		<span>{!info ? "pressure" : info.main.pressure}%</span>
	      </li>
	      <li className="flex justify-between">
		<span className="font-bold">HUMIDITY</span>
		<span>{!info ? "humidity" : info.main.humidity}%</span>
	      </li>
	      <li className="flex justify-between">
		<span className="font-bold">WIND</span>
		<span>{!info ? "speed" : info.main.wind.speed} km/h</span>
	      </li>
	    </ul>
	    <div className="flex gap-2 w-full"> 
	      <div className="cursor-pointer p-3 bg-gray-900/40 shadow rounded border-2 border-white/20 flex-1">
		<h1 className="font-semibold">Sunrise</h1>
		<span>{!info ? "sunrise" : info.sunrise}</span>
	      </div>
	      <div className="cursor-pointer p-3 bg-gray-900/40 shadow rounded border-2 border-white/20 flex-1">
		<h1 className="font-semibold">Sunset</h1>
		<span>{!info ? "sunset" : info.sunset}</span>
	      </div>
	    </div>
	    <div className="flex w-full items-center justify-center gap-2 mb-4">
	      <div className="w-full">
		<input value={city} onChange={handleValue} className="w-full input glass bg-gray-800 border-white/20 border-2 rounded-none p-2" placeholder="search city..." />
	      </div>
	      <div>
		<button onClick={submit} className="p-2 btn  rounded-none shadow-md border-white/20 border-[1px] hover:bg-gray-900 hover:cursor-pointer active:bg-gray-900">
		  search 
		</button>  
	      </div>
	    </div>
	  </div>
    )
}

