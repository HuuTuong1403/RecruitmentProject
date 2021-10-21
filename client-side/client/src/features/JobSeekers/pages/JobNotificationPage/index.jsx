import { ScrollTop } from "common/functions";
import { useTitle } from "common/hook/useTitle";
import { useTranslation } from "react-i18next";

const JobNotificationPage = () => {
  ScrollTop();
  const { t } = useTranslation();
  useTitle(`${t("My Job Alerts")}`);

  return (
    <div>
      <h1>User Profile</h1>
    </div>
  );
};

export default JobNotificationPage;
