import classes from "./style.module.scss";
import InputField from "custom-fields/InputField";
import { useTranslation } from "react-i18next";
import { FaSearch } from "react-icons/fa";
import Select from "react-select";
import ButtonField from "custom-fields/ButtonField";
import { FaFilter } from "react-icons/fa";
import { Collapse } from "reactstrap";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { selectedProvinces } from "features/Home/slices/selectors";

const SearchHeader = () => {
  const { t } = useTranslation();
  let query = new URLSearchParams(useLocation().search);

  const [isOpen, setIsOpen] = useState(false);
  const type = query.get("type");
  const jobTitle = query.get("jobTitle");
  const [selectProvince, setSelectProvince] = useState(
    query.get("location%city") ?? "Tất cả"
  );
  const [selectSalary, setSelectSalary] = useState(
    `${query.get("salary%min[gte]") ?? "Tất cả"}`
  );
  const [selectCreateDate, setSelectCreateDate] = useState(
    `${query.get("createAt") ?? "Tất cả"}`
  );

  const searchKey = useRef();
  const history = useHistory();

  const provinces = useSelector(selectedProvinces).map((province, index) => {
    return { label: province.name };
  });
  const newProvinces = [{ label: "Tất cả" }, ...provinces];

  const toggle = () => setIsOpen(!isOpen);

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
  };

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    const text = searchKey.current.value;
    if (
      text === "" &&
      selectProvince === "Tất cả" &&
      selectSalary === "Tất cả" &&
      selectCreateDate === "Tất cả"
    ) {
      history.push("/jobs/search?type=all");
    } else {
      history.push(
        `/jobs/search?${text === "" ? "" : `jobTitle=${text}&`}${
          selectProvince === "Tất cả" || selectProvince === ""
            ? ""
            : `location%city=${selectProvince}&`
        }${
          selectSalary === "Tất cả" ? "" : `salary%min[gte]=${selectSalary}&`
        }${selectCreateDate === "Tất cả" ? "" : `createAt=${selectCreateDate}`}`
      );
    }
  };

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
                options={newProvinces}
                value={newProvinces.filter((province) => {
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
                <label>Mức lương</label>
                <Select
                  options={optionsSalry}
                  value={optionsSalry.filter((salary) => {
                    return salary.value === selectSalary;
                  })}
                  onChange={changeSalaryHandler}
                />
              </div>
              <div>
                <label>Cấp độ</label>
                <InputField placeholder={t("search-key")} icon={<FaSearch />} />
              </div>
              <div>
                <label>Vị trí</label>
                <InputField placeholder={t("search-key")} icon={<FaSearch />} />
              </div>
              <div>
                <label>Skill</label>
                <Select
                  placeholder={t("choose-province")}
                  options={[{ value: "1", label: "test" }]}
                />
              </div>
              <div>
                <label>Đăng trong vòng</label>
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
              >
                {t("Xác nhận")}
              </ButtonField>
              <ButtonField
                color="#e8e8e8"
                backgroundcolor="#dd4b39"
                backgroundcolorhover="#bf0000"
                type="button"
                onClick={deleteFilterHandler}
              >
                {t("Xóa bộ lọc")}
              </ButtonField>
            </div>
          </form>
        </div>
      </Collapse>
    </section>
  );
};

const optionsSalry = [
  { value: "Tất cả", label: "Tất cả" },
  { value: "500", label: "Từ 500 USD" },
  { value: "1000", label: "Từ 1.000 USD" },
  { value: "2000", label: "Từ 2.000 USD" },
  { value: "3000", label: "Từ 3.000 USD" },
  { value: "5000", label: "Từ 5.000 USD" },
];

const optionsDateCreate = [
  { value: "Tất cả", label: "Tất cả" },
  { value: "1", label: "1 ngày gần đây" },
  { value: "3", label: "3 ngày gần đây" },
  { value: "7", label: "1 tuần gần đây" },
  { value: "14", label: "2 tuần gần đây" },
  { value: "30", label: "1 tháng gần đây" },
];

export default SearchHeader;
