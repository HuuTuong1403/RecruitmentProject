import { Fragment, useEffect, lazy } from "react";
import { selectEmployerLocal } from "./slices/selectors";
import { Switch, Route, useRouteMatch } from "react-router-dom";
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
const JobTrashPage = lazy(() => import("./pages/JobTrashPage"));
const PostJobPage = lazy(() => import("./pages/PostJobPage"));
const RecruitManagementPage = lazy(() =>
  import("./pages/RecruitManagementPage")
);
const SettingPage = lazy(() => import("./pages/SettingPage"));
const PostEventPage = lazy(() => import("./pages/PostEventPage"));
const EventManagementPage = lazy(() => import("./pages/EventManagementPage"));
const UpdateEventPage = lazy(() => import("./pages/UpdateEventPage"));

const DashboardEmployersPage = () => {
  const { t } = useTranslation();
  const employer = selectEmployerLocal();
  const history = useHistory();
  const { url } = useRouteMatch();

  useEffect(() => {
    if (!employer) {
      notification(`${t("Please log out of the job seeker account")}`, "error");
      history.push("/home");
    }
  });

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
            path={`${url}/recruit-manage/created`}
            component={RecruitManagementPage}
          />
          <Route
            exact
            path={`${url}/recruit-manage/trash`}
            component={JobTrashPage}
          />
          <Route
            exact
            path={`${url}/events/post-event`}
            component={PostEventPage}
          />
          <Route
            exact
            path={`${url}/events/:id/edit`}
            component={UpdateEventPage}
          />
          <Route
            exact
            path={`${url}/events/created`}
            component={EventManagementPage}
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
