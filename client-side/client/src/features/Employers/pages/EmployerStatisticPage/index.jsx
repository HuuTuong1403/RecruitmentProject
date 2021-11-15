import {
  fetchApplicationStatistic,
  fetchParticipantStatistic,
} from "features/Employers/api/employer.api";
import { useEffect, useState } from "react";
import { useTitle } from "common/hook/useTitle";
import { useTranslation } from "react-i18next";
import BarChartVertical from "components/BarChartVertical";
import classes from "./style.module.scss";
import LoadingSuspense from "components/Loading";

const EmployerStatisticPage = () => {
  const { t } = useTranslation();
  const [dataApplication, setDataApplication] = useState([]);
  const [dataParticipant, setDataParticipant] = useState([]);
  const [loading, setLoading] = useState(true);
  useTitle(`${t("Statistics")}`);

  const getDataApplication = async () => {
    const result = await fetchApplicationStatistic();
    if (result) {
      setDataApplication(result.data.data);
    } else {
      setDataApplication([]);
    }
    setLoading(false);
  };

  const getDataParticipant = async () => {
    const result = await fetchParticipantStatistic();
    if (result) {
      setDataParticipant(result.data.data);
    } else {
      setDataParticipant([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    getDataApplication();
    getDataParticipant();
  }, []);

  return loading ? (
    <LoadingSuspense height="80vh" />
  ) : (
    <div className={classes.statistics}>
      <BarChartVertical
        dataStatistic={dataApplication.map((item) => item.count)}
        labels={dataApplication.map((item) => item._id)}
        labelY={t("Profile of the candidate applied")}
        title={t("Statistics of the total number of candidate profiles")}
        labelDataSet={t("Total profile of candidates have applied")}
        tooltip={t("Statistics of candidate's profile by each job posted")}
      />
      <BarChartVertical
        dataStatistic={dataParticipant.map((item) => item.count)}
        labels={dataParticipant.map((item) => item._id)}
        labelY={t("Number of people registered to participate")}
        labelDataSet={t("Total number of people registered to participate")}
        title={t(
          "Statistics of the number of people registered to attend the event"
        )}
        tooltip={t(
          "Statistics of the total number of registered participants by each posted event"
        )}
      />
    </div>
  );
};

export default EmployerStatisticPage;
