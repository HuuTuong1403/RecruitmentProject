import { ScrollTop } from "common/functions";
import { selectApplicationJobs } from "features/JobSeekers/slices/selectors";
import { useSelector } from "react-redux";
import { useTitle } from "common/hook/useTitle";
import { useTranslation } from "react-i18next";
import classes from "./style.module.scss";
import JobItem from "../../components/JobItem";
import NotFoundData from "components/NotFoundData";
import { Fragment } from "react";

const JobAppliedPage = () => {
  ScrollTop();
  const { t } = useTranslation();
  const applicationJobs = useSelector(selectApplicationJobs);
  useTitle(`${t("Applied jobs")}`);

  return (
    <div className={classes.jobApplied}>
      <div className={classes.jobApplied__wrapped}>
        <div className={classes.titleDashboard}>
          {t("List of jobs applied")}
        </div>
        {applicationJobs && (
          <Fragment>
            <div className={classes.subTitleDashboard}>
              {`${t("You have applied for")} 
                ${applicationJobs.length} 
                ${applicationJobs.length > 1 ? t("jobs") : t("job")}`}
            </div>
            {applicationJobs.length === 0 ? (
              <NotFoundData title={t("No applied jobs")} />
            ) : (
              <div className={classes.listJob}>
                {applicationJobs.map((job, index) => (
                  <JobItem
                    isApplied
                    key={index}
                    data={job?.job}
                    createdAt={job?.createdAt}
                  />
                ))}
              </div>
            )}
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default JobAppliedPage;
