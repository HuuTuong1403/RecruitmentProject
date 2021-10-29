import { ScrollTop } from "common/functions";
import { selectJobsOfEmployer } from "features/Employers/slices/selectors";
import { useSelector } from "react-redux";
import { useTitle } from "common/hook/useTitle";
import { useTranslation } from "react-i18next";
import classes from "./style.module.scss";
import JobOfEmployerItem from "features/Employers/components/JobOfEmployerItem";
import NotFoundData from "components/NotFoundData";

const RecruitManagementPage = () => {
  ScrollTop();
  const { t } = useTranslation();
  const jobsOfEmployer = useSelector(selectJobsOfEmployer);
  useTitle(`${t("Manage job postings created")}`);

  return (
    <div className={classes.container}>
      <div className={classes.container__wrapped}>
        <div className={classes.titleDashboard}>
          {t("Manage job postings created")}
        </div>
        <div className={classes.subTitleDashboard}>{`${t("There are")} ${
          jobsOfEmployer?.length
        } ${t("job postings in total")}`}</div>
        {jobsOfEmployer &&
          (jobsOfEmployer.length === 0 ? (
            <NotFoundData
              title={t("You have not posted any job vacancies yet")}
            />
          ) : (
            <div className={classes.listJob}>
              {jobsOfEmployer.map((job) => (
                <JobOfEmployerItem key={job.slug} data={job} />
              ))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default RecruitManagementPage;
