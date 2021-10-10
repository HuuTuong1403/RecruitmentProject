import { Fragment, useEffect, useState } from "react";
import { getDetailEmployerAsync } from "./slices/thunks";
import { selectEmployerLocal } from "./slices/selectors";
import { Switch, Route, useRouteMatch, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CandidateProfileManagementPage from "./pages/CandidateProfileManagementPage";
import EmployerProfilePage from "./pages/EmployersProfilePage";
import FooterEmployers from "components/FooterEmployers";
import HeaderEmployers from "components/HeaderEmployers";
import MenuEmployer from "./components/MenuEmployer";
import NotFoundPage from "components/404";
import notification from "components/Notification";
import PostJobPage from "./pages/PostJobPage";
import RecruitManagementPage from "./pages/RecruitManagementPage";
import SettingPage from "./pages/SettingPage";

const DashboardEmployersPage = () => {
  const { t } = useTranslation();
  const employer = selectEmployerLocal();
  useEffect(() => {
    if (!employer) {
      notification(`${t("Please log out of the job seeker account")}`, "error");
      history.push("/home");
    }
  });
  const history = useHistory();
  const { url } = useRouteMatch();
  const location = useLocation();
  const dispatch = useDispatch();
  const [checkLocation, setCheckLocation] = useState("");

  useEffect(() => {
    if (employer && checkLocation !== location.pathname) {
      dispatch(getDetailEmployerAsync());
      setCheckLocation(location.pathname);
    }
  }, [dispatch, checkLocation, location, employer]);

  return (
    <Fragment>
      <HeaderEmployers />
      <MenuEmployer>
        <Switch>
          <Route
            exact
            path={`${url}/my-profile`}
            component={EmployerProfilePage}
          ></Route>
          <Route path={`${url}/post-job`} component={PostJobPage}></Route>
          <Route
            path={`${url}/recruit-manage`}
            component={RecruitManagementPage}
          />
          <Route
            path={`${url}/candidate-profiles`}
            component={CandidateProfileManagementPage}
          />
          <Route
            path={`${url}/setting-account`}
            component={SettingPage}
          ></Route>
          <Route path="*">
            <NotFoundPage />
          </Route>
        </Switch>
      </MenuEmployer>
      <FooterEmployers />
    </Fragment>
  );
};

export default DashboardEmployersPage;
