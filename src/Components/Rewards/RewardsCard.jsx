import React, { useEffect } from 'react';
import styles from './RewardsPage.module.scss';
import back from "../../images/back.svg";
import Header from '../Header/Header';
import { useNavigate } from "react-router-dom";
import { getRewards } from '../../Utilities/ApiHandler';

const RewardsCard = ({ voucher, handleRewardsClick }) => {

    function formatRewardExpiry(dateString) {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        
        const date = new Date(dateString);
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear().toString().substr(-2); // Get last two digits of the year
        
        // Function to add the correct ordinal suffix to day
        const getOrdinal = (n) => {
          const s = ["th", "st", "nd", "rd"];
          const v = n % 100;
          return n + (s[(v-20)%10] || s[v] || s[0]);
        };
      
        return `${getOrdinal(day)} ${month}, ${year}`;
      }
      
      
    return (
        <div className={`${styles.voucher} ${!voucher.isActive ? styles.isActive : ''}`} onClick={()=>{handleRewardsClick(voucher)}}>
            <div className={styles.voucherSource}>{voucher.rewardBrandName}</div>
            <div className={styles.voucherAmount}>₹{voucher.rewardAmount}</div>
            <div className={styles.voucherExpiry}>{!voucher.isActive ? 'EXPIRED' : `EXPIRES BY ${formatRewardExpiry(voucher.rewardExpiry)}`}
            </div>
        </div>
    );
};

export default RewardsCard;
