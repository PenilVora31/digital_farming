import * as ROUTES from "../constants/routes";
import { Link } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";

export default function Disease() {
  return (
    <div className="h-full w-full md:max-w-screen-lg max-w-screen-sm  mx-auto md:flex justify-center items-center">
      <div className="relative bg-white-base  flex md:flex-row flex-col gap-12 mx-auto md:w-full w-4/5 items-center mt-8 shadow-lg rounded-2xl hover:shadow-xl transition duration-500 ease-in-out py-32 md:px-8 md:mb-0 mb-4">
        <h1 className="h3 absolute top-0 md:left-0 left-1/3 px-4 py-2">
          Disease Management
        </h1>
        <div className="absolute top-9 md:left-14 left-1/3 py-2  w-14 border-b-2 border-green-primary"></div>
        <h1 className="h3 absolute top-0 md:left-0 left-1/3 px-4 py-2">
          Disease Management
        </h1>
        <div className="absolute top-9 md:left-14 left-1/3 py-2  w-14 border-b-2 border-green-primary"></div>
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

        <Link to="/disease/firstdisease">
          <div className="bg-white-normal w-40 h-40 rounded shadow-lg flex flex-col items-center justify-between py-1">
            <img
              src="/images/disease_alpharot.png"
              alt="imgaes"
              className="w-full h-25"
            />
            <h1 className="p mb-1">Alpharot</h1>
          </div>
        </Link>

        <Link to="/disease/seconddisease">
          <div className="bg-white-normal w-40 h-40 rounded shadow-lg flex flex-col items-center justify-between py-1">
            <img
              src="/images/disease_tikka.png"
              alt="imgaes"
              className="w-full h-30 "
            />
            <h1 className="p">Tikka And Gairu</h1>
          </div>
        </Link>

        <Link to="/disease/thirddisease">
          <div className="bg-white-normal w-40 h-40 rounded shadow-lg flex flex-col items-center justify-between py-1">
            <img
              src="/images/disease_molo_pests.jpg"
              alt="imgaes"
              className="w-full h-25"
            />
            <h1 className="p ">Molo Pests</h1>
          </div>
        </Link>

        <Link to="/disease/fourthdisease">
          <div className="bg-white-normal w-40 h-40 rounded shadow-lg flex flex-col items-center justify-between py-1">
            <img
              src="/images/disease_green.png"
              alt="imgaes"
              className="w-full h-30"
            />
            <h1 className="p mt-2">Green Caterpillar</h1>
          </div>
        </Link>
      </div>
    </div>
  );
}
