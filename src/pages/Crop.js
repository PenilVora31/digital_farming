import { useContext, useEffect, useState } from "react";
import UserContext from "../context/user";
import { useHistory } from "react-router-dom";
import * as ROUTES from "../constants/routes";
import { IoArrowBackOutline } from "react-icons/io5";
import {
  getCrops,
  getCropTypes,
  setUserCropDetails,
} from "../services/firebase";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
export default function Crop() {
  const {
    user: { uid: userId },
  } = useContext(UserContext);
  const [cropsList, setCropsList] = useState([]);
  const [cropTypesList, setCropTypesList] = useState([]);
  const [crop, setCrop] = useState(null);
  const [cropType, setCropType] = useState(null);
  const [area, setArea] = useState(0);
  const history = useHistory();
  let isInValid = area === 0 || area === "";
  const handleSubmit = async (e) => {
    e.preventDefault();
    let Area = parseInt(area);
    if (Area) {
      let cropTypeId = cropTypesList.find((item) => item.name === cropType);
      if (cropTypeId) {
        cropTypeId = cropTypeId.docId;
        try {
          let res = await setUserCropDetails(
            Area,
            crop,
            cropType,
            cropTypeId,
            userId
          );
          if (res) {
            // set area in local storage
            localStorage.setItem("UserArea", JSON.stringify(Area));
            history.push(ROUTES.DASHBOARD);
          } else {
            console.log("something happend");
          }
        } catch (err) {
          console.log(err.message);
        }
      } else {
        console.log("crop type id doesnt exist");
      }
    }
  };

  useEffect(() => {
    async function fetchData() {
      const cropResponse = await getCrops();
      const cropTypesResponse = await getCropTypes();
      if (cropResponse && cropTypesResponse) {
        let cropsDetails = cropResponse.map((item) => {
          return { id: item.id, name: item.name, docId: item.docId };
        });
        let cropTypesDetails = cropTypesResponse.map((item) => {
          return { name: item.name, docId: item.docId };
        });
        setCropsList(cropsDetails);
        setCropTypesList(cropTypesDetails);

        if (
          cropsDetails &&
          cropTypesDetails &&
          crop === null &&
          cropType === null
        ) {
          setCrop(cropsDetails[0].name);
          setCropType(cropTypesDetails[0].name);
        }
      }
    }
    if (cropsList.length === 0 && cropTypesList.length === 0) {
      fetchData();
    }
  }, [cropsList, cropTypesList, crop, cropType]);
  return (
    <>
      {cropsList.length > 0 && cropTypesList.length > 0 ? (
        <div className="flex mx-auto h-full w-full justify-center items-center mt-8">
          <div className="relative flex md:w-4/5 md:h-4/5 md:m-0 w-full h-full m-4 py-4 justify-center items-center bg-white-base shadow-grayNormal rounded-2xl hover:shadow-xl transition duration-500 ease-in-out">
            <h1 className="h3 absolute top-0 md:left-0 left-1/4 px-4 py-2">
              Crop Selection
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
            <div className="md:w-1/2 md:mx-0 mx-2 w-full h-full flex justify-center  border border-gray-300 rounded-md my-16">
              <form onSubmit={handleSubmit} className="w-full p-4">
                <div>
                  <img
                    src="/images/crop.svg"
                    alt="crop"
                    className="w-16 mx-auto mb-4"
                  />
                  <div className="mb-4 grid grid-cols-2">
                    <label htmlFor="crops" className="p mr-2">
                      Select a Crop :
                    </label>
                    <select
                      name="crops"
                      id="crops"
                      className="bg-transparent pb-1 border-b-2  border-gray-normal focus:outline-none  focus:ring-1 focus:ring-green-base"
                      onChange={({ target }) => setCrop(target.value)}
                      value={crop || "select"}
                    >
                      {cropsList.map((item, index) => {
                        return (
                          <option value={item.name} key={index}>
                            {item.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="mb-4 grid grid-cols-2">
                    <label htmlFor="crops" className="p font-semibold mr-2">
                      Select a Crop Type :
                    </label>
                    <select
                      name="crops"
                      id="crops"
                      className="bg-transparent pb-1 border-b-2  border-gray-normal focus:outline-none  focus:ring-1 focus:ring-green-base"
                      onChange={({ target }) => setCropType(target.value)}
                      value={cropType || "select"}
                    >
                      {cropTypesList.map((item, index) => {
                        return (
                          <option value={item.name} key={index}>
                            {item.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="mb-4 grid grid-cols-2">
                    <label htmlFor="crops" className="p font-semibold mr-2">
                      Enter Land Area :
                      <div className="mt-1">[ in hectare (ha) ]</div>
                    </label>
                    <input
                      type="number"
                      name="crops"
                      id="crops"
                      className="bg-transparent border-b-2 pl-2  border-gray-normal focus:outline-none  focus:ring-1 focus:ring-green-base"
                      placeholder="Enter area"
                      onChange={({ target }) => setArea(target.value)}
                      value={area}
                    ></input>
                  </div>
                </div>
                <div className="text-center mt-16">
                  <button
                    type="submit"
                    className={`font-semibold rounded-br-2xl border border-gray-normal transform scale-100  border-b-4 border-r-2 px-4 py-2 focus:outline-none focus:ring-1 focus:ring-green-base ${
                      isInValid && "opacity-50"
                    } ${
                      !isInValid &&
                      "hover:scale-110 transition duration-300 ease-out"
                    } `}
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}
