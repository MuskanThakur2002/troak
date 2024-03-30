import React, { useEffect, useState } from "react";
import styles from "./HomePage.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell as farBell, faBars, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { fetchHomePageDetails } from '../../actions/homePageActions';
import HomePageLiveCard from "./HomePageLiveCard.";
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

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

const colors = [
  '#117B34FF', '#2E2F73FF', '#E5696DFF', ' #B40047FF'
];

const customWindow = window as CustomWindow;

function HomePage() {


  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [value, setValue] = useState(0);
  const [greeting, setGreeting] = useState<string>("");

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };



  const { loading, data, error } = useSelector((state: RootState) => state.homePage);


  const logout = () => {
    if (customWindow.ReactNativeWebView) {
      customWindow.ReactNativeWebView.postMessage(JSON.stringify({ action: "requestGoogleSignIn" }));
    }

    localStorage.clear();
    sessionStorage.clear();
    navigate('/login');
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
      <div className={styles.greeting}>{greeting}</div>
      <div className={styles.userName}>Hello, {data?.data?.name}!</div>
      <Box sx={{ borderBottom: 1, borderColor: '#BDC1CAFF', width: '100%' }}>
        <Tabs value={value} onChange={handleChange} variant="fullWidth" aria-label="full width tabs example" TabIndicatorProps={{ style: { background: 'none' } }}>
          <Tab label="Live" sx={{
            fontFamily: 'Actor',
            fontSize: '16px',
            fontWeight: '400',
            color: value === 0 ? '#EFB034FF !important' : '#171A1FFF',
          }} />
          <Tab label="Upcoming" sx={{
            fontFamily: 'Actor',
            fontSize: ' 16px',
            fontWeight: '400',
            color: value === 1 ? '#EFB034FF !important' : '#171A1FFF', // Change color based on selection
          }} />

          <Tab label="History" sx={{
            fontFamily: 'Inter',
            fontSize: '16px',
            fontWeight: '400',
            color: value === 2 ? '#EFB034FF !important' : '#171A1FFF', // Change color based on selection
          }} />
        </Tabs>
      </Box>
      <div style={{marginTop:'20px'}}>
        {value === 0 &&
          data?.data?.topTournament.map((game: Game, index: number, array: Game[]) => (
            <HomePageLiveCard page ={"live"} game={game} index={index} cardBackgroundColor={colors[index % colors.length]}
            />
          ))
        }
        {value === 1 && data?.data?.topTournament.map((game: Game, index: number, array: Game[]) => (
          <HomePageLiveCard  page ={"upcoming"} game={game} index={index} cardBackgroundColor={colors[index % colors.length]}
          />
        ))}

        {value === 2 && data?.data?.topTournament.map((game: Game, index: number, array: Game[]) => (
          <HomePageLiveCard page ={"history"} game={game} index={index} cardBackgroundColor={colors[index % colors.length]}
          />
        ))}
      </div>
    </div>

  );
}

export default HomePage;