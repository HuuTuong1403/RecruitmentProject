import {
  fetchAllFavoriteJobAsync,
  fetchAllJobApplicationAsync,
} from 'features/JobSeekers/slices/thunks'
import { addFavoriteJob, removeFavoriteJob } from 'features/JobSeekers/api/jobSeeker.api'
import { addJobToFavorite, removeJobOfFavorire } from 'features/JobSeekers/slices'
import { AiOutlineHeart, AiFillHeart, AiOutlineGlobal } from 'react-icons/ai'
import { ButtonField } from 'custom-fields'
import { dateFormatPicker } from 'common/constants/dateFormat'
import { FaBuilding } from 'react-icons/fa'
import { FacebookShareButton, FacebookMessengerShareButton } from 'react-share'
import { FaFacebook, FaFacebookMessenger } from 'react-icons/fa'
import { fetchJobDetailAsync } from 'features/Jobs/slices/thunks'
import { Fragment, useEffect, useState } from 'react'
import { IoMdCalendar } from 'react-icons/io'
import { Link, useParams, useHistory, useLocation } from 'react-router-dom'
import { MdLocationOn } from 'react-icons/md'
import { ScrollToTop } from 'common/functions'
import { selectedJobDetail, selectedStatus } from 'features/Jobs/slices/selectors'
import { selectEmployerLocal } from 'features/Employers/slices/selectors'
import { selectFavoriteJobs, selectApplicationJobs } from 'features/JobSeekers/slices/selectors'
import { selectJobSeekerLocal } from 'features/JobSeekers/slices/selectors'
import { Tooltip } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { useTitle } from 'common/hook/useTitle'
import { useTranslation } from 'react-i18next'
import { LoadingSuspense, notification, ModalSignIn } from 'components'
import { ModalApplyJob } from 'features/Jobs/components'
import classes from './style.module.scss'
import moment from 'moment'
import parse from 'html-react-parser'

