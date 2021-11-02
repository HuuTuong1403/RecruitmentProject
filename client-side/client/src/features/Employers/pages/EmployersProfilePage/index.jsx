import {
  fetchDistrictsByProvinceAsync,
  fetchWardsByDistrictsAsync,
} from "features/Home/slices/thunks";
import {
  selectedProvinces,
  selectedDistricts,
  selectedWards,
} from "features/Home/slices/selectors";
import { AiOutlineSwap } from "react-icons/ai";
import { Collapse, Checkbox, Tooltip, Switch } from "antd";
import {
  FaMedkit,
  FaPlaneDeparture,
  FaDollarSign,
  FaUserMd,
  FaGraduationCap,
  FaChartLine,
  FaLaptop,
  FaRegMoneyBillAlt,
  FaTaxi,
  FaBlackTie,
  FaHeartbeat,
} from "react-icons/fa";
import { getDetailEmployerAsync } from "features/Employers/slices/thunks";
import { IoLibrary } from "react-icons/io5";
import { MdGroup } from "react-icons/md";
import { schemaUpdateProfileEmployer } from "common/constants/schema";
import { ScrollTop } from "common/functions";
import { selectEmployerDetail } from "features/Employers/slices/selectors";
import { updateProfileEmployer } from "features/Employers/api/employer.api";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useTitle } from "common/hook/useTitle";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup.js";
import AvatarUpload from "components/AvatarUpload";
import ButtonField from "custom-fields/ButtonField";
import CKEditorField from "custom-fields/CKEditorField";
import classes from "./style.module.scss";
import InputProfileField from "features/Employers/components/InputProfileField";
import LabelField from "custom-fields/LabelField";
import notification from "components/Notification";
import parse from "html-react-parser";
import SelectLocationField from "custom-fields/SelectLocationField";
import SelectProfileField from "features/Employers/components/SelectProfileField";

