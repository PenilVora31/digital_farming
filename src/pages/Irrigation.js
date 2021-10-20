import * as ROUTES from "../constants/routes";
import { Link } from "react-router-dom";
import { FaRegHandPointRight } from "react-icons/fa";
import { IoArrowBackOutline } from "react-icons/io5";
export default function Irrigation() {
  return (
    <div className="h-full w-full max-w-screen-lg mx-auto flex justify-center items-center">
      <div className="relative bg-white-base  flex flex-col md:mx-auto mx-4 w-full  justify-center items-center mt-8 shadow-lg rounded-2xl hover:shadow-xl transition duration-500 ease-in-out md:p-20 p-10 gap-10">
        <h1 className="h3 absolute top-0 left-0 px-4 py-2">Irrigation</h1>
        <div className="absolute top-9 left-14 py-2  w-14 border-b-2 border-green-primary"></div>
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
        <div className="flex flex-col gap-8 text-justify">
          <div className="flex p">
            <span className="mt-1 mr-2">
              <FaRegHandPointRight />
            </span>
            <p>
              It is advisable to sow the crop with pre-sowing irrigation, or
              else apply one post sowing irrigation to facilitate germination.
            </p>
          </div>
          <div className="flex p">
            <span className="mt-1 mr-2">
              <FaRegHandPointRight />
            </span>
            <p>
              Subsequently, provide irrigation at 10-15 days interval depending
              upon soil and weather conditions.
            </p>
          </div>
          <div className="flex p">
            <span className="mt-1 mr-2">
              <FaRegHandPointRight />
            </span>
            <p>
              Groundnut yields will be reduced if the upper soil zone becomes
              dry from flowering through pod development.
            </p>
          </div>
          <div className="flex p">
            <span className="mt-1 mr-2">
              <FaRegHandPointRight />
            </span>
            <p>
              Fewer and smaller leaves with small compact cells and shorter
              stems. Water deficit from sowing to 67 days delays the period of
              rapid fruit growth by 10 days and decreases yield.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
