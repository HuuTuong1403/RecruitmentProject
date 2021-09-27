import classes from "./style.module.scss";
import { Input } from "antd";
import { BsSearch } from "react-icons/bs";
import Select from "react-select";
import { useState } from "react";

const BannerHome = () => {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  const [searchKey, setSearchKey] = useState("");
  const [searchProvince, setSearchProvince] = useState("");

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    console.log(searchKey);
    console.log(searchProvince);
  };

  const changeSearchHandler = ({ target: { value } }) => {
    setSearchKey(value);
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
          Hãy tìm công việc thích hợp cho bạn
        </div>
        <div className={classes["banner__top--content"]}>
          Tìm kiếm việc làm chỉ trong vài phút
        </div>
        <form
          className={classes["banner__top--search"]}
          onSubmit={searchSubmitHandler}
        >
          <div>
            <Input
              onChange={changeSearchHandler}
              prefix={<BsSearch />}
              placeholder="Tìm kiếm theo từ khóa"
            />
          </div>
          <div>
            <Select onChange={changeProvinceHandler} options={options} />
          </div>
          <div>
            <button type="submit">Tìm kiếm</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BannerHome;
