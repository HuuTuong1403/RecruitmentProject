import AuthComponent from "components/AuthComponent";
import ChangePassForgot from "features/Home/components/ChangePass";
import SendMailForgot from "features/Home/components/SendMail";
import { useLocation } from "react-router";

const ForgotPass = () => {
  let query = new URLSearchParams(useLocation().search);
  let type = query.get("type");

  return (
    <AuthComponent>
      {type !== "change" ? <SendMailForgot /> : <ChangePassForgot />}
    </AuthComponent>
  );
};

export default ForgotPass;
