import { create } from 'zustand';
import { fetchWeather } from './lib/api'


const weatherStore = (set) => ({
  weatherInfo: {},
  setWeatherInfo: (weather) => set((state) => ({
    weatherInfo: weather
  }))
});

export const useWeatherStore = create(weatherStore);

