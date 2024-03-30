// Header.tsx

import React from 'react';
import styles from './Header.module.scss'; // Import CSS styles for the header
import { useNavigate } from "react-router-dom";
import back from "../../images/back.svg";

interface HeaderProps {
  HeaderName: string;
}

const Header: React.FC<HeaderProps> = ({ HeaderName }) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    HeaderName === "Notifications" ?
      <div className={styles.headerFixedSpace}>

        <div className={styles.headerFixed}>
          <div className={styles.header}>

            <img
              src={back}
              alt="Back"
              className={styles.backImage}
              onClick={handleBackClick}
            />
            <span className={styles.title}>{HeaderName}</span>
          </div>
        </div>
      </div>

      : HeaderName === "Your Rewards" ?
        <div className={styles.headerFixedSpace}>

          <div className={styles.headerFixed}>
            <div className={styles.RewardsHeader}>

              <img
                src={back}
                alt="Back"
                className={styles.backImage}
                onClick={handleBackClick}
              />
              <span className={styles.title}>{HeaderName}</span>
            </div>
          </div>
        </div> : <></>

  );
};

export default Header;
