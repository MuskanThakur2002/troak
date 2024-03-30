import styles from './HomePage.module.scss';
import coin from "../../images/trophy-star.png"
import player from "../../images/publicIcon.jpg"

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const HomePageLiveCard = ({ game, page, index, cardBackgroundColor }) => {
  const [hoursDifference, setHoursDifference] = useState(0);
  const [minutesDifference, setMinutesDifference] = useState(0);
  const navigate = useNavigate();

  const tournamentGameEndTime = (gameEndTime) => {
    if (gameEndTime) {
      const now = new Date();
      const endTimeData = new Date(gameEndTime);
      const timeDifference = endTimeData.getTime() - now.getTime();
      const hoursDiff = Math.floor(timeDifference / (1000 * 60 * 60));
      const minutesDiff = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      if (now < endTimeData) {
        setHoursDifference(hoursDiff);
        setMinutesDifference(minutesDiff);
      }
    }
  }


  useEffect(() => {
    if (game.endTime) {
      tournamentGameEndTime(game.endTime)
    }
  }, []);

  const handleImageRedirection = () => {
    if (game?.webUrl) {
      localStorage.setItem("topTournamentwebUrl", game?.webUrl)
    }

    if (game?.campaignId) {
      localStorage.setItem("topTournamentCampaignId", game?.campaignId)
    }

    if (game?.assest) {
      console.log(game?.assest)
      localStorage.setItem("topTournamentImageUrl", game?.assest)
    }
    if (game?.loaderUrl) {
      localStorage.setItem("loaderUrl", game?.loaderUrl)

    }
    if (game?.dataUrl) {
      localStorage.setItem("dataUrl", game?.dataUrl)

    }
    if (game?.frameworkUrl) {
      localStorage.setItem("frameworkUrl", game?.frameworkUrl)
    }
    if (game?.codeUrl) {
      localStorage.setItem("codeUrl", game?.codeUrl)
    }



    navigate("/leaderboard");
  };

  const cardStyle = {
    backgroundColor: cardBackgroundColor,
  };


  return (
    <div className={styles.gameCard} style={{ ...cardStyle }} onClick={handleImageRedirection}>
      <div className={styles.gameHeader}>
        <div>
          <div className={styles.GameName}>
            {game.gameName}
          </div>

          {page == "live" &&
            <>
              <div className={styles.IconMainContainer}>
                <div>
                  <img src={coin} alt="coin" className={styles.iconCoinSize} />
                </div>
                <div className={styles.prizePool}>Prize Pool INR {game.prizeMoney ? game.prizeMoney : 0}</div>
              </div>
              <div className={styles.IconMainContainer}>
                <div>
                  <img src={player} className={styles.iconsize} alt="players" />
                </div>
                <div className={styles.players}>{game.activePlayers} Playing</div>
              </div>
              <div className={styles.timeRemaining}>Ends In {hoursDifference}h:{minutesDifference}m</div>
            </>
          }

          {page == "upcoming" &&
            <>
              <div className={styles.IconMainContainer}>
                <div>
                  <img src={coin} alt="coin" className={styles.iconCoinSize} />
                </div>
                <div className={styles.prizePool}>Prize Pool INR {game.prizeMoney ? game.prizeMoney : 0}</div>
              </div>
              <div className={styles.timeRemaining}>Start In {hoursDifference}h:{minutesDifference}m</div>
            </>
          }


          {page == "history" &&

            <div className={styles.buttonContainer} >

              <div className={styles.button} >LeaderBoard</div>
            </div>
          }

        </div>
        <div className={styles.gameImageContainer}>
          <img className={styles.gameImage} src={game.assest} alt="Mine Rusher game" />
        </div>
      </div>
    </div>

  );
};

export default HomePageLiveCard;
