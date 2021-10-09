import { useSelector } from "react-redux";
import { selectedJobSeekerProfile } from "features/JobSeekers/slices/selectors";
import { ScrollTop } from "common/functions";
import { useTranslation } from "react-i18next";
import { useTitle } from "common/hook/useTitle";

const UserProfilePage = () => {
  ScrollTop();
  const detailJobSeeker = useSelector(selectedJobSeekerProfile);
  const { t } = useTranslation();

  useTitle(`${t("Account Management")}`);

  return (
    <div>
      <div>{detailJobSeeker?.id}</div>
    </div>
  );
};

export default UserProfilePage;
