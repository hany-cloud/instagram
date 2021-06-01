import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as ROUTES from './constants/routes';
import useAuthListener from "./hooks/use-auth-listener";
import UserContext from './context/user';
import ConditionaldRedirectRoute from './helpers/conditional-redirect-route';

const Login = lazy(() => import('./pages/login'));
const SignUp = lazy(() => import('./pages/sign-up'));
const Dashboard = lazy(() => import('./pages/dashboard'));
const Profile = lazy(() => import('./pages/profile'));
const NotFound = lazy(() => import('./pages/not-found'));

function App() {
  const { authUser, userDoc } = useAuthListener();

  const isUserLoggedIn = () => {
    if (authUser) return true;
    return false;
  }

  return (
    <UserContext.Provider value={{ authUser, userDoc }}>
      <Router>
        <Suspense fallback={<p>Loading ... </p>}>
          <Switch>
            {/* <Route path={ROUTES.LOGIN} component={Login} /> */}
            <ConditionaldRedirectRoute 
              redirectOnCondition={isUserLoggedIn()} redirectPath={ROUTES.DASHBOARD}
              path={ROUTES.LOGIN} component={Login} /> 

            {/* <Route path={ROUTES.SIGN_UP} component={SignUp} /> */}
            <ConditionaldRedirectRoute 
              redirectOnCondition={isUserLoggedIn()} redirectPath={ROUTES.DASHBOARD}
              path={ROUTES.SIGN_UP} component={SignUp} />
              
            <Route path={ROUTES.PROFILE} component={Profile} />

            <Route exact path={ROUTES.DASHBOARD} component={Dashboard} />
            {/* No need to protect the dashboard, since the componenets that are used inside the dashboard are handling 
                the sign out user status. */}
            {/* <ProtectedRoute user={authUser} path={ROUTES.DASHBOARD} exact>
              <Dashboard />
            </ProtectedRoute> */}

            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
