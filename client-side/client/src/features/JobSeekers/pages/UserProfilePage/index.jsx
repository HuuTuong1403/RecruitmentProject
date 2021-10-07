import { useSelector } from "react-redux";
import { selectedJobSeekerProfile } from "features/JobSeekers/slices/selectors";
import { ScrollTop } from "common/functions";

const UserProfilePage = () => {
  ScrollTop();
  const detailJobSeeker = useSelector(selectedJobSeekerProfile);

  return (
    <div>
      <div>{detailJobSeeker?.id}</div>
    </div>
  );
};

export default UserProfilePage;
