import React from 'react';
import styles from './VoucherRedemption.module.scss';
import voucher from '../../images/giftCard.png'
import back from "../../images/back.svg";
import copyIcon from "../../images/boxiconsCopy.svg"
import { useNavigate } from "react-router-dom";
import discount from "../../images/discount.png"
import clock from '../../images/phosphor-clock.svg'
import dotImage from "../../images/boxicons-circle.svg"
const VoucherRedemption = ({ data, handleVoucherBackClick }) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };



  const handleCopyClick = () => {
    navigator.clipboard.writeText(data.rewardCode)
      .then(() => {
        console.log('Text copied to clipboard');
        // Optionally, you can display a success message to the user here.
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
        // Optionally, handle the error case, perhaps by showing an error message.
      });
  };

  const handleRedirectClick = () => {
    window.location.href = data.rewardDeeplink;

  }

  const formatDate = (dateString) => {
    const months = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];

    const date = new Date(dateString);
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    // Function to get the ordinal suffix for the day
    const getOrdinalSuffix = (day) => {
      if (day > 3 && day < 21) return 'th'; // handles the special cases
      switch (day % 10) {
        case 1: return "st";
        case 2: return "nd";
        case 3: return "rd";
        default: return "th";
      }
    }

    return `${day}${getOrdinalSuffix(day)} ${month}, ${year}`;
  };

  return (
    <div className={styles.container}>
      <div className={styles.topContainer}>

        <img src={back} alt="Back" className={styles.backButton} onClick={handleVoucherBackClick} />
        <div className={styles.voucherCard} >

          <img src={voucher} alt="Amazon Voucher" className={styles.voucherImage} />
          <div className={styles.voucherCardDetailContainer}>
            <button className={styles.buttonRewardBrandName}>{data.rewardBrandName}</button>
            <div className={styles.voucherAmount}>₹{data.rewardAmount}</div>

          </div>

        </div>
        <div className={styles.voucherLabel}>VOUCHER CODE</div>
        <div className={styles.voucherCodeBox}>
          <div className={styles.voucherCode}>
            <img src={discount} alt="Copy" className={styles.clipboardIcon} />
            <div className={styles.voucherCodeText}>{data.rewardCode}</div>
          </div>
          <img onClick={handleCopyClick} src={copyIcon} alt="Verified" className={styles.checkIcon} />
        </div>

        <div className={styles.voucherCode}>
          <img src={clock} alt="Copy" className={styles.clockIcon} />
          <div className={styles.ExpiresText}>Expires by {formatDate(data.rewardExpiry)}</div>
        </div>

        <div className={styles.containerText}>
          <div className={styles.containerTopText}>HOW IT WORKS</div>
          <div className={styles.voucherMiddleText}>
            <img src={dotImage} alt="Copy" className={styles.dotIcon} />
            <div className={styles.containerInnerText}>Visit the {data.rewardBrandName} pay page</div>
          </div>

          <div className={styles.voucherMiddleText}>
            <img src={dotImage} alt="Copy" className={styles.dotIcon} />
            <div className={styles.containerInnerText}>Select option to add gift card</div>
          </div>
          <div className={styles.voucherMiddleText}>
            <img src={dotImage} alt="Copy" className={styles.dotIcon} />
            <div className={styles.containerInnerText}>Enter the voucher code under the Add gift card section</div>
          </div>
          <div className={styles.voucherMiddleText}>
            <img src={dotImage} alt="Copy" className={styles.dotIcon} />
            <div className={styles.containerInnerText}>Click on Apply to add the gift card</div>
          </div>
        </div>
      </div>
      <div className={styles.bottomContainer}>
        <button onClick={handleRedirectClick} className={styles.button} >REDEEM NOW</button>
      </div>
    </div>

  );
};

export default VoucherRedemption;
