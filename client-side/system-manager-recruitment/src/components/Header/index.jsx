import { Badge, Avatar } from 'antd'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { getSystemManagerDetailAsync } from 'features/SystemManager/slices/thunks'
import { IoMenu } from 'react-icons/io5'
import { MdNotificationsNone } from 'react-icons/md'
import { NavLink } from 'react-router-dom'
import { selectSystemManageDetail } from 'features/SystemManager/slices/selectors'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import classes from './style.module.scss'
import ReactCountryFlag from 'react-country-flag'
import { pathSystemManager } from 'common/constants/path'

export const Header = ({ isShow, onOpen, onClose }) => {
  const dispatch = useDispatch()
  const { t, i18n } = useTranslation()
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'en-ES')
  const [dropdownOpen, setDropdownOpen] = useState(false)
  //   const [dropdownHover, setDropDownHover] = useState(false);
  const systemManage = useSelector(selectSystemManageDetail)
  const token = localStorage.getItem('token')
  const toggleDropdown = () => setDropdownOpen((prevState) => !prevState)

  //   const hoverProfileHandler = () => setDropDownHover((prevState) => !prevState);

  const changeLangViHandler = () => {
    i18n.changeLanguage('vi-VN')
    setLang('vi-VN')
    localStorage.setItem('lang', 'vi-VN')
  }

  const changeLangEnHandler = () => {
    i18n.changeLanguage('en-ES')
    setLang('en-ES')
    localStorage.setItem('lang', 'en-ES')
  }

  useEffect(() => {
    if (token) {
      if (!systemManage) {
        dispatch(getSystemManagerDetailAsync())
      }
    }
  }, [dispatch, token, systemManage])

  return (
    <header className={classes.header}>
      <div className={classes.header__menu}>
        <div className={classes['header__menu--ic']}>
          <IoMenu onClick={isShow ? onOpen : onClose} />
        </div>
        <div>
          <NavLink
            activeClassName={classes['header__link--active']}
            className={classes['header__link']}
            to={pathSystemManager.statistic}
          >
            {t('Statistic')}
          </NavLink>
        </div>
        <div>
          <NavLink
            activeClassName={classes['header__link--active']}
            className={classes['header__link']}
            to={pathSystemManager.employerManager}
          >
            {t('Employers')}
          </NavLink>
        </div>
        <div>
          <NavLink
            activeClassName={classes['header__link--active']}
            className={classes['header__link']}
            to={pathSystemManager.recruitManager}
          >
            {t('Recruitment')}
          </NavLink>
        </div>
        <div>
          <NavLink
            activeClassName={classes['header__link--active']}
            className={classes['header__link']}
            to={pathSystemManager.packageListCreated}
          >
            {t('Service Package')}
          </NavLink>
        </div>
        <div>
          <NavLink
            activeClassName={classes['header__link--active']}
            className={classes['header__link']}
            to={pathSystemManager.myProfile}
          >
            {t('Account')}
          </NavLink>
        </div>

        <div>
          <NavLink
            activeClassName={classes['header__link--active']}
            className={classes['header__link']}
            to={pathSystemManager.settings}
          >
            {t('Setting')}
          </NavLink>
        </div>
      </div>
      <div className={classes['header__block-right']}>
        <Badge size="small" count={5} offset={[-3, 3]}>
          <MdNotificationsNone className={classes.header__icon} />
        </Badge>
        <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown} className={classes['header__lang']}>
          <DropdownToggle caret>{lang.slice(0, 2).toUpperCase()}</DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={changeLangViHandler}>
              <ReactCountryFlag countryCode="VN" svg className={classes['header__ic--flag']} />
              VI
            </DropdownItem>
            <DropdownItem onClick={changeLangEnHandler}>
              <ReactCountryFlag countryCode="US" svg className={classes['header__ic--flag']} />
              EN
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Avatar src={systemManage?.avatar} />
      </div>
    </header>
  )
}