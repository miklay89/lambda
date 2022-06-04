export default interface Response {
  cod: string;
  message: number;
  cnt: number;
  list: ListWeather[],
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    },
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  }
}

export interface ListWeather {
  dt: Date;
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
  },
  weather: Weather[],
  clouds: {
    all: number;
  },
  wind: {
    speed: number;
    deg: number;
    gust: number;
  },
  visibility: number;
  pop: number;
  sys: {
    pod: string;
  },
  dt_txt: Date;
}

export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}