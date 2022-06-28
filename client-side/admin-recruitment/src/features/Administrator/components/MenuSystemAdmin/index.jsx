import 'antd/dist/antd.css'
import { BiLineChart } from 'react-icons/bi'
import { FaUserCog, FaUsers } from 'react-icons/fa'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { logoutHandler } from 'features/Auth/slices'
import { MdSettings, MdCreate } from 'react-icons/md'
import { Menu, Layout } from 'antd'
import { pathAdmin } from 'common/constants/path'
import { RiLogoutCircleRLine } from 'react-icons/ri'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useWindowSize } from 'common/hook/useWindowSize'
import classes from './style.module.scss'
import Header from 'components/Header'
import MSTLogo from 'assets/images/mst_logo.png'
import notification from 'components/Notification'

const MenuSystemAdmin = (props) => {
  const { t } = useTranslation()
  const location = useLocation()
  const dispatch = useDispatch()
  const { Sider } = Layout
  const [width, setWidth] = useState('300')
  const [isShow, setIsShow] = useState(false)
  const { SubMenu } = Menu
  const [widthSize] = useWindowSize()

  const openMenuHandler = () => {
    setWidth('250')
    setIsShow(false)
  }

  const closeMenuHandler = () => {
    setWidth('0')
    setIsShow(true)
  }

  useEffect(() => {
    if (widthSize < 1280 && widthSize !== 0) {
      closeMenuHandler()
    } else {
      openMenuHandler()
    }
  }, [widthSize])

  const logoutSystemAdminHandler = () => {
    dispatch(logoutHandler())
    notification(`${t('Log out successful')}`, 'success')
  }

  const menuAdmin = [
    {
      key: `${pathAdmin.statistic}`,
      title: `${t('Statistic')}`,
      icon: <BiLineChart className={classes.menuIcon} />,
      isLink: false,
      onClick: null,
    },
    {
      key: `${pathAdmin.issueAccount}`,
      title: `${t('Issue Account')}`,
      icon: <MdCreate className={classes.menuIcon} />,
      isLink: false,
      onClick: null,
    },
    // {
    //   key: `${pathAdmin.userManager}`,
    //   title: `${t('User Management')}`,
    //   icon: <FaUsers className={classes.menuIcon} />,
    //   isLink: false,
    //   onClick: null,
    // },
    {
      key: `${pathAdmin.myProfile}`,
      title: `${t('Account Management')}`,
      icon: <FaUserCog className={classes.menuIcon} />,
      isLink: false,
      onClick: null,
    },

    {
      key: `${pathAdmin.setting}`,
      title: `${t('Setting')}`,
      icon: <MdSettings className={classes.menuIcon} />,
      isLink: false,
      onClick: null,
    },
    {
      key: 'logout',
      title: `${t('Log out')}`,
      icon: <RiLogoutCircleRLine className={classes.menuIcon} />,
      isLink: true,
      onClick: logoutSystemAdminHandler,
    },
  ]

  return (
    <div className={classes.sliderSystem}>
      <Sider
        width={width}
        trigger={null}
        style={{
          backgroundColor: '#fff',
          height: '100vh',
          overflowY: 'auto',
          overflowX: 'hidden',
        }}
      >
        <div className={classes.sliderSystem__menuHeader}>
          <img src={MSTLogo} alt="logo" />
        </div>
        <Menu mode="inline" style={{ fontSize: '16px' }} selectedKeys={[location.pathname]}>
          {menuAdmin.map((item, index) =>
            item?.subMenu ? (
              <SubMenu icon={item.icon} key={index} title={item.title}>
                {item?.subMenu.map((subMenu) => (
                  <Menu.Item key={subMenu.key}>
                    <NavLink activeClassName={classes.sliderSystem__active} to={subMenu.key}>
                      {subMenu.title}
                    </NavLink>
                  </Menu.Item>
                ))}
              </SubMenu>
            ) : (
              <Menu.Item onClick={item.onClick ?? null} key={item.key} icon={item.icon ?? null}>
                {!item.isLink ? (
                  <NavLink activeClassName={classes.sliderSystem__active} to={item.key}>
                    {item.title}
                  </NavLink>
                ) : (
                  <Link to="/">{item.title}</Link>
                )}
              </Menu.Item>
            )
          )}
        </Menu>
      </Sider>

      <div className={classes.sliderSystem__blockRight}>
        <Header onOpen={openMenuHandler} onClose={closeMenuHandler} isShow={isShow} />
        <div className={classes.sliderSystem__componentChild}>
          <div>{props.children}</div>
        </div>
      </div>
    </div>
  )
}

export default MenuSystemAdmin
