// import React, { useEffect, useState, useCallback } from 'react';
// import styles from './LeaderBoardPage.module.scss';
// import back from "../../images/back.svg";
// import { useNavigate } from "react-router-dom";
// import { getLeaderBoardDetails, fetchCampaignInfomation, postGameScore } from '../../Utilities/ApiHandler'; // Import the API function
// import playIcon from "../../images/material-play-circle-outline.svg";
// import { Unity, useUnityContext } from "react-unity-webgl";

// const LeaderBoardPage = () => {
//   const navigate = useNavigate();
//   const [players, setPlayers] = useState([]);
//   const sessionId = localStorage.getItem("sessionId");
//   const campaignId = localStorage.getItem("topTournamentCampaignId");
//   const imageUrl = localStorage.getItem("topTournamentImageUrl");
//   const gameTrackerId = localStorage.getItem("gameTrackerId");
//   const [totalPlayer, setTotalPlayer] = useState(0);
//   const [retryData, setRetryData] = useState(0);
//   const [prize, setPrize] = useState(0);
//   const [hoursDifference, setHoursDifference] = useState(0);
//   const [minutesDifference, setMinutesDifference] = useState(0);
//   const [endTime, setEndTime] = useState(new Date());
//   const [openGame, setOpenGame] = useState(false)
//   const [gameTimeAvailable, setGameTimeAvailable] = useState(true)

//   const logout = () => {
//     if (window.ReactNativeWebView) {
//       window.ReactNativeWebView.postMessage(JSON.stringify({ action: "requestGoogleSignIn" }));
//     }
//     localStorage.clear();
//     sessionStorage.clear();
//     navigate('/login');
//   };

//   const tournamentGameEndTime = (gameEndTime) => {
//     if (gameEndTime) {
//       const now = new Date();
//       const endTimeData = new Date(gameEndTime);
//       const timeDifference = endTimeData.getTime() - now.getTime();

//       const hoursDiff = Math.floor(timeDifference / (1000 * 60 * 60));
//       const minutesDiff = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

//       console.log(now, endTimeData, now > endTimeData)
//       if (now > endTimeData) {
//         setGameTimeAvailable(false)
//       } else {
//         setHoursDifference(hoursDiff);
//         setMinutesDifference(minutesDiff);
//       }
//     }
//   };

//   const getGameScore = async (gameScore, retryCount, bestscore) => {
//     try {
//       const sessionId = localStorage.getItem("sessionId");

//       if (sessionId) {
//         await postGameScore(sessionId, gameTrackerId, bestscore, retryCount);
//         fetchCampaignInfo();

//       } else {
//         console.error("Session ID not found");
//         logout();
//       }
//     } catch (error) {
//       console.error("Error fetching leaderboard data:", error);
//     }
//   };

//   useEffect(() => {
//     fetchCampaignInfo();
//   }, []);


//   const fetchCampaignInfo = async () => {
//     try {
//       if (sessionId) {
//         const response = await fetchCampaignInfomation(sessionId, campaignId);
//         if (response && response.data && response.data.data) {
//           localStorage.setItem('gameTrackerId', response.data.data.gameTrackerId)
//           setRetryData(response.data.data.retryCount)
//           fetchLeaderboardData();
//         }
//       } else {
//         console.error("Session ID not found");
//         logout();
//       }
//     } catch (error) {
//       console.error("Error fetching leaderboard data:", error);
//     }
//   };

//   const fetchLeaderboardData = async () => {
//     try {
//       if (sessionId) {
//         const response = await getLeaderBoardDetails(sessionId, campaignId);
//         if (response && response.data && response.data.data) {
//           setPlayers(response.data.data.userGameDetails)
//           setTotalPlayer(response.data.data.totalPlayer)
//           setPrize(response.data.data.prize)
//           tournamentGameEndTime(response.data.data.gameEndTime)
//         }
//       } else {
//         console.error("Session ID not found");
//         logout()
//       }
//     } catch (error) {
//       console.error("Error fetching leaderboard data:", error);
//     }
//   };



//   const handleBackClick = () => {
//     navigate(-1);
//   };

//   const handleImageClick = () => {
//     setOpenGame(true)
//     handleClickSpawnEnemies()
//   };


//   const { unityProvider, sendMessage, addEventListener, removeEventListener } =
//     useUnityContext({
//       loaderUrl: localStorage.getItem("loaderUrl"),
//       dataUrl: localStorage.getItem("dataUrl"),
//       frameworkUrl: localStorage.getItem("frameworkUrl"),
//       codeUrl: localStorage.getItem("codeUrl"),
//     });


//   const handleGameOver = useCallback((retry, score, bestscore, toQuit) => {
//     console.log(toQuit, "toQuit")
//     if (toQuit) {
//       setOpenGame(false)
//     }
//     getGameScore(score, retry, bestscore)
//   }, []);

//   useEffect(() => {
//     addEventListener("GameOver", handleGameOver);
//     return () => {
//       removeEventListener("GameOver", handleGameOver);
//     };
//   }, [addEventListener, removeEventListener, handleGameOver]);

