import { DK, MSTLogo } from "assets";
import { FaFacebookF } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { Link } from "react-router-dom";
import { MdPhone } from "react-icons/md";
import { useTranslation } from "react-i18next";
import classes from "./style.module.scss";

const FooterEmployers = () => {
  const { t } = useTranslation();

  return (
    <footer className={classes.footer}>
      <div className={classes["footer__bltop"]}>
        <div className={classes["footer__bltop--left"]}>
          <img src={MSTLogo} alt="MST LOGO" />
          <ul>
            <li>
              <a href="/">{t("introduce")}</a>
            </li>
            <li>
              <a href="/">{t("feature")}</a>
            </li>
            <li>
              <a href="/">{t("service")}</a>
            </li>
            <li>
              <a href="/">{t("quote")}</a>
            </li>
          </ul>
        </div>
        <div className={classes["footer__bltop--right"]}>
          <div>{t("connect now")}</div>
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="nofollow noopener noreferrer"
          >
            <FaFacebookF />
          </a>
          <img src={DK} alt="Đã đăng ký bộ công thương" />
        </div>
      </div>
      <div className={classes["footer__blbottom"]}>
        <div className={classes["footer__blbottom--top"]}>
          <div>
            <h3>{t("contact-info")}</h3>
            <ul>
              <li>
                <a href="tel:+84396084832">
                  <MdPhone />
                  {t("Phone")} 1: (84) 396084832
                </a>
              </li>
              <li>
                <a href="tel:+84949488160">
                  <MdPhone />
                  {t("Phone")} 2: (84) 949488160
                </a>
              </li>
              <li>
                <a href="mailto:mst.recruitment10@gmail.com">
                  <IoMdMail />
                  mst.recruitment10@gmail.com
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3>{t("company")}</h3>
            <ul>
              <li>
                <a href="/">{t("about-us")}</a>
              </li>
              <li>
                <a href="/">{t("leadership")}</a>
              </li>
            </ul>
          </div>
          <div>
            <h3>{t("dashboard")}</h3>
            <ul>
              <li>
                <Link to="/employers/dashboard/post-job">{t("postjobs")}</Link>
              </li>
              <li>
                <Link to="/employers/dashboard/recruit-manage">
                  {t("recruitment manager")}
                </Link>
              </li>
              <li>
                <Link to="/employers/dashboard/candidate-profiles">
                  {t("Manage candidate profiles")}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3>{t("help")}</h3>
            <ul>
              <li>
                <a href="/">{t("support")}</a>
              </li>
              <li>
                <a href="/">{t("term of use")}</a>
              </li>
              <li>
                <a href="/">{t("privacy policy")}</a>
              </li>
            </ul>
          </div>
        </div>
        <div className={classes["footer__blbottom--bottom"]}>
          <p>
            <strong>{t("Service Joint Stock Company")}</strong>
          </p>
          <p>
            <strong>{t("Head Office")}: </strong>
            {t("addressCompany")}
          </p>
          <p>Copyright © MST Company Vietnam.</p>
        </div>
      </div>
    </footer>
  );
};

export default FooterEmployers;
