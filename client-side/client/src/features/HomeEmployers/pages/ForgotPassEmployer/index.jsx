import { useTitle } from "common/hook/useTitle";
import { useTranslation } from "react-i18next";

const ForgotPassEmployer = () => {
  const { t } = useTranslation();
  useTitle(`${t("forgotpass")}`);

  return (
    <div>
      <h1>Forgot Pass</h1>
    </div>
  );
};

export default ForgotPassEmployer;
