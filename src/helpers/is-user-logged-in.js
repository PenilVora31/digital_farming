import { Redirect, Route } from "react-router-dom";
import PropTypes from "prop-types";

export default function IsUserLoggedIn({
  user,
  children,
  loggedInPath,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (!user) {
          return children;
        }
        if (user) {
          return (
            <Redirect
              to={{ pathname: loggedInPath, state: { from: location } }}
            />
          );
        }
        return null;
      }}
    />
  );
}

IsUserLoggedIn.propTypes = {
  user: PropTypes.object,
  children: PropTypes.object,
  loggedInPath: PropTypes.string,
};
