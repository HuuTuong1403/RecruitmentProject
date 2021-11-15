import { fetchAllJobDeleted } from "features/SystemManager/api/systemManager.api";
import { useEffect, useState, Fragment } from "react";
import { useTitle } from "common/hook/useTitle";
import { useTranslation } from "react-i18next";
import classes from "./style.module.scss";
import JobOfEmployerList from "features/SystemManager/components/JobOfEmployerList";
import LoadingSuspense from "components/Loading";
import NotFoundData from "components/NotFoundData";

const RecruitmentTrashPage = () => {
  const { t } = useTranslation();
  useTitle(`${t("Manage deleted job postings")}`);
  const [jobsDeleted, setJobsDeleted] = useState([]);
  const [loading, setLoading] = useState(true);

  const getDataJobDeleted = async () => {
    const result = await fetchAllJobDeleted();
    if (result.status === "success") {
      setJobsDeleted(result.data.data);
    } else {
      setJobsDeleted([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    getDataJobDeleted();
  }, []);

  return loading ? (
    <LoadingSuspense height="80vh" />
  ) : (
    jobsDeleted && (
      <div className={classes.recruitment}>
        <div className={classes.titleDashboard}>
          {t("Manage deleted job postings")}
        </div>
        {jobsDeleted.length === 0 ? (
          <NotFoundData
            title={t("Currently no job postings have been deleted")}
          />
        ) : (
          <Fragment>
            <div className={classes.subTitleDashboard}>{`${t("There are")} ${
              jobsDeleted.length
            } ${t("jobs deleted in total")}`}</div>
            <JobOfEmployerList
              listRender={jobsDeleted}
              max={6}
              status="deleted"
            />
          </Fragment>
        )}
      </div>
    )
  );
};

export default RecruitmentTrashPage;
