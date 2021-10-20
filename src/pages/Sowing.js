import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../constants/routes";
import { getSeedSowingDetails } from "../services/firebase";
import UserContext from "../context/user";
import Loader from "../components/Loader";
import { IoArrowBackOutline } from "react-icons/io5";
export default function Sowing() {
  const {
    user: { uid: userId },
  } = useContext(UserContext);
  const [sowingDetails, SetSowingDetails] = useState(null);
  const [sowingTime, SetSowingTime] = useState(null);

  useEffect(() => {
    async function fetchData() {
      if (userId) {
        const response = await getSeedSowingDetails(userId);
        if (response) {
          SetSowingTime(response.time);
          SetSowingDetails(response.seedSowingDetails);
        }
      }
    }
    fetchData();
  }, [userId]);

  return (
    <>
      {sowingDetails != null && sowingTime != null ? (
        <div className="h-full w-full md:max-w-screen-lg max-w-screen-md mx-auto flex justify-center items-center">
          <div className="relative bg-white-base  flex flex-col  md:mx-auto mx-4 w-full  justify-center items-center mt-4 shadow-lg rounded-2xl hover:shadow-xl transition duration-500 ease-in-out py-2">
            <h1 className="h3 absolute top-0 left-0 px-4 py-2">Seed Sowing</h1>
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
            <div className="grid grid-cols-2 gap-4 md:mt-0 mt-20">
              <div className="w-64 flex justify-center items-center">
                <img
                  src="images/seed_sowing_time_duration.png"
                  alt="seed sowing time"
                />
              </div>
              <div className="flex flex-col justify-center px-4">
                <h1 className="text-3xl font-bold mb-4">seed sowing timing</h1>
                <h1 className="mb-2">
                  sowing time: <span> {sowingTime} </span>
                </h1>
                <h1 className="mb-2">
                  sowing method: <span>by drill method </span>
                </h1>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-16 pt-8">
              <div className="flex flex-col justify-center  px-4">
                <h1 className="text-3xl font-bold mb-4">seed sowing details</h1>
                <h1 className="mb-2">
                  row spacing:{" "}
                  <span>{sowingDetails.rowSpacing} centimeters </span>
                </h1>
                <h1 className="mb-2">
                  seed spacing:{" "}
                  <span>{sowingDetails.seedSpacing} centimeters </span>
                </h1>
                <h1 className="mb-2">
                  rate of seeds (per hectore):
                  <span>{sowingDetails.rateOfSeeds} Kilograms</span>
                </h1>
                <h1 className="mb-2">
                  ideal plant no: <span> {sowingDetails.plants} laks </span>
                </h1>
              </div>
              <div className="w-64 flex justify-center items-center">
                <img
                  src="images/seed_sowing.jpg"
                  alt="seed sowing"
                  className="md:ml-16 ml-0"
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}
