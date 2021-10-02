import JobSearchList from "features/Jobs/components/JobSearchList";
import SearchHeader from "features/Jobs/components/SearchHeader";

const { Fragment } = require("react");

const SearchJobPage = () => {
  return (
    <Fragment>
      <SearchHeader />
      <JobSearchList />
    </Fragment>
  );
};

export default SearchJobPage;
