import { fetchJobsOfEmployerAsync } from "features/Employers/slices/thunks";
import { ScrollTop } from "common/functions";
import {
  selectJobsOfEmployer,
  selectedStatus,
} from "features/Employers/slices/selectors";
import { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTitle } from "common/hook/useTitle";
import { useTranslation } from "react-i18next";
import classes from "./style.module.scss";
import JobOfEmployerItem from "features/Employers/components/JobOfEmployerItem";
import LoadingSuspense from "components/Loading";
import NotFoundData from "components/NotFoundData";

const RecruitManagementPage = () => {
  ScrollTop();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const loading = useSelector(selectedStatus);

  useTitle(`${t("Manage job postings created")}`);

  useEffect(() => {
    dispatch(fetchJobsOfEmployerAsync());
  }, [dispatch]);

  const jobsOfEmployer = useSelector(selectJobsOfEmployer);
  return loading ? (
    <LoadingSuspense height="80vh" />
  ) : (
    jobsOfEmployer && (
      <Fragment>
        <div className={classes.titleDashboard}>
          {t("Manage job postings created")}
        </div>
        <div className={classes.subTitleDashboard}>{`${t("There are")} ${
          jobsOfEmployer.length
        } ${t("job postings in total")}`}</div>
        {jobsOfEmployer.length === 0 ? (
          <NotFoundData
            title={t("You have not posted any job vacancies yet")}
          />
        ) : (
          <div className={classes.listJob}>
            {jobsOfEmployer.map((job) => (
              <JobOfEmployerItem key={job.slug} data={job} />
            ))}
          </div>
        )}
      </Fragment>
    )
  );
};

export default RecruitManagementPage;
