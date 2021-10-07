import { ScrollTop } from "common/functions";

import { selectJobs } from "features/JobSeekers/slices/selectors";
import { useSelector } from "react-redux";
import classes from "./style.module.scss";
import JobItem from "../../components/JobItem";

const JobAppliedPage = () => {
  ScrollTop();

  const jobs = useSelector(selectJobs);

  return (
    <div className={classes.jobApplied}>
      <div className={classes.jobApplied__wrapped}>
        <div className={classes["jobApplied__wrapped--title"]}>
          Danh sách việc làm đã ứng tuyển
        </div>
        {jobs?.map((item) => (
          <JobItem isApplied={true} key={item.id} job={item} />
        ))}
      </div>
    </div>
  );
};

export default JobAppliedPage;
