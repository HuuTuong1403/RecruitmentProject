import { useTranslation } from "react-i18next";
import classes from "./style.module.scss";

const ForgotPassNotify = () => {
  const { t } = useTranslation();

  return (
    <div className={classes.forgotPassNotify}>
      <div className={classes.forgotPassNotify__wrapped}>
        <div className={classes["forgotPassNotify__wrapped--title1"]}>
          {t("forgotpass")}
        </div>
        <div className={classes["forgotPassNotify__wrapped--title2"]}>
          Vui lòng kiểm tra email của bạn và làm theo hướng dẫn để tạo mật khẩu
          mới
        </div>
        <div className={classes["forgotPassNotify__wrapped--content1"]}>
          “Nếu bạn sử dụng Gmail hoặc công ty bạn đang sử dụng dịch vụ email của
          Google để đăng ký tài khoản, bạn hãy kiểm tra email trong các mục
          Inbox/Hộp thư đến (Primary, Social, Promotions) và Spam. Hoặc dùng
          công cụ tìm kiếm email để tìm tên email: mst.recruitment10@gmail.com.”
        </div>
        <div className={classes["forgotPassNotify__wrapped--content2"]}>
          Nếu bạn cần sự trợ giúp. Vui lòng liên hệ:
        </div>
        <div className={classes["forgotPassNotify__wrapped--content3"]}>
          Email:{" "}
          <a href="mailto:mst.recruitment10@gmail.com">
            mst.recruitment10@gmail.com
          </a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassNotify;
