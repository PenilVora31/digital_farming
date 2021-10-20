import { useContext } from "react";
import FirebaseContext from "../context/firebase";
import UserContext from "../context/user";
import * as ROUTES from "../constants/routes";
import { Link } from "react-router-dom";
import { BiLogOut, BiLogIn, BiHomeAlt } from "react-icons/bi";
export default function Header() {
  const { firebase } = useContext(FirebaseContext);
  const { user } = useContext(UserContext);
  return (
    <div
      className={`${
        user && "relative bg-white-base"
      }  fixed z-30 h-16 md:w-full  bg-transparent text-gray-base shadow-grayNormal border-b border-gray-300  flex justify-between items-center md:px-8 px-4  pb-2 overscroll-x-none overflow-hidden`}
    >
      {user ? (
        <Link to={ROUTES.HOME}>
          <img
            src="/images/logos/Logo_5.png"
            alt="logo"
            className="w-16 h-16 md:mt-2 mt-4 border-b border-gray-300 "
          />
        </Link>
      ) : (
        <Link to={ROUTES.HOME}>
          <img
            src="/images/logos/Logo_5.png"
            alt="logo"
            className="w-16 h-16 mt-2 border-b border-gray-300"
          />
        </Link>
      )}
      <h1 className="h3 md:block hidden">DIGITAL FARMING</h1>
      {!user && (
        <ul className="flex items-center justify-center h2 cursor-pointer    px-10   rounded mt-3 mb-1  bg-transparent hover:bg-green-base text-white-base transition-all duration-300 ease-in-out">
          <Link to={ROUTES.LOGIN}>
            <li className="">
              <BiLogIn />
            </li>
            <li className="li">Login</li>
          </Link>
        </ul>
      )}
      {user && (
        <div className="flex justify-between  items-center h2 cursor-pointer  text-black-base  px-3 pb-1 rounded mt-3 hover:bg-transparent transition-all duration-300 ease-in-out">
          <Link to={ROUTES.DASHBOARD}>
            <div
              className={`flex flex-col  items-center ${
                user && "hover:text-green-base"
              }`}
            >
              <BiHomeAlt />
              <p className="li  md:block hidden">Home</p>
            </div>
          </Link>
          <div
            className={`ml-4 flex flex-col  items-center ${
              user && "hover:text-green-base"
            }`}
            onClick={() => firebase.auth().signOut()}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                firebase.auth().signOut();
              }
            }}
          >
            <BiLogOut />
            <p className="li ml-2 md:block hidden">Log out</p>
          </div>
        </div>
      )}
    </div>
  );
}
