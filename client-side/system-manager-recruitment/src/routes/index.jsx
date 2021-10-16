import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { lazy } from "react";
import { pathSystemManager } from "common/constants/path";
import { Suspense } from "react";
import LoadingSuspense from "components/Loading";
import NotFoundPage from "components/404";
import PrivateRoute from "./privateRoutes";

const AuthPage = lazy(() => import("features/Auth"));
const SystemManagerPage = lazy(() => import("features/SystemManager"));

const Routers = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSuspense height="100vh" showText={true} />}>
        <Switch>
          <Redirect
            exact
            from={pathSystemManager.dashboard}
            to={pathSystemManager.employerManager}
          />
          <PrivateRoute
            exact={false}
            component={SystemManagerPage}
            path={pathSystemManager.dashboard}
          />
          <Route exact={false} path={pathSystemManager.home}>
            <AuthPage />
          </Route>

          <Route component={NotFoundPage}/>
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
};

export default Routers;
