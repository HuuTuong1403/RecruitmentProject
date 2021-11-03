import { AiFillDashboard, AiOutlineNotification } from "react-icons/ai";
import { BsListCheck } from "react-icons/bs";
import { Link, NavLink, useLocation } from "react-router-dom";
import { logoutJobSeeker } from "features/Home/slices";
import { MdMenu } from "react-icons/md";
import { MdSettings, MdAccountCircle } from "react-icons/md";
import { Menu, Layout } from "antd";
import { pathJobSeeker } from "common/constants/path";
import { resetFavoriteJob } from "features/JobSeekers/slices";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { selectedStatus } from "features/JobSeekers/slices/selectors";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import classes from "./style.module.scss";
import LoadingSuspense from "components/Loading";
import notification from "components/Notification";

const MenuJobSeeker = ({ children }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const dispatch = useDispatch();
  const { Sider } = Layout;
  const loading = useSelector(selectedStatus);
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
    dispatch(logoutJobSeeker());
    dispatch(resetFavoriteJob());
    notification(`${t("Log out successful")}`, "success");
  };

  const menuJobSeeker = [
    {
      key: pathJobSeeker.myProfile,
      title: `${t("Account Management")}`,
      icon: <MdAccountCircle className={classes.menuIcon} />,
      isLink: false,
      onClick: null,
    },
    {
      key: pathJobSeeker.jobAlert,
      title: `${t("My Job Alerts")}`,
      icon: <AiOutlineNotification className={classes.menuIcon} />,
      isLink: false,
      onClick: null,
    },
    {
      icon: <BsListCheck className={classes.menuIcon} />,
      title: `${t("My Jobs")}`,
      subMenu: [
        {
          key: pathJobSeeker.jobSaved,
          title: `${t("Saved jobs")}`,
          icon: null,
          isLink: false,
          onClick: null,
        },
        {
          key: pathJobSeeker.jobApplied,
          title: `${t("Applied jobs")}`,
          icon: null,
          isLink: false,
          onClick: null,
        },
      ],
    },
    {
      key: pathJobSeeker.settingAccount,
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
    <div className={classes.sliderJobSeeker}>
      {isShow && (
        <div
          onClick={openMenuHandler}
          className={classes.sliderJobSeeker__menuClose}
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
                maxHeight: "88vh",
                overflowY: "auto",
                overflowX: "hidden",
              }
            : {
                backgroundColor: "#fff",
              }
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
        <div className={classes.sliderJobSeeker__menuHeader}>
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
                      activeClassName={classes.sliderJobSeeker__active}
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
                    activeClassName={classes.sliderJobSeeker__active}
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
      {loading ? (
        <div className={classes.loading}>
          <LoadingSuspense height="100%" />
        </div>
      ) : (
        <div className={classes.sliderJobSeeker__blockRight}>{children}</div>
      )}
    </div>
  );
};

export default MenuJobSeeker;
