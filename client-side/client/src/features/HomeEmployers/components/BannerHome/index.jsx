import { Link } from "react-router-dom";
import classes from "./style.module.scss";
import { IoPersonCircle } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";

const BannerHomeEmp = () => {
  return (
    <section className={classes.bannerEmp}>
      <div className={classes.bannerEmp__wrapped}>
        <div className={classes.bannerEmp__container}>
          <div className={classes["bannerEmp__container--top"]}>
            <h1>Đăng nhập dành cho nhà tuyển dụng</h1>
            <p>Quản lý tin tuyển dụng và hồ sơ ứng viên</p>
            <div>
              <Link to="/employers/sign-in">
                <IoPersonCircle
                  className={classes["bannerEmp__container--top--icon"]}
                />
                Đăng nhập
              </Link>
            </div>
          </div>
          <div className={classes["bannerEmp__container--top"]}>
            <h1>Hoặc đăng ký trở thành nhà tuyển dụng</h1>
            <p>Tuyển dụng nhanh chóng, dễ dàng và hiệu quả</p>
            <div>
              <Link to="/employers/sign-up">
                <FaEdit
                  className={classes["bannerEmp__container--top--icon"]}
                />
                Đăng ký ngay
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerHomeEmp;
