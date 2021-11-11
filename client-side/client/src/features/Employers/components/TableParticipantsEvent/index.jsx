import {
  dateFormatPicker,
  dateFormatISO8601,
} from "common/constants/dateFormat";
import { Table } from "antd";
import { useTranslation } from "react-i18next";
import moment from "moment";

const TableParticipantsEvent = ({ participants, onSelect }) => {
  const { t } = useTranslation();

  const columns = [
    {
      title: `${t("Registrant name")}`,
      dataIndex: "fullName",
      key: "fullName",
      sorter: (a, b) => a.fullName.length - b.fullName.length,
    },
    {
      title: `${t("dob")}`,
      dataIndex: "dob",
      key: "dob",
      sorter: (a, b) => Date.parse(a.dob) - Date.parse(b.dob),
    },
    {
      title: `${t("Address")}`,
      dataIndex: "address",
      key: "address",
    },
    {
      title: `${t("Phone")}`,
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: `${t("Email")}`,
      dataIndex: "email",
      key: "email",
    },
    {
      title: `${t("Interesting field")}`,
      dataIndex: "interestingField",
      key: "interestingField",
    },

    {
      title: `${t("Registration Date")}`,
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: (a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt),
    },
    {
      title: `${t("Status")}`,
      dataIndex: "status",
      key: "status",
      render: (text) => t(text),
    },
  ];

  const data = participants.map((participantItem) => {
    const {
      id,
      fullName,
      phone,
      createdAt,
      status,
      interestingField,
      participant,
    } = participantItem;
    return {
      key: id,
      fullName: fullName,
      dob: moment(participant.DOB, dateFormatISO8601).format(dateFormatPicker),
      address: `${participant.address.street}, ${participant.address.ward}, ${participant.address.district}, ${participant.address.city}`,
      phone: phone,
      email: participant.email,
      interestingField:
        interestingField.length > 0 ? interestingField.join(", ") : "Không có",
      createdAt: moment(createdAt, dateFormatISO8601).format(dateFormatPicker),
      status: status,
    };
  });

  const rowSelect = {
    onChange: (selectedRowKeys, selectedRows) => {
      onSelect(selectedRows);
    },
  };
  return (
    <Table
      bordered
      rowSelection={{ type: "checkbox", ...rowSelect }}
      scroll={{ x: "max-content" }}
      columns={columns}
      dataSource={data}
      pagination={{
        pageSize: 10,
      }}
      showSorterTooltip={false}
      style={{ cursor: "pointer" }}
    />
  );
};

export default TableParticipantsEvent;
