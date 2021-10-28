import { Avatar, Dropdown, Menu } from "antd";
import { useState } from "react";
import { Fragment, useRef } from "react";
import { MdHighlightOff } from "react-icons/md";
import { BiImageAdd } from "react-icons/bi";
import classes from "./style.module.scss";
import { useTranslation } from "react-i18next";
import notification from "components/Notification";

const AvatarUpload = (props) => {
  const { src, shape, size, changeAvatar } = props;
  const [avatarSrc, setAvatarSrc] = useState(src);
  const fileRef = useRef(null);
  const { t } = useTranslation();

  const checkValidImage = (file) => {
    const validImageTypes = [
      "image/jpg",
      "image/jpeg",
      "image/png",
      "image/svg",
    ];

    if (!validImageTypes.includes(file.type)) {
      notification(`${t("error-file-type")}`, "error");
      return false;
    }

    if (file.size >= 5000000) {
      notification(`${t("error-file-size")}`, "error");
      return false;
    }
    return true;
  };

  const handleChooseFile = () => {
    if (fileRef.current.files && fileRef.current.files[0]) {
      if (checkValidImage(fileRef.current.files[0])) {
        var reader = new FileReader();
        reader.onload = (e) => {
          setAvatarSrc(e.target.result);
        };
        reader.readAsDataURL(fileRef.current.files[0]);
        changeAvatar(fileRef.current.files[0]);
      }
    }
  };

  const handleDeleteImage = () => {
    setAvatarSrc(src);
    changeAvatar(null);
  };

  const menuUpload = (
    <Menu>
      <Menu.Item key="1">
        <div className={classes.avatar}>
          <BiImageAdd className={classes.avatar__icon} />
          <label style={{ cursor: "pointer" }} htmlFor="logo">
            {t("Change avatar")}
          </label>
          <input
            onChange={handleChooseFile}
            ref={fileRef}
            type="file"
            id="logo"
            style={{ display: "none" }}
          />
        </div>
      </Menu.Item>
      <Menu.Item key="2" onClick={handleDeleteImage}>
        <div className={classes.avatar__menuDelete}>
          <MdHighlightOff className={classes.avatar__icon} />
          <label style={{ cursor: "pointer" }}>{t("Delete avatar")}</label>
        </div>
      </Menu.Item>
    </Menu>
  );

  return (
    <Fragment>
      <Dropdown overlay={menuUpload}>
        <Avatar
          className={
            shape !== "circle" ? classes.avatarSquare : classes.avatarCircle
          }
          src={avatarSrc}
          shape={shape ?? "circle"}
          size={size}
        />
      </Dropdown>
    </Fragment>
  );
};
export default AvatarUpload;