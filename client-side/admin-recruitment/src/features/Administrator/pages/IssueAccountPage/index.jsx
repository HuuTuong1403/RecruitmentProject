import IssueAccountForm from "features/Administrator/components/IssueAccountForm";
import { Fragment } from "react";

const IssueAccountPage = () => {
  return (
    <Fragment>
      <IssueAccountForm title={"Issue Account System Manager"} />
      <IssueAccountForm title={"Issue Account System Administrator"} isAdmin />
    </Fragment>
  );
};
export default IssueAccountPage;
