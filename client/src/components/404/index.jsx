import classes from "./styles.module.scss";
import animationData from "assets/lottie/pageNotFound.json";
import Lottie from "lottie-react";
import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    <div className={classes.container}>
      <div className={classes["container__content"]}>
        <div className={classes["container__content--title"]}>
          Rất tiếc, không tìm thấy trang
        </div>
        <div className={classes["container__content--body"]}>
          Trang này không tồn tại hoặc bị lỗi do đường link không chính xác.
        </div>
        <Link to="/">Quay lại trang chủ</Link>
      </div>
      <Lottie
        className={classes.container__lottie}
        animationData={animationData}
      />
    </div>
  );
};

export default Page404;
