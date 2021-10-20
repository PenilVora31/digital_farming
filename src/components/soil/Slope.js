import { useState, useEffect, useContext } from "react";
import Form from "../form/horizontal";
import * as ROUTES from "../../constants/routes";
import { Link, useHistory } from "react-router-dom";
import {
  getSoilDetails,
  setUserSoilDetails,
  getUserArea,
} from "../../services/firebase";
import UserContext from "../../context/user";
import { IoArrowBackOutline } from "react-icons/io5";

function Slope() {
  const {
    user: { uid: userId },
  } = useContext(UserContext);
  const history = useHistory();

  const [selectValue, setSelectValue] = useState(null);
  const [inputValue, setInputValue] = useState("0");
  const [priceCost, setPriceCost] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [soilDetails, setSoilDetails] = useState(null);
  const [chemical, setChemical] = useState("");
  const [chemicalAmount, setChemicalAmount] = useState(0);
  const [price, setPrice] = useState(0);
  const [area, setArea] = useState(0);

  useEffect(() => {
    async function fetchData() {
      if (userId) {
        let res = await getUserArea(userId);
        setArea(res);
      }

      let response = await getSoilDetails();

      if (response) {
        setSoilDetails(response);
        const {
          diseases: { slope: disease },
        } = response;
        let cheName = disease.chemical_name;
        let cheAmount = disease.chemical_amount;
        let chePrice = disease.price;
        setChemical(cheName);
        setChemicalAmount(cheAmount);
        setPrice(chePrice);
      }
    }
    fetchData();
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let value = parseInt(inputValue);
    let cost = parseInt(totalCost);
    if (value > 0 && cost > 0) {
      let res = setUserSoilDetails(value, cost, "slope", userId);
      if (res) {
        history.push("/soil/soildisease");
      }
    }
  };
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
      {soilDetails ? (
        <div className="relative  h-full w-full max-w-screen-lg mx-auto md:mt-20 overflow-hidden">
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
          <div className="w-full mx-auto flex md:flex-row flex-col gap-4 items-center rounded-lg overflow-hidden md:mt-12 mt-6 mb-28">
            <div className="md:w-3/5 w-4/5 p-4 py-2  md:mr-8 h-60 bg-green-light shadow-greenLight hover:shadow-none transition-all duration-300 ease-in">
              <h3 className="h3 border-b-2 border-gray-normal mb-2 pb-2">
                Slope
              </h3>
              <div className="pl-2 mt-4 flex flex-col gap-2">
                <p>
                  <span className="p">chemical :</span> {chemical}{" "}
                  {chemicalAmount} Kg/ha
                </p>
                <p>
                  <span className="p">price :</span> {price} Rs. per kg
                </p>
                <p>
                  <span className="p">
                    total required amount for {area} hectare :
                  </span>
                  {chemicalAmount * area}
                </p>
              </div>
            </div>
            <div className="md:w-2/5 w-4/5 md:m-4 mt-5 h-60 bg-white-light shadow-grayNormal  p-4  flex items-center justify-center hover:shadow-none transition-all duration-300 ease-in">
              <Form
                selectObject={selectObject}
                inputObject={inputObject}
                priceObject={priceObject}
                costObject={costObject}
                handleSubmit={handleSubmit}
              />
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default Slope;
