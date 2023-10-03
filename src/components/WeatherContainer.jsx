import { useEffect, useState } from "react"
import { WheatherStatus } from "./WheatherStatus"
import { Clock } from "./Clock"
import bgNames from '../db/bgNames.json'

export const WeatherContainer = ({weather, isDay}) => {

  const [isCelcius, setIsCelcius] = useState(true)
  const [bgs, setBg] = useState({})
  const handleChangeUnit = ()=>{
    setIsCelcius(!isCelcius)
  }  

  const changeUnitTem =(temp)=>{
    if(isCelcius){
      return `${Math.floor(temp -273.15)}°C`
    }else{
      return `${Math.floor(((temp -273.15)*9)/5 + 32)}°F`
    }
  }

  //pasamos el objeto al bgs del useState
  useEffect (()=>{
    const newQuestions =  bgNames
    const copyQuestions = JSON.parse(JSON.stringify(newQuestions))
    setBg(copyQuestions)
  },[])

  const day = new Date().getDay()
  const nameDay = {
    1:'Lunes',
    2:'Martes',
    3:'Miercoles',
    4:'Jueves',
    5:'Viernes',
    6:'Sabado',
    0:'Viernes',

  }
  
  console.log("s",weather)
  return (
    <section className={`${isDay?("text-black"):("text-white")} text-center  grid gap-5 justify-items-center`}>
      <h3 className="text-xl font-semibold bg-slate-400/40 p-1 rounded-lg">{weather.name}, {weather.sys.country}</h3>
        <div className="grid gap-2  md:flex">
          <div className={`grid ${!isDay&&"dark-bg"} gap-5 md:flex rounded-2xl p-8 ${bgs[weather.weather[0].icon]}`}>
            {/* section superior */}
            <article className="grid grid-cols-2 items-center p-3 blur-background rounded-2xl">
              <h4 className="col-span-2 text-lg capitalize">{weather.weather[0].description}</h4>
              <span className="text-5xl">{changeUnitTem(weather.main.temp)}</span>
              <picture>
                <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}alt="" />
              </picture>
            </article>
            {/* section inferior */}
            <article className="grid grid-cols-3 justify-items-center p-2 py-3 font-semibold md:grid-cols-1 blur-background rounded-2xl">
              <WheatherStatus icon="./images/wind.png" value={weather.wind.speed} unit="m/s"/>
            
              <WheatherStatus icon="./images/humidity.png" value={weather.main.humidity} unit="%"/>

              <WheatherStatus icon="./images/pressure.png" value={weather.main.pressure} unit="hPa"/>
            </article>
          </div>

        
          <article className={`flex place-content-around p-8  ${bgs[weather.weather[0].icon]} rounded-2xl md:flex-col items-center gap-3 ${!isDay&&"dark-bg"}`}>
              <span className="blur-background rounded-lg p-3">Maxima: {changeUnitTem(weather.main.temp_max)}</span>

              <div className="grid blur-background rounded-lg p-3">
                <span>{nameDay[day]}</span>
                <Clock/>
              </div>

              <span className="blur-background rounded-lg p-3">Minima: {changeUnitTem(weather.main.temp_min)}</span>
          </article>
        </div>
        
        <button onClick={handleChangeUnit} className="text-yellow-300 rounded-[10px] font-bold p-3 blur-background2">Convertir a {isCelcius?("F°"):("C°")}</button>

    </section>
  )
}