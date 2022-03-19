import { BiBuildings, BiLineChart } from 'react-icons/bi'
import { FiPackage } from 'react-icons/fi'
import { Header, notification } from 'components'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { logoutHandler } from 'features/Auth/slices'
import { MdSettings, MdAccountCircle } from 'react-icons/md'
import { Menu, Layout } from 'antd'
import { pathSystemManager } from 'common/constants/path'
import { RiLogoutCircleRLine, RiFileList3Line } from 'react-icons/ri'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useWindowSize } from 'common/hook/useWindowSize'
import classes from './style.module.scss'
import MSTLogo from 'assets/images/mst_logo.png'

export const MenuSystemManage = ({ children }) => {
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

  const logoutSystemManageHandler = () => {
    dispatch(logoutHandler())
    notification(`${t('Log out successful')}`, 'success')
  }

  const menuSystemManage = [
    {
      key: `${pathSystemManager.statistic}`,
      title: `${t('Statistics')}`,
      icon: <BiLineChart className={classes.menuIcon} />,
      isLink: false,
      onClick: null,
    },
    {
      key: `${pathSystemManager.employerManager}`,
      title: `${t('Employers Management')}`,
      icon: <BiBuildings className={classes.menuIcon} />,
      isLink: false,
      onClick: null,
    },
    {
      icon: <RiFileList3Line className={classes.menuIcon} />,
      title: `${t('recruitment manager')}`,
      subMenu: [
        {
          key: pathSystemManager.recruitManager,
          title: `${t('Job post created')}`,
          icon: null,
          isLink: false,
          onClick: null,
        },
        {
          key: pathSystemManager.recruitTrash,
          title: `${t('Job posting has been deleted')}`,
          icon: null,
          isLink: false,
          onClick: null,
        },
      ],
    },
    {
      icon: <FiPackage className={classes.menuIcon} />,
      title: `${t('Service Package Management')}`,
      subMenu: [
        {
          key: pathSystemManager.packageListCreated,
          title: `${t('Service Package Created')}`,
          icon: null,
          isLink: false,
          onClick: null,
        },
        {
          key: pathSystemManager.packageTrash,
          title: `${t('Service Package Deleted')}`,
          icon: null,
          isLink: false,
          onClick: null,
        },
      ],
    },
    {
      key: `${pathSystemManager.myProfile}`,
      title: `${t('Account Management')}`,
      icon: <MdAccountCircle className={classes.menuIcon} />,
      isLink: false,
      onClick: null,
    },
    {
      key: `${pathSystemManager.settings}`,
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
      onClick: logoutSystemManageHandler,
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
          {menuSystemManage.map((item, index) =>
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
          <div>{children}</div>
        </div>
      </div>
    </div>
  )
}
