import {
  saveApplication,
  deleteApplication,
  restoreApplication,
} from "features/Employers/api/employer.api";
import {
  savedJobApplication,
  deletedJobAppication,
  restoredJobApplication,
  handleChangeCountStatus,
} from "features/Employers/slices";
import { FaFileDownload, FaEye, FaSave, FaTrash } from "react-icons/fa";
import { MdRestorePage } from "react-icons/md";
import { Table, Tooltip } from "antd";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import classes from "./style.module.scss";
import ModalViewProfileApplication from "../ModalViewProfileApplication";
import moment from "moment";
import notification from "components/Notification";
import PopoverField from "custom-fields/PopoverField";

const TableJobsApplication = ({
  jobsApplication,
  isDelete = false,
  isNotSaved = false,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const dateFormat = "DD/MM/yyyy";

  const [showModal, setShhowModal] = useState(false);
  const [application, setApplication] = useState({});
  const [loadingSaved, setLoadingSaved] = useState(false);
  const [loadingDeleted, setLoadingDeleted] = useState(false);
  const [loadingRestore, setLoadingRetore] = useState(false);

  const onOpenModal = (application) => {
    setApplication(application);
    setShhowModal(true);
  };

  const onCloseModal = () => {
    setShhowModal(false);
  };

  //Save Application In Tabs NOt Saved
  const handleClickSaveApplication = async (id) => {
    setLoadingSaved(true);
    const result = await saveApplication(id);

    if (result.status === "success") {
      notification(`${t("Successfully saved profile")}`, "success");
      dispatch(savedJobApplication(id));
      dispatch(
        handleChangeCountStatus({
          prevStatus: "NotSaved",
          nextStatus: "Saved",
        })
      );
      setShhowModal(false);
    } else {
      notification(
        `${t("Error! An error occurred. Please try again later")}`,
        "error"
      );
    }
    setLoadingSaved(false);
  };

  //Delete Application In Tabs Not Saved
  const handleClickDeleteApplication = async (id) => {
    setLoadingDeleted(true);
    const result = await deleteApplication(id);

    if (result.status === "success") {
      notification(`${t("Successfully deleted profile")}`, "success");
      dispatch(deletedJobAppication(id));
      dispatch(
        handleChangeCountStatus({
          prevStatus: "NotSaved",
          nextStatus: "Deleted",
        })
      );
      setShhowModal(false);
    } else {
      notification(
        `${t("Error! An error occurred. Please try again later")}`,
        "error"
      );
    }
    setLoadingDeleted(false);
  };

  //Restore Application In Tabs Deleted
  const handleClickRestoreApplication = async (id) => {
    setLoadingRetore(true);
    const result = await restoreApplication(id);

    if (result.status === "success") {
      notification(`${t("Successfully restored profile")}`, "success");
      dispatch(restoredJobApplication(id));
      dispatch(
        handleChangeCountStatus({
          prevStatus: "Deleted",
          nextStatus: "NotSaved",
        })
      );
      setShhowModal(false);
    } else {
      notification(
        `${t("Error! An error occurred. Please try again later")}`,
        "error"
      );
    }
    setLoadingRetore(false);
  };

  const columns = [
    {
      title: `${t("Name of applicant")}`,
      dataIndex: "fullName",
      key: "fullName",
      sorter: (a, b) => a.fullName.length - b.fullName.length,
    },
    {
      title: `${t("Phone")}`,
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: `${t("Job Title")}`,
      dataIndex: "jobTitle",
      key: "jobTitle",
      sorter: (a, b) => a.jobTitle.length - b.jobTitle.length,
    },
    {
      title: `${t("Submission date")}`,
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: (a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt),
    },
    {
      title: `${t("Salary")}`,
      dataIndex: "salary",
      key: "salary",
    },
    {
      title: `${t("Status")}`,
      dataIndex: "status",
      key: "status",
      render: (text) => t(text),
    },
    {
      title: `${t("Action")}`,
      dataIndex: "action",
      key: "action",
      width: 100,
      align: "center",
      render: (action) => {
        return (
          <div>
            <Tooltip title={t("View profile details")}>
              <FaEye
                onClick={() => onOpenModal(action.application)}
                className={classes.table__iconAction}
              />
            </Tooltip>
            <Tooltip title={t("Download CV")}>
              <a href={action.cvPath} target="_blank" rel="noreferrer">
                <FaFileDownload className={classes.table__iconAction} />
              </a>
            </Tooltip>
            <Tooltip placement="bottom" title={t("Save profile")}>
              {isNotSaved && (
                <PopoverField
                  title={t("Confirm to save this profile")}
                  subTitle={t("Do you want to save this profile?")}
                  loading={loadingSaved}
                  onClickOk={() => {
                    handleClickSaveApplication(action.id);
                  }}
                  titleCancel={t("Cancel")}
                  titleOk={t("Save")}
                  isSwap
                >
                  <FaSave className={classes.table__iconAction} />
                </PopoverField>
              )}
            </Tooltip>
            <Tooltip
              placement="bottom"
              title={isDelete ? t("Restore profile") : t("Delete profile")}
            >
              <PopoverField
                title={
                  isDelete
                    ? t("Confirm to restore this profile")
                    : t("Confirm to delete this profile")
                }
                subTitle={
                  isDelete
                    ? t("Do you want to restore this profile?")
                    : t("Do you want to delete this profile?")
                }
                isSwap={isDelete ? true : false}
                loading={isDelete ? loadingRestore : loadingDeleted}
                onClickOk={() => {
                  if (isDelete) {
                    handleClickRestoreApplication(action.id);
                  } else {
                    handleClickDeleteApplication(action.id);
                  }
                }}
                titleCancel={t("Cancel")}
                titleOk={isDelete ? t("Restore") : t("Delete")}
              >
                {isDelete ? (
                  <MdRestorePage className={classes.table__iconAction} />
                ) : (
                  isNotSaved && (
                    <FaTrash className={classes.table__iconAction} />
                  )
                )}
              </PopoverField>
            </Tooltip>
          </div>
        );
      },
    },
  ];

  const data = jobsApplication.map((jobItem) => {
    const { id, fullName, phone, createdAt, status, job, cvPath } = jobItem;
    return {
      key: id,
      fullName: fullName,
      phone: phone,
      jobTitle: job.jobTitle,
      createdAt: moment(createdAt).format(dateFormat),
      salary: `${
        job.salary.min
          ? `${job.salary.min} - ${job.salary.max} ${job.salary.type}`
          : job.salary.type
      }`,
      status: status,
      action: {
        cvPath: cvPath,
        id: id,
        application: jobItem,
      },
    };
  });

  return (
    <div>
      <ModalViewProfileApplication
        showModal={showModal}
        onCloseModal={onCloseModal}
        application={application}
        isDelete={isDelete}
        isNotSaved={isNotSaved}
        loadingSaved={loadingSaved}
        loadingDeleted={loadingDeleted}
        loadingRestore={loadingRestore}
        onDelete={handleClickDeleteApplication}
        onSave={handleClickSaveApplication}
        onRestore={handleClickRestoreApplication}
      />
      <Table
        bordered
        scroll={{ x: "max-content" }}
        columns={columns}
        dataSource={data}
        pagination={false}
        showSorterTooltip={false}
        style={{ cursor: "pointer" }}
      />
    </div>
  );
};

export default TableJobsApplication;
