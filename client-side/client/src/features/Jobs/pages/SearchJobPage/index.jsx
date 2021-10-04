import { fetchProvincesAsync } from "features/Home/slices/thunks";
import JobSearchList from "features/Jobs/components/JobSearchList";
import SearchHeader from "features/Jobs/components/SearchHeader";
import { fetchJobsSearchAsync } from "features/Jobs/slices/thunks";
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

  let filter = clearNullObject({
    jobTitle,
    "location%city": location,
    "salary%min[gte]": salary,
    createAt,
  });

  useEffect(() => {
    dispatch(fetchProvincesAsync());
  }, [dispatch]);

  useEffect(() => {
    if (jobTitle || location || salary || createAt) {
      dispatch(fetchJobsSearchAsync({ filter }));
    }
  });

  return (
    <Fragment>
      <SearchHeader />
      <JobSearchList />
    </Fragment>
  );
};

export default SearchJobPage;
