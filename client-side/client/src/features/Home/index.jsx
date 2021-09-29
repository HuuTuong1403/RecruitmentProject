import Footer from "components/Footer";
import Header from "components/Header";
import { Fragment } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import NotFoundPage from "../../components/404";
import { lazy } from "react";

const SignInGuest = lazy(() => import("./pages/SignInGuest"));
const SignUpGuest = lazy(() => import("./pages/SignUpGuest"));
const HomeGuest = lazy(() => import("./pages/HomeGuest"));

const HomePage = () => {
  const { url } = useRouteMatch();

  return (
    <Fragment>
      <Header />
      <Switch>
        <Route exact path={`${url}`} component={HomeGuest} />
        <Route path={`${url}/sign-in`} component={SignInGuest} />
        <Route path={`${url}/sign-up`} component={SignUpGuest} />
        <Route path="*">
          <NotFoundPage />
        </Route>
      </Switch>
      <Footer />
    </Fragment>
  );
};

export default HomePage;
