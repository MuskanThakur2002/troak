import React, { Suspense } from "react";
import { Fragment, lazy, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
// import "./App.css";
import Login from "../Components/Login/Login";
import PrivateRoute from "../routes/PrivateRoute";
import HomePage from "./HomePage/HomePage";
import Profile from "./ProfilePage/Profile";
import LeaderBoard from "./LeaderBoardPage/LeaderBoardPage";
import Notification from "./NotificationBar/NotificationBar";
import VoucherRedemption from "./VoucherRedemption/VoucherRedemption";
import RewardsPage from "./Rewards/RewardsPage";

type Props = {};

interface routeObj {
  path: string;
  element: React.FC;
}

const AppRouter = (props: Props) => {
  const privateRoutes: Array<routeObj> = [
    {
      path: "/",
      element: HomePage,
    },
    {
      path: "/login",
      element: Login,
    },

    {
      path: "/profile",
      element: Profile,
    },
    {
      path: "/leaderBoard",
      element: LeaderBoard,
    },

    {
      path: "/notification",
      element: Notification,
    },
    {
      path: "/rewards",
      element: RewardsPage,
    },

  ];

  return (
    <React.Fragment>
      <Suspense fallback={<p>loading</p>}>
        <Routes>
          <Route path="/login" element={<Login />} />
          {privateRoutes.map(({ element: Element, path }, key) => (
            <React.Fragment key={key}>
              <Route path="/" element={<PrivateRoute />} >
                {key === 0 ? (
                  <Route index element={<Element />} />
                ) : (
                  <Route path={path} element={<Element />} />
                )}
              </Route>
            </React.Fragment>
          ))}
        </Routes>
      </Suspense>
    </React.Fragment>
  );
};

export default AppRouter;

