import { useEffect } from "react";

export function RecoverDarkMode(setItIsDay, IsDay){
    useEffect (()=>{
        const recoverMode = localStorage.getItem('isDay')
        if(recoverMode !== null){
            setItIsDay(recoverMode==='true')
        }
    },[IsDay])

}