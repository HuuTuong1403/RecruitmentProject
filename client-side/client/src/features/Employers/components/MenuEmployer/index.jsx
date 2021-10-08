import "antd/dist/antd.css";
import classes from "./style.module.scss";
import { Menu, Layout } from "antd";
import { Link, NavLink, useLocation } from "react-router-dom";
import { RiLogoutCircleRLine, RiFileList3Line } from "react-icons/ri";
import { useTranslation } from "react-i18next";
import notification from "components/Notification";
import { MdSettings, MdAccountCircle } from "react-icons/md";
import { AiFillDashboard } from "react-icons/ai";
import { MdMenu } from "react-icons/md";
import { useState } from "react";
import { pathEmployer } from "common/constants/path";
import { IoIosPeople } from "react-icons/io";
import { FaEdit } from "react-icons/fa";

const MenuEmployer = (props) => {
  const { t } = useTranslation();
  const location = useLocation();
  const { Sider } = Layout;
  const [width, setWidth] = useState("300");
  const [isShow, setIsShow] = useState(false);
  const [showClose, setShowClose] = useState(true);
  const { SubMenu } = Menu;

  const closeMenuHandler = () => {
    setWidth("0");
    setIsShow(true);
  };

  const openMenuHandler = () => {
    setWidth("300");
    setIsShow(false);
  };

  const logoutHandler = () => {
    notification(`${t("Log out successful")}`, "success");
  };

  const menuJobSeeker = [
    {
      key: `${pathEmployer.myProfile}`,
      title: `${t("Account Management")}`,
      icon: <MdAccountCircle className={classes.menuIcon} />,
      isLink: false,
      onClick: null,
    },
    {
      key: `${pathEmployer.postJob}`,
      title: `${t("postjobs")}`,
      icon: <FaEdit className={classes.menuIcon} />,
      isLink: false,
      onClick: null,
    },
    {
      key: `${pathEmployer.recruitManager}`,
      title: `${t("recruitment manager")}`,
      icon: <RiFileList3Line className={classes.menuIcon} />,
      isLink: false,
      onClick: null,
    },
    {
      key: `${pathEmployer.candidateProfileManage}`,
      title: `${t("Manage candidate profiles")}`,
      icon: <IoIosPeople className={classes.menuIcon} />,
      isLink: false,
      onClick: null,
    },
    {
      key: `${pathEmployer.settingAccount}`,
      title: `${t("Settings")}`,
      icon: <MdSettings className={classes.menuIcon} />,
      isLink: false,
      onClick: null,
    },
    {
      key: "logout",
      title: `${t("Log out")}`,
      icon: <RiLogoutCircleRLine className={classes.menuIcon} />,
      isLink: true,
      onClick: logoutHandler,
    },
  ];

  return (
    <div className={classes.sliderEmployer}>
      {isShow && (
        <div
          onClick={openMenuHandler}
          className={classes.sliderEmployer__menuClose}
        >
          <MdMenu />
        </div>
      )}
      <Sider
        width={width}
        style={
          showClose
            ? {
                backgroundColor: "#fff",
                maxHeight: "90vh",
                overflowY: "auto",
                overflowX: "hidden",
              }
            : { backgroundColor: "#fff" }
        }
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          if (!isShow) {
            setWidth("300");
          }
          if (broken) {
            setWidth("230");
            setIsShow(false);
            setShowClose(false);
          } else {
            setShowClose(true);
          }
        }}
      >
        <div className={classes.sliderEmployer__menuHeader}>
          <AiFillDashboard style={{ marginRight: "8px" }} />
          My MST Center
          {showClose && <div onClick={closeMenuHandler}>x</div>}
        </div>
        <Menu
          mode="inline"
          style={{ fontSize: "16px" }}
          selectedKeys={[location.pathname]}
        >
          {menuJobSeeker.map((item, index) =>
            item?.subMenu ? (
              <SubMenu icon={item.icon} key={index} title={item.title}>
                {item?.subMenu.map((subMenu) => (
                  <Menu.Item key={subMenu.key}>
                    <NavLink
                      activeClassName={classes.sliderEmployer__active}
                      to={subMenu.key}
                    >
                      {subMenu.title}
                    </NavLink>
                  </Menu.Item>
                ))}
              </SubMenu>
            ) : (
              <Menu.Item
                onClick={item.onClick ?? null}
                key={item.key}
                icon={item.icon ?? null}
              >
                {!item.isLink ? (
                  <NavLink
                    activeClassName={classes.sliderEmployer__active}
                    to={item.key}
                  >
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
      <div className={classes.sliderEmployer__blockRight}>{props.children}</div>
    </div>
  );
};

export default MenuEmployer;
