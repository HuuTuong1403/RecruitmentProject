import {
  fetchCompanyDetailAsync,
  fetchReviewOfCompanyAsync,
} from "features/Jobs/slices/thunks";
import { ScrollTop } from "common/functions";
import {
  selectedCompanyDetail,
  selectedReviews,
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
import NotFoundData from "components/NotFoundData";
import parse from "html-react-parser";
import ReviewItem from "features/Jobs/components/ReviewItem";

const CompanyDetailPage = () => {
  ScrollTop();
  const { t } = useTranslation();
  const { companyName } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const companyDetail = useSelector(selectedCompanyDetail);
  const reviewsOfCampany = useSelector(selectedReviews);
  const loading = useSelector(selectedStatus);

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

  useEffect(() => {
    if (companyDetail && companyDetail._id) {
      dispatch(fetchReviewOfCompanyAsync(companyDetail._id));
    }
  }, [dispatch, companyDetail]);

  return (
    <section className={classes.companyDetail}>
      {loading ? (
        <LoadingSuspense height="40vh" />
      ) : (
        companyDetail && (
          <div className={classes.companyDetail__wrapped}>
            <CompanyIntroduction company={companyDetail} />
            <div className={classes["companyDetail__wrapped--title"]}>
              {t("About us")}
            </div>
            {companyDetail.description && (
              <div className={classes["companyDetail__wrapped--description"]}>
                {parse(companyDetail.description)}
              </div>
            )}
            <div className={classes["companyDetail__wrapped--title"]}>
              {t("Job active")}
            </div>
            {companyDetail.jobs && (
              <div className={classes["companyDetail__wrapped--jobActiveList"]}>
                {companyDetail.jobs.map((job) => (
                  <JobActiveItem key={job._id} jobActive={job} />
                ))}
              </div>
            )}
            <div className={classes["companyDetail__wrapped--title"]}>
              {t("Company reviews")}
            </div>
            {reviewsOfCampany &&
              (reviewsOfCampany.length === 0 ? (
                <div className={classes["companyDetail__wrapped--reviewList"]}>
                  <NotFoundData title={t("This company has no reviews")} />
                </div>
              ) : (
                <div className={classes["companyDetail__wrapped--reviewList"]}>
                  <div>
                    {reviewsOfCampany.length} {t("Review")}
                  </div>
                  {reviewsOfCampany.map((review) => (
                    <ReviewItem key={review._id} review={review} />
                  ))}
                </div>
              ))}
          </div>
        )
      )}
    </section>
  );
};

export default CompanyDetailPage;
