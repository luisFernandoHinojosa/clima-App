import { useEffect, useState } from "react"

export const Clock = () => {
    const [time, setTime] = useState(new Date())
    useEffect(()=>{
        const interval = setInterval(()=>{
            setTime(new Date())
        },1000)
        return ()=>clearInterval(interval)
    },[])

    const hours = time.getHours()
    const minutes = time.getMinutes()
    const formatHours = hours <10 ?`0${hours}`:hours
    const formatMinutes = minutes < 10 ? `0${minutes}` : minutes;
  return (
    <span>{`${formatHours}: ${formatMinutes}`}</span>
  )
}