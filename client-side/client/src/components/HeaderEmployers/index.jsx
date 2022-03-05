import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { FaEdit } from 'react-icons/fa'
import { IoIosPeople } from 'react-icons/io'
import { IoMenu, IoHome } from 'react-icons/io5'
import { logoutEmployer } from 'features/HomeEmployers/slices'
import { MdSettings, MdAccountCircle, MdEvent } from 'react-icons/md'
import { MSTLogo } from 'assets'
import { RiFileList3Line } from 'react-icons/ri'
import { RiLogoutCircleRLine } from 'react-icons/ri'
import { selectEmployerLocal } from 'features/Employers/slices/selectors'
import { useDispatch } from 'react-redux'
import { useHistory, NavLink, Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useWindowSize } from 'common/hook/useWindowSize'
import classes from './style.module.scss'
import notification from 'components/Notification'
import ReactCountryFlag from 'react-country-flag'

const HeaderEmployers = () => {
  const history = useHistory()
  const location = useLocation()
  const dispatch = useDispatch()
  const { t, i18n } = useTranslation()
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'en-ES')
  const employer = selectEmployerLocal()
  const [toggle, setToggle] = useState(false)
  const [width] = useWindowSize()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [dropdownHover, setDropDownHover] = useState(false)
  const toggleDropdown = () => setDropdownOpen((prevState) => !prevState)

  const clickLogoHandler = () => {
    history.push('/employers')
  }

  const hoverProfileHandler = () => setDropDownHover((prevState) => !prevState)

  const toggleMenuHandler = () => {
    setToggle((prevState) => (prevState = !prevState))
  }

  const changeLangViHandler = () => {
    i18n.changeLanguage('vi-VN')
    setLang('vi-VN')
    setToggle(false)
    localStorage.setItem('lang', 'vi-VN')
  }

  const logoutHandler = () => {
    dispatch(logoutEmployer())
    notification(`${t('Log out successful')}`, 'success')
  }

  const changeLangEnHandler = () => {
    i18n.changeLanguage('en-ES')
    setLang('en-ES')
    setToggle(false)
    localStorage.setItem('lang', 'en-ES')
  }

  const toggleMenuChildClick = () => {
    setToggle(false)
  }

  const styleResize =
    width <= 768 ? (toggle ? { display: 'block' } : { display: 'none' }) : { display: 'flex' }

  return (
    <header className={classes.header}>
      <div>
        <img
          onClick={clickLogoHandler}
          src={MSTLogo}
          alt="MST LOGO"
          className={classes.header__logo}
        />
        <NavLink className={classes['link-no-border']} to="/employers">
          <IoHome />
        </NavLink>
      </div>
      <div style={styleResize} className={classes.header__right}>
        {!employer ? (
          <NavLink
            activeClassName={classes['header__link--active']}
            to="/employers/sign-in"
            className={classes.header__link}
            onClick={toggleMenuChildClick}
          >
            <MdAccountCircle className={classes['icon-gb-18']} />
            {t('signin')}
          </NavLink>
        ) : (
          <div>
            <Dropdown
              isOpen={dropdownHover}
              toggle={hoverProfileHandler}
              onMouseEnter={hoverProfileHandler}
              onMouseLeave={hoverProfileHandler}
              className={classes.header__lang}
            >
              <DropdownToggle caret>
                <Link
                  className={classes['link-no-border']}
                  to={`/employers/dashboard/statistics`}
                  onClick={toggleMenuChildClick}
                >
                  <MdAccountCircle className={classes['icon-gb-18']} />
                  {employer.companyName}
                </Link>
              </DropdownToggle>
              <DropdownMenu>
                <Link
                  className={`${classes['header__lang-profile']} ${classes.link}`}
                  to={`/employers/dashboard/post-job`}
                >
                  <FaEdit className={classes['icon-gb-18']} />
                  {t('postjobs')}
                </Link>

                <Link
                  className={`${classes['header__lang-profile']} ${classes.link}`}
                  to={`/employers/dashboard/recruit-manage/created`}
                >
                  <RiFileList3Line className={classes['icon-gb-18']} />
                  {t('recruitment manager')}
                </Link>

                <Link
                  className={`${classes['header__lang-profile']} ${classes.link}`}
                  to={`/employers/dashboard/events/created`}
                >
                  <MdEvent className={classes['icon-gb-18']} />
                  {t('Event management')}
                </Link>

                <Link
                  className={`${classes['header__lang-profile']} ${classes.link}`}
                  to={`/employers/dashboard/candidate-profiles`}
                >
                  <IoIosPeople className={classes['icon-gb-18']} />
                  {t('Manage candidate profiles')}
                </Link>

                <Link
                  className={`${classes['header__lang-profile']} ${classes.link}`}
                  to={`/employers/dashboard/my-profile`}
                >
                  <MdAccountCircle className={classes['icon-gb-18']} />
                  {t('Account Management')}
                </Link>

                <Link
                  className={`${classes['header__lang-profile']} ${classes.link}`}
                  to={`/employers/dashboard/setting-account`}
                >
                  <MdSettings className={classes['icon-gb-18']} />
                  {t('Settings')}
                </Link>

                <Link
                  to={location.pathname}
                  className={classes['header__lang-profile']}
                  onClick={logoutHandler}
                >
                  <RiLogoutCircleRLine className={classes['icon-gb-18']} />
                  {t('Log out')}
                </Link>
              </DropdownMenu>
            </Dropdown>
          </div>
        )}
        {!employer && (
          <NavLink
            activeClassName={classes['header__link--active']}
            to="/employers/sign-up"
            className={classes.header__link}
            onClick={toggleMenuChildClick}
          >
            {t('signup')}
          </NavLink>
        )}
        <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown} className={classes.header__lang}>
          <DropdownToggle caret>{lang.slice(0, 2).toUpperCase()}</DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={changeLangViHandler}>
              <ReactCountryFlag countryCode="VN" svg className={classes['header__icon-flag']} />
              VI
            </DropdownItem>
            <DropdownItem onClick={changeLangEnHandler}>
              <ReactCountryFlag countryCode="US" svg className={classes['header__icon-flag']} />
              EN
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Link to="/" className={classes['header__link-to-jsk']}>
          <div className={classes['header__link-to-jsk__wrap']}>
            <span>{t('jobseekers-site')}</span>
            <br />
            <span>{t('searchjobs')}</span>
          </div>
        </Link>
      </div>
      <div className={classes['header__icon-menu']}>
        <IoMenu onClick={toggleMenuHandler} />
      </div>
    </header>
  )
}

export default HeaderEmployers
