import { lazy } from "react";
import { PATH } from "common/constants/path";

const HomePage = lazy(() => import("../features/Home"));

export const routes = [
  {
    children: <HomePage />,
    path: PATH.home,
    exact: false,
  },
];
