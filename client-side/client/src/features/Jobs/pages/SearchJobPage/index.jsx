import { clearNullObject } from "common/functions";
import {
  fetchJobsSearchAsync,
  fetchSkillsAsync,
} from "features/Jobs/slices/thunks";
import { fetchAllFavoriteJobAsync } from "features/JobSeekers/slices/thunks";
import { fetchProvincesAsync } from "features/Home/slices/thunks";
import { Fragment, useEffect } from "react";
import { ScrollTop } from "common/functions";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { useTitle } from "common/hook/useTitle";
import { useTranslation } from "react-i18next";
import JobSearchList from "features/Jobs/components/JobSearchList";
import SearchHeader from "features/Jobs/components/SearchHeader";

const SearchJobPage = () => {
  ScrollTop();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  let query = new URLSearchParams(useLocation().search);
  const jobTitle = query.get("jobTitle");
  const location = query.get("location%city");
  const salary = query.get("salary%min[gte]");
  const level = query.get("level");
  const position = query.get("position");
  const createdAt = query.get("createdAt");
  const skills = query.get("skills");
  const companyName = query.get("companyName");

  let filter = clearNullObject({
    companyName,
    jobTitle,
    "location%city": location,
    "salary%min[gte]": salary,
    level,
    position,
    createdAt,
    skills,
  });

  useTitle(
    jobTitle ||
      location ||
      salary ||
      level ||
      position ||
      createdAt ||
      skills ||
      companyName
      ? `${t("Find a job")} ${jobTitle ? `${t("with")} ${jobTitle}` : ""} 
        ${companyName ? `${t("at")} ${companyName}` : ""} 
        ${location ? `${t("at")} ${location}` : ""} 
        ${salary ? `${t("from")} ${salary} USD` : ""}
        ${level ? `${t("with level")} ${level}` : ""}
        ${position ? `${t("with position")} ${position}` : ""}
        ${createdAt ? `${t("posted within")} ${createdAt} ${t("day")}` : ""}
        ${skills ? `${t("with skill")} ${skills}` : ""}`
      : `${t("Find all jobs, recruitment news")}`
  );

  useEffect(() => {
    if (
      jobTitle ||
      location ||
      salary ||
      level ||
      position ||
      createdAt ||
      skills ||
      companyName
    ) {
      dispatch(fetchJobsSearchAsync({ filter }));
    }
  });

  useEffect(() => {
    dispatch(fetchProvincesAsync());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchSkillsAsync());
  }, [dispatch]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(fetchAllFavoriteJobAsync());
    }
  }, [dispatch]);

  return (
    <Fragment>
      <SearchHeader />
      <JobSearchList />
    </Fragment>
  );
};

export default SearchJobPage;
