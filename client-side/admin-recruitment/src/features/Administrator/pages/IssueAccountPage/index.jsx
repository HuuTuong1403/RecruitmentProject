import { Fragment } from 'react'
import { scrollToTop } from 'common/functions'
import IssueAccountForm from 'features/Administrator/components/IssueAccountForm'

const IssueAccountPage = () => {
  scrollToTop()
  return (
    <Fragment>
      <IssueAccountForm title={'Issue Account System Manager'} />
      <IssueAccountForm title={'Issue Account System Administrator'} isAdmin />
    </Fragment>
  )
}
export default IssueAccountPage
