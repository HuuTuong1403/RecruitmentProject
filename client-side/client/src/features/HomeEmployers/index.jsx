import FooterEmployers from "components/FooterEmployers";
import HeaderEmployers from "components/HeaderEmployers";
import { Fragment } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import NotFoundPage from "../../components/404";
import { lazy } from "react";
import { ScrollTop } from "common/functions";

const SignInEmployer = lazy(() => import("./pages/SignInEmployer"));
const SignUpEmployer = lazy(() => import("./pages/SignUpEmployer"));
const HomeEmployer = lazy(() => import("./pages/HomeEmployer"));
const ForgotPassEmployer = lazy(() => import("./pages/ForgotPassEmployer"));

const EmployersHomePage = () => {
  ScrollTop();
  const { url } = useRouteMatch();

  return (
    <Fragment>
      <HeaderEmployers />
      <Switch>
        <Route exact path={`${url}`} component={HomeEmployer} />
        <Route path={`${url}/sign-in`} component={SignInEmployer} />
        <Route path={`${url}/sign-up`} component={SignUpEmployer} />
        <Route path={`${url}/forgot-pass`} component={ForgotPassEmployer} />
        <Route path="*">
          <NotFoundPage />
        </Route>
      </Switch>
      <FooterEmployers />
    </Fragment>
  );
};

export default EmployersHomePage;
