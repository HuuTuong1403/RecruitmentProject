import {
  AiOutlineCalendar,
  AiOutlineGlobal,
  AiOutlineMail,
  AiOutlinePhone,
} from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import { BsPeopleFill } from "react-icons/bs";
import { dateFormatPicker } from "common/constants/dateFormat";
import { Fragment, useState } from "react";
import { MdLocationOn, MdLocationCity, MdWork } from "react-icons/md";
import { useHistory } from "react-router-dom";
import { useTitle } from "common/hook/useTitle";
import { useTranslation } from "react-i18next";
import ButtonField from "custom-fields/ButtonField";
import classes from "./style.module.scss";
import ModalSignUp from "../ModalSignUp";
import moment from "moment";

const EmployerDetail = ({ employer }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const [showModal, setShhowModal] = useState(false);
  useTitle(employer.companyName);

  const handleBackToEmployerList = () => {
    history.push("/dashboard/employers");
  };

  const onOpenModal = () => {
    setShhowModal(true);
  };

  const onCloseModal = () => {
    setShhowModal(false);
  };

  const dataSource = [
    {
      title: `${t("Register date")}`,
      data: moment(employer.createdAt).format(dateFormatPicker),
      icon: <AiOutlineCalendar />,
    },
    {
      title: `${t("Company name")}`,
      data: employer.companyName,
    },
    {
      title: `${t("Company website")}`,
      data: (
        <a href={employer.companyWebsite} target="_blank" rel="noreferrer">
          {employer.companyWebsite}
        </a>
      ),
      icon: <AiOutlineGlobal />,
    },
    {
      title: "Email",
      data: employer.email,
      icon: <AiOutlineMail />,
    },
    {
      title: `${t("phone number")}`,
      data: employer.phone,
      icon: <AiOutlinePhone />,
    },
    {
      title: `${t("Address")}`,
      data:
        employer.address.street &&
        employer.address.ward &&
        employer.address.district
          ? `${employer.address.street}, ${employer.address.ward},
      ${employer.address.district}`
          : "Không có",
      icon: <MdLocationOn />,
    },
    {
      title: `${t("Area")}`,
      data: employer.address.city ?? "Không có",
      icon: <MdLocationCity />,
    },
    {
      title: `${t("Work overtime")}`,
      data: employer.ot ? "Có" : "Không",
      icon: <MdWork />,
    },
    {
      title: `${t("Number of employees")}`,
      data: `${employer.scale} ${t("employee")}`,
      icon: <BsPeopleFill />,
    },
    {
      title: `${t("Company type")}`,
      data: employer.companyType,
    },
  ];

  return (
    <div className={classes.employer}>
      <div className={classes.employer__wrapped}>
        <div className={classes["employer__wrapped--top"]}>
          <div className={classes["employer__wrapped--top--left"]}>
            <div>
              <BiArrowBack onClick={handleBackToEmployerList} />
            </div>
            <div>{employer.companyName}</div>
          </div>
          <div className={classes["employer__wrapped--top--right"]}>
            {employer.status === "approval" ? (
              <div className={classes.employer__approval}>{t("approval")}</div>
            ) : (
              <Fragment>
                <div>
                  <ButtonField
                    backgroundcolor="#ff4d4f"
                    backgroundcolorhover="#ff7875"
                    radius="5px"
                    padding="5px"
                  >
                    {t("Reject")}
                  </ButtonField>
                </div>
                <div>
                  <ButtonField
                    backgroundcolor="#067951"
                    backgroundcolorhover="#2baa7e"
                    radius="5px"
                    padding="5px"
                    onClick={onOpenModal}
                  >
                    {t("approve")}
                  </ButtonField>
                  <ModalSignUp
                    showModal={showModal}
                    onCloseModal={onCloseModal}
                    id={employer.id}
                  />
                </div>
              </Fragment>
            )}
          </div>
        </div>
        <div className={classes["employer__wrapped--content"]}>
          <table>
            <tbody>
              {dataSource.map((item, index) => (
                <tr key={index}>
                  <td>
                    {item.icon}
                    {item.title}:
                  </td>
                  <td>{item.data}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployerDetail;
