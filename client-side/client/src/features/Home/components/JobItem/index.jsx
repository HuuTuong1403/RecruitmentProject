import classes from "./style.module.scss";
import { BiDollarCircle } from "react-icons/bi";
import { MdLocationOn } from "react-icons/md";
import { Link } from "react-router-dom";

const JobItem = (props) => {
  const { jobTitle, companyName, salary, location, logo } = props.job;

  return (
    <div className={classes.jobitem}>
      <div className={classes.jobitem__container}>
        <div className={classes["jobitem__container--logo"]}>
          <img src={logo} alt="Logo" />
        </div>
        <div className={classes["jobitem__container--detail"]}>
          <div>
            <Link
              className={classes["jobitem__container--detail--namejob"]}
              to="/home"
            >
              {jobTitle}
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
            <BiDollarCircle style={{ marginRight: "5px" }} />
            <div>
              {salary.min
                ? `${salary.min} - ${salary.max} ${salary.type}`
                : `${salary.type}`}
            </div>
          </div>
          <div className={classes["jobitem__container--detail--location"]}>
            <MdLocationOn />
            <div>{location.city}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobItem;
