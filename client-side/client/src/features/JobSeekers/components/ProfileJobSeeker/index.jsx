import { FaBirthdayCake, FaCity } from "react-icons/fa";
import { Fragment } from "react";
import { ImUser } from "react-icons/im";
import { MdEmail, MdSmartphone, MdLocationOn } from "react-icons/md";
import AvatarUpload from "components/AvatarUpload";
import classes from "./style.module.scss";
import moment from "moment";

const ProfileJobSeeker = (props) => {
  const { jobSeeker, changeAvatar } = props;
  return (
    <div className={classes.left}>
      <div>
        <div>
          <AvatarUpload
            changeAvatar={changeAvatar}
            shape="circle"
            src={jobSeeker.avatar}
            size={120}
          />
        </div>
        <div className={`${classes.left__group} ${classes.fullname}`}>
          {jobSeeker.fullname}
        </div>
        <div className={classes.left__group}>
          <ImUser className={classes.icon} />
          {jobSeeker.username}
        </div>
        <div className={classes.left__group}>
          <MdEmail className={classes.icon} />
          {jobSeeker.email}
        </div>
        <div className={classes.left__group}>
          <MdSmartphone className={classes.icon} />
          {jobSeeker.phone}
        </div>
        {jobSeeker.DOB && (
          <div className={classes.left__group}>
            <FaBirthdayCake className={classes.icon} />
            {moment(jobSeeker.DOB).format("DD/MM/yyyy")}
          </div>
        )}
        {jobSeeker.address && (
          <Fragment>
            <div className={`${classes.left__group} ${classes.address}`}>
              <MdLocationOn className={classes.icon} />
              {jobSeeker.address.street}, {jobSeeker.address.ward},{" "}
              {jobSeeker.address.district}
            </div>
            <div className={`${classes.left__group} ${classes.address}`}>
              <FaCity className={classes.icon} />
              {jobSeeker.address.city}
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default ProfileJobSeeker;
