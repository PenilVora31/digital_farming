import { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import * as ROUTES from "../constants/routes";
import FirebaseContext from "../context/firebase";
import { InitializeUserData } from "../services/firebase";
export default function Signup() {
  const { firebase } = useContext(FirebaseContext);
  const history = useHistory();
  const [userName, setUserName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const isInValid = userName === "" || emailAddress === "" || password === "";
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const createdUser = await firebase
        .auth()
        .createUserWithEmailAndPassword(emailAddress, password);

      // authentication
      if (createdUser) {
        let id = createdUser.user.uid;
        console.log("new user id", id);
        // update user name
        await createdUser.user.updateProfile({ displayName: userName });
        // add user in users list
        await firebase.firestore().collection("users").add({
          userId: createdUser.user.uid,
          emailAddress: emailAddress.toLowerCase(),
          userName: userName,
          dateCreated: Date.now(),
        });

        // initialize the new user data

        let res = await InitializeUserData(createdUser.user.uid);
        if (res) {
          history.push(ROUTES.DASHBOARD);
        } else {
          setError("please try again later.");
        }
      }
    } catch (err) {
      setUserName("");
      setEmailAddress("");
      setPassword("");
      setError(err.message);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="container max-w-screen-lg mx-auto h-full flex items-center">
      <div className="md:w-2/5 w-full mt-28 flex flex-col md:mx-auto mx-4 md:h-4/5 h-full bg-white-base rounded-3xl p-4 relative overflow-hidden shadow-grayNormal">
        <h1 className="flex justify-center w-full">
          <img
            src="/images/logos/logo_1.png"
            alt="logo"
            className="w-40 h-40"
          />
        </h1>
        {error && (
          <p className="text-red-500 text-base text-center mb-4">{error}</p>
        )}
        <form
          method="POST"
          onSubmit={handleSubmit}
          className="flex flex-col justify-center"
        >
          <input
            type="text"
            aria-label="Enter your Username"
            placeholder="Username"
            className="w-full border-b-2 border-l-1  border-gray-normal focus:outline-none  focus:border-green-normal  rounded p-2 mb-4"
            onChange={({ target }) => setUserName(target.value)}
            value={userName}
            required={true}
          />
          <input
            type="email"
            aria-label="Enter your Email address"
            placeholder="Email address"
            className="w-full border-b-2 border-l-1  border-gray-normal focus:outline-none  focus:border-green-normal  rounded p-2 mb-4"
            onChange={({ target }) => setEmailAddress(target.value)}
            value={emailAddress}
            required={true}
          />
          <input
            type="password"
            aria-label="Enter your Password"
            placeholder="Password"
            className="w-full border-b-2 border-l-1  border-gray-normal focus:outline-none  focus:border-green-normal  rounded p-2 mb-4"
            onChange={({ target }) => setPassword(target.value)}
            value={password}
            required={true}
          />
          <button
            type="submit"
            className={`p inline-block mx-auto border-b-2  hover:border-green-normal   transition duration-200 ease-out shadow-grayNormal   text-gray-base py-3 px-8   rounded-3xl mt-4 ${
              isInValid && "opacity-50"
            } `}
            disabled={isInValid}
          >
            Sign Up
          </button>
          <p className="w-full text-center mt-6">
            Already have an account?
            <Link
              to={ROUTES.LOGIN}
              className="cursor-pointer ml-2 font-bold hover:text-green-normal focus:outline-none"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
