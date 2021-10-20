import { useContext, useState } from "react";
import Form from "../form/vertical";
import { Link, useHistory } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import { GoPlus } from "react-icons/go";
import { FaMinus } from "react-icons/fa";
import { setUserFertilizerDetails } from "../../services/firebase";
import UserContext from "../../context/user";
import { IoArrowBackOutline } from "react-icons/io5";
export default function Salt({ handleClick, saltDetails, area }) {
  const {
    user: { uid: userId },
  } = useContext(UserContext);
  const { chemical_name, chemical_amount, cost } = saltDetails;
  const history = useHistory();
  const [selectValue, setSelectValue] = useState(null);
  const [inputValue, setInputValue] = useState("0");
  const [priceCost, setPriceCost] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const handleSubmit = async (e) => {
    e.preventDefault();
    let value = parseInt(inputValue);
    if (value > 0) {
      const response = await setUserFertilizerDetails(
        "salt",
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
    select: false,
    selectName: "",
    selectOptions: [{ name: "nitrogen", price: cost }],
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
  const [show, setShow] = useState(true);
  return (
    <div className="relative bg-white-base flex md:flex-row flex-col  md:mx-auto mx-4 w-full  justify-center items-center mt-8 shadow-lg rounded-2xl hover:shadow-xl transition duration-500 ease-in-out py-16">
      <h1 className="h3 absolute top-0 left-0 px-4 py-2">
        Fertilizer Selection
      </h1>
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
      <div className="md:w-1/2 md:mt-0 mt-8 w-full h-full">
        <h1 className="h3 bg-gray-300 rounded-sm py-2 pt-1 px-3 mx-4 mb-2 flex items-center justify-between">
          purchase gypsum
          <span onClick={() => setShow(!show)} className="mt-2 cursor-pointer">
            {!show ? <GoPlus /> : <FaMinus />}
          </span>
        </h1>
        {show ? (
          <div className="md:pl-6 pl-20 flex">
            <Form
              selectObject={selectObject}
              inputObject={inputObject}
              priceObject={priceObject}
              costObject={costObject}
              handleSubmit={handleSubmit}
            />
          </div>
        ) : null}
      </div>
      <div className="md:w-1/2 md:ml-0 ml-10 md:mt-0 mt-10 w-full  md:m-4">
        <div className="w-full">
          <h1 className="h3 mb-4 text-center">Salty Land</h1>
          <div className="flex w-full">
            <p className="li mb-4 flex w-3/5">Requirment per hectare:</p>
            <p className="leading-7">
              {chemical_amount} kg {chemical_name}
            </p>
          </div>
          <div className="flex w-full">
            <p className="li mb-4 flex  w-3/5">
              Requirment for {area} hectares:
            </p>
            <p className="leading-7 ml-4">
              {chemical_amount} kg {chemical_name} kg Gypsum
            </p>
          </div>
        </div>
        <div className="mt-8 w-full flex flex-col gap-4">
          <div
            onClick={() => handleClick("nitrogen")}
            className="bg-green-primaryDark text-green-base hover:text-green-light w-44 mx-auto h-full  rounded p-4 cursor-pointer"
          >
            <p className="text-center">for nitrogen</p>
          </div>
          <div
            onClick={() => handleClick("south")}
            className="bg-green-primaryDark text-green-base hover:text-green-light w-44 mx-auto h-full  rounded p-4 cursor-pointer"
          >
            <p className="text-center">for south land</p>
          </div>
          <div
            onClick={() => handleClick("see")}
            className="bg-green-primaryDark text-green-base hover:text-green-light w-44 mx-auto h-full  rounded p-4 cursor-pointer"
          >
            <p className="text-center">for see land</p>
          </div>
        </div>
      </div>
    </div>
  );
}
