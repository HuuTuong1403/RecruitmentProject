import { FaEdit } from 'react-icons/fa'
import { Fragment } from 'react'
import { IoPersonCircle } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import { RiFileList3Line } from 'react-icons/ri'
import { selectEmployerLocal } from 'features/Employers/slices/selectors'
import { useTranslation } from 'react-i18next'
import classes from './style.module.scss'

export const BannerHomeEmp = () => {
  const { t } = useTranslation()
  const employer = selectEmployerLocal()

  return (
    <section className={classes.bannerEmp}>
      <div className={classes.overlayImage}>
        <div className={classes.bannerEmp__container}>
          <div className={classes['bannerEmp__container-top']}>
            {employer ? (
              <h1>
                {t('Welcome back')}, {employer?.companyName}
              </h1>
            ) : (
              <h1>{t('Login for employers')}</h1>
            )}
            <p>{t('Manage job postings and candidate profiles')}</p>
            {employer ? (
              <div>
                <Link to="/employers/dashboard">
                  <RiFileList3Line className={classes['bannerEmp__container-top__icon']} />
                  {t('Click here')}
                </Link>
              </div>
            ) : (
              <div>
                <Link to="/employers/sign-in">
                  <IoPersonCircle className={classes['bannerEmp__container-top__icon']} />
                  {t('signin')}
                </Link>
              </div>
            )}
          </div>
          <div className={classes['bannerEmp__container-top']}>
            {employer ? (
              <Fragment>
                <h1>{t('Or post a job posting looking for candidates')}</h1>
                <p>{t('Post job and create free Entry Test')}</p>
                <div>
                  <Link to="/employers/dashboard/post-job">
                    <FaEdit className={classes['bannerEmp__container-top__icon']} />
                    {t('Click here')}
                  </Link>
                </div>
              </Fragment>
            ) : (
              <Fragment>
                <h1>{t('Or register to become an employer')}</h1>
                <p>{t('Quick, easy and effective recruitment')}</p>
                <div>
                  <Link to="/employers/sign-up">
                    <FaEdit className={classes['bannerEmp__container-top__icon']} />
                    {t('Register now')}
                  </Link>
                </div>
              </Fragment>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
