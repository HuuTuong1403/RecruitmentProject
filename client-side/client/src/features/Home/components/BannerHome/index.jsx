import classes from "./style.module.scss";
import { Input } from "reactstrap";
import Select from "react-select";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import ReactTypingEffect from "react-typing-effect";

const BannerHome = () => {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  const { t } = useTranslation();
  const [searchProvince, setSearchProvince] = useState("");
  const searchKeyRef = useRef();

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    console.log(searchKeyRef.current.value);
    console.log(searchProvince);
  };

  const changeProvinceHandler = (selectedOption) => {
    const selectedValue = selectedOption
      ? selectedOption.value
      : selectedOption;

    setSearchProvince(selectedValue);
  };

  return (
    <div className={classes.banner}>
      <div className={classes.banner__top}>
        <div className={classes["banner__top--title"]}>
          <ReactTypingEffect
            text={[`${t("find-job-for-you")}`, `${t("slogan-banner-2")}`]}
            cursorRenderer={(cursor) => <div>{cursor}</div>}
            eraseDelay={500}
            eraseSpeed={50}
            speed={100}
          />
        </div>
        <div className={classes["banner__top--content"]}>
          {t("search-minute")}
        </div>
        <form
          className={classes["banner__top--search"]}
          onSubmit={searchSubmitHandler}
        >
          <div>
            <Input
              innerRef={searchKeyRef}
              placeholder={t("search-key")}
            />
          </div>
          <div>
            <Select
              placeholder={t("choose-province")}
              onChange={changeProvinceHandler}
              options={options}
            />
          </div>
          <div>
            <button type="submit">{t("search")}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BannerHome;
