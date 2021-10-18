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
import { Avatar, Collapse, Checkbox, Tooltip } from "antd";
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
  const [text, setText] = useState(parse(employerDetail.description));
  const [loading, setLoading] = useState(false);
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
    const { city, district, ward, street, ...rest } = dataUpdateProfile;
    if (
      city === employerDetail?.address?.city &&
      district === employerDetail?.address?.district &&
      ward === employerDetail?.address?.ward &&
      street === employerDetail?.address?.street &&
      dataUpdateProfile.companyName === employerDetail?.companyName &&
      dataUpdateProfile.companyWebsite === employerDetail?.companyWebsite &&
      dataUpdateProfile.scale === employerDetail?.scale &&
      dataUpdateProfile.phone === employerDetail?.phone &&
      dataUpdateProfile.TIN === employerDetail?.TIN &&
      dataUpdateProfile.companyType === employerDetail?.companyType &&
      dataUpdateProfile.description === parse(employerDetail?.description) &&
      welfareUpdate === employerDetail?.welfare
    ) {
      setLoading(false);
      notification(`${t("Updated data unchanged")}`, "error");
    } else {
      const payload = {
        ...rest,
        welfare: welfareUpdate,
        ot: false,
        address: {
          city,
          district,
          ward,
          street,
        },
      };

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

  const handleCancelUpdate = () => {
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
      description: parse(employerDetail?.description),
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
      title: "Chế độ bảo hiểm",
      value: "Chế độ bảo hiểm",
      icon: <FaMedkit className={classes.employerProfile__icon} />,
    },
    {
      title: "Cơ hội du lịch",
      value: "Cơ hội du lịch",
      icon: <FaPlaneDeparture className={classes.employerProfile__icon} />,
    },
    {
      title: "Nghỉ phép có lương",
      value: "Nghỉ phép có lương",
      icon: <FaDollarSign className={classes.employerProfile__icon} />,
    },
    {
      title: "Chăm sóc sức khỏe",
      value: "Chăm sóc sức khỏe",
      icon: <FaUserMd className={classes.employerProfile__icon} />,
    },
    {
      title: "Đào tạo",
      value: "Đào tạo",
      icon: <FaGraduationCap className={classes.employerProfile__icon} />,
    },
    {
      title: "Tăng lương",
      value: "Tăng lương",
      icon: <FaChartLine className={classes.employerProfile__icon} />,
    },
    {
      title: "Laptop",
      value: "Laptop",
      icon: <FaLaptop className={classes.employerProfile__icon} />,
    },
    {
      title: "Tiền thưởng",
      value: "Tiền thưởng",
      icon: <FaRegMoneyBillAlt className={classes.employerProfile__icon} />,
    },
    {
      title: "Xe đưa đón",
      value: "Xe đưa đón",
      icon: <FaTaxi className={classes.employerProfile__icon} />,
    },
    {
      title: "Thư viện",
      value: "Thư viện",
      icon: <IoLibrary className={classes.employerProfile__icon} />,
    },
    {
      title: "Đồng phục",
      value: "Đồng phục",
      icon: <FaBlackTie className={classes.employerProfile__icon} />,
    },
    {
      title: "Hoạt động nhóm",
      value: "Hoạt động nhóm",
      icon: <MdGroup className={classes.employerProfile__icon} />,
    },
    {
      title: "CLB thể thao",
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
          <div className={classes["employerProfile__wrapped--title"]}>
            {t("Account Management")}
          </div>
          <div className={classes.top}>
            <div className={classes.top__left}>
              <Avatar src={employerDetail.logo} shape="square" size={200} />
            </div>
            <div className={classes.top__right}>
              <div>
                <InputProfileField
                  fontSize="26px"
                  bold="700"
                  placeholder={t("phd-companyName")}
                  defaultValue={employerDetail.companyName}
                  {...register("companyName")}
                  errors={errors?.companyName?.message}
                />
              </div>
              <div className={classes.top__group}>
                <LabelField label="Email:" />
                <div className={classes["top__group--text"]}>
                  {employerDetail.email}
                </div>
              </div>
              <div className={classes.top__group}>
                <LabelField label={`${t("Username")}:`} />
                <div className={classes["top__group--text"]}>
                  {employerDetail.username}
                </div>
              </div>
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
            </div>
          </div>
          <div className={classes.bottom}>
            <Collapse bordered={false} defaultActiveKey={["1", "2", "3"]}>
              <Panel header="Thông tin về công ty" style={style} key="1">
                <div className={classes.bottom__wrapped}>
                  <div className={classes["bottom__wrapped--description"]}>
                    <LabelField label={"Mô tả công ty"} isCompulsory={true} />
                    <Tooltip
                      title={
                        showText ? "Chỉnh sửa văn bản" : "Xem ở dạng văn bản"
                      }
                    >
                      <AiOutlineSwap
                        className={classes["bottom__wrapped--swapIcon"]}
                        onClick={() => setShowText((prevState) => !prevState)}
                      />
                    </Tooltip>
                    {showText ? (
                      <div style={{ padding: "10px 0" }}>{parse(text)}</div>
                    ) : (
                      <CKEditorField
                        setText={setText}
                        name="description"
                        control={control}
                        defaultValue={parse(employerDetail.description)}
                        errors={errors?.description?.message}
                      />
                    )}
                  </div>
                  <div className={classes["bottom__wrapped--scale-type"]}>
                    <div>
                      <LabelField
                        label={"Số lượng nhân viên"}
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
                    <div>
                      <LabelField
                        label={"Loại doanh nghiệp"}
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
                <Panel header="Thông tin về địa chỉ" style={style} key="2">
                  <div className={classes["bottom__wrapped--scale-type"]}>
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
              <Panel header="Thông tin về phúc lợi" style={style} key="3">
                <div>
                  <Checkbox.Group
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
              type="button"
              backgroundcolor="#dd4b39"
              backgroundcolorhover="#bf0000"
              color="#fff"
              radius="20px"
              uppercase="true"
              padding="8px"
              onClick={handleCancelUpdate}
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
      )}
    </div>
  );
};

export default EmployerProfilePage;
