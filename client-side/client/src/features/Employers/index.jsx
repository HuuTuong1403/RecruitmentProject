import { Fragment } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import NotFoundPage from "components/404";
import EmployerProfilePage from "./pages/EmployersProfilePage";
import PostJobPage from "./pages/PostJobPage";
import { ScrollTop } from "common/functions";
import HeaderEmployers from "components/HeaderEmployers";
import FooterEmployers from "components/FooterEmployers";
import MenuEmployer from "./components/MenuEmployer";
import SettingPage from "./pages/SettingPage";
import RecruitManagementPage from "./pages/RecruitManagementPage";
import CandidateProfileManagementPage from "./pages/CandidateProfileManagementPage";

const DashboardEmployersPage = () => {
  ScrollTop();
  const { url } = useRouteMatch();

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
