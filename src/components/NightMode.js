export function NightMode({setItIsDay, IsDay}){
    console.log("entrerr")
    setItIsDay(!IsDay)
    localStorage.setItem('isDay', !IsDay);
}