import { lazy } from 'react'
import { PATH, pathJobSeeker, pathEmployer } from 'common/constants/path'
import EntryTestPage from 'features/EntryTest'

const DashboardEmployersPage = lazy(() => import('features/Employers'))
const DashboardJobSeekersPage = lazy(() => import('features/JobSeekers'))
const EmployersHomePage = lazy(() => import('features/HomeEmployers'))
const HomePage = lazy(() => import('features/Home'))
const JobsPage = lazy(() => import('features/Jobs'))
const EventsPage = lazy(() => import('features/Events'))

export const routes = [
  {
    children: <HomePage />,
    path: PATH.home,
    exact: false,
  },
  {
    children: <EmployersHomePage />,
    path: PATH.employer,
    exact: false,
  },
  {
    children: <JobsPage />,
    path: PATH.jobs,
    exact: false,
  },
  {
    children: <EventsPage />,
    path: PATH.events,
    exact: false,
  },
  {
    children: <EntryTestPage />,
    path: PATH.entryTests,
    exact: false,
  },
]

export const privateRoutes = [
  {
    component: DashboardJobSeekersPage,
    exact: false,
    path: pathJobSeeker.jobseekers,
    role: 'JobSeekers',
  },
  {
    component: DashboardEmployersPage,
    exact: false,
    path: pathEmployer.dashboard,
    role: 'Employers',
  },
]

export const routesEmployer = [
  {
    component: lazy(() => import('features/Employers/pages/EmployerStatisticPage')),
    path: pathEmployer.statistic,
  },
  {
    component: lazy(() => import('features/Employers/pages/EmployersProfilePage')),
    path: pathEmployer.myProfile,
  },
  {
    component: lazy(() => import('features/Employers/pages/PostJobPage')),
    path: pathEmployer.postJob,
  },
  {
    component: lazy(() => import('features/Employers/pages/RecruitManagementPage')),
    path: pathEmployer.createdJob,
  },
  {
    component: lazy(() => import('features/Employers/pages/RecruitmentTrashPage')),
    path: pathEmployer.deletedJob,
  },
  {
    component: lazy(() => import('features/Employers/pages/QuestionManagementPage')),
    path: pathEmployer.managementQuestion,
  },
  {
    component: lazy(() => import('features/Employers/pages/QuestionTrashPage')),
    path: pathEmployer.trashQuestion,
  },
  {
    component: lazy(() => import('features/Employers/pages/QuestionCreatedPage')),
    path: pathEmployer.createdQuestion,
  },

  {
    component: lazy(() => import('features/Employers/pages/EntryTestManagementPage')),
    path: pathEmployer.managementEntryTest,
  },
  {
    component: lazy(() => import('features/Employers/pages/EntryTestTrashPage')),
    path: pathEmployer.trashEntryTest,
  },
  {
    component: lazy(() => import('features/Employers/pages/EntryTestCreatedPage')),
    path: pathEmployer.createdEntryTest,
  },
  {
    component: lazy(() => import('features/Employers/pages/PostEventPage')),
    path: pathEmployer.postEvent,
  },
  {
    component: lazy(() => import('features/Employers/pages/UpdateEventPage')),
    path: pathEmployer.updateEvent,
  },
  {
    component: lazy(() => import('features/Employers/pages/ParticipantsEventPage')),
    path: pathEmployer.participantEvent,
  },
  {
    component: lazy(() => import('features/Employers/pages/EventManagementPage')),
    path: pathEmployer.createdEvent,
  },
  {
    component: lazy(() => import('features/Employers/pages/EventTrashPage')),
    path: pathEmployer.deletedEvent,
  },
  {
    component: lazy(() => import('features/Employers/pages/CandidateProfileManagementPage')),
    path: pathEmployer.candidateProfileManage,
  },
  {
    component: lazy(() => import('features/Employers/pages/SettingPage')),
    path: pathEmployer.settingAccount,
  },
  {
    component: lazy(() => import('features/Employers/pages/ServicePackageManagement')),
    path: pathEmployer.managementServicePackage,
  },
  {
    component: lazy(() => import('features/Employers/pages/OrderPage')),
    path: pathEmployer.order,
  },
]
