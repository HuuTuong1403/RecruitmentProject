import { fetchJobDeletedAsync } from "features/Employers/slices/thunks";
import { ScrollTop } from "common/functions";
import {
  selectJobTrash,
  selectedStatus,
} from "features/Employers/slices/selectors";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTitle } from "common/hook/useTitle";
import { useTranslation } from "react-i18next";
import classes from "./style.module.scss";
import JobOfEmployerItem from "features/Employers/components/JobOfEmployerItem";
import LoadingSuspense from "components/Loading";
import NotFoundData from "components/NotFoundData";

const JobTrashPage = () => {
  ScrollTop();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const jobTrash = useSelector(selectJobTrash);
  const loading = useSelector(selectedStatus);
  useTitle(`${t("Manage deleted job postings")}`);

  useEffect(() => {
    dispatch(fetchJobDeletedAsync());
  }, [dispatch]);

  return loading ? (
    <LoadingSuspense height="80vh" />
  ) : (
    <div className={classes.container}>
      <div className={classes.container__wrapped}>
        <div className={classes.titleDashboard}>
          {t("Manage deleted job postings")}
        </div>
        <div className={classes.subTitleDashboard}>{`${t("There are")} ${
          jobTrash?.length
        } ${t("job posting has been deleted")}`}</div>
        {jobTrash &&
          (jobTrash.length === 0 ? (
            <NotFoundData title={t("You have not deleted any job postings")} />
          ) : (
            <div className={classes.listJob}>
              {jobTrash.map((job) => (
                <JobOfEmployerItem key={job.slug} isTrash={true} data={job} />
              ))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default JobTrashPage;
