import React, { useEffect, useState } from "react";
import styles from "./HomePage.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell as farBell, faBars, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { fetchHomePageDetails } from '../../actions/homePageActions';
import HomePageLiveCard from "./HomePageLiveCard.";

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
  '#02563e', '#d6781b', '#013220', '#0000ff', '#ff0000', 
  '#8A2BE2', '#A52A2A', '#DEB887', '#5F9EA0', '#7FFF00',
  '#FF69B4', '#BDB76B', '#8B008B', '#556B2F', '#FF8C00',
  '#9932CC', '#E9967A', '#8FBC8F', '#483D8B', '#2F4F4F'
];

const customWindow = window as CustomWindow;

function HomePage() {


  const navigate = useNavigate();
  const dispatch = useDispatch();

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



  const openProfile = () => {
    navigate("/profile");
  };

  const openNotifications = () => {
    navigate("/notification");
  };
  const handleImageClick = (deepLink: string) => {
    window.location.href = deepLink;
  };


  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div onClick={openProfile}>
          <FontAwesomeIcon icon={faBars} size="lg" />
        </div>
        <div onClick={openNotifications}>
          <FontAwesomeIcon icon={farBell} size="lg" />
        </div>
      </div>
      {data && <>
        <div className={styles.userName}>Hello, {data?.data?.name}!</div>

        <h1>Live Tournaments</h1>

        {/* <div className={styles.imageContainer}> */}
          {data?.data?.topTournament.map((game: Game, index: number, array: Game[]) => (
            <HomePageLiveCard game={game} index={index} cardBackgroundColor={colors[index % colors.length]}
            />
          ))}

        {/* </div> */}
        {/* {data?.data?.otherTournament && (
          <>
            <div className={styles.SuggestedGamesText} style={{ marginTop: "10px" }}>Suggested Games</div>
            <div className={styles.suggestedGamesContainerWrapper}>
              <div className={styles.suggestedGamesContainer}>
                {data.data.otherTournament.slice(0, Math.ceil(data.data.otherTournament.length / 2)).map((game: Game) => (
                  <div key={game.campaignId} className={styles.gameWrapper}>
                    <img
                      src={game.assest}
                      alt={game.campaignId}
                      className={styles.suggestedImage}
                      onClick={() => handleImageClick(game.webUrl)}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.SuggestedGamesText} style={{ marginTop: "20px" }}>More Games</div>
            <div className={styles.suggestedGamesContainerWrapper}>
              <div className={styles.suggestedGamesContainer}>
                {data.data.otherTournament.slice(Math.ceil(data.data.otherTournament.length / 2)).map((game: Game) => (
                  <div key={game.campaignId} className={styles.gameWrapper}>
                    <img
                      src={game.assest}
                      alt={game.campaignId}
                      className={styles.suggestedImage}
                      onClick={() => handleImageClick(game.webUrl)}
                    />
                  </div>
                ))} */}
              {/* </div> */}
            {/* </div> */}
          {/* </> */}
        {/* )} */}
      </>
      }
    </div>
  );
}

export default HomePage;
