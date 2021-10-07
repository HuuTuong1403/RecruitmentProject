import "antd/dist/antd.css";
import classes from "./style.module.scss";
import { Menu, Layout } from "antd";
import { Link, NavLink, useLocation } from "react-router-dom";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { logoutJobSeeker } from "features/Home/slices";
import notification from "components/Notification";
import { selectedStatus } from "features/JobSeekers/slices/selectors";
import LoadingSuspense from "components/Loading";
import { MdSettings } from "react-icons/md";
import { AiFillDashboard } from "react-icons/ai";
import { MdMenu } from "react-icons/md";
import { useState } from "react";
import { BsListCheck } from "react-icons/bs";
import { pathJobSeeker } from "common/constants/path";

const MenuJobSeeker = (props) => {
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
    notification("Đăng xuất thành công", "success");
  };

  const menuJobSeeker = [
    {
      key: pathJobSeeker.myProfile,
      title: "Quản lý hồ sơ",
      icon: null,
      isLink: false,
      onClick: null,
    },
    {
      key: pathJobSeeker.jobAlert,
      title: "Thông báo việc làm",
      icon: null,
      isLink: false,
      onClick: null,
    },
    {
      icon: <BsListCheck />,
      title: "Việc làm của tôi",
      subMenu: [
        {
          key: pathJobSeeker.jobSaved,
          title: "Việc làm đã lưu",
          icon: null,
          isLink: false,
          onClick: null,
        },
        {
          key: pathJobSeeker.jobApplied,
          title: "Việc làm đã ứng tuyển",
          icon: null,
          isLink: false,
          onClick: null,
        },
      ],
    },
    {
      key: pathJobSeeker.settingAccount,
      title: "Cài đặt",
      icon: <MdSettings />,
      isLink: false,
      onClick: null,
    },
    {
      key: "logout",
      title: `${t("Đăng xuất")}`,
      icon: <RiLogoutCircleRLine />,
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
        <div className={classes.sliderJobSeeker__menuHeader}>
          <AiFillDashboard style={{ marginRight: "8px" }} />
          Dashboard JobSeeker
          {showClose && <div onClick={closeMenuHandler}>x</div>}
        </div>
        <Menu
          mode="inline"
          style={{ fontSize: "16px" }}
          defaultSelectedKeys={location.pathname}
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
          <LoadingSuspense height="100%" showText={false} />
        </div>
      ) : (
        <div className={classes.sliderJobSeeker__blockRight}>
          {props.children}
        </div>
      )}
    </div>
  );
};

export default MenuJobSeeker;
