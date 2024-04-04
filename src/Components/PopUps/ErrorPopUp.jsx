import React, { useEffect } from "react";
import styles from "./ErrorPopUp.module.scss";
import Crossicon from '../../images/error.svg';

const ErrorPopUp = (props) => {
  const { onClose }=props;

  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);

  const handleClose = () => {
    document.body.style.overflow = "auto";
    onClose()
  };

  return (
     <div className={styles.popupContainer}>
     <div id={styles.outerContainer}>
       <div className={styles.MDContainer}>
         <div id={styles.successInnerText}>
           <img className={styles.errorImage} alt="logo" src={Crossicon} />
           <div className={styles.juspayHeader}>{"Technical Error"}</div>
           <div className={styles.juspayText}>{"Something went wrong at our end. Please wait a few minutes and try again"}</div>
           <button onClick={handleClose} className={styles.successButtonForPopUp}>{"ok"}</button>
         </div>
       </div>
     </div>
   </div>
  );
};

export default ErrorPopUp;
