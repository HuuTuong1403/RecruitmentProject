import MSTLogo from "assets/images/mst_logo.png";
import classes from "./styles.module.scss";
import { IoPersonCircle, IoMenu } from "react-icons/io5";
import { Menu, Dropdown } from "antd";
import { useHistory, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useWindowSize } from "../../common/hook/useWindowSize";
import ReactCountryFlag from "react-country-flag";

const Header = () => {
  const history = useHistory();
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState(localStorage.getItem("lang") || "en-ES");
  const [toggle, setToggle] = useState(false);
  const [width] = useWindowSize();

  const clickLogoHandler = () => {
    history.push("/");
  };

  const toggleMenuHandler = () => {
    setToggle((prevState) => (prevState = !prevState));
  };

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

  const menu = (
    <Menu>
      <Menu.Item key="menuItem1">
        <div onClick={changeLangViHandler}>
          <ReactCountryFlag
            countryCode="VN"
            svg
            className={classes["header__ic--flag"]}
          />
          VI
        </div>
      </Menu.Item>
      <Menu.Item key="menuItem2">
        <div onClick={changeLangEnHandler}>
          <ReactCountryFlag
            countryCode="US"
            svg
            className={classes["header__ic--flag"]}
          />
          EN
        </div>
      </Menu.Item>
    </Menu>
  );

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
      </div>
      <div style={styleResize} className={classes["header__block-right"]}>
        <Link to={`/home/sign-in`} className={classes["header__link"]}>
          <IoPersonCircle className={classes["header__link--person"]} />
          {t("signin")}
        </Link>
        <Link to="/home/sign-up" className={classes["header__link"]}>
          {t("signup")}
        </Link>
        <Dropdown overlay={menu} className={classes["header__lang"]}>
          <div>{lang.slice(0, 2).toUpperCase()}</div>
        </Dropdown>
        <a href="/" className={classes["header__link--emp"]}>
          <span>{t("employers")}</span>
          <br />
          <span>{t("postjobs")}</span>
        </a>
      </div>
      <div className={classes["header__ic--menu"]}>
        <IoMenu onClick={toggleMenuHandler} />
      </div>
    </header>
  );
};

export default Header;
