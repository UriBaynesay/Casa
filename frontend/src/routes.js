import { Homepage } from "./views/Homepage"
import { lazy } from "react"
import { Suspense } from "react"

const StayExploerPage = lazy(() => import("./views/stay-explore"))
const HostPage = lazy(() => import("./views/host-page"))
const StayDetailsPage = lazy(() => import("./views/stay-details"))
const StayEditPage = lazy(() => import("./views/stay-edit"))
const LoginPage = lazy(() => import("./views/login"))
const SignupPage = lazy(() => import("./views/signup"))
const UserTripsPage = lazy(() => import("./views/user-trips"))
const UserStaysPage = lazy(() => import("./views/user-stays"))
const LogoutPage = lazy(() => import("./views/logout"))
const UserOrdersPage = lazy(() => import("./views/user-orders"))
const UserProfilePage = lazy(() => import("./views/user-profile"))
const UserProfileEditPage = lazy(() => import("./views/user-profile-edit"))
const StayDeletePage = lazy(() => import("./views/stay-delete"))
const StayAddPage = lazy(() => import("./views/stay-add"))

const routes = [
  {
    path: "/",
    component: <Homepage />,
  },
  {
    path: "/stays",
    component: (
      <Suspense>
        <StayExploerPage />
      </Suspense>
    ),
  },
  {
    path: "/host",
    component: (
      <Suspense>
        <HostPage />
      </Suspense>
    ),
  },
  {
    path: "/stay/details/:stayId",
    component: (
      <Suspense>
        <StayDetailsPage />
      </Suspense>
    ),
  },
  {
    path: "/stay/edit/:stayId",
    component: (
      <Suspense>
        <StayEditPage />
      </Suspense>
    ),
  },
  {
    path: "/stay/add/",
    component: (
      <Suspense>
        <StayAddPage />
      </Suspense>
    ),
  },
  {
    path: "/stay/delete/:stayId",
    component: (
      <Suspense>
        <StayDeletePage />
      </Suspense>
    ),
  },
  {
    path: "/login",
    component: (
      <Suspense>
        <LoginPage />
      </Suspense>
    ),
  },
  {
    path: "/signup",
    component: (
      <Suspense>
        <SignupPage />
      </Suspense>
    ),
  },
  {
    path: "user/profile/:userId",
    component: (
      <Suspense>
        <UserProfilePage />
      </Suspense>
    ),
  },
  {
    path: "user/profile/edit/:userId",
    component: (
      <Suspense>
        <UserProfileEditPage />
      </Suspense>
    ),
  },
  {
    path: "user/trips",
    component: (
      <Suspense>
        <UserTripsPage />
      </Suspense>
    ),
  },
  {
    path: "user/orders",
    component: (
      <Suspense>
        <UserOrdersPage />
      </Suspense>
    ),
  },
  {
    path: "user/stays",
    component: (
      <Suspense>
        <UserStaysPage />
      </Suspense>
    ),
  },
  {
    path: "user/logout",
    component: (
      <Suspense>
        <LogoutPage />
      </Suspense>
    ),
  },
]

export default routes
