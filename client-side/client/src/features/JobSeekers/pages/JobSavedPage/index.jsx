import { fetchAllFavoriteJobAsync } from "features/JobSeekers/slices/thunks";
import { ScrollTop } from "common/functions";
import { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTitle } from "common/hook/useTitle";
import { useTranslation } from "react-i18next";
import {
  selectFavoriteJobs,
  selectedStatus,
} from "features/JobSeekers/slices/selectors";
import classes from "./style.module.scss";
import JobItem from "../../components/JobItem";
import LoadingSuspense from "components/Loading";
import NotFoundData from "components/NotFoundData";

const JobSavedPage = () => {
  ScrollTop();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const favoriteJobs = useSelector(selectFavoriteJobs);
  const loading = useSelector(selectedStatus);
  useTitle(`${t("Saved jobs")}`);

  useEffect(() => {
    dispatch(fetchAllFavoriteJobAsync());
  }, [dispatch]);

  return loading ? (
    <LoadingSuspense height="80vh" />
  ) : (
    favoriteJobs && (
      <Fragment>
        <div className={classes.titleDashboard}>{t("List of jobs saved")}</div>
        <div className={classes.subTitleDashboard}>{`${t("You have saved")} ${
          favoriteJobs.length
        } ${t("job postings")}`}</div>
        {favoriteJobs.length === 0 ? (
          <NotFoundData title={t("No saved jobs")} />
        ) : (
          <div className={classes.listJob}>
            {favoriteJobs.map((job) => (
              <JobItem key={job.slug} data={job} />
            ))}
          </div>
        )}
      </Fragment>
    )
  );
};

export default JobSavedPage;
