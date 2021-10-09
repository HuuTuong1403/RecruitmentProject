import { ScrollTop } from "common/functions";
import { useTranslation } from "react-i18next";
import { useTitle } from "common/hook/useTitle";

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
