import { useEffect } from "react";
import { useState } from "react";
import "./App.css";
import axios from "axios";
import { WeatherContainer } from "./components/WeatherContainer";
import { ThreeDots } from "react-loader-spinner";
import { Header } from "./components/Header";
import {RecoverDarkMode} from './components/RecoverDarkMode'


function App() {
  const [weather, setWeather] = useState(null);
  const [nameCity, setNameCity] = useState("");
  const [IsDay, setItIsDay] = useState(checkIsDay);

  RecoverDarkMode(setItIsDay, IsDay)

  const getLanguage = () => {
    const userLanguage = navigator.language;
    return userLanguage;
  };

 
  function checkIsDay() {
    if (weather?.sys.sunrise && weather?.sys.sunset) {
      return weather.dt > weather.sys.sunrise && weather.dt < weather.sys.sunset;
    }
    return true; 
  }

  useEffect(() => {
    if (weather?.sys.sunrise && weather?.sys.sunset) {
      if (weather.dt > weather.sys.sunrise && weather.dt < weather.sys.sunset) {
        setItIsDay(true);
      } else {
        setItIsDay(false);
      }
    }
  }, [weather]);

  //con este useState obtendo la un=bicacion del pais que busco
  useEffect(() => {
    const lang = getLanguage();
    const API_KEY_CITY = "55187f2319b55af397c7fb2a3bb54fa1";
    if (nameCity !== "") {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${nameCity}&appid=${API_KEY_CITY}&lang=${lang}`
        )
        .then(({ data }) =>setWeather(data))
        .catch((err) => console.log(err));
    }
  }, [nameCity]);

  //aqui saco mi abicacion local
  const success = (pos) => {
    //console.log(pos)
    const latitude = pos.coords.latitude;
    const longitude = pos.coords.longitude;
    const API_KEY = "55187f2319b55af397c7fb2a3bb54fa1";
    const lang = getLanguage();

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&lang=${lang}`
      )
      .then(({ data }) => setWeather(data))
      .catch((err) => console.log(err));
  };

  //pide ubicacion de la people
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
  }, []);

  //ponemos la ciudad al useState con el input
  const searchCity = (e) => {
    e.preventDefault();
    setNameCity(e.target[0].value);
    e.target.reset();
  };

  return (
    <>
    {weather !== null&&(
      <head className={`fixed flex flex-col w-full ${IsDay?("bg-red-950/20"):("bg-[#34345e]")}   py-4 `}>
        <Header searchCity={searchCity} setItIsDay={setItIsDay} IsDay={IsDay}/>
      </head>)}

      <main className={`font-["Lato"] flex flex-col justify-center items-center min-h-screen ${IsDay?("gradient-bg"):("bg-[#171733]")} gap-5 p-1`}>
        {weather === null ? (
          <div className="flex justify-center items-center flex-col ">
            <img src="./images/loader.webp" alt="" />
            <ThreeDots
              height="80"
              width="80"
              color="#0EAAF7"
              ariaLabel="three-dots-loading"
            />
          </div>
        ) : (
          <>
            <WeatherContainer weather={weather} isDay={IsDay} />
          </>
        )}
      </main>
    </>
  );
}

export default App;
