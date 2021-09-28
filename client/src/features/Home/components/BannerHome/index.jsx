import classes from "./style.module.scss";
import { Input } from "reactstrap";
import Select from "react-select";
import { useRef, useState } from "react";

const BannerHome = () => {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

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
              innerRef={searchKeyRef}
              // onChange={changeSearchHandler}
              placeholder="Tìm kiếm theo từ khóa"
            />
          </div>
          <div>
            <Select
              placeholder={"Chọn tỉnh thành..."}
              onChange={changeProvinceHandler}
              options={options}
            />
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
