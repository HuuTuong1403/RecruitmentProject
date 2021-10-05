import { Fragment, useEffect } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import NotFoundPage from "components/404";
import UserProfilePage from "./pages/UserProfilePage";
import JobNotificationPage from "./pages/JobNotificationPage";
import { useDispatch } from "react-redux";
import { getDetailJobSeekerAsync } from "features/JobSeekers/slices/thunks";
import { selectedStatus } from "./slices/selectors";
import { useSelector } from "react-redux";
import LoadingSuspense from "components/Loading";

const DashboardJobSeekersPage = () => {
  const { url } = useRouteMatch();
  const dispatch = useDispatch();
  const loading = useSelector(selectedStatus);
  useEffect(() => {
    dispatch(getDetailJobSeekerAsync());
  }, [dispatch]);

  return loading ? (
    <LoadingSuspense height="100vh" showText={true} />
  ) : (
    <Fragment>
      <Switch>
        <Route exact path={`${url}`} component={UserProfilePage} />
        <Route path={`${url}/jobalert`} component={JobNotificationPage} />
        <Route path="*">
          <NotFoundPage />
        </Route>
      </Switch>
    </Fragment>
  );
};

export default DashboardJobSeekersPage;
