import { DK, MSTLogo } from 'assets'
import { FaFacebookF } from 'react-icons/fa'
import { footerHomeEmployerList } from 'common/constants/options'
import { Fragment } from 'react'
import { IoMdMail } from 'react-icons/io'
import { Link } from 'react-router-dom'
import { MdPhone } from 'react-icons/md'
import { useTranslation } from 'react-i18next'
import classes from './style.module.scss'

export const FooterEmployers = () => {
  const { t } = useTranslation()

  return (
    <footer className={classes.footer}>
      <div className={classes['footer__head']}>
        <div className={classes['footer__head-left']}>
          <img src={MSTLogo} alt="MST LOGO" />
          <ul>
            <li>
              <a href="/" className={`${classes['link']} ${classes['link-fz-16']}`}>
                {t('introduce')}
              </a>
            </li>
            <li>
              <a href="/" className={`${classes['link']} ${classes['link-fz-16']}`}>
                {t('feature')}
              </a>
            </li>
            <li>
              <Link
                to="/employers/service"
                className={`${classes['link']} ${classes['link-fz-16']}`}
              >
                {t('service')}
              </Link>
            </li>
          </ul>
        </div>

        <div className={classes['footer__head-right']}>
          <div>{t('connect now')}</div>
          <a
            href="https://www.facebook.com/MstITCompany"
            target="_blank"
            rel="nofollow noopener noreferrer"
          >
            <FaFacebookF />
          </a>
          <img src={DK} alt="Đã đăng ký bộ công thương" />
        </div>
      </div>

      <div className={classes['footer__bottom']}>
        <div className={classes['footer__bottom-top']}>
          {footerHomeEmployerList.map((item) => (
            <div key={item.titleFooter}>
              <h3>{t(item.titleFooter)}</h3>
              <ul>
                {item.contentFooter.map((itemContent) => (
                  <li key={itemContent.title}>
                    {itemContent.isTagA ? (
                      <a
                        href={itemContent.href}
                        className={`${classes['link']} ${classes['link-fz-16']}`}
                      >
                        {itemContent.isPhone && (
                          <Fragment>
                            <MdPhone className={classes['icon-gb-18']} />
                            {itemContent.title
                              .split(' ')
                              .map((item) => (item === 'Phone' ? t(item) : item))
                              .join(' ')}
                          </Fragment>
                        )}
                        {itemContent.isMail && (
                          <Fragment>
                            <IoMdMail className={classes['icon-gb-18']} />
                            {itemContent.title}
                          </Fragment>
                        )}
                      </a>
                    ) : (
                      <Link
                        className={`${classes['link']} ${classes['link-fz-16']}`}
                        to={itemContent.href}
                      >
                        {t(itemContent.title)}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className={classes['footer__bottom-bottom']}>
          <p>
            <strong>{t('Service Joint Stock Company')}</strong>
          </p>
          <p>
            <strong>{t('Head Office')}: </strong>
            {t('addressCompany')}
          </p>
          <p>Copyright © MST Company Vietnam.</p>
        </div>
      </div>
    </footer>
  )
}
