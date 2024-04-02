import styles from "./LeaderBoardPage.module.scss"; // Import the SCSS module
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import back from "../../images/back.svg";
import heart from "../../images/heart.svg";
import time from "../../images/stopwatch.svg";
// import PlayersIcon from "../../images/player.jpg"
import React, { useEffect, useState, useCallback } from 'react';
import { getLeaderBoardDetails, fetchCampaignInfomation, postGameScore } from '../../Utilities/ApiHandler'; // Import the API function
import { Unity, useUnityContext } from "react-unity-webgl";
import coin from "../../images/trophy-star.png"
import player from "../../images/publicIcon.jpg"
import { Spin } from 'antd';

const LeaderBoardPage = () => {

  const navigate = useNavigate();
  const [players, setPlayers] = useState([]);
  const sessionId = localStorage.getItem("sessionId");
  const campaignId = localStorage.getItem("topTournamentCampaignId");
  const imageUrl = localStorage.getItem("topTournamentImageUrl");
  const backGroundColor = localStorage.getItem("leaderBoardColor");
  const userName = localStorage.getItem("userName");
  const [userScore, setUserScore] = useState(0);
  const [loading, setLoading] = useState(false);

  const [totalPlayer, setTotalPlayer] = useState(0);
  const [retryData, setRetryData] = useState(0);
  const [prize, setPrize] = useState(0);
  const [hoursDifference, setHoursDifference] = useState(0);
  const [minutesDifference, setMinutesDifference] = useState(0);
  const [openGame, setOpenGame] = useState(false)
  const [gameTimeAvailable, setGameTimeAvailable] = useState(true);
  const historyPage = localStorage.getItem("page") == "history"
  const [showLoading, setShowLoading] = useState(false); // New state for controlling loading message visibility

  const logout = () => {
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(JSON.stringify({ action: "requestGoogleSignIn" }));
    }
    localStorage.clear();
    sessionStorage.clear();
    navigate('/login');
  };

  const tournamentGameEndTime = (gameEndTime) => {
    if (gameEndTime) {
      const now = new Date();
      const endTimeData = new Date(gameEndTime);
      const timeDifference = endTimeData.getTime() - now.getTime();

      const hoursDiff = Math.floor(timeDifference / (1000 * 60 * 60));
      const minutesDiff = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

      console.log(now, endTimeData, now > endTimeData)
      if (now > endTimeData) {
        setGameTimeAvailable(false)
      } else {
        setHoursDifference(hoursDiff);
        setMinutesDifference(minutesDiff);
      }
    }
  };

  const getGameScore = async (gameScore, retryCount, bestscore) => {
    try {
      const sessionId = localStorage.getItem("sessionId");

      if (sessionId) {
        await postGameScore(sessionId, campaignId, bestscore, retryCount);
        fetchCampaignInfo();

      } else {
        console.error("Session ID not found");
        logout();
      }
    } catch (error) {
      console.error("Error fetching leaderboard data:", error);
    }
  };

  useEffect(() => {
    fetchCampaignInfo();
  }, []);


  const fetchCampaignInfo = async () => {
    setLoading(true)

    try {
      if (sessionId) {
        const response = await fetchCampaignInfomation(sessionId, campaignId);
        if (response && response.data && response.data.data) {
          setRetryData(response.data.data.retryCount)
          setUserScore(response.data.data.gameScore)
          fetchLeaderboardData();
        }
      } else {
        console.error("Session ID not found");
        logout();
      }
    } catch (error) {
      setLoading(false)

      console.error("Error fetching leaderboard data:", error);
    }
  };

  const fetchLeaderboardData = async () => {
    try {
      setLoading(true)

      if (sessionId) {
        const response = await getLeaderBoardDetails(sessionId, campaignId, localStorage.getItem("page"));
        if (response && response.data && response.data.data) {
          setPlayers(response.data.data.userGameDetails)
          setTotalPlayer(response.data.data.totalPlayer)
          setPrize(response.data.data.prize)
          tournamentGameEndTime(response.data.data.gameEndTime)
          setLoading(false)

        }
      } else {
        setLoading(false)
        console.error("Session ID not found");
        logout()
      }
    } catch (error) {
      setLoading(false)
      console.error("Error fetching leaderboard data:", error);
    }
  };



  const handleBackClick = () => {
    navigate(-1);
  };

  const { unityProvider, sendMessage, addEventListener, removeEventListener, loadingProgression, isLoaded } =
    useUnityContext({
      loaderUrl: localStorage.getItem("loaderUrl"),
      dataUrl: localStorage.getItem("dataUrl"),
      frameworkUrl: localStorage.getItem("frameworkUrl"),
      codeUrl: localStorage.getItem("codeUrl"),
    });

  useEffect(() => {
    fetchCampaignInfo();
  }, []);


  useEffect(() => {
    if (loadingProgression === 1) {
      setShowLoading(false);
    }
  }, [loadingProgression]);


  const handleImageClick = () => {
    if (isLoaded) {
      setOpenGame(true)
      handleClickSpawnEnemies()
    } else {
      console.log(loadingProgression, isLoaded)

    }
  };

  const handleGameOver = useCallback((retry, score, bestscore, toQuit) => {
    console.log(retry, score, bestscore, toQuit)
    if (toQuit) {
      setOpenGame(false)
    }
    getGameScore(score, retry, bestscore)
  }, []);

  useEffect(() => {
    addEventListener("GameOver", handleGameOver);
    return () => {
      removeEventListener("GameOver", handleGameOver);
    };
  }, [addEventListener, removeEventListener, handleGameOver]);

  function handleClickSpawnEnemies() {
    sendMessage('GameManager', 'SetRetries', retryData);
  }

  const cardStyle = {
    backgroundColor: backGroundColor,
  };


  return (

    <>
      {loading &&
        <div className={styles.loading}><Spin size="large" /></div>
      }
      {gameTimeAvailable &&
        <Unity unityProvider={unityProvider}
          style={{ visibility: openGame ? "visible" : "hidden" }}
          className={styles.unityContainer} />
      }
      {
        (!(loading) && !openGame) &&
        <div>
          <div onClick={handleBackClick}>
            <img src={back} alt="Back" className={styles.backImage} />
          </div>

          <div className={styles.topContainer} style={{ ...cardStyle }}>
            <div className={styles.innerContainer}>
              <img src={imageUrl} alt="Game" className={styles.Livegame} />

            </div>
            {!historyPage ?
              <>
                <div className={styles.biggerOverLapContainer}>
                  <span className={styles.topUsers}>
                    <img
                      src={player}
                      alt="user2"
                      className={styles.colImg}
                      style={{ left: "0px" }}
                    />
                    <span className={styles.TotalUserPlaying}>{totalPlayer ? totalPlayer : 0} Playing</span>
                  </span>
                </div>

                <div className={styles.outerSmallContainer}>
                  <div className={styles.SmallImageContainer}>
                    <div className={styles.ImageTextPair}>
                      <img
                        src={heart}
                        alt="KFC Game"
                        className={styles.TopSmallImage}
                      />
                      <div className={styles.TopSmallImageText}> Chances {retryData}</div>
                    </div>
                    <div className={styles.ImageTextPair}>
                      <img src={coin} alt="KFC Game" className={styles.TopSmallStarImage} />
                      <div className={styles.TopSmallImageText}>Prize Pool ₹{prize ? prize : 0}</div>
                    </div>
                    <div className={styles.ImageTextPair}>
                      <img src={time} alt="KFC Game" className={styles.TopSmallImage} />
                      <div className={styles.TopSmallImageText}> Ends In {hoursDifference}h:{minutesDifference}m</div>
                    </div>
                  </div>
                </div>
              </>
              :
              <div className={styles.historyContainer}>
                <div className={styles.userName}>{userName}</div>
                <div className={styles.userScore}>Score: {userScore}</div>
              </div>
            }

          </div>
          {!historyPage &&

            <div className={styles.buttonContainer} onClick={handleImageClick}>
              <button className={styles.playButton}>Play</button>

            </div>
          }

          <div className={styles.container}>
            <div className={styles.text}>Tournament Leaderboard</div>

            {players && players.map(player => (
              <div className={styles.userDetails} key={player.rank}>
                <span className={styles.id} id={styles.space}>
                  {player.rank}
                </span>

                {player.profileImage && <img src={`data:image/svg+xml;base64,${player.profileImage}`} id={styles.space} alt="Profile" className={styles.image} />}

                <span id={styles.space} className={styles.name}>
                  <div>{player.userName}</div>
                  {historyPage && player.winningAmount && player.brandName && <div className={styles.wontext}>Won {player.winningAmount} INR {player.brandName} Giftcard</div>}

                </span>
                <span id={styles.spacePoints} className={styles.points}>
                  {player.gameScore}
                </span>
              </div>
            ))}
          </div>
        </div>
      }
    </>

  );
};

export default LeaderBoardPage;