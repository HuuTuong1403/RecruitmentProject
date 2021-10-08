import { useTitle } from "common/hook/useTitle";
import LoadingSuspense from "components/Loading";
import BannerHome from "features/Home/components/BannerHome";
import JobList from "features/Home/components/JobList";
import {
  selectJobsHome,
  selectLoadingHome,
} from "features/Home/slices/selectors";
import {
  fetchJobsAsync,
  fetchProvincesAsync,
} from "features/Home/slices/thunks";
import { Fragment, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

const HomeGuest = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  
  useTitle(
    `${t("MST - The system to connect employers and IT industry candidates")}`
  );

  useEffect(() => {
    dispatch(fetchJobsAsync());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchProvincesAsync());
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
        <JobList />
      )}
    </Fragment>
  );
};

export default HomeGuest;
