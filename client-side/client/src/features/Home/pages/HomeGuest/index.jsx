import LoadingSuspense from "components/Loading";
import BannerHome from "features/Home/components/BannerHome";
import JobList from "features/Home/components/JobList";
import {
  selectJobsHome,
  selectLoadingHome,
} from "features/Home/slices/selectors";
import { fetchJobsAsync } from "features/Home/slices/thunks";
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const HomeGuest = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchJobsAsync());
  }, [dispatch]);

  const jobs = useSelector(selectJobsHome);
  const loading = useSelector(selectLoadingHome);

  return (
    <Fragment>
      <BannerHome />
      {loading ? (
        <LoadingSuspense height="40vh" showText={false} />
      ) : !jobs ? (
        <div>No see jobs</div>
      ) : (
        <JobList lists={jobs} />
      )}
    </Fragment>
  );
};

export default HomeGuest;
