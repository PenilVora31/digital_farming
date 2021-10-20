import { useContext, useEffect, useState } from "react";
import Nitrogen from "../components/fertilizer/Nitrogen";
import Salt from "../components/fertilizer/Salt";
import South from "../components/fertilizer/South";
import See from "../components/fertilizer/See";
import { getFertilizerDetails, getUserArea } from "../services/firebase";
import UserContext from "../context/user";
import Loader from "../components/Loader";
export default function Fertilizer() {
  const {
    user: { uid: userId },
  } = useContext(UserContext);
  const [nitrogen, setNitrogen] = useState(true);
  const [salt, setSalt] = useState(false);
  const [south, setSouth] = useState(false);
  const [see, setSee] = useState(false);
  const [nitrogenDetails, setNitrogenDetails] = useState(null);
  const [seeDetails, setSeeDetails] = useState(null);
  const [southDetails, setSouthDetails] = useState(null);
  const [saltDetails, setSaltDetails] = useState(null);
  const [area, setArea] = useState(0);
  const handleClick = (value) => {
    if (value === "salt") {
      setSalt(true);
      setNitrogen(false);
      setSouth(false);
      setSee(false);
    }
    if (value === "south") {
      setSalt(false);
      setNitrogen(false);
      setSouth(true);
      setSee(false);
    }
    if (value === "see") {
      setSalt(false);
      setNitrogen(false);
      setSouth(false);
      setSee(true);
    }
    if (value === "nitrogen") {
      setSalt(false);
      setNitrogen(true);
      setSouth(false);
      setSee(false);
    }
  };

  useEffect(() => {
    async function fetchData() {
      // get user area and seed rate per hactare
      if (userId) {
        let res = await getUserArea(userId);
        setArea(res);
      }
      const response = await getFertilizerDetails();
      if (response) {
        let fertilizers = response[0];
        const { nitrogen: nitro } = fertilizers;
        const { see: se } = fertilizers;
        const { south: so } = fertilizers;
        const { salt: sa } = fertilizers;
        setNitrogenDetails(nitro);
        setSeeDetails(se);
        setSouthDetails(so);
        setSaltDetails(sa);
      }
    }
    fetchData();
  }, [userId]);

  return (
    <>
      {nitrogenDetails && seeDetails && saltDetails && southDetails ? (
        <div className="h-full w-full max-w-screen-lg mx-auto flex justify-center items-center">
          {nitrogen && (
            <Nitrogen
              handleClick={handleClick}
              nitrogenDetails={nitrogenDetails}
              area={area}
            />
          )}
          {salt && (
            <Salt
              handleClick={handleClick}
              saltDetails={saltDetails}
              area={area}
            />
          )}
          {south && (
            <South
              handleClick={handleClick}
              southDetails={southDetails}
              area={area}
            />
          )}
          {see && (
            <See
              handleClick={handleClick}
              seeDetails={seeDetails}
              area={area}
            />
          )}
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}
