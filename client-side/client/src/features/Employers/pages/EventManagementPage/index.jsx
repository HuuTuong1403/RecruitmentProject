import { fetchAllEventOfEmployerAsync } from "features/Employers/slices/thunks";
import {
  selectEventsOfEmployer,
  selectedStatus,
} from "features/Employers/slices/selectors";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTitle } from "common/hook/useTitle";
import { useTranslation } from "react-i18next";
import classes from "./style.module.scss";
import EventOfEmployerItem from "features/Employers/components/EventOfEmployerItem";
import NotFoundData from "components/NotFoundData";
import LoadingSuspense from "components/Loading";

const EventManagementPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const eventsOfEmployer = useSelector(selectEventsOfEmployer);
  const loading = useSelector(selectedStatus);

  useTitle(`${t("Event management")}`);
  useEffect(() => {
    dispatch(fetchAllEventOfEmployerAsync());
  }, [dispatch]);

  return loading ? (
    <LoadingSuspense height="80vh" />
  ) : (
    <div className={classes.container}>
      <div className={classes.container__wrapped}>
        <div className={classes.titleDashboard}>
          {t("Manage created events")}
        </div>
        <div className={classes.subTitleDashboard}>{`${t("There are")} ${
          eventsOfEmployer?.length
        } ${t("event created in total")}`}</div>
        {eventsOfEmployer &&
          (eventsOfEmployer.length === 0 ? (
            <NotFoundData title={t("You haven't created any events yet")} />
          ) : (
            <div className={classes.listEvent}>
              {eventsOfEmployer.map((event) => (
                <EventOfEmployerItem key={event.slug} data={event} />
              ))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default EventManagementPage;
