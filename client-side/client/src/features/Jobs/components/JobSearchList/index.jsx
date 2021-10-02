import JobSearchItem from "../JobSearchItem";
import classes from "./style.module.scss";

const JobSearchList = () => {
  return (
    <section className={classes.searchList}>
      <div className={classes.searchList__container}>
        <div className={classes["searchList__container--job-found"]}>
          <div>328 công việc đã tìm thấy</div>
          <div>Sắp xếp theo</div>
        </div>
        <JobSearchItem />
        <JobSearchItem />
      </div>
    </section>
  );
};
export default JobSearchList;
