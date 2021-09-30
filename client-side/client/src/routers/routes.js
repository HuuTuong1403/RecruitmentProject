import { lazy } from "react";
import { PATH } from "common/constants/path";

const HomePage = lazy(() => import("../features/Home"));
const EmployersHomePage = lazy(() => import("../features/HomeEmployers"));

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
];
