import { useContext, useEffect, useState } from "react";
import FirebaseContext from "../context/firebase";

export default function useAuthListener() {
  const { firebase } = useContext(FirebaseContext);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("authUser"))
  );

  useEffect(() => {
    const listener = firebase.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log("login");
        //    we have user so store in local storage
        setUser(authUser);
        localStorage.setItem("authUser", JSON.stringify(authUser));
      } else {
        console.log("logout");
        //    we don't have user so remove from local storage
        localStorage.removeItem("authUser");
        setUser(null);
      }
    });

    return () => listener();
  }, [firebase, user]);

  return { user };
}
