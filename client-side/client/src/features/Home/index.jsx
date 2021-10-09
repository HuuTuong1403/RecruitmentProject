import { Fragment } from "react";
import { lazy } from "react";
import { ScrollTop } from "common/functions";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import Footer from "components/Footer";
import Header from "components/Header";
import NotFoundPage from "../../components/404";

const ChangePassForgot = lazy(() => import("./pages/ChangePassForgot"));
const ForgotPass = lazy(() => import("./pages/ForgotPass"));
const HomeGuest = lazy(() => import("./pages/HomeGuest"));
const SignInGuest = lazy(() => import("./pages/SignInGuest"));
const SignUpGuest = lazy(() => import("./pages/SignUpGuest"));

const HomePage = () => {
  ScrollTop();
  const { url } = useRouteMatch();

  return (
    <Fragment>
      <Header />
      <Switch>
        <Route exact path={`${url}`} component={HomeGuest} />
        <Route path={`${url}/sign-in`} component={SignInGuest} />
        <Route path={`${url}/sign-up`} component={SignUpGuest} />
        <Route exact path={`${url}/forgot-pass`} component={ForgotPass} />
        <Route
          path={`${url}/forgot-pass/:token`}
          component={ChangePassForgot}
        />
        <Route path="*">
          <NotFoundPage />
        </Route>
      </Switch>
      <Footer />
    </Fragment>
  );
};

export default HomePage;
