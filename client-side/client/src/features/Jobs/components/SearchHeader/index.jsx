import { Collapse } from "reactstrap";
import { FaFilter } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { selectedProvinces } from "features/Home/slices/selectors";
import { selectedSkills } from "../../slices/selectors";
import { useHistory, useLocation } from "react-router-dom";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import ButtonField from "custom-fields/ButtonField";
import classes from "./style.module.scss";
import InputField from "custom-fields/InputField";
import LabelField from "custom-fields/LabelField";
import Select from "react-select";

const SearchHeader = () => {
  let query = new URLSearchParams(useLocation().search);
  const history = useHistory();
  const { t } = useTranslation();
  const searchKey = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const type = query.get("type");
  const jobTitle = query.get("jobTitle");
  const [selectProvince, setSelectProvince] = useState(
    query.get("location%city") ?? "Tất cả"
  );
  const [selectSalary, setSelectSalary] = useState(
    query.get("salary%min[gte]") ?? "Tất cả"
  );
  const [selectCreateDate, setSelectCreateDate] = useState(
    query.get("createdAt") ?? "Tất cả"
  );
  const provinces = useSelector(selectedProvinces).map((province) => {
    return { label: province.name };
  });
  provinces.unshift({ label: "Tất cả" });
  const skills = useSelector(selectedSkills).map((skill, index) => {
    return { value: index, label: skill };
  });

  const querySkills =
    query.get("skills") === null ? [] : query.get("skills").split(",");

  const [selectSkill, setSelectSkill] = useState([]);

  const [textSkill, setTextSkill] = useState("");

  const changeSkillHandler = (option) => {
    setSelectSkill(option);
    const value = [];
    option.forEach((skill) => {
      value.push(skill.label);
    });
    setTextSkill(value.join(","));
  };

  const changeProvinceHandler = (selectOption) => {
    setSelectProvince(selectOption.label);
  };

  const changeSalaryHandler = (selectOption) => {
    setSelectSalary(selectOption.value);
  };

  const changeCreateDateHandler = (selectOption) => {
    setSelectCreateDate(selectOption.value);
  };

  const deleteFilterHandler = () => {
    setSelectSalary("Tất cả");
    setSelectCreateDate("Tất cả");
    setSelectSkill([]);
    setTextSkill("");
  };

  const toggle = () => {
    setSelectSkill(skills.filter((item) => querySkills.includes(item.label)));
    setIsOpen(!isOpen);
  };

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    const textKey = searchKey.current.value;
    if (
      textKey === "" &&
      selectProvince === "Tất cả" &&
      selectSalary === "Tất cả" &&
      selectCreateDate === "Tất cả" &&
      textSkill === ""
    ) {
      history.push("/jobs/search?type=all");
    } else {
      const province =
        selectProvince === "Tất cả" ? "" : `location%city=${selectProvince}&`;
      const keyword = textKey === "" ? "" : `jobTitle=${textKey}&`;
      const salary =
        selectSalary === "Tất cả" ? "" : `salary%min[gte]=${selectSalary}&`;
      const skill = textSkill === "" ? "" : `skills=${textSkill}&`;
      const date =
        selectCreateDate === "Tất cả" ? "" : `createdAt=${selectCreateDate}`;
      history.push(
        `/jobs/search?${keyword}${province}${salary}${skill}${date}`
      );
    }
  };

  const optionsSalry = [
    { value: "Tất cả", label: `${t("all")}` },
    { value: "500", label: `${t("From")} 500 USD` },
    { value: "1000", label: `${t("From")} 1.000 USD` },
    { value: "2000", label: `${t("From")} 2.000 USD` },
    { value: "3000", label: `${t("From")} 3.000 USD` },
    { value: "5000", label: `${t("From")} 5.000 USD` },
  ];

  const optionsDateCreate = [
    { value: "Tất cả", label: `${t("all")}` },
    { value: "1", label: `${t("1 day ago")}` },
    { value: "3", label: `${t("3 days ago")}` },
    { value: "7", label: `${t("1 week ago")}` },
    { value: "14", label: `${t("2 weeks ago")}` },
    { value: "30", label: `${t("1 month ago")}` },
  ];

  return (
    <section className={classes.searchHeader}>
      <div className={classes.searchHeader__content}>
        <div className={classes.searchHeader__container}>
          <form onSubmit={searchSubmitHandler}>
            <div className={classes["searchHeader__container--input-search"]}>
              <InputField
                ref={searchKey}
                defaultValue={!type ? jobTitle : ""}
                placeholder={t("search-key")}
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
                color="#fff"
                backgroundcolorhover="#333"
                width="100%"
                type="submit"
                radius="20px"
                uppercase="true"
                padding="8px"
              >
                {t("search")}
              </ButtonField>
            </div>
          </form>
          <div>
            <FaFilter onClick={toggle} style={{ cursor: "pointer" }} />
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
                <LabelField label={t("Salary")} />
                <Select
                  options={optionsSalry}
                  value={optionsSalry.filter((salary) => {
                    return salary.value === selectSalary;
                  })}
                  onChange={changeSalaryHandler}
                />
              </div>
              <div>
                <LabelField label={t("Level")} />
                <InputField placeholder={t("search-key")} icon={<FaSearch />} />
              </div>
              <div>
                <LabelField label={t("Position")} />
                <InputField placeholder={t("search-key")} icon={<FaSearch />} />
              </div>
              <div>
                <LabelField label={t("Skill")} />
                <Select
                  isMulti
                  placeholder={t("choose skills")}
                  options={skills}
                  value={selectSkill}
                  onChange={changeSkillHandler}
                />
              </div>
              <div>
                <LabelField label={t("Jobs Posted Within")} />
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
                color="#fff"
                backgroundcolorhover="#333"
                type="submit"
                radius="20px"
                uppercase="true"
                padding="8px"
              >
                {t("Confirm")}
              </ButtonField>
              <ButtonField
                color="#e8e8e8"
                backgroundcolor="#dd4b39"
                backgroundcolorhover="#bf0000"
                type="button"
                radius="20px"
                uppercase="true"
                padding="8px"
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

export default SearchHeader;
