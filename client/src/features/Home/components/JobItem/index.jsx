import classes from "./style.module.scss";
import logo from "../../../../assets/images/logo.png";
import { BiDollarCircle } from "react-icons/bi";
import { MdLocationOn } from "react-icons/md";
import { Link } from "react-router-dom";

const JobItem = (props) => {
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
              {props.nameJob}
            </Link>
          </div>
          <div>
            <Link
              className={classes["jobitem__container--detail--namecompany"]}
              to="/home"
            >
              {props.nameCompany}
            </Link>
          </div>
          <div className={classes["jobitem__container--detail--salary"]}>
            <BiDollarCircle />
            <div>700 USD - 800USD</div>
          </div>
          <div className={classes["jobitem__container--detail--location"]}>
            <MdLocationOn />
            <div>Ho Chi Minh</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobItem;
