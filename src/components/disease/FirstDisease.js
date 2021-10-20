import { useContext, useEffect, useState } from "react";
import Form from "../form/vertical";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import { CgClose } from "react-icons/cg";
import UserContext from "../../context/user";
import { setUserCropDiseasesDetails } from "../../services/firebase";
import { useHistory } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";
import { getUserArea } from "../../services/firebase";
export default function FirstDisease() {
  const {
    user: { uid: userId },
  } = useContext(UserContext);
  const history = useHistory();
  const [showForm, setShowForm] = useState(false);
  const [selectValue, setSelectValue] = useState(null);
  const [inputValue, setInputValue] = useState("0");
  const [priceCost, setPriceCost] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [area, setArea] = useState(0);
  const handleSubmit = async (e) => {
    e.preventDefault();
    let value = parseInt(inputValue);
    let cost = parseInt(totalCost);
    if (value > 0 && cost > 0) {
      const response = await setUserCropDiseasesDetails(
        "disease_alpharot",
        value,
        cost,
        userId
      );
      if (response === false) {
        console.log("try again later");
      } else {
        history.push(ROUTES.DASHBOARD);
      }
    }
  };

  useEffect(() => {
    async function fetchData() {
      let value = await getUserArea();
      if (value) {
        setArea(value);
      }
    }
    fetchData();
  }, [userId]);

  let selectObject = {
    select: false,
    selectName: "",
    selectOptions: [{ name: "nitrogen", price: 10 }],
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
      {showForm ? (
        <div className="h-full w-full md:max-w-screen-lg max-w-screen-md mx-auto  flex justify-center items-center">
          <div className="relative bg-white-base  flex  md:mx-auto mx-4 w-full   justify-center items-center mt-8 shadow-lg rounded-2xl hover:shadow-xl transition duration-500 ease-in-out py-20 px-10">
            <h1 className="h3 absolute top-0 left-0 px-4 py-2">
              Disease Management
            </h1>
            <div className="absolute top-9 left-14 py-2  w-14 border-b-2 border-green-primary"></div>
            <Link to={ROUTES.DASHBOARD}>
              <button
                type="button"
                className="absolute left-1/2 transform -translate-x-1/2 bottom-4 border-2 border-gray-normal px-2 py-2 rounded"
              >
                Back
              </button>
            </Link>
            <div className="absolute  top-1/2 left-1/2 md:w-1/2 w-4/5 h-auto transform -translate-x-1/2 -translate-y-1/2   bg-green-normal z-20  border-2 pl-20 py-8 rounded-lg">
              <Form
                selectObject={selectObject}
                inputObject={inputObject}
                priceObject={priceObject}
                costObject={costObject}
                handleSubmit={handleSubmit}
              />

              <h1
                onClick={() => setShowForm(!showForm)}
                className="h3 absolute top-2 right-2 cursor-pointer"
              >
                <CgClose />
              </h1>
            </div>
            <div className="w-full py-8 px-4 opacity-40">
              <h1 className="h3">Alpharot</h1>
              <div className="ml-4 mt-2 flex flex-col gap-1">
                <p className="p">At the time of sowing given trycode oilcake</p>
                <p className="p">if crop required more water than give it.</p>
                <p className="p">when the crop is ready , Pruning it.</p>
                <p className="p">
                  At the time of harvesting differenciate the dirty and good
                  grains.
                </p>
                <h2>medicine name : trycode castor oilcake</h2>
                <h2>medicine price : 460</h2>
                <h2>medicine amount : 2.5 kg</h2>
                <h2>required amount : {area * 2.5} kg</h2>
                <div className="flex mt-4">
                  <button
                    onClick={() => setShowForm(!showForm)}
                    className="inline-block border-2 border-gray-normal rounded px-3 py-2 mt-4"
                    disabled={showForm}
                  >
                    purchase
                  </button>
                </div>
              </div>
            </div>
            <div className="w-1/4 md:block hidden h-full relative opacity-40">
              <img
                src="/images/disease_alpharot.png"
                className="h-full w-full"
                alt=""
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="h-full w-full md:max-w-screen-lg max-w-screen-sm mx-auto flex justify-center items-center">
          <div className="relative bg-white-base  flex  md:mx-auto mx-4 w-full  justify-center items-center mt-8 shadow-lg rounded-2xl hover:shadow-xl transition duration-500 ease-in-out py-20 px-10">
            <h1 className="h3 absolute top-0 left-0 px-4 py-2">
              Disease Management
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
            <div className="w-full py-8 px-4">
              <h1 className="h3">Alpharot</h1>
              <div className="ml-4 mt-2  flex flex-col gap-1">
                <p className="p">At the time of sowing given trycode oilcake</p>
                <p className="p">if crop required more water than give it.</p>
                <p className="p">when the crop is ready , Pruning it.</p>
                <p className="p">
                  At the time of harvesting differenciate the dirty and good
                  grains.
                </p>
                <h2>medicine name : trycode castor oilcake</h2>
                <h2>medicine price : 460</h2>
                <h2>medicine amount : 2.5 kg</h2>
                <h2>required amount : {area * 2.5} kg</h2>
                <div className="flex mt-4">
                  <button
                    onClick={() => setShowForm(!showForm)}
                    className="cursor-pointer inline-block border-2 border-gray-normal rounded px-3 py-2 mt-4"
                  >
                    purchase
                  </button>
                </div>
              </div>
            </div>
            <div className="w-1/4 md:block hidden h-full relative">
              <img
                src="/images/disease_alpharot.png"
                className="h-full w-full"
                alt=""
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
