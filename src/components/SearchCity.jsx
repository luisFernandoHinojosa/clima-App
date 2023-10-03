export const SearchCity = ({searchCity}) => {
  return (
    
        <form className="w-full  flex gap-1 justify-center" action="" onSubmit={searchCity}>
            <input className="w-1/2   rounded-[3px] focus:outline-none text-black" type="text" placeholder="Buscar ubicacion" />
            <button className="bg-red-200 hover:bg-red-300 rounded-[5px] p-1 btnBuscar transition-all duration-300 hover:scale-90">Buscar</button>
        </form>
    
  )
}