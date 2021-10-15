import {
  selectEmployers,
  selectStatus,
} from "features/SystemManager/slices/selectors";
import { fetchAllEmployerAsync } from "features/SystemManager/slices/thunks";
import { Fragment } from "react";
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
  const loading = useSelector(selectStatus);
  useTitle(`${t("Employers Management")}`);
  useEffect(() => {
    if (!employerList) {
      dispatch(fetchAllEmployerAsync());
    }
  }, [dispatch, employerList]);

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
