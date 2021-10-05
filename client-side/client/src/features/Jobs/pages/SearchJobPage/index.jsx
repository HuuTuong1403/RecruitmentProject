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

const SearchJobPage = () => {
  const dispatch = useDispatch();
  let query = new URLSearchParams(useLocation().search);
  const jobTitle = query.get("jobTitle");
  const location = query.get("location%city");
  const salary = query.get("salary%min[gte]");
  const createAt = query.get("createAt");
  const skills = query.get("skills")

  let filter = clearNullObject({
    jobTitle,
    "location%city": location,
    "salary%min[gte]": salary,
    createAt,
    skills
  });

  useEffect(() => {
    dispatch(fetchProvincesAsync());
  }, [dispatch]);

  useEffect(() => {
    if (jobTitle || location || salary || createAt || skills) {
      dispatch(fetchJobsSearchAsync({ filter }));
    }
  });

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
