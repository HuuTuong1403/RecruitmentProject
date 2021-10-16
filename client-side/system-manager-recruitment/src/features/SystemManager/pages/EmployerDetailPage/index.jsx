import { fetchEmployerDetailAsync } from "features/SystemManager/slices/thunks";
import { Fragment, useEffect } from "react";
import {
  selectStatus,
  selectEmployer,
} from "features/SystemManager/slices/selectors";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import EmployerDetail from "features/SystemManager/components/EmployerDetail";
import Loading from "components/Loading";

const EmployerDetailPage = (props) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const loading = useSelector(selectStatus);
  const employer = useSelector(selectEmployer);

  useEffect(() => {
    dispatch(fetchEmployerDetailAsync(id));
  }, [dispatch, id]);

  return (
    <Fragment>
      {loading ? (
        <Loading showText={false} />
      ) : (
        employer && <EmployerDetail employer={employer} />
      )}
    </Fragment>
  );
};

export default EmployerDetailPage;
