import { Badge, Avatar } from "antd";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { IoMenu } from "react-icons/io5";
import { MdNotificationsNone } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { selectSystemManageLocal } from "features/SystemManager/slices/selectors";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import classes from "./style.module.scss";
import ReactCountryFlag from "react-country-flag";

const Header = (props) => {
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState(localStorage.getItem("lang") || "en-ES");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  //   const [dropdownHover, setDropDownHover] = useState(false);
  const { isShow, onOpen, onClose } = props;
  const systemManage = selectSystemManageLocal();
  const toggleDropdown = () => setDropdownOpen((prevState) => !prevState);

  //   const hoverProfileHandler = () => setDropDownHover((prevState) => !prevState);

  const changeLangViHandler = () => {
    i18n.changeLanguage("vi-VN");
    setLang("vi-VN");
    localStorage.setItem("lang", "vi-VN");
  };

  const changeLangEnHandler = () => {
    i18n.changeLanguage("en-ES");
    setLang("en-ES");
    localStorage.setItem("lang", "en-ES");
  };

  return (
    <header className={classes.header}>
      <div className={classes.header__menu}>
        <div className={classes["header__menu--ic"]}>
          <IoMenu onClick={isShow ? onOpen : onClose} />
        </div>
        <div>
          <NavLink
            activeClassName={classes["header__link--active"]}
            className={classes["header__link"]}
            to="/dashboard/my-profile"
          >
            {t("Account")}
          </NavLink>
        </div>
        <div>
          <NavLink
            activeClassName={classes["header__link--active"]}
            className={classes["header__link"]}
            to="/dashboard/employers"
          >
            {t("Employers")}
          </NavLink>
        </div>
        <div>
          <NavLink
            activeClassName={classes["header__link--active"]}
            className={classes["header__link"]}
            to="/dashboard/setting"
          >
            {t("Setting")}
          </NavLink>
        </div>
        <div>
          <NavLink
            activeClassName={classes["header__link--active"]}
            className={classes["header__link"]}
            to="/dashboard/statistic"
          >
            {t("Statistic")}
          </NavLink>
        </div>
      </div>
      <div className={classes["header__block-right"]}>
        <Badge size="small" count={5} offset={[-3, 3]}>
          <MdNotificationsNone className={classes.header__icon} />
        </Badge>
        <Dropdown
          isOpen={dropdownOpen}
          toggle={toggleDropdown}
          className={classes["header__lang"]}
        >
          <DropdownToggle caret>
            {lang.slice(0, 2).toUpperCase()}
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem>
              <div onClick={changeLangViHandler}>
                <ReactCountryFlag
                  countryCode="VN"
                  svg
                  className={classes["header__ic--flag"]}
                />
                VI
              </div>
            </DropdownItem>
            <DropdownItem>
              <div onClick={changeLangEnHandler}>
                <ReactCountryFlag
                  countryCode="US"
                  svg
                  className={classes["header__ic--flag"]}
                />
                EN
              </div>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Avatar src={systemManage?.avatar} />
      </div>
    </header>
  );
};

export default Header;