const JobDetailPage = () => {
  ScrollToTop()
  const { t } = useTranslation()
  const { slug } = useParams()
  const history = useHistory()
  const locationUrl = useLocation()
  const dispatch = useDispatch()
  const [showModal, setShowModal] = useState(false)
  const token = localStorage.getItem('token')
  const user = selectJobSeekerLocal()
  const employer = selectEmployerLocal()
  const favoriteJobs = useSelector(selectFavoriteJobs)
  const applicationJobs = useSelector(selectApplicationJobs)
  const jobDetail = useSelector(selectedJobDetail)
  const loading = useSelector(selectedStatus)

  useEffect(() => {
    async function getDetail() {
      const result = await dispatch(fetchJobDetailAsync(slug))
      if (result.error) {
        history.replace('/jobs/search?type=all')
      }
    }
    getDetail()
  }, [dispatch, slug, history])

  useEffect(() => {
    if (!employer) {
      if (token) {
        dispatch(fetchAllFavoriteJobAsync())
        dispatch(fetchAllJobApplicationAsync())
      }
    }
  }, [dispatch, token, employer])

  const {
    _id,
    workingTime,
    company,
    location,
    benefits,
    description,
    jobTitle,
    position,
    reason,
    requirements,
    responsibilities,
    salary,
    skills,
    level,
    finishDate,
    isExpired,
  } = jobDetail

  useTitle(jobTitle ?? '')

  const onCloseModal = () => {
    setShowModal(false)
  }

  const haveAppliedHandler = () => {
    notification(`${t('You have applied for this job')}`, 'error')
  }

  const removeSaveJobHandler = async () => {
    const result = await removeFavoriteJob(_id)
    if (result.status === 'success') {
      dispatch(removeJobOfFavorire(_id))
      notification(`${t('Successfully unsaved job posting')}`, 'success')
    } else {
      notification(`${t('Error! An error occurred. Please try again later')}`, 'error')
    }
  }

  const saveJobHandler = async () => {
    if (user) {
      const result = await addFavoriteJob(_id)
      if (result.status === 'success') {
        dispatch(addJobToFavorite(jobDetail))
        notification(`${t('Save job posting successfully')}`, 'success')
      } else {
        notification(`${t('Error! An error occurred. Please try again later')}`, 'error')
      }
    } else {
      if (employer) {
        notification(`${t('Please log out of the employer account')}`, 'error')
      } else {
        setShowModal(true)
      }
    }
  }

  const applyJobHandler = () => {
    if (employer) {
      notification(`${t('Please log out of the employer account')}`, 'error')
    } else {
      setShowModal(true)
    }
  }

  return (
    <Fragment>
      {loading ? (
        <LoadingSuspense height="40vh" />
      ) : (
        <div className={classes.jobDetail}>
          {user ? (
            <ModalApplyJob
              showModal={showModal}
              onCloseModal={onCloseModal}
              idJob={_id}
              jobTitle={jobTitle}
              companyName={company?.companyName}
            />
          ) : (
            <ModalSignIn showModal={showModal} onCloseModal={onCloseModal} />
          )}
          <div className={classes.jobDetail__top}>
            <div className={classes['jobDetail__top-wrapped']}>
              {company?.logo && (
                <div className={classes['jobDetail__top-logo']}>
                  <Link to={`/jobs/employer/${company?.companyName}`}>
                    <img src={company?.logo} alt={company?.companyName} />
                    {isExpired && (
                      <div className={classes['jobDetail__top-logo__overlay']}>
                        <div className={classes['jobDetail__top-logo--expired']}>
                          {t('Expired')}
                        </div>
                      </div>
                    )}
                  </Link>
                </div>
              )}
              <div className={classes['jobDetail__top-infor']}>
                <div className={classes['jobDetail__top-infor__content']}>
                  {jobTitle && (
                    <div className={classes['jobDetail__top-infor__content-jobTitle']}>
                      {jobTitle}
                    </div>
                  )}
                  {company?.companyName && (
                    <div className={classes['jobDetail__top-infor__content-companyName']}>
                      <Link
                        className={classes['link-no-border']}
                        to={`/jobs/employer/${company?.companyName}`}
                      >
                        <FaBuilding style={{ marginRight: '8px' }} />
                        {company?.companyName}
                      </Link>
                    </div>
                  )}
                  {company?.companyWebsite && (
                    <a
                      href={company?.companyWebsite}
                      target="_blank"
                      rel="noreferrer"
                      className={classes['link-no-border']}
                    >
                      <AiOutlineGlobal style={{ marginRight: '8px' }} />
                      {company?.companyWebsite}
                    </a>
                  )}
                  {finishDate && (
                    <div className={classes['jobDetail__top-infor__content-field']}>
                      <IoMdCalendar style={{ marginRight: '8px', fontSize: '18px' }} />
                      {`${t('Deadline to apply')}: ${moment(finishDate).format(dateFormatPicker)}`}
                    </div>
                  )}
                </div>
                <div className={classes['jobDetail__top-infor__actions']}>
                  {favoriteJobs?.some((item) => item._id === _id) ? (
                    <ButtonField
                      backgroundcolor="rgba(0,0,0,.08)"
                      backgroundcolorhover="#324554a2"
                      color="red"
                      uppercase
                      onClick={removeSaveJobHandler}
                    >
                      <AiFillHeart style={{ marginRight: '8px' }} />
                      {t('Job posting saved')}
                    </ButtonField>
                  ) : (
                    <ButtonField
                      backgroundcolor="rgba(0,0,0,.08)"
                      backgroundcolorhover="#324554a2"
                      color="#999"
                      uppercase
                      onClick={saveJobHandler}
                    >
                      <AiOutlineHeart style={{ marginRight: '8px' }} />
                      {t('Save Job')}
                    </ButtonField>
                  )}

                  {applicationJobs?.some((item) => item?.job?._id === _id) ? (
                    <ButtonField
                      backgroundcolor="#0a426e"
                      backgroundcolorhover="#324554"
                      uppercase
                      onClick={haveAppliedHandler}
                    >
                      {t('Have applied')}
                    </ButtonField>
                  ) : (
                    <ButtonField
                      backgroundcolor="#0a426e"
                      backgroundcolorhover="#324554"
                      uppercase
                      onClick={applyJobHandler}
                    >
                      {t('Apply now')}
                    </ButtonField>
                  )}
                  <div className={classes['jobDetail__top-infor__actions-share']}>
                    <div>{t('Share')}:</div>

                    <FacebookShareButton
                      url={`https://mst-recruit.web.app/${locationUrl.pathname}`}
                      quote={`Tin tuyển dụng ${jobTitle} của ${company?.companyName}`}
                      hashtag="#RecruitmentInMST"
                    >
                      <FaFacebook className={classes['jobDetail__top-infor__actions-icon']} />
                    </FacebookShareButton>

                    <FacebookMessengerShareButton
                      appId="938805363717233"
                      url={`https://mst-recruit.web.app/${locationUrl.pathname}`}
                    >
                      <FaFacebookMessenger
                        className={classes['jobDetail__top-infor__actions-icon']}
                      />
                    </FacebookMessengerShareButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={classes.jobDetail__content}>
            <div className={classes['jobDetail__content-wrapped']}>
              <div className={classes['jobDetail__content-wrapped__body']}>
                {reason && (
                  <Fragment>
                    <div className={classes['jobDetail__content-wrapped__title']}>
                      {t('Reasons To Join Us')}
                    </div>
                    <div className={classes['jobDetail__content-wrapped__content']}>
                      {parse(parse(reason))}
                    </div>
                  </Fragment>
                )}
                {description && (
                  <Fragment>
                    <div className={classes['jobDetail__content-wrapped__title']}>
                      {t('Job description')}
                    </div>
                    <div className={classes['jobDetail__content-wrapped__content']}>
                      {parse(parse(description))}
                    </div>
                  </Fragment>
                )}
                {requirements && (
                  <Fragment>
                    <div className={classes['jobDetail__content-wrapped__title']}>
                      {t('Job requirements')}
                    </div>
                    <div className={classes['jobDetail__content-wrapped__content']}>
                      {parse(parse(requirements))}
                    </div>
                  </Fragment>
                )}
                {benefits && (
                  <Fragment>
                    <div className={classes['jobDetail__content-wrapped__title']}>
                      {t('Benefits')}
                    </div>
                    <div className={classes['jobDetail__content-wrapped__content']}>
                      {parse(parse(benefits))}
                    </div>
                  </Fragment>
                )}
                {responsibilities && (
                  <Fragment>
                    <div className={classes['jobDetail__content-wrapped__title']}>
                      {t('Responsibilities')}
                    </div>
                    <div className={classes['jobDetail__content-wrapped__content']}>
                      {parse(parse(responsibilities))}
                    </div>
                  </Fragment>
                )}
                {skills && skills.length > 0 && (
                  <Fragment>
                    <div className={classes['jobDetail__content-wrapped__title']}>{t('Skill')}</div>
                    <div className={classes.jobDetail__card}>
                      {skills?.map((skill, index) => (
                        <div className={classes['jobDetail__card-skill']} key={index}>
                          <Tooltip title={`${t('View jobs with skill')} ${skill}`}>
                            <Link
                              className={classes['link-no-border']}
                              to={`/jobs/search?skills=${skill}`}
                            >
                              {skill}
                            </Link>
                          </Tooltip>
                        </div>
                      ))}
                    </div>
                  </Fragment>
                )}
              </div>

              <div className={classes['jobDetail__content-address']}>
                {location && (
                  <div className={classes['jobDetail__content-address__map']}>
                    <div className={classes['jobDetail__content-address__title']}>
                      {t('Workplace address')}
                    </div>
                    <div className={classes['jobDetail__content-address__location']}>
                      <MdLocationOn style={{ margin: '-4px 2px 0 0', fontSize: '16px' }} />
                      {`${location.street}, ${location.ward}, ${location.district}, ${location.city}`}
                    </div>
                    <iframe
                      src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBG4gMA71lLD3zLV38JXsvM3SQ-TT39FpM&q=${location.street},${location.ward},${location.district},${location.city}&zoom=15&language=vi`}
                      className={classes['jobDetail__content-address__iframe']}
                      title="Map"
                    ></iframe>
                  </div>
                )}
                <div className={classes['jobDetail__content-table']}>
                  <div className={classes['jobDetail__content-table__top']}>
                    {t('Recruitment information')}
                  </div>
                  <div className={classes['jobDetail__content-table__bottom']}>
                    {workingTime && (
                      <div>
                        {t('Working time')}:{' '}
                        <span>{`${t(workingTime.start)} - ${t(workingTime.finish)}`}</span>
                      </div>
                    )}
                    {position && (
                      <div>
                        {t('vacancies')}: <span>{t(position)}</span>
                      </div>
                    )}
                    {level && (
                      <div>
                        {t('Job level')}: <span>{level}</span>
                      </div>
                    )}
                    {salary && (
                      <div>
                        {t('Salary')}:{' '}
                        <span>
                          {salary.min
                            ? `${salary.min} - ${salary.max} ${salary.type}`
                            : t(salary.type)}
                        </span>
                      </div>
                    )}
                    {company && (
                      <div>
                        OT:{' '}
                        <span>{company.ot ? `${t('Extra salary for OT')}` : `${t('Non-OT')}`}</span>
                      </div>
                    )}
                    {location && (
                      <div>
                        {t('Work location')}: <span>{location.city}</span>
                      </div>
                    )}
                    <div>
                      {applicationJobs?.some((item) => item?.job?._id === _id) ? (
                        <ButtonField
                          backgroundcolor="#0a426e"
                          backgroundcolorhover="#324554"
                          uppercase
                          onClick={haveAppliedHandler}
                        >
                          {t('Have applied')}
                        </ButtonField>
                      ) : (
                        <ButtonField
                          backgroundcolor="#0a426e"
                          backgroundcolorhover="#324554"
                          uppercase
                          onClick={applyJobHandler}
                        >
                          {t('Apply now')}
                        </ButtonField>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  )
}

export default JobDetailPage
