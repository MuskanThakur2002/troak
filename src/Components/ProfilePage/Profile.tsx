import React, { useEffect, useState } from "react";
import styles from "./Profile.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core'; // Import IconProp
import { faEdit, faSave } from '@fortawesome/free-solid-svg-icons'; // Import the edit and save icons
import live from "../../images/live.jpg";
import { RiEdit2Line, RiHome2Line } from 'react-icons/ri'; // Import edit and home icons
import { FaDollarSign } from 'react-icons/fa'; // Import dollar icon
import { AiFillStar } from 'react-icons/ai'; // Import star icon
import { MdArrowForward } from 'react-icons/md'; // Import arrow icon
import Feedback from "../FeedbackPage/Feedback";
import HomeImage from "../../images/Home.svg"
import EarningImage from "../../images/Earnings.svg"
import FeedBackImage from "../../images/Feedback.svg"
import RateImage from "../../images/Ratings.svg"
import { updateUserDetails, userSignOut } from "../../Utilities/ApiHandler"
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { fetchHomePageDetails } from '../../actions/homePageActions';
import { useNavigate } from "react-router-dom";
import { Spin } from 'antd';

interface UserData {
  name: string;
  phoneNumber: string;
}


interface CustomWindow extends Window {
  ReactNativeWebView?: {
    postMessage: (message: string) => void;
  };
}
const customWindow = window as CustomWindow;

