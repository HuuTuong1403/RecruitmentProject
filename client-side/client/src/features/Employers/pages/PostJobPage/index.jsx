import { useTitle } from "common/hook/useTitle";
import { useTranslation } from "react-i18next";

const PostJobPage = () => {
  const { t } = useTranslation();
  useTitle(`${t("postjobs")}`);

  return (
    <div>
      <h1>Post Job Page</h1>
    </div>
  );
};

export default PostJobPage;
