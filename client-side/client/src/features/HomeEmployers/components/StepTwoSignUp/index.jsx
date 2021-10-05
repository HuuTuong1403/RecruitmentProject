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
import {
  selectedDistricts,
  selectedProvinces,
  selectedWards,
} from "features/Home/slices/selectors";
import { FaBuilding } from "react-icons/fa";
import { IoMdArrowBack, IoMdArrowForward } from "react-icons/io";
import Select from "react-select";
import {
  fetchDistrictsByProvinceAsync,
  fetchWardsByDistrictsAsync,
} from "features/Home/slices/thunks";

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
    setValue,
  } = useForm({
    mode: "all",
    resolver: yupResolver(schemaSignUpStep2),
  });

  const provinces = useSelector(selectedProvinces).map((province) => ({
    value: province.code,
    label: province.name,
  }));
  provinces.unshift({ value: "", label: `${t("choose-province")}` });

  const districts = useSelector(selectedDistricts).map((district) => ({
    value: district.code,
    label: district.name,
  }));
  districts.unshift({ value: "", label: `${t("choose-district")}` });

  const wards = useSelector(selectedWards).map((ward) => ({
    value: ward.code,
    label: ward.name,
  }));
  wards.unshift({ value: "", label: `${t("choose-ward")}` });

  const { Address } = infoSignUp;

  const submitStep2Handler = (data) => {
    const { province, district, ward, address, ...newData } = data;
    const provinceLabel = provinces.find((c) => c.value === Number(province));
    const districtLabel = districts.find((c) => c.value === Number(district));
    const wardLabel = wards.find((c) => c.value === Number(ward));

    const dataLabel = {
      ...newData,
      Address: {
        province: provinceLabel,
        district: districtLabel,
        ward: wardLabel,
        address: address,
      },
    };
    dispatch(addInfoSignUp({ ...infoSignUp, ...dataLabel }));
    onNextStep();
  };

  const options = [
    { value: "", label: `${t("phd-select-scale")}` },
    { value: "Ít hơn 10", label: `${t("little than")} 10` },
    { value: "10 - 20", label: "10 - 20" },
    { value: "25 - 99", label: "25 - 99" },
    { value: "100 - 499", label: "100 - 499" },
    { value: "500 - 999", label: "500 - 999" },
    { value: "1.000 - 4.999", label: "1.000 - 4.999" },
    { value: "5.000 - 9.999", label: "5.000 - 9.999" },
    { value: "10.000 - 19.999", label: "10.000 - 19.999" },
    { value: "20.000 - 49.999", label: "20.000 - 49.999" },
    { value: "Hơn 50.000", label: `${t("more than")} 50.000` },
  ];

  return (
    <Fragment>
      <div className={classes.steptwo}>
        {t("Step")} 2: {t("business information")}
      </div>
      <form onSubmit={handleSubmit(submitStep2Handler)}>
        <InputField
          placeholder={t("phd-companyName")}
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
                placeholder={t("phd-select-scale")}
                value={options.find((c) => c.value === value)}
                options={options}
                onChange={(selectedOption) => {
                  onChange(selectedOption.value);
                }}
              />
            )}
          />
          {errors.scale?.message && <p>{t(`${errors.scale?.message}`)}</p>}
        </div>

        <InputField
          placeholder={t("phd-companyWebsite")}
          {...register("websiteCompany")}
          defaultValue={infoSignUp?.websiteCompany}
          errors={errors.websiteCompany?.message}
        />

        <div className={classes["steptwo__select-scale"]}>
          <Controller
            control={control}
            name="province"
            defaultValue={Number(Address?.province.value)}
            render={({ field: { onChange, value } }) => (
              <Select
                className={classes["steptwo__select-scale--select"]}
                placeholder={t("choose-province")}
                value={provinces.find((c) => c.value === value)}
                options={provinces}
                onChange={(selectedOption) => {
                  onChange(selectedOption.value);
                  if (selectedOption.value !== "") {
                    setValue("district", "", { shouldValidate: true });
                    setValue("ward", "", { shouldValidate: true });
                    dispatch(
                      fetchDistrictsByProvinceAsync({
                        code: selectedOption.value,
                      })
                    );
                  }
                }}
              />
            )}
          />
          {errors.province?.message && <p>{t(`${errors.province?.message}`)}</p>}
        </div>

        <div className={classes["steptwo__select-scale"]}>
          <Controller
            control={control}
            name="district"
            defaultValue={Number(Address?.district.value)}
            render={({ field: { onChange, value } }) => (
              <Select
                isDisabled={districts.length <= 1}
                className={classes["steptwo__select-scale--select"]}
                placeholder={t("choose-district")}
                value={districts.find((c) => c.value === value)}
                options={districts}
                onChange={(selectedOption) => {
                  onChange(selectedOption.value);
                  if (selectedOption.value !== "") {
                    setValue("ward", "", { shouldValidate: true });
                    dispatch(
                      fetchWardsByDistrictsAsync({
                        code: selectedOption.value,
                      })
                    );
                  }
                }}
              />
            )}
          />
          {errors.district?.message && <p>{t(`${errors.district?.message}`)}</p>}
        </div>

        <div className={classes["steptwo__select-scale"]}>
          <Controller
            control={control}
            name="ward"
            defaultValue={Number(Address?.ward.value)}
            render={({ field: { onChange, value } }) => (
              <Select
                isDisabled={wards.length <= 1}
                className={classes["steptwo__select-scale--select"]}
                placeholder={t("choose-ward")}
                value={wards.find((c) => c.value === value)}
                options={wards}
                onChange={(selectedOption) => {
                  onChange(selectedOption.value);
                }}
              />
            )}
          />
          {errors.ward?.message && <p>{t(`${errors.ward?.message}`)}</p>}
        </div>

        <InputField
          placeholder={t("phd-companyAddress")}
          {...register("address")}
          defaultValue={Address?.address}
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
            {t("back")}
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
