'use client'

import Image from "next/image";
import Navbar from "./components/Navbar";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { format, parse, parseISO } from "date-fns";

//https://api.openweathermap.org/data/2.5/forecast?q=mumbai&appid=34bfbe6dd9a694547bc6a2bdd93b2eee

interface WeatherData {
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
      icon: string;
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

export default function Home() {

  const { isLoading, error, data } = useQuery<WeatherData>({
    queryKey: ['repoData'],
    queryFn: async() =>
    {
      const {data} = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=mumbai&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=56`);
      return data;
    }
  });

  const firstData = data?.list[0];

  
  console.log('dt_txt:', firstData?.dt_txt);


  console.log('data', data);

  if (isLoading) return <div className="flex items-center justify-center min-h-screen">
    <p className="animate-bounce">Loading...</p>
  </div>
  return (
    <div className="flex flex-col gap-4 bg-gray-100 min-h-screen">
      <Navbar />
      <main className="px-3 mx-auto max-w-7xl flex flex-col gap-9 w-full pb-10 pt-4">
        {/* today container */}
        <section>
          
          <div>
            <h2 className="flex gap-1 items-end text-2xl">
              <p>{format(parseISO(firstData?.dt_txt?? ''), "EEEE")}</p>
              {/* <p>{day}</p> */}
            </h2>
          </div>

        </section>
        {/* seven days container */}
        <section></section>
      </main>
    </div>
  );
}
