import InputField from "custom-fields/InputField";
import ButtonField from "custom-fields/ButtonField";
import { useTranslation } from "react-i18next";
import { useForm, Controller } from "react-hook-form";
import { schemaSignUpStep2 } from "common/constants/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Fragment } from "react";
import classes from "./style.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { addInfoSignUp } from "features/HomeEmployers/slices";
import { selectInfoSignUp } from "features/HomeEmployers/slices/selectors";
import { FaBuilding } from "react-icons/fa";
import { IoMdArrowBack, IoMdArrowForward } from "react-icons/io";
import Select from "react-select";

const options = [
  { value: "", label: "Chọn số nhân viên" },
  { value: "Ít hơn 10", label: "Ít hơn 10" },
  { value: "10 - 20", label: "10 - 20" },
  { value: "25 - 99", label: "25 - 99" },
  { value: "100 - 499", label: "100 - 499" },
  { value: "500 - 999", label: "500 - 999" },
  { value: "1.000 - 4.999", label: "1.000 - 4.999" },
  { value: "5.000 - 9.999", label: "5.000 - 9.999" },
  { value: "10.000 - 19.999", label: "10.000 - 19.999" },
  { value: "20.000 - 49.999", label: "20.000 - 49.999" },
  { value: "Hơn 50.000", label: "Hơn 50.000" },
];

const StepTwoSignUp = (props) => {
  const { t } = useTranslation();
  const { onBackStep, onNextStep } = props;
  const dispatch = useDispatch();
  const infoSignUp = useSelector(selectInfoSignUp);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    mode: "all",
    resolver: yupResolver(schemaSignUpStep2),
  });

  const submitStep2Handler = (data) => {
    if (
      infoSignUp.companyName === data.companyName &&
      infoSignUp.scale === data.scale &&
      infoSignUp.websiteCompany === data.websiteCompany &&
      infoSignUp.province === data.province &&
      infoSignUp.district === data.district &&
      infoSignUp.ward === data.ward &&
      infoSignUp.address === data.address
    ) {
      onNextStep();
    } else {
      dispatch(addInfoSignUp({ ...infoSignUp, ...data }));
      onNextStep();
    }
  };

  return (
    <Fragment>
      <div className={classes.steptwo}>
        {t("Bước 2: Thông tin doanh nghiệp")}
      </div>
      <form onSubmit={handleSubmit(submitStep2Handler)}>
        <InputField
          placeholder="Vui lòng nhập tên công ty của bạn"
          {...register("companyName")}
          defaultValue={infoSignUp?.companyName}
          errors={errors.companyName?.message}
          icon={<FaBuilding />}
        />

        <div className={classes["steptwo__select-scale"]}>
          <Controller
            control={control}
            name="scale"
            defaultValue={infoSignUp?.scale}
            render={({ field: { onChange, value } }) => (
              <Select
                className={classes["steptwo__select-scale--select"]}
                placeholder="Chọn số nhân viên công ty"
                value={options.find((c) => c.value === value)}
                options={options}
                onChange={(selectedOption) => {
                  onChange(selectedOption.value);
                }}
              />
            )}
          />
          {errors.scale?.message && <p>{errors.scale?.message}</p>}
        </div>

        <InputField
          placeholder="Vui lòng nhập website công ty"
          {...register("websiteCompany")}
          defaultValue={infoSignUp?.websiteCompany}
          errors={errors.websiteCompany?.message}
        />

        <div className={classes["steptwo__select-scale"]}>
          <Controller
            control={control}
            name="province"
            defaultValue={infoSignUp?.province}
            render={({ field: { onChange, value } }) => (
              <Select
                className={classes["steptwo__select-scale--select"]}
                placeholder="Chọn tỉnh/thành phố"
                value={options.find((c) => c.value === value)}
                options={options}
                onChange={(selectedOption) => {
                  onChange(selectedOption.value);
                }}
              />
            )}
          />
          {errors.province?.message && <p>{errors.province?.message}</p>}
        </div>

        <div className={classes["steptwo__select-scale"]}>
          <Controller
            control={control}
            name="district"
            defaultValue={infoSignUp?.district}
            render={({ field: { onChange, value } }) => (
              <Select
                className={classes["steptwo__select-scale--select"]}
                placeholder="Chọn quận/huyện"
                value={options.find((c) => c.value === value)}
                options={options}
                onChange={(selectedOption) => {
                  onChange(selectedOption.value);
                }}
              />
            )}
          />
          {errors.district?.message && <p>{errors.district?.message}</p>}
        </div>

        <div className={classes["steptwo__select-scale"]}>
          <Controller
            control={control}
            name="ward"
            defaultValue={infoSignUp?.ward}
            render={({ field: { onChange, value } }) => (
              <Select
                className={classes["steptwo__select-scale--select"]}
                placeholder="Chọn phường xã"
                value={options.find((c) => c.value === value)}
                options={options}
                onChange={(selectedOption) => {
                  onChange(selectedOption.value);
                }}
              />
            )}
          />
          {errors.ward?.message && <p>{errors.ward?.message}</p>}
        </div>

        <InputField
          placeholder="Vui lòng địa chỉ công ty"
          {...register("address")}
          defaultValue={infoSignUp?.address}
          errors={errors.address?.message}
        />

        <div className={classes.steptwo__actions}>
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
            {t("next")}
            <IoMdArrowForward style={{ marginLeft: "10px" }} />
          </ButtonField>
        </div>
      </form>
    </Fragment>
  );
};

export default StepTwoSignUp;
