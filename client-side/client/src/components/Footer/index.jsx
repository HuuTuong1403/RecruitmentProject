import classes from "./styles.module.scss";
import MSTLogo from "assets/images/mst_logo.png";
import DK from "assets/images/dk.png";
import { FaFacebookF } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const Footer = () => {
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
              <a href="/">{t("contact")}</a>
            </li>
            <li>
              <a href="/">{t("terms of service")}</a>
            </li>
            <li>
              <a href="/">{t("privacy policy")}</a>
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
            <h3>{t("jobseekers")}</h3>
            <ul>
              <li>
                <a href="/">{t("newjobs")}</a>
              </li>
              <li>
                <a href="/">{t("searchjobs")}</a>
              </li>
            </ul>
          </div>
          <div>
            <h3>{t("employers")}</h3>
            <ul>
              <li>
                <a href="/">{t("postjobs")}</a>
              </li>
            </ul>
          </div>
          <div>
            <h3>{t("helpcenter")}</h3>
            <ul>
              <li>
                <a href="/">{t("customersupport")}</a>
              </li>
            </ul>
          </div>
          <div>
            <h3>{t("jobsinprovince")}</h3>
            <ul>
              <li>
                <a href="/">{t("jobsinHCM")}</a>
              </li>
              <li>
                <a href="/">{t("jobsinDN")}</a>
              </li>
              <li>
                <a href="/">{t("jobsinHN")}</a>
              </li>
              <li>
                <a href="/">{t("jobsinHP")}</a>
              </li>
            </ul>
          </div>
        </div>
        <div className={classes["footer__blbottom--bottom"]}>
          <p>
            <strong>{t("Service Joint Stock Company")}</strong>
          </p>
          <p>
            <strong>{t("Operating license")}: </strong>
            {t("no.")} 1403/SLĐTBXH-GP
          </p>
          <p>
            <strong>{t("Head Office")}: </strong>
            {t("addressCompany")}
          </p>
          <p>
            <strong>{t("Phone")}:</strong> (84) 396084832 | (84) 949488160
          </p>
          <p>
            <strong>Email:</strong> mst.recruitment10@gmail.com
          </p>
          <p>Copyright © MST Company Vietnam.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;