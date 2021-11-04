import { fetchJobsAllAsync } from "./slices/thunks";
import { Fragment, useEffect } from "react";
import { Route, Switch, useRouteMatch, useLocation } from "react-router-dom";
import { ScrollTop } from "common/functions";
import { useDispatch } from "react-redux";
import Footer from "components/Footer";
import Header from "components/Header";
import JobDetail from "./pages/JobDetail";
import NotFoundPage from "components/404";
import SearchJobPage from "./pages/SearchJobPage";
import CompanyDetailPage from "./pages/CompanyDetailPage";
import ReviewPage from "./pages/ReviewPage";

const JobsPage = () => {
  ScrollTop();
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
        <Route
          exact
          path={`${url}/employer/:companyName`}
          component={CompanyDetailPage}
        />
        <Route exact path={`${url}/:slug`} component={JobDetail} />
        <Route
          exact
          path={`${url}/employer/:companyName/review`}
          component={ReviewPage}
        />
        <Route component={NotFoundPage} />
      </Switch>
      <Footer />
    </Fragment>
  );
};

export default JobsPage;
