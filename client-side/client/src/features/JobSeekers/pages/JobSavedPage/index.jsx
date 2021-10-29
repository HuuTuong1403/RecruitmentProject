// import { selectJobs } from "features/JobSeekers/slices/selectors";
// import { useSelector } from "react-redux";
// import JobItem from "../../components/JobItem";
import { ScrollTop } from "common/functions";
import { useTitle } from "common/hook/useTitle";
import { useTranslation } from "react-i18next";
import classes from "./style.module.scss";
import NotFoundData from "components/NotFoundData";

const JobSavedPage = () => {
  ScrollTop();
  const { t } = useTranslation();
  // const jobs = useSelector(selectJobs);
  useTitle(`${t("Saved jobs")}`);

  return (
    <div className={classes.jobSaved}>
      <div className={classes.jobSaved__wrapped}>
        <div className={classes.titleDashboard}>{t("List of jobs saved")}</div>
        <NotFoundData title={t("No saved jobs")} />
        {/* {jobs?.map((item) => (
          <JobItem key={item.id} job={item} />
        ))} */}
      </div>
    </div>
  );
};

export default JobSavedPage;
