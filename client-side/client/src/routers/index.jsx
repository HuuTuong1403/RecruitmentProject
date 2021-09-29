import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { Suspense } from "react";
import NotFoundPage from "components/404";
import { routes } from "./routes";
import { PATH } from "common/constants/path";

const Routers = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Redirect exact from="/" to={PATH.home} />
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
