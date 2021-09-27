import BannerHome from "features/Home/components/BannerHome";
import JobList from "features/Home/components/JobList";
import { Fragment } from "react";

const HomeGuest = () => {
  return (
    <Fragment>
      <BannerHome />
      <JobList />
    </Fragment>
  );
};

export default HomeGuest;
