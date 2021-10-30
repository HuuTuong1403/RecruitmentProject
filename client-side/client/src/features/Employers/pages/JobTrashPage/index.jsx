import { ScrollTop } from "common/functions";
import { useSelector } from "react-redux";
import { useTitle } from "common/hook/useTitle";
import { useTranslation } from "react-i18next";
import classes from "./style.module.scss";
import NotFoundData from "components/NotFoundData";
import { selectJobTrash } from "features/Employers/slices/selectors";
import JobOfEmployerItem from "features/Employers/components/JobOfEmployerItem";

const JobTrashPage = () => {
  ScrollTop();
  const { t } = useTranslation();
  const jobTrash = useSelector(selectJobTrash);
  useTitle(`${t("Manage deleted job postings")}`);

  return (
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
