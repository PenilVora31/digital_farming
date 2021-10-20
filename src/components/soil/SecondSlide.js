import { Link } from "react-router-dom";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import * as ROUTES from "../../constants/routes";
import { IoArrowBackOutline } from "react-icons/io5";
export default function SecondSlide() {
  return (
    <div className="relative bg-white-base  md:max-w-screen-lg max-w-lg mx-auto md:h-33 h-full w-full  flex items-center justify-center mt-8 rounded-lg p-4 ">
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
      <div className="w-1/6 flex justify-start text-3xl">
        <Link to="/soil">
          <BsChevronLeft className="font-bold cursor-pointer" />
        </Link>
      </div>
      <div className="md:w-3/5 w-full flex flex-col pt-4 mt-12">
        <div className="flex md:flex-row flex-col w-full justify-between mb-5 border border-green-normal p-4 rounded">
          <div>
            <h1 className="h3  mb-2">Land Maintain : </h1>
            <p className="p ml-2 ">
              &nbsp; &nbsp; Remove the unnecessary roots and other things of the
              previous crops.
            </p>
          </div>
          <img
            src="/images/land_maintain.png"
            className="w-32 md:ml-4 mx-auto"
            alt="soil"
          />
        </div>
        <div className="flex md:flex-row flex-col w-full justify-between mb-20 border border-green-normal p-4 rounded">
          <div>
            <h1 className="h3 mb-2">Preparation Of Land : </h1>
            <p className="p ml-2 ">
              &nbsp; &nbsp; To increase the storage of rainfall in soil, run-off
              must be controlled and rainwater must be allowed to stand on the
              soil surface even after rainfall is over.
            </p>
          </div>
          <img
            src="/images/soil-preperation.svg"
            className="w-32 md:ml-4 mx-auto"
            alt="climate"
          />
        </div>
      </div>
      <div className="w-1/6 flex justify-end text-3xl">
        <Link to="/soil/soildisease">
          <BsChevronRight className="font-bold cursor-pointer" />
        </Link>
      </div>
    </div>
  );
}
