import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import { BsChevronLeft } from "react-icons/bs";
function SoilDisease() {
  return (
    <div className="relative bg-white-base w-full md:h-33 h-full  md:max-w-screen-lg max-w-screen-sm  mx-auto py-20  mt-8 shadow-grayNormal flex justify-between  items-center rounded-2xl">
      <h1 className="h3 absolute top-0 md:left-0 left-1/4 px-4 py-2">
        Soil preparation
      </h1>
      <div className=" absolute top-9 md:left-14 left-40 py-2  w-14 border-b-2 border-green-primary"></div>
      <Link to={ROUTES.DASHBOARD}>
        <button
          type="button"
          className="absolute left-1/2 transform -translate-x-1/2 bottom-4 border-2 border-gray-normal px-2 py-2 rounded"
        >
          Back
        </button>
      </Link>
      <div className="w-1/6 flex justify-start pl-6 text-3xl">
        <Link to="/soil/secondslide">
          <BsChevronLeft className="font-bold cursor-pointer" />
        </Link>
      </div>
      <div className="w-3/5 flex md:flex-row flex-col md:gap-16 gap-6 justify-center items-center">
        <Link to="/soil/soildisease/pest">
          <div className="rounded border-2 border-green-normal w-36 h-36 flex justify-center items-center h3 my-4 hover:bg-green-base hover:text-white-base">
            Pests
          </div>
        </Link>
        <Link to="/soil/soildisease/rot">
          <div className="rounded border-2 border-green-normal w-36 h-36 flex justify-center items-center h3 my-4 hover:bg-green-base hover:text-white-base">
            Rot
          </div>
        </Link>
        <Link to="/soil/soildisease/slope">
          <div className="rounded border-2 border-green-normal w-36 h-36 flex justify-center items-center h3 my-4 hover:bg-green-base hover:text-white-base">
            Slope
          </div>
        </Link>
      </div>
      <div className="w-1/6 flex justify-start text-3xl"></div>
    </div>
  );
}

export default SoilDisease;
