import React, { useEffect, useState } from 'react';
import styles from './RewardsPage.module.scss';
import back from "../../images/back.svg";
import Header from '../Header/Header';
import RewardsCard from './RewardsCard';
import { getRewards } from '../../Utilities/ApiHandler';
import VoucherRedemption from '../VoucherRedemption/VoucherRedemption';
import { useNavigate } from "react-router-dom";
import { Spin } from 'antd';


const RewardsPage = () => {
  const navigate = useNavigate();
  const sessionId = localStorage.getItem("sessionId");
  const [rewardsData, setRewardsData] = useState({
    totalAmount: 0,
    rewardsCount: 0,
    rewardList: []
  });
  const [loading, setLoading] = useState(false);

  const [isRewardOpen, setIsRewardOpen] = useState(false);

  const [voucherRedemptionData, setVoucherRedemptionData] = useState({});

  useEffect(() => {
    setLoading(true)
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
        setLoading(false)
      } catch (error) {
        setLoading(false)

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
      <>
        {loading ? <div className={styles.loading}><Spin size="large" /></div> :
          <div className={styles.pageContainer}>
            <img src={back} alt="Back" className={styles.backImage} onClick={handleBackClick} />
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
        }
      </>
      :
      <VoucherRedemption data={voucherRedemptionData} handleVoucherBackClick={handleVoucherBackClick} />
  );
};

export default RewardsPage;
