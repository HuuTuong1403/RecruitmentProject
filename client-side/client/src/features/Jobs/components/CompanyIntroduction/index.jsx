import { AiOutlineGlobal } from "react-icons/ai";
import { Avatar } from "antd";
import { FaGavel } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import { selectJobSeekerLocal } from "features/JobSeekers/slices/selectors";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ButtonField from "custom-fields/ButtonField";
import classes from "./style.module.scss";
import notification from "components/Notification";

const CompanyIntroduction = ({
  company,
  isReviewed,
  setShowModal,
  employer,
}) => {
  const { t } = useTranslation();
  const history = useHistory();
  const user = selectJobSeekerLocal();

  const { logo, companyName, address, companyWebsite, companyType, scale } =
    company;

  const handleFollowEmployer = () => {
    if (user) {
      console.log("Đã theo dõi");
    } else {
      notification(
        `${t(
          "Please login to the job seeker account to perform this function"
        )}`,
        "error"
      );
      history.push("/home/sign-in");
    }
  };

  const handleWriteReview = () => {
    if (user) {
      history.push(`/jobs/employer/${companyName}/review`);
    } else {
      if (employer) {
        notification(`${t("Please log out of the employer account")}`, "error");
      } else {
        setShowModal(true);
      }
    }
  };

  return (
    <div className={classes.companyIntroduction}>
      <div className={classes.companyIntroduction__wrapped}>
        <div className={classes["companyIntroduction__wrapped--left"]}>
          <Avatar
            className={classes["companyIntroduction__wrapped--left--logo"]}
            size={200}
            shape="square"
            src={logo}
          />
        </div>
        <div className={classes["companyIntroduction__wrapped--right"]}>
          <div
            className={
              classes["companyIntroduction__wrapped--right--companyName"]
            }
          >
            {companyName}
          </div>
          <div className={classes["companyIntroduction__wrapped--title"]}>
            {t("Location")}
          </div>
          <div>
            <IoLocationOutline
              className={classes["companyIntroduction__wrapped--icon"]}
            />
            {`${address?.street ? `${address?.street}, ` : ""}
              ${address?.ward ? `${address?.ward}, ` : ""}
              ${address?.district ? `${address?.district}, ` : ""}
              ${address?.city ? address?.city : ""}`}
          </div>
          <hr />
          <div className={classes["companyIntroduction__wrapped--title"]}>
            {t("Information about company")}
          </div>
          <div>
            <IoIosPeople
              className={classes["companyIntroduction__wrapped--icon"]}
            />
            {t("Company size")}: {scale}
          </div>
          <div>
            <FaGavel
              className={classes["companyIntroduction__wrapped--icon"]}
            />
            {t("Company type")}: {companyType}
          </div>
          <div>
            <AiOutlineGlobal
              className={classes["companyIntroduction__wrapped--icon"]}
            />
            <a
              className={classes["companyIntroduction__wrapped--link"]}
              href={companyWebsite}
              target="_blank"
              rel="noreferrer"
            >
              {companyWebsite}
            </a>
          </div>
        </div>
        <div className={classes["companyIntroduction__wrapped--action"]}>
          <div
            className={
              classes["companyIntroduction__wrapped--action--follower"]
            }
          >
            <span>200</span> {t("followers")}
          </div>
          <ButtonField
            backgroundcolor="#0a426e"
            backgroundcolorhover="#324554"
            radius="5px"
            uppercase
            onClick={handleFollowEmployer}
          >
            {t("Follow")}
          </ButtonField>
          {isReviewed ? (
            <ButtonField
              backgroundcolor="#dd4b39"
              backgroundcolorhover="#bf0000"
              radius="5px"
              disabled
              uppercase
            >
              {t("Reviewed")}
            </ButtonField>
          ) : (
            <ButtonField
              backgroundcolor="#dd4b39"
              backgroundcolorhover="#bf0000"
              radius="5px"
              uppercase
              onClick={handleWriteReview}
            >
              {t("Review")}
            </ButtonField>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyIntroduction;
