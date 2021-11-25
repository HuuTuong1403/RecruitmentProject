import { Badge, Avatar } from 'antd'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { getAdministratorDetailAsync } from 'features/Administrator/slices/thunks'
import { IoMenu } from 'react-icons/io5'
import { MdNotificationsNone } from 'react-icons/md'
import { NavLink } from 'react-router-dom'
import { pathAdmin } from 'common/constants/path'
import { selectAdminDetail } from 'features/Administrator/slices/selectors'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import classes from './style.module.scss'
import ReactCountryFlag from 'react-country-flag'

const Header = (props) => {
  const { t, i18n } = useTranslation()
  const dispatch = useDispatch()
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'en-ES')
  const [dropdownOpen, setDropdownOpen] = useState(false)
  //   const [dropdownHover, setDropDownHover] = useState(false);
  const { isShow, onOpen, onClose } = props
  const token = localStorage.getItem('token')
  const admin = useSelector(selectAdminDetail)
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
      if (!admin) {
        dispatch(getAdministratorDetailAsync())
      }
    }
  }, [dispatch, token, admin])

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
            to={pathAdmin.statistic}
          >
            {t('Statistic')}
          </NavLink>
        </div>

        <div>
          <NavLink
            activeClassName={classes['header__link--active']}
            className={classes['header__link']}
            to={pathAdmin.issueAccount}
          >
            {t('Issue Account')}
          </NavLink>
        </div>

        <div>
          <NavLink
            activeClassName={classes['header__link--active']}
            className={classes['header__link']}
            to={pathAdmin.userManager}
          >
            {t('User Management')}
          </NavLink>
        </div>

        <div>
          <NavLink
            activeClassName={classes['header__link--active']}
            className={classes['header__link']}
            to={pathAdmin.myProfile}
          >
            {t('Account')}
          </NavLink>
        </div>

        <div>
          <NavLink
            activeClassName={classes['header__link--active']}
            className={classes['header__link']}
            to={pathAdmin.setting}
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
            <DropdownItem>
              <div onClick={changeLangViHandler}>
                <ReactCountryFlag countryCode="VN" svg className={classes['header__ic--flag']} />
                VI
              </div>
            </DropdownItem>
            <DropdownItem>
              <div onClick={changeLangEnHandler}>
                <ReactCountryFlag countryCode="US" svg className={classes['header__ic--flag']} />
                EN
              </div>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Avatar src={admin?.avatar} />
      </div>
    </header>
  )
}

export default Header
