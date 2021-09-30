import classes from "./style.module.scss";
import { FaBullhorn, FaInfo } from "react-icons/fa";
import { AiFillDashboard } from "react-icons/ai";

const FeatureC = () => {
  
  const features = [
    {
      title: "Đăng tuyển miễn phí",
      icon: <FaBullhorn />,
      content:
        "Nếu bạn là nhà tuyển dụng bạn có thể đăng tin tuyển dụng hoàn toàn miễn phí và dễ dàng",
    },
    {
      title: "Thống kê số liệu",
      icon: <FaInfo />,
      content:
        "Số liệu liên tục cập nhật. Giúp cho người dùng dễ dàng theo dõi việc làm đã đăng.",
    },
    {
      title: "Bảng điều khiển",
      icon: <AiFillDashboard />,
      content:
        "Trở thành nhà tuyển dụng bạn sẽ trải nghiệm sử dụng bảng điều khiển để quản lý cho riêng mình",
    },
  ];

  return (
    <div className={classes.featureC}>
      <div className={classes.featureC__wrapped}>
        <div className={classes["featureC__wrapped--title"]}>
          Các tính năng chính
        </div>
        <ul className={classes["featureC__wrapped--bottom"]}>
          {features.map((item, index) => (
            <li key={index}>
              <p>
                <span>{item.icon}</span>
              </p>
              <p>{item.title}</p>
              <p>{item.content}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FeatureC;
