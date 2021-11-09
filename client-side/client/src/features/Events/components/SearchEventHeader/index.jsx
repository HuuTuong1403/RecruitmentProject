import { Collapse } from "reactstrap";
import { FaFilter } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { selectedProvinces } from "features/Home/slices/selectors";
import { useHistory, useLocation } from "react-router-dom";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import ButtonField from "custom-fields/ButtonField";
import classes from "./style.module.scss";
import InputField from "custom-fields/InputField";
import LabelField from "custom-fields/LabelField";
import Select from "react-select";

const SearchEventHeader = () => {
  let query = new URLSearchParams(useLocation().search);
  const history = useHistory();
  const { t } = useTranslation();
  const eventNameRef = useRef();
  const eventOrganizerRef = useRef();
  const topicRef = useRef();
  const companyNameRef = useRef();
  const type = query.get("type");

  const [isOpen, setIsOpen] = useState(false);
  const [selectProvince, setSelectProvince] = useState(
    query.get("address%city") ?? "Tất cả"
  );
  const [selectStatus, setSelectStatus] = useState(
    query.get("status") ?? "Tất cả"
  );
  const [selectCreateDate, setSelectCreateDate] = useState(
    query.get("createdAt") ?? "Tất cả"
  );

  const provinces = useSelector(selectedProvinces).map((province) => {
    return { label: province.name };
  });
  provinces.unshift({ label: "Tất cả" });

  const changeProvinceHandler = (selectOption) => {
    setSelectProvince(selectOption.label);
  };

  const changeStatusHandler = (selectOption) => {
    setSelectStatus(selectOption.value);
  };

  const changeCreateDateHandler = (selectOption) => {
    setSelectCreateDate(selectOption.value);
  };

  const deleteFilterHandler = () => {
    eventNameRef.current.value = "";
    setSelectProvince("Tất cả");
    eventOrganizerRef.current.value = "";
    topicRef.current.value = "";
    topicRef.current.value = "";
    companyNameRef.current.value = "";
    setSelectStatus("Tất cả");
    setSelectCreateDate("Tất cả");
  };

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (
      eventNameRef.current.value === "" &&
      selectProvince === "Tất cả" &&
      eventOrganizerRef.current.value === "" &&
      topicRef.current.value === "" &&
      companyNameRef.current.value === "" &&
      selectStatus === "Tất cả" &&
      selectCreateDate === "Tất cả"
    ) {
      history.push("/events/search?type=all");
    } else {
      const eventName =
        eventNameRef.current.value === ""
          ? ""
          : `eventName=${eventNameRef.current.value}&`;
      const province =
        selectProvince === "Tất cả" ? "" : `address%city=${selectProvince}&`;
      const eventOrganizer =
        eventOrganizerRef.current.value === ""
          ? ""
          : `eventOrganizer=${eventOrganizerRef.current.value}&`;
      const topic =
        topicRef.current.value === "" ? "" : `topic=${topicRef.current.value}&`;
      const companyName =
        companyNameRef.current.value === ""
          ? ""
          : `companyName=${companyNameRef.current.value}&`;
      const status = selectStatus === "Tất cả" ? "" : `status=${selectStatus}&`;
      const date =
        selectCreateDate === "Tất cả" ? "" : `createdAt=${selectCreateDate}`;
      history.push(
        `/events/search?${eventName}${province}${eventOrganizer}${topic}${companyName}${status}${date}`
      );
    }
  };

  const optionsDateCreate = [
    { value: "Tất cả", label: `${t("all")}` },
    { value: "1", label: `${t("1 day ago")}` },
    { value: "3", label: `${t("3 days ago")}` },
    { value: "7", label: `${t("1 week ago")}` },
    { value: "14", label: `${t("2 weeks ago")}` },
    { value: "30", label: `${t("1 month ago")}` },
  ];

  const optionsStatus = [
    { value: "Tất cả", label: `${t("all")}` },
    { value: "NotYetOccur", label: `${t("NotYetOccur")}` },
    { value: "Occurring", label: `${t("Occurring")}` },
    { value: "Pausing", label: `${t("Pausing")}` },
    { value: "Finish", label: `${t("Finish")}` },
  ];

  return (
    <section className={classes.searchHeader}>
      <div className={classes.searchHeader__content}>
        <div className={classes.searchHeader__container}>
          <form onSubmit={searchSubmitHandler}>
            <div className={classes["searchHeader__container--input-search"]}>
              <InputField
                ref={eventNameRef}
                defaultValue={!type ? query.get("eventName") : ""}
                placeholder={t("Search by event name")}
                icon={<FaSearch />}
              />
            </div>
            <div className={classes["searchHeader__container--input-location"]}>
              <Select
                placeholder={t("choose-province")}
                options={provinces}
                value={provinces.filter((province) => {
                  return province.label === selectProvince;
                })}
                onChange={changeProvinceHandler}
              />
            </div>
            <div className={classes["searchHeader__container--button"]}>
              <ButtonField
                backgroundcolor="#324554"
                backgroundcolorhover="#333"
                type="submit"
                uppercase
              >
                {t("search")}
              </ButtonField>
            </div>
          </form>
          <div>
            <FaFilter
              onClick={() => setIsOpen((prevState) => !prevState)}
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
      </div>
      <Collapse isOpen={isOpen}>
        <div className={classes.searchHeader__collapse}>
          <form
            className={classes["searchHeader__collapse--form"]}
            onSubmit={searchSubmitHandler}
          >
            <div className={classes["searchHeader__collapse--form--top"]}>
              <div>
                <LabelField label={t("Event organizer")} />
                <InputField
                  ref={eventOrganizerRef}
                  defaultValue={!type ? query.get("eventOrganizer") : ""}
                  placeholder={t("Search by event organizer")}
                  icon={<FaSearch />}
                />
              </div>
              <div>
                <LabelField label={t("Event topic")} />
                <InputField
                  ref={topicRef}
                  defaultValue={!type ? query.get("topic") : ""}
                  placeholder={t("Search by event topic")}
                  icon={<FaSearch />}
                />
              </div>
              <div>
                <LabelField label={t("Company name")} />
                <InputField
                  ref={companyNameRef}
                  defaultValue={!type ? query.get("companyName") : ""}
                  placeholder={t("Search by company name")}
                  icon={<FaSearch />}
                />
              </div>
              <div>
                <LabelField label={t("Event status")} />
                <Select
                  options={optionsStatus}
                  value={optionsStatus.filter((status) => {
                    return status.value === selectStatus;
                  })}
                  onChange={changeStatusHandler}
                />
              </div>
              <div>
                <LabelField label={t("Posted Within")} />
                <Select
                  options={optionsDateCreate}
                  value={optionsDateCreate.filter((date) => {
                    return date.value === selectCreateDate;
                  })}
                  onChange={changeCreateDateHandler}
                />
              </div>
            </div>
            <div className={classes["searchHeader__collapse--form--actions"]}>
              <ButtonField
                backgroundcolor="#324554"
                backgroundcolorhover="#333"
                type="submit"
                uppercase
              >
                {t("Confirm")}
              </ButtonField>
              <ButtonField
                backgroundcolor="#dd4b39"
                backgroundcolorhover="#bf0000"
                type="button"
                uppercase
                onClick={deleteFilterHandler}
              >
                {t("Clear filters")}
              </ButtonField>
            </div>
          </form>
        </div>
      </Collapse>
    </section>
  );
};

export default SearchEventHeader;
