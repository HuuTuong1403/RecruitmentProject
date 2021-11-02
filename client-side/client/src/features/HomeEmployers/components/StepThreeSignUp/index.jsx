import { addInfoSignUp } from "features/HomeEmployers/slices";
import { Fragment, useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { schemaSignUpStep3 } from "common/constants/schema";
import { selectInfoSignUp } from "features/HomeEmployers/slices/selectors";
import { signUpEmployer } from "features/HomeEmployers/api/homeEmployer.api";
import { Switch } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import ButtonField from "custom-fields/ButtonField";
import classes from "./style.module.scss";
import InputField from "custom-fields/InputField";
import notification from "components/Notification";
import Select from "react-select";
import LabelField from "custom-fields/LabelField";

const StepThreeSignUp = (props) => {
  const { t } = useTranslation();
  const { onBackStep } = props;
  const dispatch = useDispatch();
  const infoSignUp = useSelector(selectInfoSignUp);
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [OT, setOT] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    mode: "all",
    resolver: yupResolver(schemaSignUpStep3),
  });

  const submitStep3Handler = async (item) => {
    dispatch(addInfoSignUp({ ...infoSignUp, ...item }));
    const signUpEmployerObj = {
      email: infoSignUp.email,
      phone: infoSignUp.phone,
      companyName: infoSignUp.companyName,
      scale: infoSignUp.scale,
      companyWebsite: infoSignUp.websiteCompany,
      city: infoSignUp.Address.province.label,
      district: infoSignUp.Address.district.label,
      ward: infoSignUp.Address.ward.label,
      street: infoSignUp.Address.address,
      companyType: item.Type,
      ot: OT,
      TIN: item.TIN,
    };
    setLoading(true);
    const result = await signUpEmployer(signUpEmployerObj);
    if (result.status === "success") {
      setLoading(false);
      notification(`${t("Successful account registration")}`, "success");
      dispatch(addInfoSignUp({}));
      history.push("/employers/sign-in");
    } else {
      setLoading(false);
      notification(
        `${result.message ?? "Đăng ký tài khoản thất bại"}`,
        "error"
      );
    }
  };

  const options = [
    { value: "", label: `${t("phd-companyType")}` },
    { value: "Outsourcing", label: "Outsourcing" },
    { value: "Product", label: "Product" },
  ];

  return (
    <Fragment>
      <div className={classes.stepthree}>
        {t("Step")} 3: {t("Representative information")}
      </div>
      <form
        className={classes.stepthree__form}
        onSubmit={handleSubmit(submitStep3Handler)}
      >
        <InputField
          type="text"
          placeholder={t("phd-taxCode")}
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
                placeholder={t("phd-companyType")}
                value={options.find((c) => c.value === value)}
                options={options}
                onChange={(selectedOption) => {
                  onChange(selectedOption.value);
                }}
              />
            )}
          />
          {errors.Type?.message && <p>{t(`${errors.Type?.message}`)}</p>}
        </div>

        <div className={classes["stepthree__check-box"]}>
          <LabelField label={`${t("Work overtime")}:`} />
          <Switch
            checkedChildren={t("Do allow")}
            unCheckedChildren={t("Do not allow")}
            checked={OT}
            defaultChecked={OT}
            onChange={() => setOT((prevState) => !prevState)}
          />
        </div>

        <div className={classes.stepthree__actions}>
          <ButtonField
            type="button"
            backgroundcolor="#dd4b39"
            backgroundcolorhover="#bf0000"
            uppercase
            onClick={onBackStep}
          >
            <IoMdArrowBack style={{ marginRight: "10px" }} />
            {t("back")}
          </ButtonField>
          <ButtonField
            type="submit"
            backgroundcolor="#0a426e"
            backgroundcolorhover="#324554"
            uppercase
            loading={loading}
          >
            {t("signup")}
          </ButtonField>
        </div>
      </form>
    </Fragment>
  );
};

export default StepThreeSignUp;
