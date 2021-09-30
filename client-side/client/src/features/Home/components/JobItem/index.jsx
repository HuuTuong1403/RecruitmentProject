import classes from "./style.module.scss";
import { BiDollarCircle } from "react-icons/bi";
import { MdLocationOn } from "react-icons/md";
import { Link } from "react-router-dom";

const JobItem = (props) => {
  const { jobName, companyName, salary, location, logoCompany } = props.job;

  return (
    <div className={classes.jobitem}>
      <div className={classes.jobitem__container}>
        <div className={classes["jobitem__container--logo"]}>
          <img src={logoCompany} alt="Logo" />
        </div>
        <div className={classes["jobitem__container--detail"]}>
          <div>
            <Link
              className={classes["jobitem__container--detail--namejob"]}
              to="/home"
            >
              {jobName}
            </Link>
          </div>
          <div>
            <Link
              className={classes["jobitem__container--detail--namecompany"]}
              to="/home"
            >
              {companyName}
            </Link>
          </div>
          <div className={classes["jobitem__container--detail--salary"]}>
            <BiDollarCircle />
            <div>{salary}</div>
          </div>
          <div className={classes["jobitem__container--detail--location"]}>
            <MdLocationOn />
            <div>{location}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobItem;
