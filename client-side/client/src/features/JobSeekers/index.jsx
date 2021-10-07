import { Fragment, useEffect, useState } from "react";
import { Switch, Route, useRouteMatch, useLocation } from "react-router-dom";
import NotFoundPage from "components/404";
import UserProfilePage from "./pages/UserProfilePage";
import JobNotificationPage from "./pages/JobNotificationPage";
import { useDispatch } from "react-redux";
import {
  fetchJobsAsync,
  getDetailJobSeekerAsync,
} from "features/JobSeekers/slices/thunks";
import Header from "components/Header";
import Footer from "components/Footer";
import MenuJobSeeker from "./components/MenuJobSeeker";
import UserSettingPage from "./pages/UserSettingPage";
import JobSavedPage from "./pages/JobSavedPage";
import JobAppliedPage from "./pages/JobAppliedPage";

const DashboardJobSeekersPage = () => {
  const { url } = useRouteMatch();
  const location = useLocation();
  const dispatch = useDispatch();
  const [checkLocation, setCheckLocation] = useState("");

  useEffect(() => {
    if (checkLocation !== location.pathname) {
      dispatch(getDetailJobSeekerAsync());
      dispatch(fetchJobsAsync());
      setCheckLocation(location.pathname);
    }
  }, [dispatch, checkLocation, location]);

  return (
    <Fragment>
      <Header />
      <MenuJobSeeker>
        <Switch>
          <Route path={`${url}/my-profile`} component={UserProfilePage} />
          <Route path={`${url}/job-alert`} component={JobNotificationPage} />
          <Route path={`${url}/job-saved`} component={JobSavedPage} />
          <Route path={`${url}/job-applied`} component={JobAppliedPage} />
          <Route path={`${url}/setting-account`} component={UserSettingPage} />
          <Route path="*">
            <NotFoundPage />
          </Route>
        </Switch>
      </MenuJobSeeker>
      <Footer />
    </Fragment>
  );
};

export default DashboardJobSeekersPage;