function Profile() {
  const { loading, data, error } = useSelector((state: RootState) => state.homePage);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [activeIcon, setActiveIcon] = useState<string>("home");

  const handleIconClick = (iconName: string) => {
    setActiveIcon(iconName);

    if ("feedback" == iconName) {
      handleFeedbackClick()
    }

    if ("home" == iconName) {
      navigate('/');
    }
    if ("earnings" == iconName) {
      navigate('/rewards');
    }
  };

  const { name, mobileNumber, totalEarning, profileImage } = data?.data ?? {};
  const initialUserData: UserData = {
    name: name || '',
    phoneNumber: mobileNumber || '',
  };


  useEffect(() => {
    const sessionId = localStorage.getItem("sessionId");
    if (sessionId !== null && sessionId !== undefined) {
      dispatch(fetchHomePageDetails(sessionId));
    } else {
      logout()
    }
  }, [dispatch]);

  useEffect(() => {
    const initialUserData: UserData = {
      name: name || '',
      phoneNumber: mobileNumber || ''
    };

    setUserData(initialUserData);

  }, [name, mobileNumber, totalEarning]); // Dependency array ensures useEffect runs only once on component mount

  // State variables to track user data and edit mode
  const [userData, setUserData] = useState<UserData>(initialUserData);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [showPopup, setShowPopup] = useState<boolean>(false);

  // Function to handle edit icon click
  const handleEditClick = () => {
    setEditMode(!editMode);
  };

  const handleClose = () => {
    setShowPopup(false);
  };


  // Function to handle input change for name
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({
      ...userData,
      name: event.target.value
    });
  };


  function formatPhoneNumber(phoneNumber: string): string | null {
    const cleaned = ('' + phoneNumber).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return match[1] + + match[2] + match[3];
    }
    return null;
  }



  // Function to handle input change for phone number
  const handlePhoneNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({
      ...userData,
      phoneNumber: event.target.value
    });
  };


  const saveUserData = async () => {
    const sessionId = localStorage.getItem("sessionId");
    if (sessionId !== null && sessionId !== undefined) {
      try {
        await updateUserDetails(sessionId, userData.phoneNumber, userData.name);
        setEditMode(false);
        dispatch(fetchHomePageDetails(sessionId));
      } catch (error) {
        console.error('Error updating user details:', error);
      }
    } else {
      logout()
    }

  };

  const logoutApiCall = async () => {
    try {

      const sessionId = localStorage.getItem("sessionId");

      if (sessionId) {
        await userSignOut(sessionId);
      }

      logout();
    } catch (error) {
      logout();

      console.error("Error during logout:", error);
    }
  };


  const handleFeedbackClick = () => {
    setShowPopup(true)
  };

  const logout = () => {
    if (customWindow.ReactNativeWebView) {
      customWindow.ReactNativeWebView.postMessage(JSON.stringify({ action: "requestGoogleSignOut" }));
    }

    localStorage.clear();
    sessionStorage.clear();
    navigate('/login')
  };


  const formattedPhoneNumber = formatPhoneNumber(userData.phoneNumber);

  return (
    <div className={styles.mainProfileContainer}>
      {loading ? <div className={styles.loading}><Spin size="large" /></div> :
        <div className={styles.profile}>
          <div className={styles.rectangle}>
            <div className={styles.editOption} onClick={handleEditClick}>
              {editMode ? (
                <FontAwesomeIcon icon={faSave as IconProp} className={styles.editIcon} onClick={saveUserData} />
              ) : (
                <RiEdit2Line className={styles.editIcon} />
              )}
            </div>
            <div className={styles.userInfo}>
              <div className={styles.userImage}>

                <img
                  src={`data:image/svg+xml;base64,${profileImage}`}
                  alt="Profile"
                  className={styles.profileImageSize}
                />
              </div>
              <div className={styles.userData}>
                {editMode ? (
                  <>
                    <input
                      type="text"
                      id="name"
                      value={userData.name}
                      onChange={handleNameChange}
                      className={`${styles.input} ${styles.inputWithBorder}`}
                      placeholder="Enter your name"
                    />
                    <input
                      type="text"
                      id="phoneNumber"
                      value={userData.phoneNumber}
                      onChange={handlePhoneNumberChange}
                      className={`${styles.input} ${styles.inputWithBorder}`}
                      placeholder="Enter your phone number"
                    />
                  </>
                ) : (
                  <>
                    <div className={styles.userName}>{userData.name}</div>
                    {formattedPhoneNumber && <div className={styles.userNumber}>+91 {formattedPhoneNumber}</div>}
                  </>
                )}
              </div>
            </div>
          </div>

          <div className={styles.middleContainer}>
            <div className={`${styles.column} ${activeIcon === "home" ? styles.active : ""}`}
              onClick={() => { handleIconClick("home") }}>
              <img src={HomeImage} className={`${activeIcon === "home" ? styles.greenIcon : styles.icon}`} alt="Home Icon" />
              Home
            </div>

            <div className={`${styles.column} ${activeIcon === "earnings" ? styles.active : ""}`}
              onClick={() => handleIconClick("earnings")}>
              <img src={EarningImage} className={`${activeIcon === "earnings" ? styles.greenIcon : styles.icon}`} alt="Earnings Icon" />
              Total Rewards
              <div className={styles.amount}>{totalEarning ? totalEarning : 0}</div>
            </div>

            <div className={`${styles.column} ${activeIcon === "feedback" ? styles.active : ""}`}
              onClick={() => handleIconClick("feedback")}>
              <img src={FeedBackImage} className={`${activeIcon === "feedback" ? styles.active : ""}`} alt="Feedback Icon" />
              Give Us Feedback
              <div className={`${styles.arrowIcon}  ${activeIcon === "feedback" ? styles.active : ""}`}>{">"}</div>

            </div>

            <div className={`${styles.column} ${activeIcon === "rate" ? styles.active : ""}`}
              onClick={() => handleIconClick("rate")}>
              <img src={RateImage} className={`${activeIcon === "rate" ? styles.active : ""}`} alt="Ratings Icon" />
              Rate Us on Playstore
              <div className={`${styles.arrowIcon}  ${activeIcon === "rate" ? styles.active : ""}`} >{">"}</div>
            </div>
          </div>

          <div className={styles.button} onClick={logoutApiCall}>Log out</div>
        </div>
      }

      <Feedback isOpen={showPopup} onClose={handleClose} />

    </div>
  );
}

export default Profile;
