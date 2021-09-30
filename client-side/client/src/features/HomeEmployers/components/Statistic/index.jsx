import classes from "./style.module.scss";
import {
  FaBriefcase,
  FaBuilding,
  FaIdBadge,
  FaSearch,
  FaSeedling,
} from "react-icons/fa";
import { BiRadar } from "react-icons/bi";

const Statistic = () => {
  const statisticList = [
    {
      icon: <FaBriefcase />,
      statisticNum: "3.000+",
      description: "Ứng viên đang bật tìm việc trung bình/thời điểm",
    },
    {
      icon: <FaBuilding />,
      statisticNum: "9.000+",
      description: "Doanh nghiệp đối tác sử dụng dịch vụ",
    },
    {
      icon: <BiRadar />,
      statisticNum: "18.000+",
      description: "Nhà tuyển dụng sử dụng thường xuyên",
    },
    {
      icon: <FaIdBadge />,
      statisticNum: "20.000++",
      description: "Ứng viên mới mỗi tháng",
    },
    {
      icon: <FaSearch />,
      statisticNum: "300.000+",
      description: "Lượt ứng viên truy cập hàng tháng",
    },
    {
      icon: <FaSeedling />,
      statisticNum: "400.000+",
      description:
        "Ứng viên tiềm năng, trong đó có 60% là ứng viên có kinh nghiệm từ 2 năm trở lên",
    },
  ];

  return (
    <div className={classes.statistic}>
      <div className={classes.statistic__wrapped}>
        <div className={classes["statistic__wrapped--title"]}>
          Những con số thống kê
        </div>

        <ul className={classes["statistic__wrapped--bottom"]}>
          {statisticList.map((item, index) => (
            <li key={index}>
              <div className={classes["statistic__wrapped--bottom--icon"]}>
                {item.icon}
              </div>
              <div
                className={classes["statistic__wrapped--bottom--description"]}
              >
                <h2>{item.statisticNum}</h2>
                <p>{item.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Statistic;
