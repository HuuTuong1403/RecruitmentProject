import { fetchAllFavoriteJobAsync } from "features/JobSeekers/slices/thunks";
import {
  fetchJobsAsync,
  getDetailJobSeekerAsync,
} from "features/JobSeekers/slices/thunks";
import { fetchProvincesAsync } from "features/Home/slices/thunks";
import { Fragment, useEffect, useState, lazy } from "react";
import { selectJobSeekerLocal } from "features/JobSeekers/slices/selectors";
import { Switch, Route, useRouteMatch, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Footer from "components/Footer";
import Header from "components/Header";
import MenuJobSeeker from "./components/MenuJobSeeker";
import NotFoundPage from "components/404";
import notification from "components/Notification";

const JobAppliedPage = lazy(() => import("./pages/JobAppliedPage"));
const JobNotificationPage = lazy(() => import("./pages/JobNotificationPage"));
const JobSavedPage = lazy(() => import("./pages/JobSavedPage"));
const UserProfilePage = lazy(() => import("./pages/UserProfilePage"));
const UserSettingPage = lazy(() => import("./pages/UserSettingPage"));

const DashboardJobSeekersPage = () => {
  const { t } = useTranslation();
  const user = selectJobSeekerLocal();
  useEffect(() => {
    if (!user) {
      history.push("/home");
      notification(`${t("Please log out of the employer account")}`, "error");
    }
  });

  const history = useHistory();
  const { url } = useRouteMatch();
  const location = useLocation();
  const dispatch = useDispatch();
  const [checkLocation, setCheckLocation] = useState("");

  useEffect(() => {
    if (user && checkLocation !== location.pathname) {
      dispatch(getDetailJobSeekerAsync());
      dispatch(fetchJobsAsync());
      setCheckLocation(location.pathname);

      if (location.pathname === `${url}/my-profile`) {
        dispatch(fetchProvincesAsync());
      }

      if (location.pathname === `${url}/job-saved`) {
        dispatch(fetchAllFavoriteJobAsync());
      }
    }
  }, [dispatch, checkLocation, location, user, url]);

  return (
    <Fragment>
      <Header />
      <MenuJobSeeker>
        <Switch>
          <Route exact path={`${url}/my-profile`} component={UserProfilePage} />
          <Route
            exact
            path={`${url}/job-alert`}
            component={JobNotificationPage}
          />
          <Route exact path={`${url}/job-saved`} component={JobSavedPage} />
          <Route exact path={`${url}/job-applied`} component={JobAppliedPage} />
          <Route
            exact
            path={`${url}/setting-account`}
            component={UserSettingPage}
          />
          <Route component={NotFoundPage} />
        </Switch>
      </MenuJobSeeker>
      <Footer />
    </Fragment>
  );
};

export default DashboardJobSeekersPage;
