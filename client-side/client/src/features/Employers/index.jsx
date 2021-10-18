import { fetchProvincesAsync } from "features/Home/slices/thunks";
import { fetchSkillsAsync } from "features/Jobs/slices/thunks";
import { Fragment, useEffect, useState, lazy } from "react";
import { getDetailEmployerAsync } from "./slices/thunks";
import { selectEmployerLocal } from "./slices/selectors";
import { Switch, Route, useRouteMatch, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import FooterEmployers from "components/FooterEmployers";
import HeaderEmployers from "components/HeaderEmployers";
import MenuEmployer from "./components/MenuEmployer";
import NotFoundPage from "components/404";
import notification from "components/Notification";

const CandidateProfileManagementPage = lazy(() =>
  import("./pages/CandidateProfileManagementPage")
);
const EmployerProfilePage = lazy(() => import("./pages/EmployersProfilePage"));
const PostJobPage = lazy(() => import("./pages/PostJobPage"));
const RecruitManagementPage = lazy(() =>
  import("./pages/RecruitManagementPage")
);
const SettingPage = lazy(() => import("./pages/SettingPage"));

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
      if (location.pathname === `${url}/post-job`) {
        dispatch(fetchProvincesAsync());
        dispatch(fetchSkillsAsync());
      }
      if (location.pathname === `${url}/my-profile`) {
        dispatch(fetchProvincesAsync());
      }
    }
  }, [dispatch, checkLocation, location, employer, url]);

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
          <Route exact path={`${url}/post-job`} component={PostJobPage}></Route>
          <Route
            exact
            path={`${url}/recruit-manage`}
            component={RecruitManagementPage}
          />
          <Route
            exact
            path={`${url}/candidate-profiles`}
            component={CandidateProfileManagementPage}
          />
          <Route
            exact
            path={`${url}/setting-account`}
            component={SettingPage}
          ></Route>
          <Route component={NotFoundPage} />
        </Switch>
      </MenuEmployer>
      <FooterEmployers />
    </Fragment>
  );
};

export default DashboardEmployersPage;
