import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import * as ROUTES from "./constants/routes";
import UserContext from "./context/user";
import useAuthListener from "./hooks/use-auth-listener";
import IsUserLoggedIn from "./helpers/is-user-logged-in";
import ProtectedRoute from "./helpers/protected-route";

// Loader
import Loader from "./components/Loader";

// Login page
import Login from "./pages/Login";

// Signup page
import Signup from "./pages/Signup";

// Dashboard page
import Dashboard from "./pages/Dashboard";

// Header component
import Header from "./components/Header";

// Soil page components
import SecondSlide from "./components/soil/SecondSlide";
import SoilDisease from "./components/soil/SoilDisease";
import Pest from "./components/soil/Pest";
import Rot from "./components/soil/Rot";
import Slope from "./components/soil/Slope";

// Fertilizer page components
import Nitrogen from "./components/fertilizer/Nitrogen";

// Disease page components
import FirstDisease from "./components/disease/FirstDisease";
import SecondDisease from "./components/disease/SecondDisease";
import ThirdDisease from "./components/disease/ThirdDisease";
import FourthDisease from "./components/disease/FourthDisease";

// Home page
const Home = lazy(() => import("./pages/Home"));

// Crop page
const Crop = lazy(() => import("./pages/Crop"));

// Soil pages
const Soil = lazy(() => import("./pages/Soil"));

// Seed page
const Seed = lazy(() => import("./pages/Seed"));

// Sowing page
const Sowing = lazy(() => import("./pages/Sowing"));

// Irrigation page
const Irrigation = lazy(() => import("./pages/Irrigation"));

// Fertilizer page
const Fertilizer = lazy(() => import("./pages/Fertilizer"));

// Disease page
const Disease = lazy(() => import("./pages/Disease"));

// Harvest page
const Harvest = lazy(() => import("./pages/Harvest"));

// Estimation page
const Estimation = lazy(() => import("./pages/Estimation"));

// Not Found Page
const NotFound = lazy(() => import("./pages/NotFound"));

// Login Page
// const Login = lazy(() => import("./pages/Login"));
// Sign Up Page
// const Signup = lazy(() => import("./pages/Signup"));
// Dashboard
// const Dashboard = lazy(() => import("./pages/Dashboard"));

function App() {
  const { user } = useAuthListener();
  return (
    <div className="App">
      <UserContext.Provider value={{ user }}>
        <Router>
          <Suspense fallback={<Loader />}>
            <Header />
            <Switch>
              {/* for login */}
              <IsUserLoggedIn
                user={user}
                loggedInPath={ROUTES.DASHBOARD}
                path={ROUTES.LOGIN}
                exact
              >
                <Login />
              </IsUserLoggedIn>
              {/* <Route path={ROUTES.LOGIN}>
                <Login />
              </Route> */}
              <Route path="/home">
                <Home />
              </Route>

              {/* for signup */}
              <IsUserLoggedIn
                user={user}
                loggedInPath={ROUTES.DASHBOARD}
                path={ROUTES.SIGN_UP}
                exact
              >
                <Signup />
              </IsUserLoggedIn>
              {/* <Route path={ROUTES.SIGN_UP}>
                <Signup />
              </Route> */}

              {/* for dashboard */}
              <ProtectedRoute user={user} path={ROUTES.DASHBOARD} exact>
                <Dashboard />
              </ProtectedRoute>

              {/* for crop */}
              <ProtectedRoute user={user} path={ROUTES.CROP} exact>
                <Crop />
              </ProtectedRoute>

              {/* for soil */}
              <ProtectedRoute user={user} path="/soil/soildisease/pest" exact>
                <Pest />
              </ProtectedRoute>
              <ProtectedRoute user={user} path="/soil/soildisease/rot" exact>
                <Rot />
              </ProtectedRoute>
              <ProtectedRoute user={user} path="/soil/soildisease/slope" exact>
                <Slope />
              </ProtectedRoute>
              <ProtectedRoute user={user} path="/soil/soildisease">
                <SoilDisease />
              </ProtectedRoute>
              <ProtectedRoute user={user} path="/soil/secondslide">
                <SecondSlide />
              </ProtectedRoute>
              <ProtectedRoute user={user} path={ROUTES.SOIL}>
                <Soil />
              </ProtectedRoute>

              {/* for seed */}
              <ProtectedRoute user={user} path={ROUTES.SEED}>
                <Seed />
              </ProtectedRoute>

              {/* for sowing */}
              <ProtectedRoute user={user} path={ROUTES.SOWING}>
                <Sowing />
              </ProtectedRoute>

              {/* for irrigation  */}
              <ProtectedRoute user={user} path={ROUTES.IRRIGATION}>
                <Irrigation />
              </ProtectedRoute>

              {/* for fertilizer */}
              <ProtectedRoute user={user} path={ROUTES.FERTILIZER}>
                <Fertilizer />
              </ProtectedRoute>
              <ProtectedRoute user={user} path="/nitrogen">
                <Nitrogen />
              </ProtectedRoute>

              {/* for disease */}
              <ProtectedRoute user={user} path="/disease/firstdisease" exact>
                <FirstDisease />
              </ProtectedRoute>
              <ProtectedRoute user={user} path="/disease/seconddisease" exact>
                <SecondDisease />
              </ProtectedRoute>
              <ProtectedRoute user={user} path="/disease/thirddisease" exact>
                <ThirdDisease />
              </ProtectedRoute>
              <ProtectedRoute user={user} path="/disease/fourthdisease" exact>
                <FourthDisease />
              </ProtectedRoute>
              <ProtectedRoute user={user} path={ROUTES.DISEASE} exact>
                <Disease />
              </ProtectedRoute>

              {/* for harvesting */}
              <ProtectedRoute user={user} path={ROUTES.HARVEST}>
                <Harvest />
              </ProtectedRoute>

              {/* for estimation */}
              <ProtectedRoute user={user} path={ROUTES.ESTIMATION}>
                <Estimation />
              </ProtectedRoute>

              {/* home page */}
              <Route path={ROUTES.HOME} exact>
                <Home />
              </Route>
              {/* not found  */}
              <Route path={ROUTES.NOT_FOUND}>
                <NotFound />
              </Route>
            </Switch>
          </Suspense>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
