import React, { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import Loader from "./components/Loader";

const LoginScreen = lazy(() => import("./screens/LoginScreen"));
const HomeScreen = lazy(() => import("./screens/HomeScreen"));
const TeamScreen = lazy(() => import("./screens/TeamScreen"));
const DailyHoursScreen = lazy(() => import("./screens/DailyHoursScreen"));
const ChangePasswordScreen = lazy(() =>
  import("./screens/ChangePasswordScreen")
);
const ApplyLeaves = lazy(() => import("./screens/ApplyLeaves"));
const LeaveScreen = lazy(() => import("./screens/LeaveScreen"));


const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Loader></Loader>}>
        <LoginScreen />
      </Suspense>
    ),
  },
  {
    path: "/home",
    element: (
      <Suspense fallback={<Loader></Loader>}>
        <HomeScreen />
      </Suspense>
    ),
  },
  {
    path: "/team",
    element: (
      <Suspense fallback={<Loader></Loader>}>
        <TeamScreen />
      </Suspense>
    ),
  },
  {
    path: "/changepassword",
    element: (
      <Suspense fallback={<Loader></Loader>}>
        <ChangePasswordScreen />
      </Suspense>
    ),
  },
  {
    path: "/dailyhours",
    element: (
      <Suspense fallback={<Loader></Loader>}>
        <DailyHoursScreen />
      </Suspense>
    ),
  },
  {
    path: "/leaves",
    element: (
      <Suspense fallback={<Loader></Loader>}>
        <LeaveScreen />
      </Suspense>
    ),
  },
  {
    path: "/applyleaves",
    element: (
      <Suspense fallback={<Loader></Loader>}>
        <ApplyLeaves />
      </Suspense>
    ),
  },
]);

export default routes;
