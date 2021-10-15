import classes from "./style.module.scss";
import ReactCountryFlag from "react-country-flag";
import { useTranslation } from "react-i18next";
import { useState } from "react";

const ChangeLang = () => {
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState(localStorage.getItem("lang") || "en-ES");

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
    <div className={classes.changeLang}>
      <div className={classes.changeLang__wrapped}>
        <div className={classes["changeLang__wrapped--title"]}>
          {t("Choose your language")}:
        </div>
        <div
          onClick={changeLangViHandler}
          className={
            lang.slice(0, 2).toUpperCase() === "VI"
              ? `${classes["changeLang__wrapped--langActive"]}`
              : `${classes["changeLang__wrapped--lang"]}`
          }
        >
          <ReactCountryFlag
            countryCode="VN"
            svg
            className={classes["changeLang__wrapped--flag"]}
          />
          VI
        </div>
        <div
          onClick={changeLangEnHandler}
          className={
            lang.slice(0, 2).toUpperCase() === "EN"
              ? `${classes["changeLang__wrapped--langActive"]}`
              : `${classes["changeLang__wrapped--lang"]}`
          }
        >
          <ReactCountryFlag
            countryCode="US"
            svg
            className={classes["changeLang__wrapped--flag"]}
          />
          EN
        </div>
      </div>
    </div>
  );
};

export default ChangeLang;
