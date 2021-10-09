import { useTitle } from "common/hook/useTitle";
import { useTranslation } from "react-i18next";

const EmployerProfilePage = () => {
  const { t } = useTranslation();
  useTitle(`${t("Account Management")}`);

  return (
    <div>
      <h1>Profile Page</h1>
    </div>
  );
};

export default EmployerProfilePage;
