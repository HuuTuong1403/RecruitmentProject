import { FaFileDownload, FaSave, FaTrash } from "react-icons/fa";
import { Modal, Avatar } from "antd";
import { MdRestorePage } from "react-icons/md";
import { useTranslation } from "react-i18next";
import ButtonField from "custom-fields/ButtonField";
import classes from "./style.module.scss";
import LabelField from "custom-fields/LabelField";
import moment from "moment";
import parse from "html-react-parser";
import PopoverField from "custom-fields/PopoverField";

const ModalViewProfileApplication = ({
  showModal,
  onCloseModal,
  application,
  onDelete,
  onSave,
  onRestore,
  isSave = false,
  isDelete = false,
  isNotSaved = false,
  loadingSaved = false,
  loadingDeleted = false,
  loadingRestore = false,
}) => {
  const { t } = useTranslation();

  const dateFormat = "DD/MM/yyyy";
  const {
    createdAt,
    cvPath,
    description,
    fullName,
    job,
    jobSeeker,
    status,
    phone,
    _id,
  } = application;

  console.log(application);

  const handleDownloadCV = () => {
    window.open(cvPath, "_blank");
  };

  return (
    <Modal
      centered
      visible={showModal}
      onOk={onCloseModal}
      onCancel={onCloseModal}
      width={1000}
      footer={null}
    >
      <div className={classes.modalProfile}>
        <div className={classes.modalProfile__top}>
          <div className={classes["modalProfile__top--left"]}>
            <Avatar
              className={classes["modalProfile__top--left--logo"]}
              shape="square"
              size={200}
              src={jobSeeker?.avatar}
            />
          </div>
          <div className={classes["modalProfile__top--right"]}>
            <div className={classes["modalProfile__top--fullName"]}>
              {fullName}
            </div>

            <div className={classes.modalProfile__field}>
              <LabelField label={`${t("dob")}:`} />
              <div className={classes["modalProfile__field--text"]}>
                {moment(jobSeeker?.DOB).format(dateFormat)}
              </div>
            </div>

            <div className={classes.modalProfile__field}>
              <LabelField label={`${t("Email")}:`} />
              <div
                className={`${classes["modalProfile__field--text"]} ${classes["modalProfile__field--textmb"]}`}
              >
                {jobSeeker?.email}
              </div>
            </div>

            <div className={classes.modalProfile__field}>
              <LabelField label={`${t("Phone")}:`} />
              <div className={classes["modalProfile__field--text"]}>
                {phone}
              </div>
            </div>

            <div className={classes.modalProfile__field}>
              <LabelField label={`${t("Address")}:`} />
              <div className={classes["modalProfile__field--text"]}>
                {jobSeeker?.address?.city}
              </div>
            </div>

            <div className={classes.modalProfile__field}>
              <LabelField label={`${t("Submission date")}:`} />
              <div className={classes["modalProfile__field--text"]}>
                {moment(createdAt).format(dateFormat)}
              </div>
            </div>

            <div className={classes["modalProfile__top--actions"]}>
              <ButtonField
                backgroundcolor="#0a426e"
                backgroundcolorhover="#0a436ead"
                padding="5px"
                onClick={handleDownloadCV}
              >
                <FaFileDownload className={classes.modalProfile__icon} />
                {t("Download CV")}
              </ButtonField>
              {isNotSaved && (
                <PopoverField
                  title={t("Confirm to save this profile")}
                  subTitle={t("Do you want to save this profile?")}
                  loading={loadingSaved}
                  onClickOk={() => {
                    onSave(_id);
                  }}
                  titleCancel={t("Cancel")}
                  titleOk={t("Save")}
                  isSwap
                >
                  <ButtonField
                    backgroundcolor="#067951"
                    backgroundcolorhover="#2baa7e"
                    padding="5px"
                  >
                    <FaSave className={classes.modalProfile__icon} />
                    {t("Save profile")}
                  </ButtonField>
                </PopoverField>
              )}

              {isNotSaved && (
                <PopoverField
                  title={t("Confirm to delete this profile")}
                  subTitle={t("Do you want to delete this profile?")}
                  loading={loadingDeleted}
                  onClickOk={() => {
                    onDelete(_id);
                  }}
                  titleCancel={t("Cancel")}
                  titleOk={t("Delete")}
                >
                  <ButtonField
                    backgroundcolor={"#dd4b39"}
                    backgroundcolorhover={"#ff7875"}
                    padding="5px"
                  >
                    <FaTrash className={classes.modalProfile__icon} />
                    {t("Delete profile")}
                  </ButtonField>
                </PopoverField>
              )}

              {isDelete && (
                <PopoverField
                  title={t("Confirm to restore this profile")}
                  subTitle={t("Do you want to restore this profile?")}
                  isSwap={true}
                  loading={loadingRestore}
                  onClickOk={() => {
                    onRestore(_id);
                  }}
                  titleCancel={t("Cancel")}
                  titleOk={t("Restore")}
                >
                  <ButtonField
                    backgroundcolor={"#067951"}
                    backgroundcolorhover={"#2baa7e"}
                    padding="5px"
                  >
                    <MdRestorePage className={classes.modalProfile__icon} />
                    {t("Restore profile")}
                  </ButtonField>
                </PopoverField>
              )}
            </div>
          </div>
        </div>
        <div className={classes.modalProfile__bottom}>
          <div className={classes["modalProfile__bottom--jobTitle"]}>
            {t("Apply for the job")} {job?.jobTitle}
          </div>

          <div className={classes.modalProfile__field}>
            <LabelField label={`${t("Workplace address")}:`} />
            <div
              className={`${classes["modalProfile__field--text"]} ${classes["modalProfile__field--textmb"]}`}
            >
              {job?.location?.street}, {job?.location?.district},{" "}
              {job?.location?.ward}, {job?.location?.city}
            </div>
          </div>

          <div className={classes.modalProfile__field}>
            <LabelField label={`${t("Status Profile")}:`} />
            <div
              style={
                status === "NotSaved"
                  ? { color: "#0a426e" }
                  : status === "Saved"
                  ? { color: "green" }
                  : { color: "red" }
              }
              className={classes["modalProfile__field--textHightlight"]}
            >
              {t(status)}
            </div>
          </div>

          <div>
            <LabelField
              label={t(
                "What skills, projects or achievements make you a good candidate for this position?"
              )}
            />
            <div className={classes["modalProfile__field--description"]}>
              {description ? parse(description) : ""}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalViewProfileApplication;
