import { pathEntryTest } from 'common/constants/path'
import { Page404 } from 'components'
import { lazy } from 'react'
import { Route, Switch } from 'react-router-dom'

const InfoExamPage = lazy(() => import('./pages/InfoExamPage'))
const StartExamPage = lazy(() => import('./pages/StartExamPage'))

const EntryTestPage = () => {
  return (
    <Switch>
      <Route exact path={pathEntryTest.infoExam} component={InfoExamPage} />
      <Route exact path={pathEntryTest.startExam} component={StartExamPage} />
      <Route component={Page404} />
    </Switch>
  )
}

export default EntryTestPage
