import { Collapse } from "reactstrap";
import { FaFilter } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { selectedIsFilter } from "features/Jobs/slices/selectors";
import { selectedProvinces } from "features/Home/slices/selectors";
import { selectedSkills } from "../../slices/selectors";
import { toggleOpenFilter } from "features/Jobs/slices";
import { useHistory, useLocation } from "react-router-dom";
import { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
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
  const dispatch = useDispatch();
  const isOpen = useSelector(selectedIsFilter);
  const type = query.get("type");
  const jobTitle = query.get("jobTitle");
  const [selectProvince, setSelectProvince] = useState(
    query.get("location%city") ?? "Tất cả"
  );
  const [selectSalary, setSelectSalary] = useState(
    query.get("salary%min[gte]") ?? "Tất cả"
  );
  const [selectLevel, setSelectLevel] = useState(
    query.get("level") ?? "Tất cả"
  );
  const [selectPosition, setSelectPosition] = useState(
    query.get("position") ?? "Tất cả"
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

  const changeLevelHandler = (selectOption) => {
    setSelectLevel(selectOption.value);
  };

  const changePositionHandler = (selectOption) => {
    setSelectPosition(selectOption.value);
  };

  const changeCreateDateHandler = (selectOption) => {
    setSelectCreateDate(selectOption.value);
  };

  const deleteFilterHandler = () => {
    setSelectSalary("Tất cả");
    setSelectLevel("Tất cả");
    setSelectPosition("Tất cả");
    setSelectCreateDate("Tất cả");
    setSelectSkill([]);
    setTextSkill("");
  };

  const toggle = () => {
    setSelectSkill(skills.filter((item) => querySkills.includes(item.label)));
    dispatch(toggleOpenFilter());
  };

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    const textKey = searchKey.current.value;
    if (
      textKey === "" &&
      selectProvince === "Tất cả" &&
      selectSalary === "Tất cả" &&
      selectLevel === "Tất cả" &&
      selectPosition === "Tất cả" &&
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
      const level = selectLevel === "Tất cả" ? "" : `level=${selectLevel}&`;
      const position =
        selectPosition === "Tất cả" ? "" : `position=${selectPosition}&`;
      const skill = textSkill === "" ? "" : `skills=${textSkill}&`;
      const date =
        selectCreateDate === "Tất cả" ? "" : `createdAt=${selectCreateDate}`;
      history.push(
        `/jobs/search?${keyword}${province}${salary}${level}${position}${skill}${date}`
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

  const optionsLevel = [
    { value: "Tất cả", label: `${t("all")}` },
    { value: "Intern", label: `${t("Internship")}` },
    { value: "Junior", label: `${t("Junior Developer")}` },
    { value: "Senior", label: `${t("Senior Developer")}` },
    { value: "Leader", label: `${t("Leader Developer")}` },
    { value: "Mid-level", label: `${t("Mid-level Manager")}` },
    { value: "Senior Leader", label: `${t("Senior Leader")}` },
  ];

  const optionsPosition = [
    { value: "Tất cả", label: `${t("all")}` },
    { value: "Network Administrator", label: `${t("Network Administrator")}` },
    { value: "Network Engineering", label: `${t("Network Engineering")}` },
    { value: "Network Leader", label: `${t("Network Leader")}` },
    { value: "Helpdesk Technician", label: `${t("Helpdesk Technician")}` },
    { value: "PC Technician", label: `${t("PC Technician")}` },
    { value: "SeviceDesk Leader", label: `${t("SeviceDesk Leader")}` },
    { value: "Developer", label: `${t("Developer")}` },
    { value: "Tester", label: `${t("Tester")}` },
    {
      value: "Application Development Leader",
      label: `${t("Application Development Leader")}`,
    },
    { value: "Database Developer", label: `${t("Database Developer")}` },
    {
      value: "Database Administrator",
      label: `${t("Database Administrator")}`,
    },
    {
      value: "Business Process Analyst",
      label: `${t("Business Process Analyst")}`,
    },
    { value: "IT Security Staff", label: `${t("IT Security Staff")}` },
    { value: "IT Manager", label: `${t("IT Manager")}` },
    {
      value: "Chief Information Officer",
      label: `${t("Chief Information Officer")}`,
    },
    {
      value: "Chief Security Officer",
      label: `${t("Chief Security Officer")}`,
    },
    {
      value: "Chief Technical Officer",
      label: `${t("Chief Technical Officer")}`,
    },
    {
      value: "Project Manager",
      label: `${t("Project Manager")}`,
    },
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
                <Select
                  options={optionsLevel}
                  value={optionsLevel.filter((level) => {
                    return level.value === selectLevel;
                  })}
                  onChange={changeLevelHandler}
                />
              </div>
              <div>
                <LabelField label={t("Position")} />
                <Select
                  options={optionsPosition}
                  value={optionsPosition.filter((position) => {
                    return position.value === selectPosition;
                  })}
                  onChange={changePositionHandler}
                />
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
                color="#fff"
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
