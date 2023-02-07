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
const EditLeaves = lazy(() => import("./screens/EditLeaves"));
const EditProfiles = lazy(() => import("./screens/EditProfiles"));
const AdminPendingLeaves = lazy(() => import("./screens/AdminPendingLeaves"));
const AdminSnglePendngLeavesScreen = lazy(() => import("./screens/AdmnSnglePendngLeavesScreen"));
const AdminEditLeaves = lazy(()=>import("./screens/AdminEditLeaves"))


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
  {
    path: "/edit-leaves",
    element: (
      <Suspense fallback={<Loader></Loader>}>
        <EditLeaves />
      </Suspense>
    ),
  },
  {
    path: "/edit-profiles",
    element: (
      <Suspense fallback={<Loader></Loader>}>
        <EditProfiles />
      </Suspense>
    ),
  },
  {
    path: "/all-pending-leaves",
    element: (
      <Suspense fallback={<Loader></Loader>}>
        <AdminPendingLeaves />
      </Suspense>
    ),
  },
  {
    path: "/employee-pendingleaves/:employeeId",
    element: (
      <Suspense fallback={<Loader></Loader>}>
        <AdminSnglePendngLeavesScreen/>
      </Suspense>
    ),
  },
  {
    path: "/employee-editleaves/:employeeId",
    element: (
      <Suspense fallback={<Loader></Loader>}>
        <AdminEditLeaves/>
      </Suspense>
    )
  }
]);

export default routes;
