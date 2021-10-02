import Footer from "components/Footer";
import Header from "components/Header";
import { Fragment } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import SearchJobPage from "./pages/SearchJobPage";
import NotFoundPage from "components/404";

const JobsPage = () => {
  const { url } = useRouteMatch();

  return (
    <Fragment>
      <Header />
      <Switch>
        <Route exact path={`${url}`} component={SearchJobPage} />
        <Route path="*">
          <NotFoundPage />
        </Route>
      </Switch>

      <Footer />
    </Fragment>
  );
};

export default JobsPage;
