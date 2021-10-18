import {
  fetchDistrictsByProvinceAsync,
  fetchWardsByDistrictsAsync,
} from "features/Home/slices/thunks";
import {
  selectedProvinces,
  selectedDistricts,
  selectedWards,
} from "features/Home/slices/selectors";
import { getDetailJobSeekerAsync } from "features/JobSeekers/slices/thunks";
import { schemaUpdateProfileJobSeeker } from "common/constants/schema";
import { ScrollTop } from "common/functions";
import { selectedJobSeekerProfile } from "features/JobSeekers/slices/selectors";
import { updateProfileJobSeeker } from "features/JobSeekers/api/jobSeeker.api";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useTitle } from "common/hook/useTitle";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup.js";
import ButtonField from "custom-fields/ButtonField";
import classes from "./style.module.scss";
import DatePickerFieldRHF from "custom-fields/DatePickerFieldRHF";
import InputField from "custom-fields/InputField";
import LabelField from "custom-fields/LabelField";
import moment from "moment";
import notification from "components/Notification";
import ProfileJobSeeker from "features/JobSeekers/components/ProfileJobSeeker";
import SelectLocationField from "custom-fields/SelectLocationField";

const UserProfilePage = () => {
  ScrollTop();
  const detailJobSeeker = useSelector(selectedJobSeekerProfile);
  const { t } = useTranslation();
  useTitle(`${t("Account Management")}`);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const provinces = useSelector(selectedProvinces)?.map((province) => ({
    label: province.name,
    value: province.code,
  }));
  provinces.unshift({ label: `${t("choose-province")}`, value: "" });

  const districts = useSelector(selectedDistricts)?.map((district) => ({
    label: district.name,
    value: district.code,
  }));
  districts.unshift({ label: `${t("choose-district")}`, value: "" });

  const wards = useSelector(selectedWards)?.map((ward) => ({
    label: ward.name,
    value: ward.code,
  }));
  wards.unshift({ label: `${t("choose-ward")}`, value: "" });

  const dateFormat = "DD/MM/yyyy";

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    mode: "all",
    resolver: yupResolver(schemaUpdateProfileJobSeeker),
  });

  const handleUpdateProfile = async (dataUpdateProfile) => {
    setLoading(true);
    const { city, district, ward, street, DOB, ...rest } = dataUpdateProfile;
    if (
      moment(DOB).format(dateFormat) ===
        moment(detailJobSeeker?.DOB).format(dateFormat) &&
      city === detailJobSeeker?.address?.city &&
      district === detailJobSeeker?.address?.district &&
      ward === detailJobSeeker?.address?.ward &&
      street === detailJobSeeker?.address?.street &&
      dataUpdateProfile.fullname === detailJobSeeker?.fullname &&
      dataUpdateProfile.phone === detailJobSeeker?.phone
    ) {
      setLoading(false);
      notification(`${t("Updated data unchanged")}`, "error");
    } else {
      let date;
      if (
        moment(DOB).format(dateFormat) ===
        moment(detailJobSeeker?.DOB).format(dateFormat)
      ) {
        date = moment(detailJobSeeker?.DOB).format("yyyy-MM-DD");
      } else {
        date = moment(DOB).format("yyyy-DD-MM");
      }

      const payload = {
        ...rest,
        DOB: date,
        address: {
          city,
          district,
          ward,
          street,
        },
      };

      const result = await updateProfileJobSeeker(payload);
      if (result.status === "success") {
        setLoading(false);
        notification(`${t("Update information successful")}`, "success");
        dispatch(getDetailJobSeekerAsync());
      } else {
        setLoading(false);
        notification(result.message, "error");
      }
    }
  };

  const handleCancel = () => {
    reset({
      fullname: detailJobSeeker?.fullname,
      phone: detailJobSeeker?.phone,
      city: detailJobSeeker?.address?.city,
      district: detailJobSeeker?.address?.district,
      ward: detailJobSeeker?.address?.ward,
      street: detailJobSeeker?.address?.street,
      DOB: detailJobSeeker?.DOB
        ? moment(detailJobSeeker.DOB, "YYYY-MM-DDTHH:mm:ss. sssZ")
        : null,
    });
  };

  const disabledDate = (current) => {
    return current && current.valueOf() >= Date.now();
  };

  return (
    <div className={classes.profile}>
      {detailJobSeeker && (
        <div className={classes.profile__wrapped}>
          <div className={classes["profile__wrapped--title"]}>
            {t("Account Management")}
          </div>
          <div className={classes["profile__wrapped--content"]}>
            <ProfileJobSeeker jobSeeker={detailJobSeeker} />
            <form
              className={classes["profile__wrapped--blockRight"]}
              onSubmit={handleSubmit(handleUpdateProfile)}
            >
              <div className={classes["profile__wrapped--blockRight--title"]}>
                {t("Personal information")}
              </div>
              <div className={classes["profile__wrapped--blockRight--form"]}>
                <div>
                  <LabelField label={t("Email")} isCompulsory={false} />
                  <InputField
                    readOnly
                    placeholder={t("phd-email")}
                    defaultValue={detailJobSeeker.email}
                  />
                </div>
                <div>
                  <LabelField label={t("full name")} isCompulsory={true} />
                  <InputField
                    placeholder={t("phd-fullname")}
                    {...register("fullname")}
                    defaultValue={detailJobSeeker.fullname}
                    errors={errors?.fullname?.message}
                  />
                </div>
                <div>
                  <LabelField label={t("dob")} isCompulsory={true} />
                  <DatePickerFieldRHF
                    name="DOB"
                    control={control}
                    dateFormat={dateFormat}
                    disabledDate={disabledDate}
                    errors={errors?.DOB?.message}
                    placeholder={t("phd-select-dob")}
                    defaultValue={
                      detailJobSeeker.DOB
                        ? moment(
                            detailJobSeeker.DOB,
                            "YYYY-MM-DDTHH:mm:ss. sssZ"
                          )
                        : null
                    }
                  />
                </div>
                <div>
                  <LabelField label={t("phone number")} isCompulsory={true} />
                  <InputField
                    defaultValue={detailJobSeeker.phone}
                    placeholder={t("phd-phone-signup")}
                    {...register("phone")}
                    errors={errors?.phone?.message}
                  />
                </div>
              </div>

              <div className={classes["profile__wrapped--blockRight--title"]}>
                {t("Address")}
              </div>
              <div className={classes["profile__wrapped--blockRight--form"]}>
                <div>
                  <LabelField label={t("Province")} isCompulsory={true} />
                  <SelectLocationField
                    name="city"
                    control={control}
                    defaultValue={
                      detailJobSeeker.address?.city ?? `${t("choose-province")}`
                    }
                    locationList={provinces}
                    fetchData={fetchDistrictsByProvinceAsync}
                    placeholder={t("choose-province")}
                    errors={errors?.city?.message}
                  />
                </div>
                <div>
                  <LabelField label={t("District")} isCompulsory={true} />
                  <SelectLocationField
                    name="district"
                    control={control}
                    defaultValue={detailJobSeeker.address?.district}
                    locationList={districts}
                    fetchData={fetchWardsByDistrictsAsync}
                    placeholder={t("choose-district")}
                    errors={errors?.district?.message}
                  />
                </div>
                <div>
                  <LabelField label={t("Ward")} isCompulsory={true} />
                  <SelectLocationField
                    name="ward"
                    control={control}
                    defaultValue={detailJobSeeker.address?.ward}
                    locationList={wards}
                    placeholder={t("choose-ward")}
                    errors={errors?.ward?.message}
                  />
                </div>
                <div>
                  <LabelField label={t("Address")} isCompulsory={true} />
                  <InputField
                    defaultValue={detailJobSeeker.address?.street ?? ""}
                    placeholder={t("phd-address")}
                    {...register("street")}
                    errors={errors?.street?.message}
                  />
                </div>
              </div>
              <div className={classes["profile__wrapped--blockRight--actions"]}>
                <ButtonField
                  type="button"
                  backgroundcolor="#dd4b39"
                  backgroundcolorhover="#bf0000"
                  color="#fff"
                  radius="20px"
                  uppercase="true"
                  padding="8px"
                  onClick={handleCancel}
                >
                  {t("Cancel")}
                </ButtonField>
                <ButtonField
                  type="submit"
                  backgroundcolor="#0a426e"
                  backgroundcolorhover="#324554"
                  color="#fff"
                  radius="20px"
                  uppercase="true"
                  padding="8px"
                  loading={loading}
                >
                  {t("Update Information")}
                </ButtonField>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfilePage;
