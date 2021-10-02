import { addInfoSignUp } from "features/HomeEmployers/slices";
import { Fragment, useRef, useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { schemaSignUpStep3 } from "common/constants/schema";
import { selectInfoSignUp } from "features/HomeEmployers/slices/selectors";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import ButtonField from "custom-fields/ButtonField";
import classes from "./style.module.scss";
import InputField from "custom-fields/InputField";
import Select from "react-select";
import { MdFileUpload } from "react-icons/md";
import notification from "components/Notification";

const options = [
  { value: "", label: "Chọn loại doanh nghiệp" },
  { value: "Outsourcing", label: "Outsourcing" },
  { value: "Product", label: "Product" },
];

const StepThreeSignUp = (props) => {
  const { t } = useTranslation();
  const { onBackStep } = props;
  const dispatch = useDispatch();
  const infoSignUp = useSelector(selectInfoSignUp);
  const [imgSrc, setImgSrc] = useState("");
  const [errorImg, setErrorImg] = useState(null);
  const logo = useRef();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    mode: "all",
    resolver: yupResolver(schemaSignUpStep3),
  });

  const submitStep3Handler = (item) => {
    if (
      infoSignUp.Type === item.Type &&
      infoSignUp.OT === item.OT &&
      infoSignUp.TIN === item.TIN
    ) {
      notification("Đăng ký tài khoản thành công", "success");
    } else {
      dispatch(addInfoSignUp({ ...infoSignUp, ...item }));
    }
  };

  const chooseImageHandler = () => {
    const validImageTypes = [
      "image/jpg",
      "image/jpeg",
      "image/png",
      "image/svg",
    ];

    if (logo.current?.files.length === 0) {
      setErrorImg("Vui lòng chọn logo doanh nghiệp");
      return;
    }

    if (!validImageTypes.includes(logo.current.files[0]?.type)) {
      setErrorImg("Vui lòng chọn tệp hình ảnh jpg, jpeg, png, svg");
      return;
    }

    if (logo.current.files[0]?.size >= 5000000) {
      setErrorImg("Tệp hình ảnh quá lớn");
      return;
    }
    setErrorImg(null);
    setImgSrc(URL.createObjectURL(logo.current.files[0]));
  };

  return (
    <Fragment>
      <div className={classes.stepthree}>{t("Bước 3: Thông tin đại diện")}</div>
      <form
        className={classes.stepthree__form}
        onSubmit={handleSubmit(submitStep3Handler)}
      >
        <InputField
          type="text"
          placeholder={t("Vui lòng nhập mã số thuế")}
          {...register("TIN")}
          defaultValue={infoSignUp?.TIN}
          errors={errors.TIN?.message}
        />

        <div className={classes["stepthree__select-scale"]}>
          <Controller
            control={control}
            name="Type"
            defaultValue={infoSignUp?.Type}
            render={({ field: { onChange, value } }) => (
              <Select
                className={classes["stepthree__select-scale--select"]}
                placeholder="Chọn loại doanh nghiệp"
                value={options.find((c) => c.value === value)}
                options={options}
                onChange={(selectedOption) => {
                  onChange(selectedOption.value);
                }}
              />
            )}
          />
          {errors.Type?.message && <p>{errors.Type?.message}</p>}
        </div>

        <div className={classes["stepthree__check-box"]}>
          <label htmlFor="OT">Làm việc ngoài giờ (OT)?: </label>
          <input
            name="OT"
            type="checkbox"
            {...register("OT")}
            defaultChecked={infoSignUp?.OT}
            id="OT"
          />
          <span>Có</span>
        </div>

        <div className={classes.stepthree__upload}>
          <label htmlFor="logo">
            Tải logo doanh nghiệp
            <MdFileUpload className={classes["stepthree__upload--icon"]} />
          </label>
          <input
            ref={logo}
            style={{ display: "none" }}
            onChange={chooseImageHandler}
            type="file"
            id="logo"
          />
        </div>
        {errorImg && <p>{errorImg}</p>}
        {logo.current?.files[0] && (
          <div className={classes.stepthree__container}>
            <div className={classes.stepthree__image}>
              <img src={imgSrc} alt="" />
            </div>
          </div>
        )}

        <div className={classes.stepthree__actions}>
          <ButtonField
            type="button"
            backgroundcolor="#dd4b39"
            backgroundcolorhover="#bf0000"
            color="#fff"
            width="45%"
            onClick={onBackStep}
          >
            <IoMdArrowBack style={{ marginRight: "10px" }} />
            {t("Quay lại")}
          </ButtonField>
          <ButtonField
            type="submit"
            backgroundcolor="#0a426e"
            backgroundcolorhover="#324554"
            color="#fff"
            width="45%"
          >
            {t("signup")}
          </ButtonField>
        </div>
      </form>
    </Fragment>
  );
};

export default StepThreeSignUp;
