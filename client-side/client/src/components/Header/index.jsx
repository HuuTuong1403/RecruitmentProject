import { AiOutlineNotification } from "react-icons/ai";
import { BsListCheck } from "react-icons/bs";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { IoMenu } from "react-icons/io5";
import { logoutJobSeeker } from "features/Home/slices";
import { MdSettings, MdAccountCircle } from "react-icons/md";
import { resetFavoriteJob } from "features/JobSeekers/slices";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { selectJobSeekerLocal } from "features/JobSeekers/slices/selectors";
import { useDispatch } from "react-redux";
import { useHistory, NavLink, Link } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useWindowSize } from "common/hook/useWindowSize";
import classes from "./style.module.scss";
import MSTLogo from "assets/images/mst_logo.png";
import notification from "components/Notification";
import ReactCountryFlag from "react-country-flag";

const Header = () => {
  const history = useHistory();
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState(localStorage.getItem("lang") || "en-ES");
  const [toggle, setToggle] = useState(false);
  const [width] = useWindowSize();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownHover, setDropDownHover] = useState(false);
  const user = selectJobSeekerLocal();
  const toggleDropdown = () => setDropdownOpen((prevState) => !prevState);
  const dispatch = useDispatch();

  const clickLogoHandler = () => {
    history.push("/");
  };

  const hoverProfileHandler = () => setDropDownHover((prevState) => !prevState);

  const toggleMenuHandler = () => {
    setToggle((prevState) => (prevState = !prevState));
  };

  const toggleMenuChildClick = () => {
    setToggle(false);
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

  const logoutHandler = () => {
    dispatch(logoutJobSeeker());
    dispatch(resetFavoriteJob());
    notification(`${t("Log out successful")}`, "success");
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
        {!user ? (
          <NavLink
            activeClassName={classes["header__link--active"]}
            to={`/home/sign-in`}
            className={classes["header__link"]}
            onClick={toggleMenuChildClick}
          >
            <MdAccountCircle className={classes["header__link--person"]} />
            {t("signin")}
          </NavLink>
        ) : (
          <div>
            <Dropdown
              isOpen={dropdownHover}
              toggle={hoverProfileHandler}
              onMouseEnter={hoverProfileHandler}
              onMouseLeave={hoverProfileHandler}
              className={classes["header__lang"]}
            >
              <DropdownToggle caret>
                <Link
                  to={`/jobseekers/my-profile`}
                  onClick={toggleMenuChildClick}
                >
                  <MdAccountCircle
                    className={classes["header__link--person"]}
                  />
                  {user.fullname}
                </Link>
              </DropdownToggle>
              <DropdownMenu>
                <Link
                  className={classes["header__lang--profile"]}
                  to={`/jobseekers/my-profile`}
                >
                  <MdAccountCircle
                    className={classes["header__link--person"]}
                  />
                  {t("Account Management")}
                </Link>
                <Link
                  className={classes["header__lang--profile"]}
                  to={`/jobseekers/job-alert`}
                >
                  <AiOutlineNotification
                    className={classes["header__link--person"]}
                  />
                  {t("My Job Alerts")}
                </Link>
                <Link
                  className={classes["header__lang--profile"]}
                  to={`/jobseekers/job-saved`}
                >
                  <BsListCheck className={classes["header__link--person"]} />
                  {t("My Jobs")}
                </Link>
                <Link
                  className={classes["header__lang--profile"]}
                  to={`/jobseekers/setting-account`}
                >
                  <MdSettings className={classes["header__link--person"]} />
                  {t("Settings")}
                </Link>
                <Link
                  to="/"
                  className={classes["header__lang--profile"]}
                  onClick={logoutHandler}
                >
                  <RiLogoutCircleRLine
                    className={classes["header__link--person"]}
                  />
                  {t("Log out")}
                </Link>
              </DropdownMenu>
            </Dropdown>
          </div>
        )}
        {!user && (
          <NavLink
            activeClassName={classes["header__link--active"]}
            to="/home/sign-up"
            className={classes["header__link"]}
            onClick={toggleMenuChildClick}
          >
            {t("signup")}
          </NavLink>
        )}
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
        <Link to="/employers" className={classes["header__link--emp"]}>
          <span>{t("employers")}</span>
          <br />
          <span>{t("postjobs")}</span>
        </Link>
      </div>
      <div className={classes["header__ic--menu"]}>
        <IoMenu onClick={toggleMenuHandler} />
      </div>
    </header>
  );
};

export default Header;
