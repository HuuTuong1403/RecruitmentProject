import BannerHome from "features/Home/components/BannerHome";
import JobList from "features/Home/components/JobList";
import { Fragment } from "react";

const DUMMY_JOB = [
  {
    id: 1,
    name: "Customer Service Manager asdkasdkamskdmajsdkasnkdnaskdnakjsndkjn",
    company: "Công ty cổ phần dịch vụ MST",
  },
  {
    id: 2,
    name: "Customer Service Manager",
    company: "Công ty cổ phần dịch vụ MST",
  },
  {
    id: 3,
    name: "Customer Service Manager",
    company: "Công ty cổ phần dịch vụ MST",
  },
  {
    id: 4,
    name: "Customer Service Manager",
    company: "Công ty cổ phần dịch vụ MST",
  },
  {
    id: 5,
    name: "Customer Service Manager",
    company: "Công ty cổ phần dịch vụ MST",
  },
  {
    id: 6,
    name: "Customer Service Manager",
    company: "Công ty cổ phần dịch vụ MST",
  },
  {
    id: 7,
    name: "Customer Service Manager",
    company: "Công ty cổ phần dịch vụ MST",
  },
  {
    id: 8,
    name: "Customer Service Manager",
    company: "Công ty cổ phần dịch vụ MST",
  },
  {
    id: 9,
    name: "Customer Service Manager",
    company: "Công ty cổ phần dịch vụ MST",
  },
  {
    id: 10,
    name: "Customer Service Manager asdkasdkamskdmajsdkasnkdnaskdnakjsndkjn",
    company: "Công ty cổ phần dịch vụ MST",
  },
  {
    id: 11,
    name: "Customer Service Manager",
    company: "Công ty cổ phần dịch vụ MST",
  },
  {
    id: 12,
    name: "Customer Service Manager",
    company: "Công ty cổ phần dịch vụ MST",
  },
  {
    id: 13,
    name: "Customer Service Manager",
    company: "Công ty cổ phần dịch vụ MST",
  },
  {
    id: 14,
    name: "Customer Service Manager",
    company: "Công ty cổ phần dịch vụ MST",
  },
  {
    id: 15,
    name: "Customer Service Manager",
    company: "Công ty cổ phần dịch vụ MST",
  },
  {
    id: 16,
    name: "Customer Service Manager",
    company: "Công ty cổ phần dịch vụ MST",
  },
  {
    id: 17,
    name: "Customer Service Manager",
    company: "Công ty cổ phần dịch vụ MST",
  },
  {
    id: 18,
    name: "Customer Service Manager",
    company: "Công ty cổ phần dịch vụ MST",
  },
];

const HomeGuest = () => {
  return (
    <Fragment>
      <BannerHome />
      <JobList lists={DUMMY_JOB} />
    </Fragment>
  );
};

export default HomeGuest;
