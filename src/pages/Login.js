import { useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import * as ROUTES from "../constants/routes";
import { userLogIn } from "../services/firebase";
export default function Login() {
  const history = useHistory();
  const location = useLocation();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const isInValid = emailAddress === "" || password === "";
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await userLogIn(emailAddress, password);
      console.log(response);
      if (response === true && history && location) {
        setTimeout(() => history.replace("/dashboard"), 100);
      } else {
        setError(response);
        setTimeout(() => {
          setError("");
        }, 5000);
      }
    } catch (err) {
      setEmailAddress("");
      setPassword("");
      setError(err.message);
    }
  };

  return (
    <div className=" relative  max-w-screen-lg  mx-auto h-full  flex  items-center w-full">
      <div className="relative md:w-2/5 w-full   flex-col md:mx-auto mx-4 md:h-5/6 h-full bg-white-base rounded-3xl p-4  overflow-hidden shadow-grayNormal mt-28">
        <Link to={ROUTES.HOME}>
          <div className="flex justify-center w-full">
            <img
              src="/images/logos/logo_1.png"
              alt="logo"
              className="w-40 h-40"
            />
          </div>
        </Link>
        {error && (
          <p className="text-red-500 text-base text-center mb-4">{error}</p>
        )}
        <form
          method="POST"
          onSubmit={handleSubmit}
          className="flex flex-col justify-center"
        >
          <input
            type="email"
            aria-label="Enter your Email address"
            placeholder="Email address"
            className="w-full rounded p-2 mb-4  border-b-2 border-l-1  border-gray-normal focus:outline-none  focus:border-green-normal"
            onChange={({ target }) => setEmailAddress(target.value)}
            value={emailAddress}
            required={true}
          />
          <input
            type="password"
            aria-label="Enter your Password"
            placeholder="Password"
            className="w-full border-b-2 border-l-1  border-gray-normal focus:outline-none  focus:border-green-normal rounded p-2 mb-4"
            onChange={({ target }) => setPassword(target.value)}
            value={password}
            required={true}
          />
          <button
            type="submit"
            className={`p mx-auto bg-white border-b-2  hover:border-green-normal   transition duration-200 ease-out shadow-grayNormal  text-gray-base py-3 px-8  w-28 rounded-3xl mt-4 ${
              isInValid && "opacity-50"
            } `}
            disabled={isInValid}
          >
            Login
          </button>
          <p className="w-full text-center mt-6">
            Don't have an account?
            <Link
              to={ROUTES.SIGN_UP}
              className="cursor-pointer ml-2 font-bold hover:text-green-normal focus:outline-none"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
