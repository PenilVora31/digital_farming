import FirstSlide from "../components/soil/FirstSlide";
import { getSoilDetails } from "../services/firebase";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";

export default function Soil() {
  const [soilDetails, setSoilDetails] = useState(null);
  useEffect(() => {
    async function fetchData() {
      let response = await getSoilDetails();
      if (response) {
        setSoilDetails(response);
      }
    }
    fetchData();
  }, []);
  return (
    <div className="max-w-screen-lg mx-auto">
      {soilDetails ? <FirstSlide soilDetails={soilDetails} /> : <Loader />}
    </div>
  );
}
