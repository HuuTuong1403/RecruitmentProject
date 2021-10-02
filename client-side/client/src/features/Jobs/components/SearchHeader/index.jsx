import classes from "./style.module.scss";
import InputField from "custom-fields/InputField";
import { useTranslation } from "react-i18next";
import { FaSearch } from "react-icons/fa";
import Select from "react-select";
import ButtonField from "custom-fields/ButtonField";
import { FaFilter } from "react-icons/fa";
import { Collapse } from "reactstrap";
import { useState } from "react";

const SearchHeader = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <section className={classes.searchHeader}>
      <div className={classes.searchHeader__content}>
        <div className={classes.searchHeader__container}>
          <form>
            <div className={classes["searchHeader__container--input-search"]}>
              <InputField placeholder={t("search-key")} icon={<FaSearch />} />
            </div>
            <div className={classes["searchHeader__container--input-location"]}>
              <Select
                placeholder={t("choose-province")}
                options={[{ value: "1", label: "test" }]}
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
          <form className={classes["searchHeader__collapse--form"]}>
            <div className={classes["searchHeader__collapse--form--top"]}>
              <div>
                <label>Mức lương</label>
                <InputField placeholder={t("search-key")} icon={<FaSearch />} />
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
                <label>Thời gian đăng</label>
                <Select
                  placeholder={t("choose-province")}
                  options={[{ value: "1", label: "test" }]}
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

export default SearchHeader;
