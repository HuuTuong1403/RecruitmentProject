import {
  selectAllJobs,
  selectStatus,
  selectTabsItem,
} from "features/SystemManager/slices/selectors";
import { changeTabsItem } from "features/SystemManager/slices";
import { fetchAllJobAsync } from "features/SystemManager/slices/thunks";
import { ScrollTop } from "common/functions";
import { Tabs } from "antd";
import { useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTitle } from "common/hook/useTitle";
import { useTranslation } from "react-i18next";
import { useWindowSize } from "common/hook/useWindowSize";
import classes from "./style.module.scss";
import JobOfEmployerList from "features/SystemManager/components/JobOfEmployerList";
import LoadingSuspense from "components/Loading";
import NotFoundData from "components/NotFoundData";

const RecruitmentManagerPage = () => {
  ScrollTop();
  const { t } = useTranslation();
  const { TabPane } = Tabs;
  useTitle(`${t("Manage job postings created")}`);
  const dispatch = useDispatch();
  const status = useSelector(selectStatus);
  const jobsOfEmployer = useSelector(selectAllJobs);
  const activeTab = useSelector(selectTabsItem);
  const [width] = useWindowSize();

  useEffect(() => {
    dispatch(fetchAllJobAsync());
  }, [dispatch]);

  const handleChangeTabs = (activeKey) => {
    dispatch(changeTabsItem(activeKey));
  };

  const mapArrayStatus = (array, status) => {
    return array.filter((item) => item.status === status);
  };

  return status ? (
    <LoadingSuspense height="80vh" />
  ) : (
    jobsOfEmployer && (
      <div className={classes.recruitment}>
        <div className={classes.titleDashboard}>
          {t("Manage job postings created")}
        </div>
        {jobsOfEmployer.length === 0 ? (
          <NotFoundData
            title={t("Currently no job postings have been created")}
          />
        ) : (
          <Fragment>
            <div className={classes.subTitleDashboard}>{`${t("There are")} ${
              jobsOfEmployer.length
            } ${t("jobs created in total")}`}</div>
            <Tabs
              defaultActiveKey={activeTab}
              type="line"
              size={width < 500 ? "small" : width < 800 ? "middle" : "large"}
              onChange={handleChangeTabs}
              centered
            >
              <TabPane
                tab={`${t("unapproval")} (${
                  mapArrayStatus(jobsOfEmployer, "unapproval").length
                })`}
                key="unapproval"
              >
                <JobOfEmployerList
                  listRender={mapArrayStatus(jobsOfEmployer, "unapproval")}
                  max={6}
                  status="unapproval"
                />
              </TabPane>
              <TabPane
                tab={`${t("denied")} (${
                  mapArrayStatus(jobsOfEmployer, "denied").length
                })`}
                key="denied"
              >
                <JobOfEmployerList
                  listRender={mapArrayStatus(jobsOfEmployer, "denied")}
                  max={6}
                  status="denied"
                />
              </TabPane>
              <TabPane
                tab={`${t("approval")} (${
                  mapArrayStatus(jobsOfEmployer, "approval").length
                })`}
                key="approval"
              >
                <JobOfEmployerList
                  listRender={mapArrayStatus(jobsOfEmployer, "approval")}
                  max={6}
                  status="approval"
                />
              </TabPane>
            </Tabs>
          </Fragment>
        )}
      </div>
    )
  );
};

export default RecruitmentManagerPage;
