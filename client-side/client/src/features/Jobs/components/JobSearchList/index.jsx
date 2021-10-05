import JobSearchItem from "../JobSearchItem";
import classes from "./style.module.scss";
import { useSelector } from "react-redux";
import { selectedJobs, selectedStatus } from "features/Jobs/slices/selectors";
import LoadingSuspense from "components/Loading";
import { Fragment } from "react";
import NotFoundSearch from "../NotFoundSearch";
import { useTranslation } from "react-i18next";

const JobSearchList = () => {
  const { t } = useTranslation();
  const jobsSearch = useSelector(selectedJobs);
  const loading = useSelector(selectedStatus);

  return (
    <section className={classes.searchList}>
      <div className={classes.searchList__container}>
        {loading ? (
          <LoadingSuspense height="40vh" showText={false} />
        ) : (
          <Fragment>
            <div className={classes["searchList__container--job-found"]}>
              <div>
                {jobsSearch.length === 0
                  ? `${t("No job found")}`
                  : `${jobsSearch.length} ${t("jobs found")}`}
              </div>
              <div>{t("sort by")}</div>
            </div>
            {jobsSearch.length === 0 ? (
              <NotFoundSearch />
            ) : (
              jobsSearch.map((job) => <JobSearchItem key={job.id} job={job} />)
            )}
          </Fragment>
        )}
      </div>
    </section>
  );
};
export default JobSearchList;
