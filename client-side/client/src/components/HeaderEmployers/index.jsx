import MSTLogo from "assets/images/mst_logo.png";
import classes from "./style.module.scss";
import { IoPersonCircle, IoMenu, IoHome } from "react-icons/io5";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { useHistory, NavLink, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useWindowSize } from "../../common/hook/useWindowSize";
import ReactCountryFlag from "react-country-flag";

const HeaderEmployers = () => {
  const history = useHistory();
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState(localStorage.getItem("lang") || "en-ES");
  const [toggle, setToggle] = useState(false);
  const [width] = useWindowSize();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen((prevState) => !prevState);

  const clickLogoHandler = () => {
    history.push("/employers");
  };

  const toggleMenuHandler = () => {
    setToggle((prevState) => (prevState = !prevState));
  };

  const changeLangViHandler = () => {
    i18n.changeLanguage("vi-VN");
    setLang("vi-VN");
    setToggle(false);
    localStorage.setItem("lang", "vi-VN");
  };

  const changeLangEnHandler = () => {
    i18n.changeLanguage("en-ES");
    setLang("en-ES");
    setToggle(false);
    localStorage.setItem("lang", "en-ES");
  };

  const toggleMenuChildClick = () => {
    setToggle(false);
  };

  const styleResize =
    width <= 768
      ? toggle
        ? { display: "block" }
        : { display: "none" }
      : { display: "flex" };

  return (
    <header className={classes.header}>
      <div>
        <img
          onClick={clickLogoHandler}
          src={MSTLogo}
          alt="MST LOGO"
          className={classes.header__logo}
        />
        <NavLink className={classes.header__home} to="/employers">
          <IoHome />
        </NavLink>
      </div>
      <div style={styleResize} className={classes["header__block-right"]}>
        <NavLink
          activeClassName={classes["header__link--active"]}
          to="/employers/sign-in"
          className={classes["header__link"]}
          onClick={toggleMenuChildClick}
        >
          <IoPersonCircle className={classes["header__link--person"]} />
          {t("signin")}
        </NavLink>
        <NavLink
          activeClassName={classes["header__link--active"]}
          to="/employers/sign-up"
          className={classes["header__link"]}
          onClick={toggleMenuChildClick}
        >
          {t("signup")}
        </NavLink>
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
        <Link to="/" className={classes["header__link--emp"]}>
          <span>{t("jobseekers-site")}</span>
          <br />
          <span>{t("searchjobs")}</span>
        </Link>
      </div>
      <div className={classes["header__ic--menu"]}>
        <IoMenu onClick={toggleMenuHandler} />
      </div>
    </header>
  );
};

export default HeaderEmployers;
