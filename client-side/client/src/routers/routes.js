import { lazy } from "react";
import { PATH } from "common/constants/path";

const HomePage = lazy(() => import("features/Home"));
const EmployersHomePage = lazy(() => import("features/HomeEmployers"));
const JobsPage = lazy(() => import("features/Jobs"));
const DashboardJobSeekersPage = lazy(() => import("features/JobSeekers"));
const DashboardEmployersPage = lazy(() => import("features/Employers"));

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
    path: PATH.jobseekers,
    role: "JobSeekers",
  },
  {
    component: DashboardEmployersPage,
    exact: false,
    path: PATH.business,
    role: "Employers",
  },
];
