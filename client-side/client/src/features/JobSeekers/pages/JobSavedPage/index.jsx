import { ScrollTop } from "common/functions";
import classes from "./style.module.scss";
import NotFoundJob from "features/JobSeekers/components/NotFoundJob";
import { useTranslation } from "react-i18next";
// import { useSelector } from "react-redux";
// import { selectJobs } from "features/JobSeekers/slices/selectors";
// import JobItem from "../../components/JobItem";
import { useTitle } from "common/hook/useTitle";

const JobSavedPage = () => {
  ScrollTop();
  const { t } = useTranslation();
  // const jobs = useSelector(selectJobs);
  useTitle(`${t("Saved jobs")}`);

  return (
    <div className={classes.jobSaved}>
      <div className={classes.jobSaved__wrapped}>
        <div className={classes["jobSaved__wrapped--title"]}>
          {t("List of jobs saved")}
        </div>
        <NotFoundJob />
        {/* {jobs?.map((item) => (
          <JobItem key={item.id} job={item} />
        ))} */}
      </div>
    </div>
  );
};

export default JobSavedPage;