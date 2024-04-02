import React, { useEffect, useState } from "react";
import styles from "./HomePage.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell as farBell, faBars } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { fetchHomePageDetails } from '../../actions/homePageActions';
import HomePageLiveCard from "./HomePageLiveCard";
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import SwipeableViews from 'react-swipeable-views';
// Make sure you have imported the HomePageLiveCard correctly
import { Spin } from 'antd';

interface Game {
  gameName: string;
  prizeMoney: number;
  webUrl: string;
  endTime: string | null;
  startTime: string | null;
  activePlayers: number;
  campaignId: string;
  remainingRetries: number;
  assest: string;
}

interface CustomWindow extends Window {
  ReactNativeWebView?: {
    postMessage: (message: string) => void;
  };
}

const customWindow = window as CustomWindow;

function HomePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem("tabValue");
    return storedValue ? parseInt(storedValue, 10) : 0;
  });
  const [greeting, setGreeting] = useState<string>("");

  const { loading, data, error } = useSelector((state: RootState) => state.homePage);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    localStorage.setItem("tabValue", newValue.toString());
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
    localStorage.setItem("tabValue", index.toString());
  };

  useEffect(() => {
    const sessionId = localStorage.getItem("sessionId");
    if (sessionId) {
      dispatch(fetchHomePageDetails(sessionId));
    } else {
      logout()
    }
  }, [dispatch]);

  useEffect(() => {
    const now = new Date();
    const currentHour = now.getHours();
    if (currentHour >= 0 && currentHour < 12) {
      setGreeting("Good Morning");
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }
  }, []);

  const logout = () => {
    if (customWindow.ReactNativeWebView) {
      customWindow.ReactNativeWebView.postMessage(JSON.stringify({ action: "requestGoogleSignIn" }));
    }
    localStorage.clear();
    sessionStorage.clear();
    navigate('/login');
  };

  return (
    <div className={styles.container}>

      <div className={styles.header}>
        <div className={styles.menuIconContainer} onClick={() => navigate("/profile")}>
          <FontAwesomeIcon icon={faBars as IconProp} className={styles.menuIcon} />
        </div>
        <div className={styles.iconContainer} onClick={() => navigate("/notification")}>
          <FontAwesomeIcon icon={farBell as IconProp} className={styles.icon} />
        </div>
      </div>
      {loading && <div className={styles.loading}><Spin size="large" /></div>}


      <div className={styles.greeting}>{greeting}</div>
      <div className={styles.userName}>Hello, {data?.data?.name}!</div>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', margin: '0px 15px' }}>
        <Tabs value={value} onChange={handleChange} variant="fullWidth" aria-label="full width tabs example">
          <Tab label="Live" />
          <Tab label="Upcoming" />
          <Tab label="History" />
        </Tabs>
      </Box>
      <SwipeableViews
        axis="x"
        index={value}
        onChangeIndex={handleChangeIndex}
        style={{
          padding: "20px 15px",
          minHeight: `calc(100vh - 250px)`,
          overflow: data && data.data ? 'auto' : 'hidden' // Conditionally setting overflow
        }}
      >
        <div>
          {value === 0 && data?.data?.tournament?.map((game: Game, index: number) => (
            <HomePageLiveCard key={index} page="live" game={game} index={index} />
          ))}
        </div>
        <div>
          {value === 1 && data?.data?.upcoming?.map((game: Game, index: number) => (
            <HomePageLiveCard key={index} page="upcoming" game={game} index={index} />
          ))}
        </div>
        <div>
          {value === 2 && data?.data?.history?.map((game: Game, index: number) => (
            <HomePageLiveCard key={index} page="history" game={game} index={index} />
          ))}
        </div>
      </SwipeableViews>
    </div>

  );
}

export default HomePage;



