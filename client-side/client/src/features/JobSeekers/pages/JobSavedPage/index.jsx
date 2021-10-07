import { ScrollTop } from "common/functions";
import classes from "./style.module.scss";
import { useSelector } from "react-redux";
import { selectJobs } from "features/JobSeekers/slices/selectors";
import JobItem from "../../components/JobItem";

const JobSavedPage = () => {
  ScrollTop();

  const jobs = useSelector(selectJobs);

  return (
    <div className={classes.jobSaved}>
      <div className={classes.jobSaved__wrapped}>
        <div className={classes["jobSaved__wrapped--title"]}>
          Danh sách việc làm đã lưu
        </div>
        {jobs?.map((item) => (
          <JobItem key={item.id} job={item} />
        ))}
      </div>
    </div>
  );
};

export default JobSavedPage;
