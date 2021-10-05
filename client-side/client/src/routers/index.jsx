import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { Suspense } from "react";
import NotFoundPage from "components/404";
import { routes, privateRoutes } from "./routes";
import { PATH } from "common/constants/path";
import LoadingSuspense from "components/Loading";
import PrivateRoute from "./privateRoutes";

const Routers = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSuspense height="100vh" showText={true} />}>
        <Switch>
          <Redirect exact from="/" to={PATH.home} />
          {privateRoutes.map((privateRoute, index) => {
            return (
              <PrivateRoute
                exact={privateRoute.exact}
                component={privateRoute.component}
                key={index}
                path={privateRoute.path}
                role={privateRoute.role}
              />
            );
          })}
          {routes.map((route, index) => {
            return (
              <Route exact={route.exact} path={route.path} key={index}>
                {route.children}
              </Route>
            );
          })}
          <Route path="*">
            <NotFoundPage />
          </Route>
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
};

export default Routers;
