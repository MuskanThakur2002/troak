import React, { useEffect, useState } from 'react';
import styles from './RewardsPage.module.scss';
import back from "../../images/back.svg";
import Header from '../Header/Header';
import RewardsCard from './RewardsCard';
import { getRewards } from '../../Utilities/ApiHandler';
import VoucherRedemption from '../VoucherRedemption/VoucherRedemption';
import { useNavigate } from "react-router-dom";

const RewardsPage = () => {
  const navigate = useNavigate();
  const sessionId = localStorage.getItem("sessionId");
  const [rewardsData, setRewardsData] = useState({
    totalAmount: 0,
    rewardsCount: 0,
    rewardList: []
  });

  const [isRewardOpen, setIsRewardOpen] = useState(false);

  const [voucherRedemptionData, setVoucherRedemptionData] = useState({});

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        if (!sessionId) {
          console.error("Session ID not found");
          return;
        }

        const response = await getRewards(sessionId);
        if (response?.data?.data) {
          setRewardsData({
            totalAmount: response.data.data.amount,
            rewardsCount: response.data.data.totalVouchers,
            rewardList: response.data.data.rewardList,
          });
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, [sessionId]);


  const handleRewardsClick = async (voucher) => {
    console.log(voucher)
    setVoucherRedemptionData(voucher)
    setIsRewardOpen(true)
  };

  const handleVoucherBackClick = () => {
    setIsRewardOpen(false)
  };

  const handleBackClick = () => {
    navigate(-1);
  };
  return (
    !isRewardOpen ?
      <div className={styles.pageContainer}>
        <img src={back} alt="Back" className={styles.backButton} onClick={handleBackClick} />

        <div className={styles.maincontainer}>
          <div className={styles.mainHeader}>
            Your Rewards
          </div>
          <div className={styles.summary}>
            <div className={styles.totalValue}>
              Total Value ({rewardsData.rewardsCount})
              <span className={styles.totalValueAmount} style={{ lineHeight: "30px" }}>₹{rewardsData.totalAmount}</span>
            </div>
            <div className={styles.rewards}>
              Rewards
              <span style={{ lineHeight: "30px" }}>{rewardsData.rewardsCount}</span>
            </div>
          </div>
        </div>

        {rewardsData.rewardsCount == 0 ?

          <div className={styles.middleContainer}>
            No Rewards
          </div> :
          <div className={styles.gridContainer}>

            {rewardsData?.rewardList?.map((voucher, index) => {
              return <RewardsCard voucher={voucher} handleRewardsClick={handleRewardsClick} />
            })}
          </div>}
      </div>
      :
      <VoucherRedemption data={voucherRedemptionData} handleVoucherBackClick={handleVoucherBackClick} />
  );
};

export default RewardsPage;
