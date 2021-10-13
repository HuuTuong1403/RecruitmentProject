import { Fragment } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import ProfilePage from "./pages/ProfilePage";

const SystemManagerPage = () => {
  const { url } = useRouteMatch();

  return (
    <Fragment>
      <Switch>
        <Route path={`${url}/my-profile`} component={ProfilePage} />
      </Switch>
    </Fragment>
  );
};

export default SystemManagerPage;
