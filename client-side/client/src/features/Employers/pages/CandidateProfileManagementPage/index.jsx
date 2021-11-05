import { ScrollTop } from "common/functions";
import { useTitle } from "common/hook/useTitle";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  selectJobsApplicationNotSaved,
  selectJobsApplicationSaved,
  selectJobsApplicationDeleted,
  selectTabsItem,
} from "features/Employers/slices/selectors";
import { Tabs } from "antd";
import classes from "./style.module.scss";
import TableJobsApplication from "features/Employers/components/TableJobsApplication";
import {
  fetchJobsApplicationDeletedAsync,
  fetchJobsApplicationSavedAsync,
  fetchJobsApplicationNotSavedAsync,
} from "features/Employers/slices/thunks";
import { changeTabsItem } from "features/Employers/slices";
import NotFounđData from "components/NotFoundData";

const CandidateProfileManagementPage = () => {
  ScrollTop();
  const { t } = useTranslation();
  useTitle(`${t("Manage candidate profiles")}`);
  const { TabPane } = Tabs;
  const dispatch = useDispatch();
  const activeTab = useSelector(selectTabsItem);

  const jobsApplicationNotSaved = useSelector(selectJobsApplicationNotSaved);
  const jobsApplicationSaved = useSelector(selectJobsApplicationSaved);
  const jobsApplicationDeleted = useSelector(selectJobsApplicationDeleted);

  const handleChangeTabs = (activeKey) => {
    if (activeKey !== activeTab) {
      dispatch(changeTabsItem(activeKey));
      let filter = {
        status: activeKey,
      };

      if (activeKey === "NotSaved") {
        dispatch(fetchJobsApplicationNotSavedAsync({ filter }));
      }
      if (activeKey === "Saved") {
        dispatch(fetchJobsApplicationSavedAsync({ filter }));
      }
      if (activeKey === "Deleted") {
        dispatch(fetchJobsApplicationDeletedAsync({ filter }));
      }
    }
  };

  return (
    <div>
      <div className={classes.titleDashboard}>
        {t("Manage candidate profiles")}
      </div>
      <div className={classes.manageCandidate__tabs}>
        <Tabs
          defaultActiveKey={activeTab}
          type="card"
          size="middle"
          onChange={handleChangeTabs}
        >
          <TabPane tab={`${t("Resume Applied")} (0)`} key="NotSaved">
            {jobsApplicationNotSaved.length === 0 ? (
              <NotFounđData
                title={t("There are currently no resumes applying")}
              />
            ) : (
              <TableJobsApplication isNotSaved jobsApplication={jobsApplicationNotSaved} />
            )}
          </TabPane>
          <TabPane tab={`${t("Bookmarked Resumes")} (0)`} key="Saved">
            {jobsApplicationSaved.length === 0 ? (
              <NotFounđData
                title={t("There are currently no saved profiles")}
              />
            ) : (
              <TableJobsApplication
                isSave
                jobsApplication={jobsApplicationSaved}
              />
            )}
          </TabPane>
          <TabPane tab={`${t("Deleted Resumes")} (0)`} key="Deleted">
            {jobsApplicationDeleted.length === 0 ? (
              <NotFounđData
                title={t("There are currently no deleted profiles")}
              />
            ) : (
              <TableJobsApplication
                isDelete
                jobsApplication={jobsApplicationDeleted}
              />
            )}
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default CandidateProfileManagementPage;
