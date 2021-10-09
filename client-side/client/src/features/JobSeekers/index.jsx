import { fetchJobsAsync, getDetailJobSeekerAsync } from "features/JobSeekers/slices/thunks";
import { Fragment, useEffect, useState } from "react";
import { selectJobSeekerLocal } from "features/JobSeekers/slices/selectors";
import { Switch, Route, useRouteMatch, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Footer from "components/Footer";
import Header from "components/Header";
import JobAppliedPage from "./pages/JobAppliedPage";
import JobNotificationPage from "./pages/JobNotificationPage";
import JobSavedPage from "./pages/JobSavedPage";
import MenuJobSeeker from "./components/MenuJobSeeker";
import NotFoundPage from "components/404";
import notification from "components/Notification";
import UserProfilePage from "./pages/UserProfilePage";
import UserSettingPage from "./pages/UserSettingPage";

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
    }
  }, [dispatch, checkLocation, location, user]);

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
