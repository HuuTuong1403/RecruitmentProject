import { Link } from "react-router-dom";
import classes from "./style.module.scss";
import { FaBuilding } from "react-icons/fa";
import { BiDollarCircle } from "react-icons/bi";
import { MdLocationOn } from "react-icons/md";
import { IoMdCalendar, IoMdTime } from "react-icons/io";
import moment from "moment";

const JobSearchItem = (props) => {
  const {
    logo,
    jobTitle,
    companyName,
    salary,
    skills,
    location,
    aboutCreated,
    createdAt,
    finishDate,
    slug,
    isNew,
  } = props.job;

  return (
    <div className={classes.searchItem}>
      <div className={classes.searchItem__figure}>
        {isNew && <div className={classes["searchItem__figure--new"]}>Mới</div>}
        <div className={classes["searchItem__figure--image"]}>
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
        </div>
        <div className={classes["searchItem__figure--figcaption"]}>
          <div className={classes["searchItem__figure--figcaption--jobTitle"]}>
            <Link to={`/jobs/${slug}`}>{jobTitle}</Link>
            <div>
              <IoMdTime style={{ marginRight: "5px", fontSize: "18px" }} />
              {aboutCreated}
            </div>
          </div>
          <div
            className={classes["searchItem__figure--figcaption--companyName"]}
          >
            <Link to="/home">
              <FaBuilding style={{ marginRight: "5px" }} />
              {companyName}
            </Link>
          </div>
          <div className={classes["searchItem__figure--figcaption--salary"]}>
            <div>
              <BiDollarCircle style={{ marginRight: "5px" }} />
              Lương:{" "}
              {salary.min
                ? `${salary.min} - ${salary.max} ${salary.type}`
                : `${salary.type}`}
            </div>
            <div>
              <MdLocationOn style={{ marginRight: "5px" }} />
              {location.city}
            </div>
          </div>
          <div className={classes["searchItem__figure--figcaption--skill"]}>
            <div>Các kỹ năng: </div>
            {skills.map((skill, index) => {
              return (
                <div key={index}>
                  {skill} {skills.length - 1 === index ? "" : "|"}
                </div>
              );
            })}
          </div>
          <div className={classes["searchItem__figure--figcaption--date"]}>
            <div>
              <IoMdCalendar style={{ marginRight: "5px", fontSize: "18px" }} />
              Ngày đăng: {moment(createdAt).format("DD/MM/yyyy")}
            </div>
            <div>
              <IoMdCalendar style={{ marginRight: "5px", fontSize: "18px" }} />
              Ngày hết hạn: {moment(finishDate).format("DD/MM/yyyy")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobSearchItem;
