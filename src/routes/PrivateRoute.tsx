import React from "react";
import { Navigate, Outlet } from "react-router-dom";
// import CustomMenu from "../shared/CustomMenu/CustomMenu";
import styles from "./privateRoute.module.scss";

type Props = {};

const PrivateRoute = (props: Props) => {
  const isSignedIn = localStorage.getItem("token");

  return isSignedIn ? (
    <div className={styles.container}>
      <section className={styles.left_section}>{/* <CustomMenu /> */}</section>
      <section className={styles.right_section}>
        {/* <header className={styles.header}>
          <Header />
        </header> */}
        <div className={styles.outlet}>
          <Outlet />
        </div>
      </section>
    </div>
  ) : (
    <Navigate to={"/login"} />
  );
};

export default PrivateRoute;