//   function handleClickSpawnEnemies() {
//     sendMessage('GameManager', 'SetRetries', retryData);
//   }


//   return (
//     <>
//       {gameTimeAvailable &&
//         <Unity unityProvider={unityProvider}
//           style={{ visibility: openGame ? "visible" : "hidden" }}
//           className={styles.unityContainer} />
//       }
//       {
//         !openGame && <div className={styles.leaderboard}>
//           <img src={back} alt="Back" className={styles.backImage} onClick={handleBackClick} />
//           {imageUrl && (
//             <div className={styles.imageContainer}>
//               <img src={imageUrl} alt="Game" className={styles.liveImage} />
//               {retryData > 0 &&
//                 gameTimeAvailable &&
//                 <div className={styles.iconOverlay}>
//                   <img src={playIcon} alt="Icon" className={styles.icon} onClick={handleImageClick} />
//                 </div>
//               }
//             </div>
//           )}
//           <div className={styles.specialHighlight}>{totalPlayer ? totalPlayer : 0} Playing</div>
//           <div className={styles.infoContainer}>
//             <span className={styles.infoItem}>{retryData} Chances Left</span>
//             <span className={styles.infoItem}>Prize Pool Rs {prize ? prize : 0}</span>
//             <span className={styles.infoItem}>Ends In {hoursDifference}h:{minutesDifference}m</span>
//           </div>
//           <h1 className={styles.title}>Leaderboard</h1>
//           <ul className={styles.list}>
//             {players && players.map(player => (
//               <li key={player.rank} className={styles.item}>
//                 <div className={styles.rank}>{player.rank}</div>
//                 {player.profileImage && <img src={`data:image/svg+xml;base64,${player.profileImage}`} alt="Profile" className={styles.avatar} />}
//                 <span className={styles.name}>{player.userName}</span>
//                 <span className={styles.points}>{player.gameScore}</span>
//               </li>
//             ))}
//           </ul>
//         </div>
//       }
//     </>
//   );
// };

// export default LeaderBoardPage;




import React from "react";
import styles from "./LeaderBoardPage.module.scss"; // Import the SCSS module
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import user1 from "../../images/user1.jpg";
import user2 from "../../images/user2.jpg";
import Breaker from "../../images/breaker.png";
import back from "../../images/back.svg";
import heart from "../../images/heart.jpg";
import star from "../../images/star.jpg";
import time from "../../images/time.jpg";

interface LeaderboardEntry {
  id: string;
  name: string;
  image: string;
  points: number;
  rank: number;
}

const LeaderBoardPage: React.FC = () => {
  const leaderboardEntries: LeaderboardEntry[] = [
    {
      id: "001",
      name: "John muskan",
      image: user1,
      points: 750,
      rank: 1
    },
    {
      id: "002",
      name: "Emily",
      image: user2,
      points: 690,
      rank: 2
    },
    {
      id: "003",
      name: "Michael",
      image: user2,
      points: 620,
      rank: 3
    },
    {
      id: "004",
      name: "Sophia",
      image: user1,
      points: 590,
      rank: 4
    },
    {
      id: "005",
      name: "William",
      image: user1,
      points: 550,
      rank: 5
    },
  ];

  const navigate = useNavigate();
  
  const handleBackClick = () => {
    navigate(-1);
  };


  return (
    <div>
      <div className={styles.topContainer}>
        <div className={styles.innerContainer}>
          <div onClick={handleBackClick}>
            <img src={back} alt="Back" className={styles.backImage} />
          </div>
          <div className={styles.biggerImageContainer}>
            <img src={Breaker} alt="KFC Game" className={styles.Livegame} />
          </div>
          <div>
          </div>
        </div>
        <div className={styles.biggerOverLapContainer}>
          <span className={styles.topUsers}>
            <img src={user2} alt="user2" className={styles.colImg} style={{ left: '0px' }} />
            <img src={user1} alt="user1" className={styles.colImg} style={{ left: '30px' }} />
            <img src={user2} alt="user2" className={styles.colImg} style={{ left: '60px' }} />
          </span>
          <span className={styles.TotalUserPlaying}>708 Playing</span>
        </div>
        <div className={styles.outerSmallContainer}>
          <div className={styles.SmallImageContainer}>
            <img src={heart} alt="KFC Game" className={styles.TopSmallImage} />
            <div className={styles.TotalUserPlaying}>7 chances left</div>
            <img src={star} alt="KFC Game" className={styles.TopSmallImage} />
            <div className={styles.TotalUserPlaying}>Prize Pool 7000</div>
            <img src={time} alt="KFC Game" className={styles.TopSmallImage} />
            <div className={styles.TotalUserPlaying}>Ends In 01:35h</div>
          </div>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.text}>Tournament Leaderboard</div>
        {leaderboardEntries.map(entry => (
          <div className={styles.userDetails} key={entry.id}>
            <span className={styles.id} id={styles.space}>{entry.id}</span>
            <img id={styles.space} src={entry.image} alt={entry.name} className={styles.image} />
            <span id={styles.space} className={styles.name}>{entry.name}</span>
            <span id={styles.spacePoints} className={styles.points}>{entry.points}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaderBoardPage;
