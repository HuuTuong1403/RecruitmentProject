import { useSelector } from "react-redux";
import { selectedJobSeekerProfile } from "features/JobSeekers/slices/selectors";

const UserProfilePage = () => {
  const detailJobSeeker = useSelector(selectedJobSeekerProfile);

  return (
    <div>
      <h1>{detailJobSeeker?.id}</h1>
    </div>
  );
};

export default UserProfilePage;
