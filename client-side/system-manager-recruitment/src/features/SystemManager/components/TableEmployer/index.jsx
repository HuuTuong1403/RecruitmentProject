import { Table } from "antd";
import { useHistory, useRouteMatch } from "react-router-dom";
import { useTranslation } from "react-i18next";
import classes from "./style.module.scss";
import moment from "moment";

const TableEmployer = ({ employerList }) => {
  const { t } = useTranslation();
  const dateFormat = "DD/MM/yyyy";
  const history = useHistory();
  const { url } = useRouteMatch();

  const columns = [
    {
      title: `${t("Company name")}`,
      dataIndex: "companyName",
      key: "companyName",
      render: (text) => (
        <div className={classes.tableEmployer__companyName}>{text}</div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => (
        <div className={classes.tableEmployer__email}>{text}</div>
      ),
    },
    {
      title: `${t("Phone")}`,
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: `${t("Register date")}`,
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: `${t("Status")}`,
      dataIndex: "status",
      key: "status",
      render: (text) => (
        <div
          className={
            text === "approval"
              ? classes.tableEmployer__approval
              : classes.tableEmployer__unapproval
          }
        >
          {t(`${text}`)}
        </div>
      ),
    },
  ];

  const data = employerList.map((employer) => ({
    key: employer.id,
    companyName: employer.companyName,
    email: employer.email,
    phoneNumber: employer.phone,
    createdAt: moment(employer?.createdAt).format(dateFormat),
    status: employer.status,
  }));

  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        scroll={{ x: "max-content" }}
        style={{ cursor: "pointer" }}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              history.push(`${url}/view/${record.key}`);
            },
          };
        }}
      />
    </div>
  );
};

export default TableEmployer;
