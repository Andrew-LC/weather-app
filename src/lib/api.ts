function getUserLocation() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          console.log("Latitude: " + latitude);
          console.log("Longitude: " + longitude);

          resolve({ lat: latitude, lon: longitude });
        },
        (error) => {
          reject(error);
        }
      );
    } else {
      reject(new Error("Geolocation is not supported by this browser."));
    }
  });
}


function convertTimestampToTime(timestamp, timezoneOffset) {
  const utcDatetime = new Date(timestamp * 1000);
  const localDatetime = new Date(utcDatetime.getTime() + timezoneOffset * 1000);
  const timeString = localDatetime.toLocaleTimeString();

  return timeString;
}

function convertTimestampToDay(timestamp) {
  const date = new Date(timestamp * 1000);
  const day = date.toLocaleString('en-US', { weekday: 'long' }); 

  return day;
}


async function fetchWeather(city: string = "Chennai") {
  const key = process.env.NEXT_PUBLIC_WEATHER_API;

  let url: string = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`
  console.log(url)
  const response = await fetch(url);
  const data = await response.json();

  if(data.cod == "404"){
    return data
  }

  const neededData = {
    header: {
      weather: data.weather,
      temp: data.main.temp,
      description: data.weather[0].description,
      day: convertTimestampToDay(data.dt),
      formattedGeo: `${data.name}, ${data.sys.country}`,
    },
    main: {
      ...data.main,
      visibility: data.visibility,
      wind: data.wind,
      date: data.dt,
    },
    sunrise: convertTimestampToTime(data.sys.sunrise , data.timezone),
    sunset: convertTimestampToTime(data.sys.sunset , data.timezone),
  };


  return neededData;
}


export { fetchWeather };


// {
//   coord: { lon: 80.2785, lat: 13.0878 },
//   weather: [ { id: 701, main: 'Mist', description: 'mist', icon: '50n' } ],
//   base: 'stations',
//   main: {
//     temp: 30.54,
//     feels_like: 37.54,
//     temp_min: 30.54,
//     temp_max: 30.99,
//     pressure: 1010,
//     humidity: 84
//   },
//   visibility: 5000,
//   wind: { speed: 7.2, deg: 180 },
//   clouds: { all: 75 },
//   dt: 1687963487,
//   sys: {
//     type: 2,
//     id: 2012809,
//     country: 'IN',
//     sunrise: 1687911311,
//     sunset: 1687957718
//   },
//   timezone: 19800,
//   id: 1264527,
//   name: 'Chennai',
//   cod: 200
// }




// {
//   cod: '200',
//   message: 0,
//   cnt: 40,
//   list: [
//     {
//       dt: 1688148000,
//       main: [Object],
//       weather: [Array],
//       clouds: [Object],
//       wind: [Object],
//       visibility: 10000,
//       pop: 0.51,
//       rain: [Object],
//       sys: [Object],
//       dt_txt: '2023-06-30 18:00:00'
//     },
//     {
//       dt: 1688158800,
//       main: [Object],
//       weather: [Array],
//       clouds: [Object],
//       wind: [Object],
//       visibility: 10000,
//       pop: 0.71,
//       rain: [Object],
//       sys: [Object],
//       dt_txt: '2023-06-30 21:00:00'
//     },
//     {
//       dt: 1688169600,
//       main: [Object],
//       weather: [Array],
//       clouds: [Object],
//       wind: [Object],
//       visibility: 10000,
//       pop: 0.51,
//       rain: [Object],
//       sys: [Object],
//       dt_txt: '2023-07-01 00:00:00'
//     },
//     {
//       dt: 1688180400,
//       main: [Object],
//       weather: [Array],
//       clouds: [Object],
//       wind: [Object],
//       visibility: 10000,
//       pop: 0.17,
//       sys: [Object],
//       dt_txt: '2023-07-01 03:00:00'
//     },
//     {
//       dt: 1688191200,
//       main: [Object],
//       weather: [Array],
//       clouds: [Object],
//       wind: [Object],
//       visibility: 10000,
//       pop: 0.05,
//       sys: [Object],
//       dt_txt: '2023-07-01 06:00:00'
//     },
//     {
//       dt: 1688202000,
//       main: [Object],
//       weather: [Array],
//       clouds: [Object],
//       wind: [Object],
//       visibility: 10000,
//       pop: 0,
//       sys: [Object],
//       dt_txt: '2023-07-01 09:00:00'
//     },
//     {
//       dt: 1688212800,
//       main: [Object],
//       weather: [Array],
//       clouds: [Object],
//       wind: [Object],
//       visibility: 10000,
//       pop: 0.06,
//       sys: [Object],
//       dt_txt: '2023-07-01 12:00:00'
//     },
//     {
//       dt: 1688223600,
//       main: [Object],
//       weather: [Array],
//       clouds: [Object],
//       wind: [Object],
//       visibility: 10000,
//       pop: 0.6,
//       rain: [Object],
//       sys: [Object],
//       dt_txt: '2023-07-01 15:00:00'
//     },
//     {
//       dt: 1688234400,
//       main: [Object],
//       weather: [Array],
//       clouds: [Object],
//       wind: [Object],
//       visibility: 10000,
//       pop: 0.61,
//       sys: [Object],
//       dt_txt: '2023-07-01 18:00:00'
//     },
//     {
//       dt: 1688245200,
//       main: [Object],
//       weather: [Array],
//       clouds: [Object],
//       wind: [Object],
//       visibility: 10000,
//       pop: 0.82,
//       rain: [Object],
//       sys: [Object],
//       dt_txt: '2023-07-01 21:00:00'
//     },
//     {
//       dt: 1688256000,
//       main: [Object],
//       weather: [Array],
//       clouds: [Object],
//       wind: [Object],
//       visibility: 10000,
//       pop: 0.75,
//       rain: [Object],
//       sys: [Object],
//       dt_txt: '2023-07-02 00:00:00'
//     },
//     {
//       dt: 1688266800,
//       main: [Object],
//       weather: [Array],
//       clouds: [Object],
//       wind: [Object],
//       visibility: 10000,
//       pop: 0.38,
//       sys: [Object],
//       dt_txt: '2023-07-02 03:00:00'
//     },
//     {
//       dt: 1688277600,
//       main: [Object],
//       weather: [Array],
//       clouds: [Object],
//       wind: [Object],
//       visibility: 10000,
//       pop: 0.37,
//       sys: [Object],
//       dt_txt: '2023-07-02 06:00:00'
//     },
//     {
//       dt: 1688288400,
//       main: [Object],
//       weather: [Array],
//       clouds: [Object],
//       wind: [Object],
//       visibility: 10000,
//       pop: 0.1,
//       sys: [Object],
//       dt_txt: '2023-07-02 09:00:00'
//     },
//     {
//       dt: 1688299200,
//       main: [Object],
//       weather: [Array],
//       clouds: [Object],
//       wind: [Object],
//       visibility: 10000,
//       pop: 0.56,
//       rain: [Object],
//       sys: [Object],
//       dt_txt: '2023-07-02 12:00:00'
//     },
//     {
//       dt: 1688310000,
//       main: [Object],
//       weather: [Array],
//       clouds: [Object],
//       wind: [Object],
//       visibility: 10000,
//       pop: 0.67,
//       rain: [Object],
//       sys: [Object],
//       dt_txt: '2023-07-02 15:00:00'
//     },
//     {
//       dt: 1688320800,
//       main: [Object],
//       weather: [Array],
//       clouds: [Object],
//       wind: [Object],
//       visibility: 10000,
//       pop: 0.77,
//       rain: [Object],
//       sys: [Object],
//       dt_txt: '2023-07-02 18:00:00'
//     },
//     {
//       dt: 1688331600,
//       main: [Object],
//       weather: [Array],
//       clouds: [Object],
//       wind: [Object],
//       visibility: 10000,
//       pop: 1,
//       rain: [Object],
//       sys: [Object],
//       dt_txt: '2023-07-02 21:00:00'
//     },
//     {
//       dt: 1688342400,
//       main: [Object],
//       weather: [Array],
//       clouds: [Object],
//       wind: [Object],
//       visibility: 8915,
//       pop: 1,
//       rain: [Object],
//       sys: [Object],
//       dt_txt: '2023-07-03 00:00:00'
//     },
//     {
//       dt: 1688353200,
//       main: [Object],
//       weather: [Array],
//       clouds: [Object],
//       wind: [Object],
//       visibility: 7461,
//       pop: 1,
//       rain: [Object],
//       sys: [Object],
//       dt_txt: '2023-07-03 03:00:00'
//     },
//     {
//       dt: 1688364000,
//       main: [Object],
//       weather: [Array],
//       clouds: [Object],
//       wind: [Object],
//       visibility: 5860,
//       pop: 1,
//       rain: [Object],
//       sys: [Object],
//       dt_txt: '2023-07-03 06:00:00'
//     },
//     {
//       dt: 1688374800,
//       main: [Object],
//       weather: [Array],
//       clouds: [Object],
//       wind: [Object],
//       visibility: 10000,
//       pop: 1,
//       rain: [Object],
//       sys: [Object],
//       dt_txt: '2023-07-03 09:00:00'
//     },
//     {
//       dt: 1688385600,
//       main: [Object],
//       weather: [Array],
//       clouds: [Object],
//       wind: [Object],
//       visibility: 10000,
//       pop: 1,
//       rain: [Object],
//       sys: [Object],
//       dt_txt: '2023-07-03 12:00:00'
//     },
//     {
//       dt: 1688396400,
//       main: [Object],
//       weather: [Array],
//       clouds: [Object],
//       wind: [Object],
//       visibility: 10000,
//       pop: 1,
//       rain: [Object],
//       sys: [Object],
//       dt_txt: '2023-07-03 15:00:00'
//     },
//     {
//       dt: 1688407200,
//       main: [Object],
//       weather: [Array],
//       clouds: [Object],
//       wind: [Object],
//       visibility: 5354,
//       pop: 1,
//       rain: [Object],
//       sys: [Object],
//       dt_txt: '2023-07-03 18:00:00'
//     },
//     {
//       dt: 1688418000,
//       main: [Object],
//       weather: [Array],
//       clouds: [Object],
//       wind: [Object],
//       visibility: 10000,
//       pop: 1,
//       rain: [Object],
//       sys: [Object],
//       dt_txt: '2023-07-03 21:00:00'
//     },
//     {
//       dt: 1688428800,
//       main: [Object],
//       weather: [Array],
//       clouds: [Object],
//       wind: [Object],
//       visibility: 10000,
//       pop: 1,
//       rain: [Object],
//       sys: [Object],
//       dt_txt: '2023-07-04 00:00:00'
//     },
//     {
//       dt: 1688439600,
//       main: [Object],
//       weather: [Array],
//       clouds: [Object],
//       wind: [Object],
//       visibility: 10000,
//       pop: 1,
//       rain: [Object],
//       sys: [Object],
//       dt_txt: '2023-07-04 03:00:00'
//     },
//     {
//       dt: 1688450400,
//       main: [Object],
//       weather: [Array],
//       clouds: [Object],
//       wind: [Object],
//       visibility: 6952,
//       pop: 1,
//       rain: [Object],
//       sys: [Object],
//       dt_txt: '2023-07-04 06:00:00'
//     },
//     {
//       dt: 1688461200,
//       main: [Object],
//       weather: [Array],
//       clouds: [Object],
//       wind: [Object],
//       visibility: 9811,
//       pop: 0.96,
//       rain: [Object],
//       sys: [Object],
//       dt_txt: '2023-07-04 09:00:00'
//     },
//     {
//       dt: 1688472000,
//       main: [Object],
//       weather: [Array],
//       clouds: [Object],
//       wind: [Object],
//       visibility: 10000,
//       pop: 0.99,
//       rain: [Object],
//       sys: [Object],
//       dt_txt: '2023-07-04 12:00:00'
//     },
//     {
//       dt: 1688482800,
//       main: [Object],
//       weather: [Array],
//       clouds: [Object],
//       wind: [Object],
//       visibility: 10000,
//       pop: 0.82,
//       rain: [Object],
//       sys: [Object],
//       dt_txt: '2023-07-04 15:00:00'
//     },
//     {
//       dt: 1688493600,
//       main: [Object],
//       weather: [Array],
//       clouds: [Object],
//       wind: [Object],
//       visibility: 10000,
//       pop: 0.62,
//       sys: [Object],
//       dt_txt: '2023-07-04 18:00:00'
//     },
//     {
//       dt: 1688504400,
//       main: [Object],
//       weather: [Array],
//       clouds: [Object],
//       wind: [Object],
//       visibility: 10000,
//       pop: 0.52,
//       rain: [Object],
//       sys: [Object],
//       dt_txt: '2023-07-04 21:00:00'
//     },
//     {
//       dt: 1688515200,
//       main: [Object],
//       weather: [Array],
//       clouds: [Object],
//       wind: [Object],
//       visibility: 10000,
//       pop: 0.47,
//       rain: [Object],
//       sys: [Object],
//       dt_txt: '2023-07-05 00:00:00'
//     },
//     {
//       dt: 1688526000,
//       main: [Object],
//       weather: [Array],
//       clouds: [Object],
//       wind: [Object],
//       visibility: 10000,
//       pop: 0.02,
//       sys: [Object],
//       dt_txt: '2023-07-05 03:00:00'
//     },
//     {
//       dt: 1688536800,
//       main: [Object],
//       weather: [Array],
//       clouds: [Object],
//       wind: [Object],
//       visibility: 10000,
//       pop: 0,
//       sys: [Object],
//       dt_txt: '2023-07-05 06:00:00'
//     },
//     {
//       dt: 1688547600,
//       main: [Object],
//       weather: [Array],
//       clouds: [Object],
//       wind: [Object],
//       visibility: 10000,
//       pop: 0.19,
//       sys: [Object],
//       dt_txt: '2023-07-05 09:00:00'
//     },
//     {
//       dt: 1688558400,
//       main: [Object],
//       weather: [Array],
//       clouds: [Object],
//       wind: [Object],
//       visibility: 10000,
//       pop: 0.11,
//       sys: [Object],
//       dt_txt: '2023-07-05 12:00:00'
//     },
//     {
//       dt: 1688569200,
//       main: [Object],
//       weather: [Array],
//       clouds: [Object],
//       wind: [Object],
//       visibility: 10000,
//       pop: 0.12,
//       sys: [Object],
//       dt_txt: '2023-07-05 15:00:00'
//     }
//   ],
//   city: {
//     id: 1264527,
//     name: 'Chennai',
//     coord: { lat: 13.0878, lon: 80.2785 },
//     country: 'IN',
//     population: 4328063,
//     timezone: 19800,
//     sunrise: 1688084141,
//     sunset: 1688130534
//   }
// }

