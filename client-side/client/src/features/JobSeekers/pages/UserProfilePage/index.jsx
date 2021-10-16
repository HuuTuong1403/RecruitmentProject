import { useSelector } from "react-redux";
import { selectedJobSeekerProfile } from "features/JobSeekers/slices/selectors";
import { ScrollTop } from "common/functions";
import { useTranslation } from "react-i18next";
import { useTitle } from "common/hook/useTitle";
import classes from "./style.module.scss";
import { Avatar } from "antd";
import { MdEmail, MdSmartphone } from "react-icons/md";

const UserProfilePage = () => {
  ScrollTop();
  const detailJobSeeker = useSelector(selectedJobSeekerProfile);
  const { t } = useTranslation();

  useTitle(`${t("Account Management")}`);

  return (
    <div className={classes.profile}>
      <div className={classes.profile__wrapped}>
        <div className={classes["profile__wrapped--title"]}>
          Quản lý tài khoản
        </div>
        <div className={classes["profile__wrapped--content"]}>
          <div className={classes["profile__wrapped--blockLeft"]}></div>
          <div className={classes["profile__wrapped--blockRight"]}>
            <div>
              <div>
                <Avatar src={detailJobSeeker?.avatar} size={100} />
              </div>
              <div className={classes["profile__wrapped--blockRight--group"]}>
                <MdEmail className={classes.icon} />
                {detailJobSeeker?.email}
              </div>
              <div className={classes["profile__wrapped--blockRight--group"]}>
                <MdSmartphone className={classes.icon} />
                {detailJobSeeker?.phone}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
