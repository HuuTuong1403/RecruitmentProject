import { Fragment } from 'react'
import { ScrollTop } from 'common/functions'
import IssueAccountForm from 'features/Administrator/components/IssueAccountForm'

const IssueAccountPage = () => {
  ScrollTop()
  return (
    <Fragment>
      <IssueAccountForm title={'Issue Account System Manager'} />
      <IssueAccountForm title={'Issue Account System Administrator'} isAdmin />
    </Fragment>
  )
}
export default IssueAccountPage
