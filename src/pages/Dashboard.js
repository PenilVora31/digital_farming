import Process from "../components/Process";
import { Link } from "react-router-dom";
export default function Dashboard() {
  return (
    <div className="md:grid flex items-center flex-col   mx-auto md:w-4/5 w-full  md:gap-4 gap-8 md:p-4   overflow-x-hidden overscroll-x-none mt-4">
      <div className="flex md:pl-16  relative">
        <Link to="/crop">
          <Process text={"Crop Selection"} img={"/images/crop.svg"} />
        </Link>
      </div>

      <div className="flex md:pr-16 md:flex-row-reverse">
        <Link to="/soil">
          <Process
            text={"Soil Preparation"}
            img={"/images/soil-preperation.svg"}
          />
        </Link>
      </div>

      <div className="flex md:pl-16 ">
        <Link to="/seed">
          <Process text={"Seed Selection"} img={"/images/seed_selection.png"} />
        </Link>
      </div>

      <div className="flex md:pr-16 md:flex-row-reverse">
        <Link to="/sowing">
          <Process text={"Seed Sowing"} img={"/images/seed_sowing2.png"} />
        </Link>
      </div>

      <div className="flex md:pl-16">
        <Link to="/irrigation">
          <Process text={"Irrigation"} img={"/images/irrigation.png"} />
        </Link>
      </div>

      <div className="flex md:pr-16 md:flex-row-reverse">
        <Link to="/fertilizer">
          <Process text={"Fertilizer"} img={"/images/fertilizer.png"} />
        </Link>
      </div>

      <div className="flex md:pl-16">
        <Link to="/disease">
          <Process text={"Diseases"} img={"/images/disease.png"} />
        </Link>
      </div>

      <div className="flex md:pr-16 md:flex-row-reverse">
        <Link to="/harvest">
          <Process text={"Harvesting"} img={"/images/harvest.jpg"} />
        </Link>
      </div>
      <div className="flex md:pl-16">
        <Link to="/estimation">
          <Process text={"Estimation"} img={"/images/estimate.png"} />
        </Link>
      </div>
    </div>
  );
}
