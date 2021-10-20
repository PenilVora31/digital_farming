import * as ROUTES from "../constants/routes";
import { Link } from "react-router-dom";
import UserContext from "../context/user";
import { useContext, useEffect, useState } from "react";
import { getEstimate } from "../services/firebase";
import Loader from "../components/Loader";
import { IoArrowBackOutline } from "react-icons/io5";
const Estimation = () => {
  // let totalAmount=0;
  const {
    user: { uid: userId },
  } = useContext(UserContext);
  const diseaseNames = ["Alpharot", "Green", "Molo", "Tikka"];
  const fertilizerNames = ["Salt", "See", "South", "Nitrogen"];
  const soilDiseaseNames = ["Rot", "Pest", "Slope"];
  const cropDetailsNames = ["Area", "Crop", "CropType"];
  const [soilDiseaseList, setSoilDiseaseList] = useState(null);
  const [fertilizerList, setFertilizerList] = useState(null);
  const [diseaseList, setDiseaseList] = useState(null);
  const [seedDetails, setSeedDetails] = useState(null);
  const [cropDetails, setCropDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [seedCost, setSeedCost] = useState(0);
  // const [totalAmount, setTotalAmount] = useState(0);
  let totalAmount = 0;
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      if (userId) {
        const response = await getEstimate(userId);
        if (response) {
          const {
            area,
            crop,
            cropType,
            seed,
            disease_alpharot,
            disease_green,
            disease_molo,
            disease_tikka,
            fertilizer_salt,
            fetilizer_see,
            fetilizer_south,
            fetilizer_nitrogen,
            soil_rot,
            soil_pest,
            soil_slope,
          } = response;
          let diseaseArray = [];
          let fertilizerArray = [];
          let soilDiseaseArray = [];
          let cropDetailsArray = [];
          // disease array
          diseaseArray.push(disease_alpharot);
          diseaseArray.push(disease_green);
          diseaseArray.push(disease_molo);
          diseaseArray.push(disease_tikka);
          setDiseaseList(diseaseArray);
          // fertilizer array
          fertilizerArray.push(fertilizer_salt);
          fertilizerArray.push(fetilizer_see);
          fertilizerArray.push(fetilizer_south);
          fertilizerArray.push(fetilizer_nitrogen);
          setFertilizerList(fertilizerArray);
          // soil-disease array
          soilDiseaseArray.push(soil_rot);
          soilDiseaseArray.push(soil_pest);
          soilDiseaseArray.push(soil_slope);
          setSoilDiseaseList(soilDiseaseArray);
          //   seed details
          setSeedDetails(seed);
          setSeedCost(seed.cost);
          //   crop details
          cropDetailsArray.push(area + " hectare");
          cropDetailsArray.push(crop.name);
          cropDetailsArray.push(cropType.name);
          setCropDetails(cropDetailsArray);
          setLoading(false);
        }
      }
    }
    fetchData();
  }, [userId]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="h-full w-full md:max-w-screen-lg max-w-screen-sm mx-auto flex justify-center items-center">
          <div className="relative bg-white-base  flex flex-col md:mx-auto mx-4 w-full  justify-center items-center mt-8 shadow-lg rounded-2xl hover:shadow-xl transition duration-500 ease-in-out md:px-20 md:py-20 px-2 py-8 gap-10">
            <h1 className="h3 absolute top-0 left-0 px-4 py-2">Estimation</h1>
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
            {cropDetails &&
              cropDetails.map((item, index) => {
                return (
                  <div
                    className="flex p-4 relative w-full border-r border-b border-gray-normal rounded shadow-grayNormal transition-shadow duration-100 ease-in hover:shadow-none"
                    key={index}
                  >
                    <h1 className="font-bold">
                      {cropDetailsNames[index]} &nbsp; :
                    </h1>
                    <p>&nbsp; &nbsp;{item} </p>
                  </div>
                );
              })}
            <table className="w-full text-left px-0">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Name</th>
                  <th>Amount (Kg.)</th>
                  <th className="py-4">Price (Rs.) </th>
                </tr>
              </thead>
              <tbody>
                {seedDetails && (
                  <tr className="text-left border-b-2 border-gray-normal">
                    <td className="py-2">Seed</td>
                    <td>{seedDetails.name}</td>
                    <td>{seedDetails.amount}</td>
                    <td>{seedDetails.cost}</td>
                  </tr>
                )}
                {soilDiseaseList &&
                  soilDiseaseList.map((item, index) => {
                    if (item.amount !== 0) {
                      totalAmount = totalAmount + item.cost;

                      return (
                        <tr
                          key={index}
                          className="text-left border-b-2 border-gray-normal"
                        >
                          <td className="py-2">Soil-Disease</td>
                          <td>{soilDiseaseNames[index]}</td>
                          <td>{item.amount}</td>
                          <td>{item.cost}</td>
                        </tr>
                      );
                    }
                    return null;
                  })}
                {fertilizerList &&
                  fertilizerList.map((item, index) => {
                    if (item.amount !== 0) {
                      totalAmount = totalAmount + item.cost;

                      return (
                        <tr
                          key={index}
                          className="text-left border-b-2 border-gray-normal"
                        >
                          <td className="py-2">Fertilizer</td>
                          <td>{fertilizerNames[index]}</td>
                          <td>{item.amount}</td>
                          <td>{item.cost}</td>
                        </tr>
                      );
                    }
                    return null;
                  })}
                {diseaseList &&
                  diseaseList.map((item, index) => {
                    if (item.amount !== 0) {
                      totalAmount = totalAmount + item.cost;
                      return (
                        <tr
                          key={index}
                          className="text-left border-b-2 border-gray-normal"
                        >
                          <td className="py-2">Disease</td>
                          <td>{diseaseNames[index]}</td>
                          <td>{item.amount}</td>
                          <td>{item.cost}</td>
                        </tr>
                      );
                    }
                    return null;
                  })}
              </tbody>
            </table>
            <div className="flex p-4 relative w-full border-r border-b border-gray-normal rounded shadow-grayNormal transition-shadow duration-100 ease-in hover:shadow-none">
              <h1 className="font-bold"> Total Cost &nbsp; : </h1>
              <p>&nbsp; &nbsp; {totalAmount + seedCost}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Estimation;
