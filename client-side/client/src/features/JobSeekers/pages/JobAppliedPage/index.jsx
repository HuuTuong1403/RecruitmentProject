// import { selectJobs } from "features/JobSeekers/slices/selectors";
// import { useSelector } from "react-redux";
// import JobItem from "../../components/JobItem";
import { ScrollTop } from "common/functions";
import { useTitle } from "common/hook/useTitle";
import { useTranslation } from "react-i18next";
import classes from "./style.module.scss";
import NotFoundData from "components/NotFoundData";

const JobAppliedPage = () => {
  ScrollTop();
  const { t } = useTranslation();
  // const jobs = useSelector(selectJobs);
  useTitle(`${t("Applied jobs")}`);

  return (
    <div className={classes.jobApplied}>
      <div className={classes.jobApplied__wrapped}>
        <div className={classes.titleDashboard}>
          {t("List of jobs applied")}
        </div>
        <NotFoundData title={t("No applied jobs")} />
        {/* {jobs?.map((item) => (
          <JobItem isApplied={true} key={item.id} job={item} />
        ))} */}
      </div>
    </div>
  );
};

export default JobAppliedPage;
