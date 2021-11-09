import {
  selectedCompanyDetail,
  selectedReviews,
  selectedStatusReview,
} from "features/Jobs/slices/selectors";
import {
  fetchCompanyDetailAsync,
  fetchReviewOfCompanyAsync,
} from "features/Jobs/slices/thunks";
import { getDetailJobSeekerAsync } from "features/JobSeekers/slices/thunks";
import { Progress, Rate } from "antd";
import { ScrollTop } from "common/functions";
import { selectedJobSeekerProfile } from "features/JobSeekers/slices/selectors";
import { useEffect, useCallback, Fragment } from "react";
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
  const loadingReview = useSelector(selectedStatusReview);
  const currentUser = useSelector(selectedJobSeekerProfile);
  const isReviewed = reviewsOfCampany?.some(
    (item) => item.user?._id === currentUser?._id
  );
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

  useEffect(() => {
    if (localStorage.getItem("token")) {
      if (!currentUser) {
        dispatch(getDetailJobSeekerAsync());
      }
    }
  }, [dispatch, currentUser]);

  return (
    <section className={classes.companyDetail}>
      {loadingReview ? (
        <LoadingSuspense height="40vh" />
      ) : (
        companyDetail && (
          <div className={classes.companyDetail__wrapped}>
            {/* Company Header */}
            <CompanyIntroduction
              company={companyDetail}
              isReviewed={isReviewed}
            />

            {/* Company Description */}
            <div className={classes["companyDetail__wrapped--title"]}>
              {t("About us")}
            </div>
            {companyDetail.description && (
              <div className={classes["companyDetail__wrapped--description"]}>
                {parse(companyDetail.description)}
              </div>
            )}

            {/* Company Job Active */}
            <div className={classes["companyDetail__wrapped--title"]}>
              {t("Job active")}
            </div>
            {companyDetail.jobs &&
              (companyDetail.jobs.length === 0 ? (
                <div className={classes["companyDetail__wrapped--reviewList"]}>
                  <NotFoundData title={t("This company has no reviews")} />
                </div>
              ) : (
                <div
                  className={classes["companyDetail__wrapped--jobActiveList"]}
                >
                  {companyDetail.jobs.map((job, index) => {
                    if (index <= 6)
                      return <JobActiveItem key={job._id} jobActive={job} />;
                    else return null;
                  })}
                </div>
              ))}

            {/* Company Rating Statistic */}
            <div className={classes["companyDetail__wrapped--title"]}>
              {t("Rating Statistics")}
            </div>
            <div className={classes["companyDetail__wrapped--reviewList"]}>
              {companyDetail.ratingsQuantity <= 5 ? (
                <NotFoundData title={t("Not enough data for statistics")} />
              ) : (
                <div
                  className={
                    classes["companyDetail__wrapped--reviewList--statistic"]
                  }
                >
                  <div>
                    <span
                      className={
                        classes["companyDetail__wrapped--reviewList--rating"]
                      }
                    >
                      {companyDetail.ratingsAverage}
                    </span>
                    <Rate
                      style={{ fontSize: "30px", color: "#4288f5" }}
                      value={companyDetail.ratingsAverage}
                      allowHalf={true}
                      disabled
                    />
                  </div>
                  <div>
                    <Progress
                      type="circle"
                      format={(percent) => `${percent}%`}
                      strokeColor="#4287f5"
                      width={100}
                      percent={(companyDetail.ratingsAverage * 100) / 5}
                    />
                  </div>
                  <div
                    className={
                      classes["companyDetail__wrapped--reviewList--recommend"]
                    }
                  >
                    {companyDetail.ratingsAverage >= 3
                      ? t("Recommended to work here")
                      : t("Not recommended to work here")}
                  </div>
                </div>
              )}
            </div>

            {/* Company Review */}
            <div className={classes["companyDetail__wrapped--title"]}>
              {t("Company reviews")}
            </div>
            <div className={classes["companyDetail__wrapped--reviewList"]}>
              {reviewsOfCampany &&
                (reviewsOfCampany.length === 0 ? (
                  <NotFoundData title={t("This company has no reviews")} />
                ) : (
                  <Fragment>
                    <div
                      className={
                        classes["companyDetail__wrapped--reviewList--quantity"]
                      }
                    >
                      {companyDetail.ratingsQuantity <= 1
                        ? `${companyDetail.ratingsQuantity} ${t("review")}`
                        : `${companyDetail.ratingsQuantity} ${t("reviews")}`}
                    </div>
                    {reviewsOfCampany.map((review) => (
                      <ReviewItem
                        key={review._id}
                        review={review}
                        currentUser={currentUser}
                        companyName={companyName}
                      />
                    ))}
                  </Fragment>
                ))}
            </div>
          </div>
        )
      )}
    </section>
  );
};

export default CompanyDetailPage;
