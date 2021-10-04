import Footer from "components/Footer";
import Header from "components/Header";
import { Fragment, useEffect } from "react";
import { Route, Switch, useRouteMatch, useLocation } from "react-router-dom";
import SearchJobPage from "./pages/SearchJobPage";
import NotFoundPage from "components/404";
import { fetchJobsAllAsync } from "./slices/thunks";
import { useDispatch } from "react-redux";
import JobDetail from "./pages/JobDetail";

const JobsPage = () => {
  const { url } = useRouteMatch();
  const dispatch = useDispatch();
  let query = new URLSearchParams(useLocation().search);
  let type = query.get("type");

  useEffect(() => {
    if (type) {
      dispatch(fetchJobsAllAsync());
    }
  }, [dispatch, type]);

  return (
    <Fragment>
      <Header />
      <Switch>
        <Route exact path={`${url}`} component={SearchJobPage} />
        <Route exact path={`${url}/search`} component={SearchJobPage} />
        <Route exact path={`${url}/:slug`} component={JobDetail} />
        <Route path="*">
          <NotFoundPage />
        </Route>
      </Switch>

      <Footer />
    </Fragment>
  );
};

export default JobsPage;
