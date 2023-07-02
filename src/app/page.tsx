"use client"

import { useState } from "react"
import { useWeatherStore } from "../store"
import { fetchWeather } from "../lib/api"
import { useRouter } from "next/navigation"
const image = "https://images.unsplash.com/photo-1494798132658-27ee988ba44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const [city, setCity] = useState("")
  const router = useRouter()
  const setWeather = useWeatherStore((state) => state.setWeatherInfo)


  const handleChange = (e: any) => {
      setCity(e.currentTarget.value)
  }

  const handleSubmit = async (e: any) => {
     e.preventDefault()
     if(!city){
	window.alert("You gotta give a city !")  
     } 
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
       setWeather(response)
       router.push('/weather-board')
     }

  } 
    
  return (
    <main className="bg-black/70 w-full h-screen flex items-center justify-center text-white" style={{"background": `url(${image})`, "background-size": "cover"}}>
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
	<form type="submit" onSubmit={handleSubmit} className="bg-black/30 backdrop-blur-sm rounded-lg flex m-4 p-5 lg:m-8 shadow flex-col w-full lg:w-[800px] lg:h-[450px] h-[350px] items-center justify-center gap-4 border-2 border-white/30">
	  <i class='bx bxs-leaf text-4xl'></i>
          <h1 className="font-bold text-3xl mb-4">Weathering</h1>
	  <input value={city} onChange={handleChange} className="input bg-transparent border-white/30 text-white input-bordered input-primary w-full max-w-xs" placeholder="search city..." />
	  <button className="btn btn-wide w-[334px] bg-[#5c7f67] border-white/30 text-white/80 text-lg">search</button>
	</form>
    </main>
  );
}
