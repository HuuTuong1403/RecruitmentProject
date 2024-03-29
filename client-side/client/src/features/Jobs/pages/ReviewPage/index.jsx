import {
  selectedCompanyDetail,
  selectedStatus,
  selectedStatusReview,
  selectedReviewDetail,
} from 'features/Jobs/slices/selectors'
import { Avatar } from 'antd'
import { fetchCompanyDetailAsync, fetchReviewDetailAsync } from 'features/Jobs/slices/thunks'
import { Link } from 'react-router-dom'
import { ScrollToTop } from 'common/functions'
import { selectJobSeekerLocal } from 'features/JobSeekers/slices/selectors'
import { useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useTitle } from 'common/hook/useTitle'
import { useTranslation } from 'react-i18next'
import { FormCreateReview, FormEditReview } from 'features/Jobs/components'
import { LoadingSuspense, notification } from 'components'
import classes from './style.module.scss'

const ReviewPage = () => {
  ScrollToTop()
  const { t } = useTranslation()
  let query = new URLSearchParams(useLocation().search)
  const { companyName } = useParams()
  const dispatch = useDispatch()
  const user = selectJobSeekerLocal()
  const history = useHistory()
  const companyDetail = useSelector(selectedCompanyDetail)
  const status = useSelector(selectedStatus)
  const isUpdate = query.get('type') === 'update'
  const id = query.get('id')
  const review = useSelector(selectedReviewDetail)
  const statusReview = useSelector(selectedStatusReview)

  useTitle(`${t('Add your review for')} ${companyName}`)

  useEffect(() => {
    if (!user) {
      notification(
        `${t('Please login to the job seeker account to perform this function')}`,
        'error'
      )
      history.push('/home/sign-in')
    }
  })

  useEffect(() => {
    async function getDetail() {
      const result = await dispatch(fetchCompanyDetailAsync(companyName))
      if (result.error) {
        history.replace('/home')
      }
    }
    getDetail()
  }, [dispatch, companyName, history])

  useEffect(() => {
    if (id) {
      dispatch(fetchReviewDetailAsync(id))
    }
  }, [dispatch, id])

  return (
    <div className={classes.review}>
      {status ? (
        <LoadingSuspense height="100vh" />
      ) : (
        <div className={classes.review__wrapped}>
          {companyDetail && (
            <div className={classes.review__left}>
              <h2 className={classes.review__left__head}>
                <div className={classes['review__left__head-text']}>
                  <div>{t('Review')}</div>
                  <div>{companyName}</div>
                  <div className={classes['review__left__head-title']}>
                    {t(
                      'Your review will be of great help to the developer community looking for work.'
                    )}
                  </div>
                </div>
                <div className={classes['review__left__head-logo']}>
                  <Avatar size={150} shape="square" src={companyDetail.logo} />
                </div>
              </h2>
              {isUpdate ? (
                statusReview ? (
                  <LoadingSuspense height="40vh" />
                ) : (
                  review && <FormEditReview review={review} id={id} />
                )
              ) : (
                <FormCreateReview companyName={companyName} companyDetail={companyDetail} />
              )}
            </div>
          )}
          <div className={classes.review__right}>
            <h2 className={classes.review__right__title}>
              {t('Guidelines & Conditions of Evaluation')}
            </h2>
            <div>
              {t(
                'All reviews must comply with the Review Guidelines & Conditions to be displayed on the website.'
              )}
            </div>
            <div className={classes.review__right__list}>
              <div>{t('Please')}:</div>
              <ul>
                <li>{t('Do not use offensive or derogatory words')}</li>
                <li>{t('Do not provide personal information')}</li>
                <li>
                  {t('Do not provide confidential information, business secrets of the company')}
                </li>
              </ul>
            </div>
            <div>
              {t(
                'Thank you for giving the most honest reviews. See more detailed information on the Guidelines & Conditions of assessment'
              )}
            </div>
            <div className={classes['review__right__link']}>
              <Link className={`${classes.link} ${classes.bold}`} to="/">
                {t('Here')}
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ReviewPage
