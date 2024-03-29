import {
  selectedCompanyDetail,
  selectedReviews,
  selectedStatusReview,
} from 'features/Jobs/slices/selectors'
import { fetchCompanyDetailAsync, fetchReviewOfCompanyAsync } from 'features/Jobs/slices/thunks'
import { getDetailJobSeekerAsync } from 'features/JobSeekers/slices/thunks'
import { Progress, Rate } from 'antd'
import { selectedJobSeekerProfile } from 'features/JobSeekers/slices/selectors'
import { selectEmployerLocal } from 'features/Employers/slices/selectors'
import { useEffect, Fragment } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { useTitle } from 'common/hook/useTitle'
import { useTranslation } from 'react-i18next'
import { CompanyIntroduction, JobActiveItem } from 'features/Jobs/components'
import { LoadingSuspense, ModalSignIn, NotFoundData, PaginationCus } from 'components'
import classes from './style.module.scss'
import parse from 'html-react-parser'

const CompanyDetailPage = () => {
  const { t } = useTranslation()
  const { companyName } = useParams()
  const dispatch = useDispatch()
  const history = useHistory()
  const companyDetail = useSelector(selectedCompanyDetail)
  const reviewsOfCampany = useSelector(selectedReviews)
  const loadingReview = useSelector(selectedStatusReview)
  const currentUser = useSelector(selectedJobSeekerProfile)
  const [showModal, setShowModal] = useState(false)
  const token = localStorage.getItem('token')
  const employer = selectEmployerLocal()
  const jobCurrentActive = companyDetail?.jobs?.filter((item) => !item.isExpired)

  const isReviewed = reviewsOfCampany?.some((item) => item.user?._id === currentUser?._id)

  useTitle(companyName)

  useEffect(() => {
    async function getDetail() {
      const result = await dispatch(fetchCompanyDetailAsync(companyName))
      if (result.error) {
        history.replace('/')
      }
    }
    getDetail()
  }, [dispatch, companyName, history])

  useEffect(() => {
    if (companyDetail && companyDetail._id) {
      dispatch(fetchReviewOfCompanyAsync(companyDetail._id))
    }
  }, [dispatch, companyDetail])

  useEffect(() => {
    if (!employer) {
      if (token) {
        if (!currentUser) {
          dispatch(getDetailJobSeekerAsync())
        }
      }
    }
  }, [dispatch, currentUser, token, employer])

  const onCloseModal = () => {
    setShowModal(false)
  }

  return (
    <section className={classes.companyDetail}>
      {loadingReview ? (
        <LoadingSuspense height="40vh" />
      ) : (
        companyDetail && (
          <div className={classes.companyDetail__wrapped}>
            <ModalSignIn showModal={showModal} onCloseModal={onCloseModal} />

            {/* Company Header */}
            <CompanyIntroduction
              company={companyDetail}
              isReviewed={isReviewed}
              setShowModal={setShowModal}
              employer={employer}
            />

            {/* Company Description */}
            <div className={classes.companyDetail__title}>{t('About us')}</div>
            <div className={classes.companyDetail__content}>
              {companyDetail.description && (
                <div className={classes['companyDetail__content-description']}>
                  {parse(companyDetail.description)}
                </div>
              )}
              {companyDetail.address && (
                <div className={classes['companyDetail__content-map']}>
                  <div className={classes['companyDetail__content-map__title']}>
                    {t('Address company')}
                  </div>
                  <div className={classes['companyDetail__content-map__location']}>
                    {`${t('Address')}: ${companyDetail.address.street}, ${
                      companyDetail.address.ward
                    }, ${companyDetail.address.district}, ${companyDetail.address.city}`}
                  </div>
                  <iframe
                    src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBG4gMA71lLD3zLV38JXsvM3SQ-TT39FpM&q=${companyDetail.address.street},${companyDetail.address.ward},${companyDetail.address.district},${companyDetail.address.city}&zoom=15&language=vi`}
                    className={classes['companyDetail__content-map__iframe']}
                    title="Map"
                  ></iframe>
                </div>
              )}
            </div>

            {/* Company Job Active */}
            <div className={classes.companyDetail__title}>{t('Job active')}</div>
            {companyDetail.jobs &&
              (jobCurrentActive.length === 0 ? (
                <div className={classes.companyDetail__reviewList}>
                  <NotFoundData title={t('This company has no jobs currently hiring')} />
                </div>
              ) : (
                <div className={classes.companyDetail__jobActiveList}>
                  {jobCurrentActive.map(
                    (job, index) => index < 6 && <JobActiveItem key={job._id} jobActive={job} />
                  )}
                </div>
              ))}

            {/* Company Rating Statistic */}
            <div className={classes.companyDetail__title}>{t('Rating Statistics')}</div>
            <div className={classes.companyDetail__reviewList}>
              {companyDetail.ratingsQuantity < 5 ? (
                <NotFoundData title={t('Not enough data for statistics')} />
              ) : (
                <div className={classes.companyDetail__reviewList__statistic}>
                  <div>
                    <span className={classes.companyDetail__reviewList__rating}>
                      {companyDetail.ratingsAverage}
                    </span>
                    <Rate
                      style={{ fontSize: '30px', color: '#4288f5' }}
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
                    className={`${classes.companyDetail__reviewList__recommend} ${
                      companyDetail.ratingsAverage >= 3
                        ? classes['companyDetail__reviewList__recommend--work']
                        : classes['companyDetail__reviewList__recommend--no-work']
                    }`}
                  >
                    {companyDetail.ratingsAverage >= 3
                      ? t('Recommended to work here')
                      : t('Not recommended to work here')}
                  </div>
                </div>
              )}
            </div>

            {/* Company Review */}
            <div className={classes.companyDetail__title}>{t('Company reviews')}</div>
            <div className={classes.companyDetail__reviewList}>
              {reviewsOfCampany &&
                (reviewsOfCampany.length === 0 ? (
                  <NotFoundData title={t('This company has no reviews')} />
                ) : (
                  <Fragment>
                    <div className={classes.companyDetail__reviewList__quantity}>
                      {companyDetail.ratingsQuantity <= 1
                        ? `${companyDetail.ratingsQuantity} ${t('review')}`
                        : `${companyDetail.ratingsQuantity} ${t('reviews')}`}
                    </div>
                    <PaginationCus
                      array={reviewsOfCampany}
                      currentUser={currentUser}
                      companyName={companyName}
                      numEachPage={10}
                      isReview
                    />
                  </Fragment>
                ))}
            </div>
          </div>
        )
      )}
    </section>
  )
}

export default CompanyDetailPage
