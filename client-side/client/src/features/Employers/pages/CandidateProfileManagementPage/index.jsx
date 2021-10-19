import { ScrollTop } from "common/functions";
import { useTitle } from "common/hook/useTitle";
import { useTranslation } from "react-i18next";

const CandidateProfileManagementPage = () => {
  ScrollTop();
  const { t } = useTranslation();
  useTitle(`${t("Manage candidate profiles")}`);

  return (
    <div>
      <h3>Candidate Profile Manaagement </h3>
    </div>
  );
};

export default CandidateProfileManagementPage;
