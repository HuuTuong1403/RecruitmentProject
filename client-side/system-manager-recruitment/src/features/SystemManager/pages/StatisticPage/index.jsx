import { ScrollTop } from "common/functions";
import { useTranslation } from "react-i18next";
import { useTitle } from "common/hook/useTitle";

const StatisticPage = () => {
  ScrollTop();
  const { t } = useTranslation();
  useTitle(`${t("Statistics")}`);

  return (
    <div>
      <h1>{t("Statistics")}</h1>
    </div>
  );
};

export default StatisticPage;
