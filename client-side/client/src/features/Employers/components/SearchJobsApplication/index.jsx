import { addDataFilter } from "features/Employers/slices";
import { clearNullObject } from "common/functions";
import { DatePicker } from "antd";
import { FaSearch } from "react-icons/fa";
import {
  fetchJobsApplicationNotSavedAsync,
  fetchJobsApplicationSavedAsync,
  fetchJobsApplicationDeletedAsync,
} from "features/Employers/slices/thunks";
import { selectDataFilter } from "features/Employers/slices/selectors";
import { useDispatch, useSelector } from "react-redux";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import ButtonField from "custom-fields/ButtonField";
import classes from "./style.module.scss";
import InputField from "custom-fields/InputField";
import LabelField from "custom-fields/LabelField";
import moment from "moment";
import Select from "react-select";

const SearchJobsApplication = ({ status }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const searchFullNameRef = useRef(null);
  const dataFilter = useSelector(selectDataFilter);

  const dateFormat = "DD/MM/yyyy";
  const [startTime, setStartTime] = useState(
    dataFilter?.startTime
      ? moment(dataFilter.startTime, "yyyy-MM-DD").format(dateFormat)
      : ""
  );

  const [endTime, setEndTime] = useState(
    dataFilter?.endTime
      ? moment(dataFilter.endTime, "yyyy-MM-DD").format(dateFormat)
      : ""
  );

  const [isExpired, setIsExpired] = useState(
    dataFilter?.isExpired ? dataFilter.isExpired : false
  );

  //Handle when change select expired
  const changeExpiredJobs = (selectOption) => {
    setIsExpired(selectOption.value);
    console.log(isExpired);
  };

  //Handle Search with filter
  const handleSearchhApplication = (e) => {
    e.preventDefault();
    const fullName = searchFullNameRef.current.value;

    let filter;
    if (fullName || startTime || endTime || isExpired) {
      filter = clearNullObject({
        status,
        fullName: fullName === "" ? null : fullName,
        startTime:
          startTime !== ""
            ? moment(startTime, dateFormat).format("yyyy-MM-DD")
            : null,
        endTime:
          endTime !== ""
            ? moment(endTime, dateFormat).format("yyyy-MM-DD")
            : null,
        isExpired: isExpired === false ? null : true,
      });
      dispatch(addDataFilter(filter));
      if (status === "NotSaved") {
        dispatch(fetchJobsApplicationNotSavedAsync({ filter }));
      }
      if (status === "Saved") {
        dispatch(fetchJobsApplicationSavedAsync({ filter }));
      }
      if (status === "Deleted") {
        dispatch(fetchJobsApplicationDeletedAsync({ filter }));
      }
    } else {
      filter = {
        status,
        fullName: "",
        startTime: "",
        endTime: "",
      };

      dispatch(addDataFilter(filter));
      if (status === "NotSaved") {
        dispatch(fetchJobsApplicationNotSavedAsync({ filter: { status } }));
      }
      if (status === "Saved") {
        dispatch(fetchJobsApplicationSavedAsync({ filter: { status } }));
      }
      if (status === "Deleted") {
        dispatch(fetchJobsApplicationDeletedAsync({ filter: { status } }));
      }
    }
  };

  //Handle Disabled Date when choose End Date
  const disabledStartTime = (current) => {
    const endDate = moment(endTime, "DD/MM/yyyy");
    return current > moment() || current > endDate;
  };

  //Handle Disabled Date when choose Start Date
  const disabledEndTime = (current) => {
    const startDate = moment(startTime, "DD/MM/yyyy");
    return current < startDate || current > moment();
  };

  const optionsExpiredJobs = [
    { value: false, label: `${t("Job postings")}` },
    { value: true, label: `${t("Job has expired")}` },
  ];

  return (
    <div className={classes.searchApplication}>
      <form onSubmit={handleSearchhApplication}>
        <div className={classes.searchApplication__form}>
          {/* JobSeeker Name */}
          <div>
            <LabelField label={t("Job seeker's name")} />
            <div>
              <InputField
                ref={searchFullNameRef}
                defaultValue={dataFilter?.fullName ?? ""}
                placeholder={t("Search keywords by job seeker's name")}
                icon={<FaSearch />}
              />
            </div>
          </div>

          {/* Job Expired */}
          <div>
            <LabelField label={t("Job Status")} />
            <div>
              <Select
                options={optionsExpiredJobs}
                value={optionsExpiredJobs.filter((option) => {
                  return option.value === isExpired;
                })}
                onChange={changeExpiredJobs}
              />
            </div>
          </div>

          {/* Application Start Date */}
          <div>
            <LabelField label={t("Start date")} />
            <div>
              <DatePicker
                style={{ minHeight: "38px", width: "100%" }}
                showNow={false}
                format={dateFormat}
                defaultValue={
                  dataFilter?.startTime
                    ? moment(dataFilter.startTime, "yyyy-MM-DD")
                    : null
                }
                placeholder={t("Start date")}
                disabledDate={disabledStartTime}
                onChange={(_, dateString) => {
                  setStartTime(dateString);
                }}
              />
            </div>
          </div>

          {/* Application End Date */}
          <div>
            <LabelField label={t("End date")} />
            <div>
              <DatePicker
                style={{ minHeight: "38px", width: "100%" }}
                showNow={false}
                format={dateFormat}
                defaultValue={
                  dataFilter?.endTime
                    ? moment(dataFilter.endTime, "yyyy-MM-DD")
                    : null
                }
                placeholder={t("End date")}
                disabledDate={disabledEndTime}
                onChange={(_, dateString) => {
                  setEndTime(dateString);
                }}
              />
            </div>
          </div>
        </div>
        <div className={classes["searchApplication__form--actions"]}>
          <ButtonField
            backgroundcolor="#324554"
            backgroundcolorhover="#333"
            type="submit"
            uppercase
          >
            {t("search")}
          </ButtonField>
        </div>
      </form>
    </div>
  );
};

export default SearchJobsApplication;
