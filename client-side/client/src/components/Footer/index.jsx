import { DK, MSTLogo } from 'assets'
import { FaFacebookF } from 'react-icons/fa'
import { footerHomeList } from 'common/constants/options'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import classes from './styles.module.scss'

const Footer = () => {
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
              <a href="/">{t('contact')}</a>
            </li>
            <li>
              <a href="/">{t('terms of service')}</a>
            </li>
            <li>
              <a href="/">{t('privacy policy')}</a>
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
          {footerHomeList.map((item) => (
            <div key={item.titleFooter}>
              <h3>{t(item.titleFooter)}</h3>
              <ul>
                {item.contentFooter.map((itemContent) => (
                  <li key={itemContent.title}>
                    <Link to={itemContent.href}>{t(itemContent.title)}</Link>
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
            <strong>{t('Operating license')}: </strong>
            {t('no.')} 1403/SLĐTBXH-GP
          </p>
          <p>
            <strong>{t('Head Office')}: </strong>
            {t('addressCompany')}
          </p>
          <p>
            <strong>{t('Phone')}:</strong> (84) 396084832 | (84) 949488160
          </p>
          <p>
            <strong>Email:</strong> mst.recruitment10@gmail.com
          </p>
          <p>Copyright © MST Company Vietnam.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
