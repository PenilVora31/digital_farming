import { useEffect } from "react";
import { Link } from "react-router-dom";
import { BsChevronRight } from "react-icons/bs";
import * as ROUTES from "../../constants/routes";
import { IoArrowBackOutline } from "react-icons/io5";
export default function FirstSlide({ soilDetails }) {
  let quality = soilDetails.quality;
  let pH = soilDetails.pH;
  let temperature = soilDetails.temperature;
  useEffect(() => {}, []);
  return (
    <div className="relative bg-white-base md:h-33  h-full w-full flex items-center justify-center mt-8 rounded-lg p-4">
      <h1 className="h3 absolute top-0 md:left-0 left-1/4 px-4 py-2">
        Soil preparation
      </h1>
      <div className="absolute top-9 md:left-14 left-40 py-2  w-14 border-b-2 border-green-primary"></div>
      <Link to={ROUTES.DASHBOARD}>
        <button
          type="button"
          className="absolute left-1/2 transform -translate-x-1/2 bottom-4 border-2 border-gray-normal px-2 py-2 rounded flex items-center justify-between  hover:border-green-base hover:scale-110     transition-all duration-300 ease-linear"
        >
          <span className="mr-2 text-lg">
            <IoArrowBackOutline />
          </span>
          Back
        </button>
      </Link>
      <div className="w-1/6  md:flex hidden justify-start text-3xl">
        {/* <BsChevronLeft className="font-bold cursor-pointer" /> */}
      </div>
      <div className="md:w-3/5 w-full flex flex-col pt-4 mt-12">
        <div className="flex md:flex-row flex-col w-full justify-between mb-5 border border-green-normal p-4 rounded">
          <div>
            <h1 className="h3 mb-2">Soil Quality : </h1>
            <p className="p ml-2">{quality.join(" , ")}</p>
          </div>
          <img
            src="/images/soil.svg"
            className="w-32 md:ml-4 md:mt-0 mt-2 mx-auto"
            alt="soil"
          />
        </div>
        <div className="flex md:flex-row flex-col w-full justify-between mb-20 border border-green-normal p-4 rounded">
          <div>
            <h1 className="h3 mb-2">Climate Requirements : </h1>
            <p className="p ml-2">pH : {pH.join(" - ")}</p>
            <p className="p ml-2"> ideal temprature : {temperature} ℃</p>
          </div>
          <img
            src="/images/climate.svg"
            className="w-32 md:ml-4 md:mt-0 mt-2 mx-auto"
            alt="climate"
          />
        </div>
      </div>
      <div className="w-1/6 flex justify-end text-3xl">
        <Link to="/soil/secondslide">
          <BsChevronRight className="font-bold cursor-pointer" />
        </Link>
      </div>
    </div>
  );
}
