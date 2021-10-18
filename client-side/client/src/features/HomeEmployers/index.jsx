import { Fragment } from "react";
import { lazy } from "react";
import { ScrollTop } from "common/functions";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import FooterEmployers from "components/FooterEmployers";
import HeaderEmployers from "components/HeaderEmployers";
import NotFoundPage from "../../components/404";

const ChangePassEmployer = lazy(() => import("./pages/ChangePassEmployer"));
const ForgotPassEmployer = lazy(() => import("./pages/ForgotPassEmployer"));
const HomeEmployer = lazy(() => import("./pages/HomeEmployer"));
const SignInEmployer = lazy(() => import("./pages/SignInEmployer"));
const SignUpEmployer = lazy(() => import("./pages/SignUpEmployer"));

const EmployersHomePage = () => {
  ScrollTop();
  const { url } = useRouteMatch();

  return (
    <Fragment>
      <HeaderEmployers />
      <Switch>
        <Route exact path={`${url}`} component={HomeEmployer} />
        <Route exact path={`${url}/sign-in`} component={SignInEmployer} />
        <Route exact path={`${url}/sign-up`} component={SignUpEmployer} />
        <Route
          exact
          path={`${url}/forgot-pass`}
          component={ForgotPassEmployer}
        />
        <Route
          exact
          path={`${url}/forgot-pass/:token`}
          component={ChangePassEmployer}
        />
        <Route component={NotFoundPage} />
      </Switch>
      <FooterEmployers />
    </Fragment>
  );
};

export default EmployersHomePage;
