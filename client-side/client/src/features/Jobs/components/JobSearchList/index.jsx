import { Fragment } from "react";
import { selectedJobs, selectedStatus } from "features/Jobs/slices/selectors";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import classes from "./style.module.scss";
import JobSearchItem from "../JobSearchItem";
import LoadingSuspense from "components/Loading";
import NotFoundSearch from "../NotFoundSearch";

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
              jobsSearch.map((job) => {
                return <JobSearchItem key={job._id} job={job} />;
              })
            )}
          </Fragment>
        )}
      </div>
    </section>
  );
};
export default JobSearchList;
