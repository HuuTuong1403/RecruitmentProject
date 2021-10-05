import AuthComponent from "components/AuthComponent";
import ChangePassForgot from "features/Home/components/ChangePass";
import SendMailForgot from "features/Home/components/SendMail";
import { useLocation, useHistory } from "react-router-dom";
import { useEffect } from "react";

const ForgotPass = () => {
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("token");
    if (isLoggedIn) history.push("/home");
  });
  const history = useHistory();
  let query = new URLSearchParams(useLocation().search);
  let type = query.get("type");

  return (
    <AuthComponent>
      {type !== "change" ? <SendMailForgot /> : <ChangePassForgot />}
    </AuthComponent>
  );
};

export default ForgotPass;
