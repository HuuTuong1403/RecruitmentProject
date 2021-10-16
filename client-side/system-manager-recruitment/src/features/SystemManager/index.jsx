import { Fragment, lazy } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import EmployerDetailPage from "./pages/EmployerDetailPage";
import MenuSystemManage from "./components/MenuSystemManage";
import NotFoundPage from "components/404";

const EmployerManagerPage = lazy(() => import("./pages/EmployerManagerPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const SettingPage = lazy(() => import("./pages/SettingPage"));
const StatisticPage = lazy(() => import("./pages/StatisticPage"));

const SystemManagerPage = () => {
  const { url } = useRouteMatch();

  return (
    <Fragment>
      <MenuSystemManage>
        <Switch>
          <Route
            exact
            path={`${url}/employers`}
            component={EmployerManagerPage}
          />
          <Route
            exact
            path={`${url}/employers/view/:id`}
            component={EmployerDetailPage}
          />
          <Route exact path={`${url}/my-profile`} component={ProfilePage} />
          <Route exact path={`${url}/setting`} component={SettingPage} />
          <Route exact path={`${url}/statistic`} component={StatisticPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </MenuSystemManage>
    </Fragment>
  );
};

export default SystemManagerPage;
