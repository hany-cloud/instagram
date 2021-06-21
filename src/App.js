import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Hooks
import useAuthListener from "./hooks/use-auth-listener";

// Context
import UserContext from './context/user';

// Contants
import { PAGE_ROUTES } from './constants/routes';

// Helpers
import ConditionaldRedirectRoute from './helpers/conditional-redirect-route';
import ProtectedRoute from './helpers/protected-route.js';

// Lazy imports for app pages that are used in routing
const Login = lazy(() => import('./pages/login'));
const SignUp = lazy(() => import('./pages/sign-up'));
const Dashboard = lazy(() => import('./pages/dashboard'));
const Profile = lazy(() => import('./pages/profile'));
const NotFound = lazy(() => import('./pages/not-found'));

function App() {
  const { authUser, userDoc, setUserData, setUserFollowing } = useAuthListener();

  const isUserLoggedIn = () => {
    if (authUser) return true;
    return false;
  }

  return (
    <UserContext.Provider value={{ authUser, userDoc, setUserData, setUserFollowing }}>
      <Router>
        <Suspense fallback={<p>Loading ... </p>}>
          <Switch>
            {/* <Route path={PAGE_ROUTES.login} component={Login} /> */}
            <ConditionaldRedirectRoute
              redirectOnCondition={isUserLoggedIn()} redirectPath={PAGE_ROUTES.dashboard}
              path={PAGE_ROUTES.login} component={Login} />

            {/* <Route path={PAGE_ROUTES.sign_up} component={SignUp} /> */}
            <ConditionaldRedirectRoute
              redirectOnCondition={isUserLoggedIn()} redirectPath={PAGE_ROUTES.dashboard}
              path={PAGE_ROUTES.sign_up} component={SignUp} />

            <Route path={PAGE_ROUTES.profile} component={Profile} />

            {/* <Route exact path={PAGE_ROUTES.dashboard} component={Dashboard} /> */}
            <ProtectedRoute user={authUser} path={PAGE_ROUTES.dashboard} exact>
              <Dashboard />
            </ProtectedRoute>

            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
