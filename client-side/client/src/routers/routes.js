import { lazy } from "react";
import { PATH, pathJobSeeker, pathEmployer } from "common/constants/path";

const DashboardEmployersPage = lazy(() => import("features/Employers"));
const DashboardJobSeekersPage = lazy(() => import("features/JobSeekers"));
const EmployersHomePage = lazy(() => import("features/HomeEmployers"));
const HomePage = lazy(() => import("features/Home"));
const JobsPage = lazy(() => import("features/Jobs"));

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
];

export const privateRoutes = [
  {
    component: DashboardJobSeekersPage,
    exact: false,
    path: pathJobSeeker.jobseekers,
    role: "JobSeekers",
  },
  {
    component: DashboardEmployersPage,
    exact: false,
    path: pathEmployer.dashboard,
    role: "Employers",
  },
];
