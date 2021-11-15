import {
  selectAllJobs,
  selectStatus,
} from "features/SystemManager/slices/selectors";
import { fetchAllJobAsync } from "features/SystemManager/slices/thunks";
import { ScrollTop } from "common/functions";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTitle } from "common/hook/useTitle";
import { useTranslation } from "react-i18next";
import LoadingSuspense from "components/Loading";

const RecruitmentManagerPage = () => {
  ScrollTop();
  const { t } = useTranslation();
  useTitle(`${t("recruitment manager")}`);
  const dispatch = useDispatch();
  const status = useSelector(selectStatus);
  const jobs = useSelector(selectAllJobs);

  useEffect(() => {
    dispatch(fetchAllJobAsync());
  }, [dispatch]);

  return status ? (
    <LoadingSuspense height="80vh" />
  ) : (
    <div>
      <h3>{JSON.stringify(jobs)}</h3>
    </div>
  );
};

export default RecruitmentManagerPage;
