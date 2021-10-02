import { Link } from "react-router-dom";
import classes from "./style.module.scss";
import { FaBuilding } from "react-icons/fa";
import { BiDollarCircle } from "react-icons/bi";
import { MdLocationOn } from "react-icons/md";
import { IoMdCalendar, IoMdTime } from "react-icons/io";

const JobSearchItem = () => {
  return (
    <div className={classes.searchItem}>
      <div className={classes.searchItem__figure}>
        <div className={classes["searchItem__figure--image"]}>
          <Link to="/">
            <img
              src="http://static.ybox.vn/2018/8/5/1535082763510-Untitled-221.jpg"
              alt=""
            />
          </Link>
        </div>
        <div className={classes["searchItem__figure--figcaption"]}>
          <div className={classes["searchItem__figure--figcaption--jobTitle"]}>
            <Link>Sr Ruby on Rails Engineer - BONUS</Link>
            <div>
              <IoMdTime style={{ marginRight: "5px", fontSize: "18px" }} />3 giờ
            </div>
          </div>
          <div
            className={classes["searchItem__figure--figcaption--companyName"]}
          >
            <Link>
              <FaBuilding style={{ marginRight: "5px" }} />
              KMS Technology
            </Link>
          </div>
          <div className={classes["searchItem__figure--figcaption--salary"]}>
            <div>
              <BiDollarCircle style={{ marginRight: "5px" }} />
              Lương: 12 Tr - 13 Tr VND
            </div>
            <div>
              <MdLocationOn style={{ marginRight: "5px" }} />
              Hồ Chí Minh
            </div>
          </div>
          <div className={classes["searchItem__figure--figcaption--skill"]}>
            <div>Các kỹ năng: </div>
            <div>Ruby on Rails</div>
            <div>| ReactJS</div>
            <div>| AWS</div>
          </div>
          <div className={classes["searchItem__figure--figcaption--date"]}>
            <div>
              <IoMdCalendar style={{ marginRight: "5px", fontSize: "18px" }} />
              Ngày đăng: 2/10/2021
            </div>
            <div>
              <IoMdCalendar style={{ marginRight: "5px", fontSize: "18px" }} />
              Ngày hết hạn: 10/10/2021
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobSearchItem;
