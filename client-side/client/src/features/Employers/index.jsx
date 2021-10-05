import { Fragment } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import NotFoundPage from "components/404";
import EmployerProfilePage from "./pages/EmployersProfilePage";
import PostJobPage from "./pages/PostJobPage";

const DashboardEmployersPage = () => {
  const { url } = useRouteMatch();

  return (
    <Fragment>
      <Switch>
        <Route exact path={`${url}`} component={EmployerProfilePage}></Route>
        <Route path={`${url}/post-job`} component={PostJobPage}></Route>
        <Route path="*">
          <NotFoundPage />
        </Route>
      </Switch>
    </Fragment>
  );
};

export default DashboardEmployersPage;
