import { ScrollTop } from "common/functions";
import { selectJobSeekerLocal } from "features/JobSeekers/slices/selectors";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useTitle } from "common/hook/useTitle";
import { useTranslation } from "react-i18next";
import AuthComponent from "components/AuthComponent";
import ForgotPassNotify from "components/ForgotPassNotify";
import SendMailForgot from "features/Home/components/SendMail";

const ForgotPass = () => {
  ScrollTop();
  useEffect(() => {
    const user = selectJobSeekerLocal();
    if (user) history.push("/home");
  });
  const { t } = useTranslation();
  const history = useHistory();
  const [isNotify, setIsNotify] = useState(false);
  useTitle(`${t("forgotpass")}`);

  const changeToNotifyHandler = () => setIsNotify((prevState) => !prevState);

  return (
    <AuthComponent>
      {!isNotify ? (
        <SendMailForgot changeToNotify={changeToNotifyHandler} />
      ) : (
        <ForgotPassNotify />
      )}
    </AuthComponent>
  );
};

export default ForgotPass;
