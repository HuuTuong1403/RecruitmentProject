import { Fragment, useEffect } from "react";
import { selectSystemManageLocal } from "features/SystemManager/slices/selectors";
import { Switch, Route, useRouteMatch, useHistory } from "react-router-dom";
import ChangeLang from "components/ChangeLang";
import ChangePassPage from "./pages/ChangePass";
import ForgotPassPage from "./pages/ForgotPassPage";
import SignInPage from "./pages/SignInPage";

const AuthPage = () => {
  const { url } = useRouteMatch();
  const history = useHistory();

  useEffect(() => {
    const systemManage = selectSystemManageLocal();
    if (systemManage) history.push("/dashboard");
  });

  return (
    <Fragment>
      <ChangeLang />
      <Switch>
        <Route exact path={`${url}`} component={SignInPage} />
        <Route exact path={`/forgot-pass`} component={ForgotPassPage} />
        <Route exact path="/forgot-pass/:token" component={ChangePassPage} />
      </Switch>
    </Fragment>
  );
};

export default AuthPage;
