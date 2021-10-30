import { ScrollTop } from "common/functions";
import { selectFavoriteJobs } from "features/JobSeekers/slices/selectors";
import { useSelector } from "react-redux";
import { useTitle } from "common/hook/useTitle";
import { useTranslation } from "react-i18next";
import classes from "./style.module.scss";
import JobItem from "../../components/JobItem";
import NotFoundData from "components/NotFoundData";

const JobSavedPage = () => {
  ScrollTop();
  const { t } = useTranslation();
  const favoriteJobs = useSelector(selectFavoriteJobs);
  useTitle(`${t("Saved jobs")}`);

  return (
    <div className={classes.jobSaved}>
      <div className={classes.jobSaved__wrapped}>
        <div className={classes.titleDashboard}>{t("List of jobs saved")}</div>
        <div className={classes.subTitleDashboard}>{`${t("You have saved")} ${
          favoriteJobs?.length
        } ${t("job postings")}`}</div>
        {favoriteJobs &&
          (favoriteJobs.length === 0 ? (
            <NotFoundData title={t("No saved jobs")} />
          ) : (
            <div className={classes.listJob}>
              {favoriteJobs.map((job) => (
                <JobItem key={job.slug} data={job} />
              ))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default JobSavedPage;
