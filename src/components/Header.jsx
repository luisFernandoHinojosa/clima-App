import { SearchCity } from "./SearchCity";
import { NightMode } from "./NightMode";
import "boxicons";

export const Header = ({ searchCity, setItIsDay, IsDay }) => {
  return (
    <nav className="w-full grid grid-rows-1 text-white">
      <div className="flex  place-content-between px-2">
        <div className="flex gap-1/2 ">
          <h1 className="text-lg">WeaterApp</h1>
          <span><i class='bx bxl-google-cloud text-3xl text-blue-400'></i></span>

        </div>
        <SearchCity searchCity={searchCity} />
        <button onClick={() => NightMode({ setItIsDay, IsDay })}>
          {IsDay ? (
            <i className="bx bx-moon text-3xl"></i>
          ) : (
            <i className="bx bxs-sun text-3xl"></i>
          )}
        </button>
      </div>
    </nav>
  );
};
