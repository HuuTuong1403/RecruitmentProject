import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { lazy } from "react";
import { pathAdmin } from "common/constants/path";
import { Suspense } from "react";
import LoadingSuspense from "components/Loading";
import NotFoundPage from "components/404";
import PrivateRoute from "./privateRoute";

const AuthPage = lazy(() => import("features/Auth"));
const AdministratorPage = lazy(() => import("features/Administrator"));

const Routers = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSuspense height="100vh" showText={true} />}>
        <Switch>
          <Redirect exact from={pathAdmin.dashboard} to={pathAdmin.statistic} />
          <PrivateRoute
            exact={false}
            component={AdministratorPage}
            path={pathAdmin.dashboard}
          />
          <Route exact={false} pathh={pathAdmin.admin} component={AuthPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
};

export default Routers;
