import { ScrollTop } from "common/functions";
import { selectEmployerLocal } from "features/Employers/slices/selectors";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useTitle } from "common/hook/useTitle";
import { useTranslation } from "react-i18next";
import AuthComponent from "components/AuthComponent";
import ForgotPassNotify from "components/ForgotPassNotify";
import SendMailForgotEmployer from "features/HomeEmployers/components/SendMailEmployer";

const ForgotPassEmployer = () => {
  ScrollTop();
  useEffect(() => {
    const employer = selectEmployerLocal();
    if (employer) history.push("/employers");
  });
  const { t } = useTranslation();
  const history = useHistory();
  const [isNotify, setIsNotify] = useState(false);
  useTitle(`${t("forgotpass")}`);

  const changeToNotifyHandler = () => setIsNotify((prevState) => !prevState);

  return (
    <AuthComponent>
      {!isNotify ? (
        <SendMailForgotEmployer changeToNotify={changeToNotifyHandler} />
      ) : (
        <ForgotPassNotify />
      )}
    </AuthComponent>
  );
};

export default ForgotPassEmployer;
