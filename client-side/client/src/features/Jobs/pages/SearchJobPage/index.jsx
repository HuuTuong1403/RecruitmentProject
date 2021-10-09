import { fetchProvincesAsync } from "features/Home/slices/thunks";
import JobSearchList from "features/Jobs/components/JobSearchList";
import SearchHeader from "features/Jobs/components/SearchHeader";
import {
  fetchJobsSearchAsync,
  fetchSkillsAsync,
} from "features/Jobs/slices/thunks";
import { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { clearNullObject } from "common/functions";
import { useTitle } from "common/hook/useTitle";
import { useTranslation } from "react-i18next";

const SearchJobPage = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  let query = new URLSearchParams(useLocation().search);
  const jobTitle = query.get("jobTitle");
  const location = query.get("location%city");
  const salary = query.get("salary%min[gte]");
  const createdAt = query.get("createdAt");
  const skills = query.get("skills");

  let filter = clearNullObject({
    jobTitle,
    "location%city": location,
    "salary%min[gte]": salary,
    createdAt,
    skills,
  });

  useTitle(
    jobTitle || location || salary || createdAt || skills
      ? `${t("Find a job")} ${jobTitle ? `${t("with")} ${jobTitle}` : ""} 
        ${location ? `${t("at")} ${location}` : ""} 
        ${salary ? `${t("from")} ${salary} USD` : ""}
        ${createdAt ? `${t("posted within")} ${createdAt} ${t("day")}` : ""}
        ${skills ? `${t("with skill")} ${skills}` : ""}`
      : `${t("Find all jobs, recruitment news")}`
  );
  useEffect(() => {
    if (jobTitle || location || salary || createdAt || skills) {
      dispatch(fetchJobsSearchAsync({ filter }));
    }
  });

  useEffect(() => {
    dispatch(fetchProvincesAsync());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchSkillsAsync());
  }, [dispatch]);

  return (
    <Fragment>
      <SearchHeader />
      <JobSearchList />
    </Fragment>
  );
};

export default SearchJobPage;
