import { fetchAllEmployerAsync } from "features/SystemManager/slices/thunks";
import { Fragment } from "react";
import {
  selectEmployers,
  selectStatus,
  selectEmployer,
} from "features/SystemManager/slices/selectors";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useTitle } from "common/hook/useTitle";
import { useTranslation } from "react-i18next";
import LoadingSuspense from "components/Loading";
import TableEmployer from "features/SystemManager/components/TableEmployer";

const EmployerManagerPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const employerList = useSelector(selectEmployers);
  const employer = useSelector(selectEmployer);
  const loading = useSelector(selectStatus);
  useTitle(`${t("Employers Management")}`);

  useEffect(() => {
    if (employerList) {
      if (employer) {
        const test = employerList?.find((item) => item.id === employer?.id);
        if (test?.status !== employer?.status) {
          dispatch(fetchAllEmployerAsync());
        }
      }
    } else {
      dispatch(fetchAllEmployerAsync());
    }
  }, [dispatch, employer, employerList]);

  return (
    <Fragment>
      {loading ? (
        <LoadingSuspense showText={false} height="100vh" />
      ) : (
        employerList && <TableEmployer employerList={employerList} />
      )}
    </Fragment>
  );
};

export default EmployerManagerPage;
