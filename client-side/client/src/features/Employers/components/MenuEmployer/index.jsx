import { AiFillDashboard, AiOutlineLineChart } from 'react-icons/ai'
import { FiPackage } from 'react-icons/fi'
import { FaShoppingCart, FaQuestionCircle, FaGraduationCap } from 'react-icons/fa'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { logoutEmployer } from 'features/HomeEmployers/slices'
import { MdMenu } from 'react-icons/md'
import { MdSettings, MdAccountCircle, MdEvent } from 'react-icons/md'
import { Menu, Layout } from 'antd'
import { pathEmployer } from 'common/constants/path'
import { RiLogoutCircleRLine, RiFileList3Line } from 'react-icons/ri'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { notification } from 'components'
import classes from './style.module.scss'

export const MenuEmployer = ({ children }) => {
  const { t } = useTranslation()
  const location = useLocation()
  const dispatch = useDispatch()
  const { Sider } = Layout
  const [width, setWidth] = useState('300')
  const [isShow, setIsShow] = useState(false)
  const [showClose, setShowClose] = useState(true)
  const { SubMenu } = Menu

  const closeMenuHandler = () => {
    setWidth('0')
    setIsShow(true)
  }

  const openMenuHandler = () => {
    setWidth('300')
    setIsShow(false)
  }

  const logoutHandler = () => {
    dispatch(logoutEmployer())
    notification(`${t('Log out successful')}`, 'success')
  }

  const menuEmployer = [
    {
      key: `${pathEmployer.statistic}`,
      title: `${t('Statistics')}`,
      icon: <AiOutlineLineChart className={classes.menuIcon} />,
      isLink: false,
      onClick: null,
    },
    {
      key: `${pathEmployer.order}`,
      title: `${t('My orders')}`,
      icon: <FaShoppingCart className={classes.menuIcon} />,
      isLink: false,
      onClick: null,
    },
    {
      key: pathEmployer.managementServicePackage,
      title: t('Registered service package'),
      icon: <FiPackage className={classes.menuIcon} />,
      isLink: false,
      onClick: null,
    },
    {
      key: pathEmployer.managementQuestion,
      title: t('Question & answer management'),
      icon: <FaQuestionCircle className={classes.menuIcon} />,
      isLink: false,
      onClick: null,
    },
    {
      key: pathEmployer.managementEntryTest,
      icon: <FaGraduationCap className={classes.menuIcon} />,
      title: t('Entry test management'),
      isLink: false,
      onClick: null,
    },
    {
      icon: <RiFileList3Line className={classes.menuIcon} />,
      title: t('recruitment manager'),
      subMenu: [
        {
          key: pathEmployer.postJob,
          title: t('postjobs'),
          icon: null,
          isLink: false,
          onClick: null,
        },
        {
          key: pathEmployer.createdJob,
          title: t('Job post created'),
          icon: null,
          isLink: false,
          onClick: null,
        },
        {
          key: pathEmployer.deletedJob,
          title: t('Job posting has been deleted'),
          icon: null,
          isLink: false,
          onClick: null,
        },
      ],
    },
    {
      icon: <MdEvent className={classes.menuIcon} />,
      title: t('Event management'),
      subMenu: [
        {
          key: pathEmployer.postEvent,
          title: t('Create a new event'),
          icon: null,
          isLink: false,
          onClick: null,
        },
        {
          key: pathEmployer.createdEvent,
          title: t('Events created'),
          icon: null,
          isLink: false,
          onClick: null,
        },
        {
          key: pathEmployer.deletedEvent,
          title: t('Events deleted'),
          icon: null,
          isLink: false,
          onClick: null,
        },
      ],
    },
    {
      key: pathEmployer.myProfile,
      title: t('Account Management'),
      icon: <MdAccountCircle className={classes.menuIcon} />,
      isLink: false,
      onClick: null,
    },
    {
      key: pathEmployer.settingAccount,
      title: t('Settings'),
      icon: <MdSettings className={classes.menuIcon} />,
      isLink: false,
      onClick: null,
    },
    {
      key: 'logout',
      title: t('Log out'),
      icon: <RiLogoutCircleRLine className={classes.menuIcon} />,
      isLink: true,
      onClick: logoutHandler,
    },
  ]

  return (
    <div className={classes.sliderEmployer}>
      {isShow && (
        <div onClick={openMenuHandler} className={classes.sliderEmployer__menuClose}>
          <MdMenu />
        </div>
      )}
      <Sider
        width={width}
        style={
          showClose
            ? {
                backgroundColor: '#fff',
                maxHeight: '88vh',
                overflowY: 'auto',
                overflowX: 'hidden',
              }
            : { backgroundColor: '#fff' }
        }
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          if (!isShow) {
            setWidth('300')
          }
          if (broken) {
            setWidth('230')
            setIsShow(false)
            setShowClose(false)
          } else {
            setShowClose(true)
          }
        }}
      >
        <div className={classes.sliderEmployer__menuHeader}>
          <AiFillDashboard style={{ marginRight: '8px' }} />
          My MST Center
          {showClose && <div onClick={closeMenuHandler}>x</div>}
        </div>
        <Menu mode="inline" style={{ fontSize: '16px' }} selectedKeys={[location.pathname]}>
          {menuEmployer.map((item, index) =>
            item?.subMenu ? (
              <SubMenu icon={item.icon} key={index} title={item.title}>
                {item?.subMenu.map((subMenu) => (
                  <Menu.Item key={subMenu.key}>
                    <NavLink activeClassName={classes.sliderEmployer__active} to={subMenu.key}>
                      {subMenu.title}
                    </NavLink>
                  </Menu.Item>
                ))}
              </SubMenu>
            ) : (
              <Menu.Item onClick={item.onClick ?? null} key={item.key} icon={item.icon ?? null}>
                {!item.isLink ? (
                  <NavLink activeClassName={classes.sliderEmployer__active} to={item.key}>
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
      <div className={classes.sliderEmployer__blockRight}>{children}</div>
    </div>
  )
}
