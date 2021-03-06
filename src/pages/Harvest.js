import * as ROUTES from "../constants/routes";
import { Link } from "react-router-dom";
import { FaRegHandPointRight } from "react-icons/fa";
import { IoArrowBackOutline } from "react-icons/io5";
import { GoPrimitiveDot } from "react-icons/go";
export default function Harvest() {
  return (
    <div className="h-full w-full max-w-screen-lg mx-auto flex justify-center items-center">
      <div className="relative bg-white-base  flex flex-col md:mx-auto mx-4 w-full  justify-center items-center mt-8 shadow-lg rounded-2xl hover:shadow-xl transition duration-500 ease-in-out md:p-20 p-10 gap-10">
        <h1 className="h3 absolute top-0 left-0 px-4 py-2">Harvesting</h1>
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
              Premature harvesting of groundnut pods lowers the yield, oil
              percentage, and quality of seeds. Delay in harvesting after
              physiological maturity can result in increased Aspergillus flavus
              infection, and aflatoxin contamination in pods/seeds.Therefore, it
              is important to harvest at optimum maturity.
            </p>
          </div>
          <div className="flex p">
            <span className="mt-1 mr-2">
              <FaRegHandPointRight />
            </span>
            <p>There are three method for harvesting.</p>
          </div>
          <ul className="ml-4 flex flex-col gap-2 text-justify">
            <div className="flex p items-center">
              <span className="mr-2">
                <GoPrimitiveDot />
              </span>
              <li>
                Apply sprinkler irrigation for an hour and manually pull the
                plants.
              </li>
            </div>
            <div className="flex p items-center">
              <span className="mr-2">
                <GoPrimitiveDot />
              </span>
              <li>
                Provide light surface irrigation 2 ??? 3 days before harvest and
                use a blade harrow that cuts the plant roots 1 2 ??? 1 5 cm below
                the soil surface. Then manually pull the plants.
              </li>
            </div>
            <div className="flex p items-center">
              <span className="mr-2">
                <GoPrimitiveDot />
              </span>
              <li>
                When irrigation water is scarce, use a plow or tractor-driven
                digger to loosen the soil. Then manually remove the plants.
              </li>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
}
