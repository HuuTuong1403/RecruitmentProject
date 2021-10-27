import { fetchCompanyDetailAsync } from "features/Jobs/slices/thunks";
import { ScrollTop } from "common/functions";
import {
  selectedCompanyDetail,
  selectedStatus,
} from "features/Jobs/slices/selectors";
import { useEffect, useCallback } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useTitle } from "common/hook/useTitle";
import { useTranslation } from "react-i18next";
import classes from "./style.module.scss";
import CompanyIntroduction from "features/Jobs/components/CompanyIntroduction";
import JobActiveItem from "features/Jobs/components/JobActiveItem";
import LoadingSuspense from "components/Loading";
import parse from "html-react-parser";

const CompanyDetailPage = () => {
  ScrollTop();
  const { t } = useTranslation();
  const { companyName } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  useTitle(companyName);

  const getDetail = useCallback(async () => {
    const result = await dispatch(fetchCompanyDetailAsync(companyName));
    if (result.error) {
      history.replace("/home");
    }
  }, [dispatch, companyName, history]);

  useEffect(() => {
    getDetail();
  }, [getDetail]);

  const companyDetail = useSelector(selectedCompanyDetail);
  const loading = useSelector(selectedStatus);
  const { description, jobs } = companyDetail;

  return (
    <section className={classes.companyDetail}>
      {loading ? (
        <LoadingSuspense height="40vh" showText={false} />
      ) : (
        companyDetail && (
          <div className={classes.companyDetail__wrapped}>
            <CompanyIntroduction company={companyDetail} />
            <div className={classes["companyDetail__wrapped--title"]}>
              {t("About us")}
            </div>
            {description && (
              <div className={classes["companyDetail__wrapped--description"]}>
                {parse(description)}
              </div>
            )}
            <div className={classes["companyDetail__wrapped--title"]}>
              {t("Job active")}
            </div>
            {jobs && (
              <div className={classes["companyDetail__wrapped--jobActiveList"]}>
                {jobs.map((job) => (
                  <JobActiveItem key={job._id} jobActive={job} />
                ))}
              </div>
            )}
          </div>
        )
      )}
    </section>
  );
};

export default CompanyDetailPage;
