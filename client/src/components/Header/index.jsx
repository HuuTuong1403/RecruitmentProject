import MSTLogo from "assets/images/mst_logo.png";
import classes from "./style.module.scss";
import { IoPersonCircle, IoMenu } from "react-icons/io5";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
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
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen((prevState) => !prevState);

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