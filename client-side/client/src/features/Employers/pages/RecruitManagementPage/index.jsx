import { useTitle } from "common/hook/useTitle";
import { useTranslation } from "react-i18next";

const RecruitManagementPage = () => {
  const { t } = useTranslation();
  useTitle(`${t("recruitment manager")}`);

  return (
    <div>
      <h3>Recruit Management</h3>
    </div>
  );
};

export default RecruitManagementPage;