const EmployerProfilePage = () => {
  ScrollTop();

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const employerDetail = useSelector(selectEmployerDetail);
  const { Panel } = Collapse;
  const [welfareUpdate, setWelfareUpdate] = useState(
    employerDetail?.welfare ?? []
  );
  const [showText, setShowText] = useState(false);
  const [text, setText] = useState(parse(employerDetail?.description ?? ""));
  const [OT, setOT] = useState(employerDetail?.ot ?? false);
  const [loading, setLoading] = useState(false);
  const [logo, setLogo] = useState(null);
  useTitle(`${t("Account Management")}`);

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

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    mode: "all",
    resolver: yupResolver(schemaUpdateProfileEmployer),
  });

  const submitUpdateProfileEmployer = async (dataUpdateProfile) => {
    setLoading(true);

    const {
      city,
      district,
      ward,
      street,
      description,
      companyName,
      companyWebsite,
      scale,
      phone,
      TIN,
      companyType,
    } = dataUpdateProfile;

    if (
      !logo &&
      city === employerDetail?.address?.city &&
      district === employerDetail?.address?.district &&
      ward === employerDetail?.address?.ward &&
      street === employerDetail?.address?.street &&
      companyName === employerDetail?.companyName &&
      companyWebsite === employerDetail?.companyWebsite &&
      scale === employerDetail?.scale &&
      phone === employerDetail?.phone &&
      TIN === employerDetail?.TIN &&
      OT === employerDetail?.ot &&
      companyType === employerDetail?.companyType &&
      description === employerDetail?.description &&
      welfareUpdate === employerDetail?.welfare
    ) {
      setLoading(false);
      notification(`${t("Updated data unchanged")}`, "error");
    } else {
      const payload = new FormData();
      payload.append("address[city]", city);
      payload.append("address[district]", district);
      payload.append("address[ward]", ward);
      payload.append("address[street]", street);
      welfareUpdate.forEach((item) => payload.append("welfare", item));
      payload.append("description", description);
      payload.append("companyName", companyName);
      payload.append("companyWebsite", companyWebsite);
      payload.append("scale", scale);
      payload.append("phone", phone);
      payload.append("ot", OT);
      payload.append("TIN", TIN);
      payload.append("photo-logo", logo);

      const result = await updateProfileEmployer(payload);
      if (result.status === "success") {
        setLoading(false);
        notification(`${t("Update information successful")}`, "success");
        dispatch(getDetailEmployerAsync());
      } else {
        setLoading(false);
        notification(result.message, "error");
      }
    }
  };

  const changeAvatar = (file) => {
    setLogo(file);
  };

  const handleCancelUpdate = () => {
    setOT(employerDetail?.ot);
    setWelfareUpdate(employerDetail?.welfare);
    reset({
      companyName: employerDetail?.companyName,
      city: employerDetail?.address?.city,
      district: employerDetail?.address?.district,
      ward: employerDetail?.address?.ward,
      street: employerDetail?.address?.street,
      companyWebsite: employerDetail?.companyWebsite,
      scale: employerDetail?.scale,
      phone: employerDetail?.phone,
      TIN: employerDetail?.TIN,
      companyType: employerDetail?.companyType,
      description: employerDetail?.description,
    });
  };

  const optionsScale = [
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

  const optionsCompanyType = [
    { value: "", label: `${t("phd-companyType")}` },
    { value: "Outsourcing", label: "Outsourcing" },
    { value: "Product", label: "Product" },
  ];

  const style = {
    fontSize: "16px",
    border: "none",
    backgroundColor: "#fff",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.25)",
  };

  const welfareList = [
    {
      title: `${t("Insurance")}`,
      value: "Chế độ bảo hiểm",
      icon: <FaMedkit className={classes.employerProfile__icon} />,
    },
    {
      title: `${t("Travel opportunities")}`,
      value: "Cơ hội du lịch",
      icon: <FaPlaneDeparture className={classes.employerProfile__icon} />,
    },
    {
      title: `${t("Paid leave")}`,
      value: "Nghỉ phép có lương",
      icon: <FaDollarSign className={classes.employerProfile__icon} />,
    },
    {
      title: `${t("Health care")}`,
      value: "Chăm sóc sức khỏe",
      icon: <FaUserMd className={classes.employerProfile__icon} />,
    },
    {
      title: `${t("Training Scheme")}`,
      value: "Đào tạo",
      icon: <FaGraduationCap className={classes.employerProfile__icon} />,
    },
    {
      title: `${t("Salary review")}`,
      value: "Tăng lương",
      icon: <FaChartLine className={classes.employerProfile__icon} />,
    },
    {
      title: "Laptop",
      value: "Laptop",
      icon: <FaLaptop className={classes.employerProfile__icon} />,
    },
    {
      title: `${t("Allowances")}`,
      value: "Phụ cấp",
      icon: <FaRegMoneyBillAlt className={classes.employerProfile__icon} />,
    },
    {
      title: `${t("Employee Shuttle")}`,
      value: "Xe đưa đón",
      icon: <FaTaxi className={classes.employerProfile__icon} />,
    },
    {
      title: `${t("Library")}`,
      value: "Thư viện",
      icon: <IoLibrary className={classes.employerProfile__icon} />,
    },
    {
      title: `${t("Uniform")}`,
      value: "Đồng phục",
      icon: <FaBlackTie className={classes.employerProfile__icon} />,
    },
    {
      title: `${t("Group activities")}`,
      value: "Hoạt động nhóm",
      icon: <MdGroup className={classes.employerProfile__icon} />,
    },
    {
      title: `${t("Sport club")}`,
      value: "CLB thể thao",
      icon: <FaHeartbeat className={classes.employerProfile__icon} />,
    },
  ];

  return (
    <div className={classes.employerProfile}>
      {employerDetail && (
        <form
          onSubmit={handleSubmit(submitUpdateProfileEmployer)}
          className={classes.employerProfile__wrapped}
        >
          <div className={classes.titleDashboard}>
            {t("Account Management")}
          </div>
          <div className={classes.top}>
            <div className={classes.top__left}>
              <AvatarUpload
                src={employerDetail.logo}
                shape="square"
                size={220}
                changeAvatar={changeAvatar}
              />
            </div>
            <div className={classes.top__right}>
              <div>
                {/* Company name */}
                <InputProfileField
                  fontSize="26px"
                  bold="700"
                  placeholder={t("phd-companyName")}
                  defaultValue={employerDetail.companyName}
                  {...register("companyName")}
                  errors={errors?.companyName?.message}
                />
              </div>

              {/* Email */}
              <div className={classes.top__group}>
                <LabelField label="Email:" />
                <div className={classes["top__group--text"]}>
                  {employerDetail.email}
                </div>
              </div>

              {/* Username */}
              <div className={classes.top__group}>
                <LabelField label={`${t("Username")}:`} />
                <div className={classes["top__group--text"]}>
                  {employerDetail.username}
                </div>
              </div>

              {/* Website */}
              <div className={classes.top__group}>
                <LabelField label={`${t("Website")}:`} />
                <InputProfileField
                  fontSize="15px"
                  bold="normal"
                  placeholder={t("phd-companyWebsite")}
                  defaultValue={employerDetail.companyWebsite}
                  {...register("companyWebsite")}
                  errors={errors?.companyWebsite?.message}
                />
              </div>

              {/* Phone */}
              <div className={classes.top__group}>
                <LabelField label={`${t("phone number")}:`} />
                <InputProfileField
                  fontSize="15px"
                  bold="normal"
                  placeholder={t("phd-phone-signup")}
                  defaultValue={employerDetail.phone}
                  {...register("phone")}
                  errors={errors?.phone?.message}
                />
              </div>

              {/* Tax code */}
              <div className={classes.top__group}>
                <LabelField label={`${t("Tax code")}:`} />
                <InputProfileField
                  fontSize="15px"
                  bold="normal"
                  placeholder={t("phd-taxCode")}
                  defaultValue={employerDetail.TIN}
                  {...register("TIN")}
                  errors={errors?.TIN?.message}
                />
              </div>

              {/* Street */}
              <div className={classes.top__group}>
                <LabelField label={`${t("Address")}:`} />
                <InputProfileField
                  fontSize="15px"
                  bold="normal"
                  placeholder={t("phd-address")}
                  defaultValue={employerDetail.address.street}
                  {...register("street")}
                  errors={errors?.street?.message}
                />
              </div>

              {/* OT */}
              <div className={classes.top__group}>
                <LabelField label={`${t("Work overtime")}:`} />
                <Switch
                  checkedChildren={t("Do allow")}
                  unCheckedChildren={t("Do not allow")}
                  onChange={() => setOT((prevState) => !prevState)}
                  defaultChecked={OT}
                  checked={OT}
                />
              </div>
            </div>
          </div>
          <div className={classes.bottom}>
            <Collapse bordered={false} defaultActiveKey={["1", "2", "3"]}>
              <Panel
                header={t("Information about company")}
                style={style}
                key="1"
              >
                <div className={classes.bottom__wrapped}>
                  {/* Description */}
                  <div className={classes["bottom__wrapped--description"]}>
                    <LabelField
                      label={t("Company description")}
                      isCompulsory={true}
                    />
                    <Tooltip
                      title={
                        showText
                          ? `${t("Edit text")}`
                          : `${t("View in text form")}`
                      }
                    >
                      <AiOutlineSwap
                        className={classes["bottom__wrapped--swapIcon"]}
                        onClick={() => setShowText((prevState) => !prevState)}
                      />
                    </Tooltip>
                    {showText ? (
                      <div style={{ padding: "10px 0" }}>{text}</div>
                    ) : (
                      <CKEditorField
                        setText={setText}
                        name="description"
                        control={control}
                        defaultValue={employerDetail.description}
                        errors={errors?.description?.message}
                      />
                    )}
                  </div>

                  <div className={classes["bottom__wrapped--scale-type"]}>
                    {/* Company Size */}
                    <div>
                      <LabelField
                        label={t("Company size")}
                        isCompulsory={true}
                      />
                      <SelectProfileField
                        name="scale"
                        control={control}
                        defaultValue={
                          employerDetail.scale ?? `${t("phd-select-scale")}`
                        }
                        optionList={optionsScale}
                        placeholder={t("phd-select-scale")}
                        errors={errors?.scale?.message}
                      />
                    </div>

                    {/* Company type */}
                    <div>
                      <LabelField
                        label={t("Company type")}
                        isCompulsory={true}
                      />
                      <SelectProfileField
                        name="companyType"
                        control={control}
                        defaultValue={
                          employerDetail.companyType ??
                          `${t("phd-companyType")}`
                        }
                        optionList={optionsCompanyType}
                        placeholder={t("phd-companyType")}
                        errors={errors?.companyType?.message}
                      />
                    </div>
                  </div>
                </div>
              </Panel>
              {employerDetail.address && (
                <Panel header={t("Address information")} style={style} key="2">
                  <div className={classes["bottom__wrapped--scale-type"]}>
                    {/* Province */}
                    <div>
                      <LabelField label={t("Province")} isCompulsory={true} />
                      <SelectLocationField
                        name="city"
                        control={control}
                        defaultValue={employerDetail.address.city}
                        locationList={provinces}
                        fetchData={fetchDistrictsByProvinceAsync}
                        placeholder={t("choose-province")}
                        errors={errors?.city?.message}
                      />
                    </div>

                    {/* District */}
                    <div>
                      <LabelField label={t("District")} isCompulsory={true} />
                      <SelectLocationField
                        name="district"
                        control={control}
                        defaultValue={employerDetail.address.district}
                        locationList={districts}
                        fetchData={fetchWardsByDistrictsAsync}
                        placeholder={t("choose-district")}
                        errors={errors?.district?.message}
                      />
                    </div>

                    {/* Ward */}
                    <div>
                      <LabelField label={t("Ward")} isCompulsory={true} />
                      <SelectLocationField
                        name="ward"
                        control={control}
                        defaultValue={employerDetail.address.ward}
                        locationList={wards}
                        placeholder={t("choose-ward")}
                        errors={errors?.ward?.message}
                      />
                    </div>
                  </div>
                </Panel>
              )}
              <Panel
                header={t("Information about welfare")}
                style={style}
                key="3"
              >
                {/* Welfare */}
                <div>
                  <Checkbox.Group
                    value={welfareUpdate}
                    defaultValue={employerDetail.welfare}
                    onChange={(checkedValues) =>
                      setWelfareUpdate(checkedValues)
                    }
                  >
                    <div className={classes["bottom__wrapped--welfare"]}>
                      {welfareList.map((welfare, index) => {
                        return (
                          <div key={index}>
                            <Checkbox value={welfare.value}>
                              {welfare.icon}
                              {welfare.title}
                            </Checkbox>
                          </div>
                        );
                      })}
                    </div>
                  </Checkbox.Group>
                </div>
              </Panel>
            </Collapse>
          </div>
          <div className={classes.employerProfile__actions}>
            <ButtonField
              backgroundcolor="#dd4b39"
              backgroundcolorhover="#bf0000"
              onClick={handleCancelUpdate}
              type="button"
              uppercase
            >
              {t("Cancel")}
            </ButtonField>
            <ButtonField
              backgroundcolor="#0a426e"
              backgroundcolorhover="#324554"
              loading={loading}
              type="submit"
              uppercase
            >
              {t("Update Information")}
            </ButtonField>
          </div>
        </form>
      )}
    </div>
  );
};

export default EmployerProfilePage;
