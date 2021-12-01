import { DK, MSTLogo } from 'assets'
import { FaFacebookF } from 'react-icons/fa'
import { footerHomeEmployerList } from 'common/constants/options'
import { Fragment } from 'react'
import { IoMdMail } from 'react-icons/io'
import { Link } from 'react-router-dom'
import { MdPhone } from 'react-icons/md'
import { useTranslation } from 'react-i18next'
import classes from './style.module.scss'

const FooterEmployers = () => {
  const { t } = useTranslation()

  return (
    <footer className={classes.footer}>
      <div className={classes['footer__bltop']}>
        <div className={classes['footer__bltop--left']}>
          <img src={MSTLogo} alt="MST LOGO" />
          <ul>
            <li>
              <a href="/">{t('introduce')}</a>
            </li>
            <li>
              <a href="/">{t('feature')}</a>
            </li>
            <li>
              <a href="/">{t('service')}</a>
            </li>
            <li>
              <a href="/">{t('quote')}</a>
            </li>
          </ul>
        </div>
        <div className={classes['footer__bltop--right']}>
          <div>{t('connect now')}</div>
          <a href="https://www.facebook.com" target="_blank" rel="nofollow noopener noreferrer">
            <FaFacebookF />
          </a>
          <img src={DK} alt="Đã đăng ký bộ công thương" />
        </div>
      </div>
      <div className={classes['footer__blbottom']}>
        <div className={classes['footer__blbottom--top']}>
          {footerHomeEmployerList.map((item) => (
            <div key={item.titleFooter}>
              <h3>{t(item.titleFooter)}</h3>
              <ul>
                {item.contentFooter.map((itemContent) => (
                  <li key={itemContent.title}>
                    {itemContent.isTagA ? (
                      <a href={itemContent.href}>
                        {itemContent.isPhone && (
                          <Fragment>
                            <MdPhone />
                            {itemContent.title
                              .split(' ')
                              .map((item) => (item === 'Phone' ? t(item) : item))
                              .join(' ')}
                          </Fragment>
                        )}
                        {itemContent.isMail && (
                          <Fragment>
                            <IoMdMail />
                            {itemContent.title}
                          </Fragment>
                        )}
                      </a>
                    ) : (
                      <Link to={itemContent.href}>{t(itemContent.title)}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className={classes['footer__blbottom--bottom']}>
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

export default FooterEmployers
