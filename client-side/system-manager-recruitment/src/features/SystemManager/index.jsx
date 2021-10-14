import { Fragment } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import MenuSystemManage from "./components/MenuSystemManage";
import EmployerDetailPage from "./pages/EmployerDetailPage";
import EmployerManagerPage from "./pages/EmployerManagerPage";
import ProfilePage from "./pages/ProfilePage";
import SettingPage from "./pages/SettingPage";
import StatisticPage from "./pages/StatisticPage";

const SystemManagerPage = () => {
  const { url } = useRouteMatch();

  return (
    <Fragment>
      <Switch>
        <MenuSystemManage>
          <Route path={`${url}/my-profile`} component={ProfilePage} />
          <Route
            exact
            path={`${url}/employers`}
            component={EmployerManagerPage}
          />
          <Route
            exact
            path={`${url}/employers/:id`}
            component={EmployerDetailPage}
          />
          <Route path={`${url}/setting`} component={SettingPage} />
          <Route path={`${url}/statistic`} component={StatisticPage} />
        </MenuSystemManage>
      </Switch>
    </Fragment>
  );
};

export default SystemManagerPage;
