import classes from "./style.module.scss";
import JobItem from "../JobItem";

const DUMMY_JOB = [
  {
    id: 1,
    name: "Customer Service Manager asdkasdkamskdm",
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
];

const JobList = () => {
  return (
    <div className={classes.joblist}>
      <div className={classes.joblist__container}>
        {DUMMY_JOB.map((job) => {
          return (
            <JobItem
              key={job.id}
              nameJob={job.name}
              nameCompany={job.company}
            />
          );
        })}
      </div>
    </div>
  );
};

export default JobList;
