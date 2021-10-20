import { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import * as ROUTES from "../constants/routes";
import Form from "../components/form/vertical";
import {
  getSeeds,
  setUserSeedDetails,
  getUserArea,
  getSeedSowingDetails,
} from "../services/firebase";
import { Link } from "react-router-dom";
import { FaRegHandPointRight } from "react-icons/fa";
import UserContext from "../context/user";
import Loader from "../components/Loader";
import { IoArrowBackOutline } from "react-icons/io5";
export default function Seed() {
  const {
    user: { uid: userId },
  } = useContext(UserContext);

  const [seed, setSeed] = useState(null);
  const [seeds, setSeeds] = useState(null);
  const [seedDetails, setSeedDetails] = useState(null);
  const [selectValue, setSelectValue] = useState(null);
  const [inputValue, setInputValue] = useState("0");
  const [priceCost, setPriceCost] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [area, setArea] = useState(0);
  const [seedRate, setSeedRate] = useState(null);
  const history = useHistory();
  // let isInValid = seed === "";

  useEffect(() => {
    // for fetch seeds details from firebase
    async function fetchData() {
      // get user area and seed rate per hactare
      if (userId) {
        let res = await getUserArea(userId);

        setArea(res);
      }
      // get seed rate per hactare
      if (userId) {
        let {
          seedSowingDetails: { rateOfSeeds },
        } = await getSeedSowingDetails(userId);

        if (rateOfSeeds) {
          setSeedRate(rateOfSeeds);
        }
      }

      let response = await getSeeds(userId);

      if (response) {
        let entries = Object.entries(response);
        // for seed with price
        if (entries) {
          let seedsWithPrice = entries.map((item) => {
            return {
              name: item[0],
              price: item[1].price,
            };
          });
          setSeeds(seedsWithPrice);
        }
        // for seed's other details
        let seedsWithDetails = [];
        if (entries) {
          seedsWithDetails = entries.map((item) => {
            return {
              name: item[0],
              duration: item[1].duration,
              color: item[1].color,
              size: item[1].size,
              properties: item[1].properties,
            };
          });
          setSeedDetails(seedsWithDetails);
        }
        // if select value is null [ not select any seed yet]
        if (entries && selectValue === null) {
          if (seedsWithDetails) {
            setSelectValue(seedsWithDetails[0].name);
          }
        }
      }
    }

    //  for display seeds details
    function seedData() {
      if (seedDetails) {
        let singleSeedDetails = seedDetails.find(
          (item) => item.name === selectValue
        );
        setSeed(singleSeedDetails);
      }
    }

    seedData();

    if (seedDetails === null) {
      fetchData();
    }
  }, [seedDetails, selectValue, userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let value = parseInt(inputValue);
    if (value > 0) {
      const response = await setUserSeedDetails(
        selectValue,
        value,
        totalCost,
        userId
      );
      if (response !== true) {
        console.log(response);
      } else {
        history.push(ROUTES.DASHBOARD);
      }
    }
  };

  let selectObject = {
    select: true,
    selectName: "Seed",
    selectOptions: seeds,
    selectValue,
    setSelectValue,
  };

  let inputObject = {
    input: true,
    inputName: "amount",
    inputValue,
    setInputValue,
  };
  let priceObject = {
    price: true,
    priceName: "price",
    priceCost,
    setPriceCost,
  };
  let costObject = {
    cost: true,
    costName: "total cost",
    totalCost,
    setTotalCost,
  };
  return (
    <>
      {seeds && seed ? (
        <div className="h-full w-full max-w-screen-lg mx-auto flex justify-center items-center">
          <div className="relative bg-white-base  flex md:flex-row flex-col mx-4  md:mx-auto w-full  justify-center items-center mt-8 shadow-lg rounded-2xl hover:shadow-xl transition duration-500 ease-in-out py-20">
            <h1 className="h3 absolute top-0 md:left-0 left-1/4 px-4 py-2">
              Seed Selection
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
            <div className="md:w-1/2 md:ml-0  ml-20 w-full h-full ">
              <Form
                selectObject={selectObject}
                inputObject={inputObject}
                priceObject={priceObject}
                costObject={costObject}
                handleSubmit={handleSubmit}
              ></Form>
            </div>
            <div className="md:w-1/2 ms:px-0 px-4 w-full grid gap-4 m-4">
              <div className="flex   items-center bg-green-200 p-3 shadow-md transition-all duration-300 ease-in hover:shadow-none">
                <span className="mr-3 p">
                  <FaRegHandPointRight />
                </span>
                <p className="p">
                  time duration: {seed.duration} - {seed.duration + 5} days
                </p>
              </div>
              <div className="flex items-center bg-green-200 p-3 shadow-md transition-all duration-300 ease-in hover:shadow-none">
                <span className="mr-3 p">
                  <FaRegHandPointRight />
                </span>
                <p className="p">color: {seed.color} ,</p>
                <p className="p">&nbsp; size: {seed.size}</p>
              </div>
              <div className="flex items-center bg-green-200 p-3 shadow-md transition-all duration-300 ease-in hover:shadow-none">
                <span className="mr-3 p">
                  <FaRegHandPointRight />
                </span>
                <p className="p">
                  required rate of seeds per hectare: {seedRate} Kg
                </p>
              </div>
              <div className="flex items-center bg-green-200 p-3 shadow-md transition-all duration-300 ease-in hover:shadow-none">
                <span className="mr-3 p">
                  <FaRegHandPointRight />
                </span>
                <p className="p">
                  required amount for {area} ha: {area * seedRate} kg
                </p>
              </div>
              <div className="flex items-center bg-green-200 p-3 shadow-md transition-all duration-300 ease-in hover:shadow-none">
                <span className="mr-3 p">
                  <FaRegHandPointRight />
                </span>
                <p className="p">properties: {seed.properties}</p>
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
