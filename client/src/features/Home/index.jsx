import Footer from "components/Footer";
import Header from "components/Header";
import { Fragment } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import HomeGuest from "./pages/HomeGuest";
import SignInGuest from "./pages/SignInGuest";
import SignUpGuest from "./pages/SignUpGuest";
import NotFoundPage from "../../components/404";

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
