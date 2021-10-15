import { Fragment, lazy } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import EmployerDetailPage from "./pages/EmployerDetailPage";
import MenuSystemManage from "./components/MenuSystemManage";

const EmployerManagerPage = lazy(() => import("./pages/EmployerManagerPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const SettingPage = lazy(() => import("./pages/SettingPage"));
const StatisticPage = lazy(() => import("./pages/StatisticPage"));

const SystemManagerPage = () => {
  const { url } = useRouteMatch();

  return (
    <Fragment>
      <Switch>
        <MenuSystemManage>
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
          <Route path={`${url}/my-profile`} component={ProfilePage} />
          <Route path={`${url}/setting`} component={SettingPage} />
          <Route path={`${url}/statistic`} component={StatisticPage} />
        </MenuSystemManage>
      </Switch>
    </Fragment>
  );
};

export default SystemManagerPage;
