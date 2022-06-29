import { BiDollarCircle } from 'react-icons/bi'
import { ButtonField, PopoverField } from 'custom-fields'
import { checkTagService } from 'common/functions'
import { dateFormatPicker } from 'common/constants/dateFormat'
import { FaBuilding } from 'react-icons/fa'
import { Fragment, useEffect, useState } from 'react'
import { IoMdCalendar, IoMdTime } from 'react-icons/io'
import { MdLocationOn, MdDeleteForever } from 'react-icons/md'
import { notification } from 'components'
import { removeFavoriteJob } from 'features/JobSeekers/api/jobSeeker.api'
import { removeJobOfFavorire } from 'features/JobSeekers/slices'
import { Steps, Switch } from 'antd'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import classes from './style.module.scss'
import moment from 'moment'
import NumberFormat from 'react-number-format'

export const JobItem = ({ data, isApplied = false, createdAt, status, isAnnounced = false }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const { Step } = Steps
  const [isShowStep, setIsShowStep] = useState(false)
  const [currentStep, setCurrentStep] = useState(null)

  const [stepArray, setStepArray] = useState([
    { title: 'Hồ sơ đang trong giai đoạn ứng tuyển', type: 'NotSaved', status: '' },
    { title: 'Hồ sơ đã được nhà tuyển dụng lưu lại', type: 'Saved', status: '' },
    { title: 'Hồ sơ đã được thông báo tham gia Entry Test', type: 'Testing', status: '' },
    { title: 'Hồ sơ đã đạt Entry Test', type: 'PassedTest', status: '' },
    { title: 'Hồ sơ không đạt Entry Test', type: 'FailedTest', status: '' },
    { title: 'Hồ sơ đã bị loại', type: 'Deleted', status: '' },
  ])

  const {
    _id,
    company,
    jobTitle,
    salary,
    location,
    aboutCreated,
    finishDate,
    slug,
    isNew,
    servicePackage,
  } = data

  const removeSaveJobHandler = async () => {
    setLoading(true)
    const result = await removeFavoriteJob(_id)
    if (result.status === 'success') {
      dispatch(removeJobOfFavorire(_id))
      notification(`${t('Successfully unsaved job posting')}`, 'success')
    } else {
      notification(`${t('Error! An error occurred. Please try again later')}`, 'error')
    }
    setLoading(false)
  }

  useEffect(() => {
    let announcedTitle = ''
    if (isAnnounced) {
      announcedTitle = '(Đã được thông báo trúng tuyển)'
    }

    switch (status) {
      case 'NotSaved': {
        setCurrentStep(0)
        break
      }
      case 'Saved': {
        const _index = stepArray.findIndex((item) => item.type === 'Saved')

        if (_index >= 0) {
          setCurrentStep(_index)
          stepArray[_index].title += ' ' + announcedTitle
        }
        break
      }
      case 'Testing': {
        const _index = stepArray.findIndex((item) => item.type === 'Testing')

        if (_index >= 0) {
          setCurrentStep(_index)
          stepArray[_index].title += ' ' + announcedTitle
        }
        break
      }
      case 'Deleted': {
        const _index = stepArray.findIndex((item) => item.type === 'Deleted')

        if (_index >= 0) {
          setCurrentStep(_index)
          stepArray[_index].status = 'finish'
          stepArray.forEach((item, index) => {
            if (index !== _index) {
              item.status = 'error'
            }
          })
        }
        break
      }
      case 'FailedTest': {
        const _index = stepArray.findIndex((item) => item.type === 'FailedTest')
        if (_index >= 0) {
          setCurrentStep(_index)
          stepArray[_index].status = 'finish'
          stepArray[_index].title += ' ' + announcedTitle
          stepArray.forEach((item, index) => {
            if (item.type === 'PassedTest') {
              item.status = 'error'
            }
          })
        }
        break
      }
      case 'PassedTest': {
        const _index = stepArray.findIndex((item) => item.type === 'PassedTest')

        if (_index >= 0) {
          setCurrentStep(_index)
          stepArray[_index].status = 'finish'
          stepArray[_index].title += ' ' + announcedTitle
          stepArray.forEach((item, index) => {
            if (item.type === 'FailedTest') {
              item.status = 'error'
            }
          })
        }
        break
      }
      default: {
        break
      }
    }
  }, [stepArray, status, isAnnounced])

  return (
    <div className={classes.jobItem}>
      <div className={classes.jobItem__container}>
        {isNew && <div className={`${classes.isNew} ${classes['jobItem--new']}`}>{t('New')}</div>}
        {company && (
          <div className={classes['jobItem__container-img']}>
            <a href={`/jobs/employer/${company.companyName}`} target="_blank" rel="noreferrer">
              <img src={company.logo} alt="" />
            </a>
          </div>
        )}
        <div className={classes['jobItem__container-content']}>
          <div className={classes['jobItem__container-content__head']}>
            <div className={classes['jobItem__container-content__head__jobTitle']}>
              <a
                className={`${
                  checkTagService('isHighlight', servicePackage)
                    ? classes['link-highlight']
                    : classes.link
                } ${classes.bold} ${classes['link-fz-18']}`}
                href={`/jobs/${slug}`}
                target="_blank"
                rel="noreferrer"
              >
                {jobTitle}
              </a>
            </div>
            <div>
              <IoMdTime className={classes['icon-gb-18']} />
              {aboutCreated
                .split(' ')
                .map((string) => t(string))
                .join(' ')}
            </div>
          </div>

          <div className={classes['jobItem__container-content__companyName']}>
            <a
              className={`${classes['link-no-border']} ${classes['link-fz-16']}`}
              href={`/jobs/employer/${company?.companyName}`}
              target="_blank"
              rel="noreferrer"
            >
              <FaBuilding className={classes['icon-gb-18']} />
              {company?.companyName}
            </a>
          </div>

          <div className={classes['jobItem__container-content__salary']}>
            <div>
              <BiDollarCircle className={classes['icon-gb-18']} />
              {t('Salary')}:{' '}
              {salary.min ? (
                <Fragment>
                  <NumberFormat
                    thousandsGroupStyle="thousand"
                    thousandSeparator={true}
                    value={salary.min}
                    suffix=""
                    displayType={'text'}
                  />{' '}
                  -{' '}
                  <NumberFormat
                    thousandsGroupStyle="thousand"
                    thousandSeparator={true}
                    value={salary.max}
                    suffix=""
                    displayType={'text'}
                  />{' '}
                  {salary.type}
                </Fragment>
              ) : (
                <>{t(salary.type)}</>
              )}
            </div>
            <div>
              <MdLocationOn className={classes['icon-gb-18']} />
              {location.city}
            </div>
          </div>

          <div className={classes['jobItem__container-content__date']}>
            {!isApplied ? (
              <div>
                <IoMdCalendar className={classes['icon-gb-18']} />
                {t('expiration date')}: {moment(finishDate).format(dateFormatPicker)}
              </div>
            ) : (
              <div>
                <IoMdCalendar className={classes['icon-gb-18']} />
                {t('Submission date')}: {moment(createdAt).format(dateFormatPicker)}
              </div>
            )}
          </div>

          <div className={classes['jobItem__container-content__action']}>
            {isApplied ? (
              <Fragment>
                <div>
                  <Switch
                    checkedChildren="Ẩn trạng thái hồ sơ"
                    unCheckedChildren="Xem trạng thái hồ sơ"
                    onChange={() => setIsShowStep(!isShowStep)}
                  />
                </div>
                {isShowStep && (
                  <div className={classes.steps}>
                    <Steps direction="vertical" current={currentStep}>
                      {stepArray.map((step, index) => (
                        <Step title={step.title} key={index} status={step.status} />
                      ))}
                    </Steps>
                  </div>
                )}
              </Fragment>
            ) : (
              <PopoverField
                title={t('Confirm deletion of saved job posting')}
                loading={loading}
                subTitle={t('Are you sure to delete this saved job posting?')}
                titleCancel={t('Cancel')}
                titleOk={t('Ok')}
                onClickOk={removeSaveJobHandler}
              >
                <ButtonField
                  backgroundcolor="#dd4b39"
                  backgroundcolorhover="#bf0000"
                  uppercase
                  padding="5px"
                >
                  <MdDeleteForever style={{ marginRight: '5px' }} />
                  <span>{t('Delete')}</span>
                </ButtonField>
              </PopoverField>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
