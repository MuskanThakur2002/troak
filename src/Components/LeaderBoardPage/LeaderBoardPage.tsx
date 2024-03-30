import React from "react";
import styles from "./LeaderBoardPage.module.scss"; // Import the SCSS module
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import user1 from "../../images/user1.jpg";
import user2 from "../../images/user2.jpg";
import Breaker from "../../images/breaker.png";
import back from "../../images/back.svg";
import heart from "../../images/heart.svg";
import star from "../../images/star.jpg";
import time from "../../images/stopwatch.svg";

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
			rank: 1,
		},
		{
			id: "002",
			name: "Emily",
			image: user2,
			points: 690,
			rank: 2,
		},
		{
			id: "003",
			name: "Michael",
			image: user2,
			points: 620,
			rank: 3,
		},
		{
			id: "004",
			name: "Sophia",
			image: user1,
			points: 590,
			rank: 4,
		},
		{
			id: "005",
			name: "William",
			image: user1,
			points: 550,
			rank: 5,
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
					<div></div>
				</div>
				<div className={styles.biggerOverLapContainer}>
					<span className={styles.topUsers}>
						<img
							src={user2}
							alt="user2"
							className={styles.colImg}
							style={{ left: "0px" }}
						/>
						<img
							src={user1}
							alt="user1"
							className={styles.colImg}
							style={{ left: "30px" }}
						/>
						<img
							src={user2}
							alt="user2"
							className={styles.colImg}
							style={{ left: "60px" }}
						/>
					</span>
					<span className={styles.TotalUserPlaying}>708 Playing</span>
				</div>
				<div className={styles.outerSmallContainer}>
					<div className={styles.SmallImageContainer}>
						<div className={styles.ImageTextPair}>
							<img
								src={heart}
								alt="KFC Game"
								className={styles.TopSmallImage}
							/>
							<div className={styles.TopSmallImageText}>7 chances left</div>
						</div>
						<div className={styles.ImageTextPair}>
							<img src={star} alt="KFC Game" className={styles.TopSmallImage} />
							<div className={styles.TopSmallImageText}>Prize Pool 7000</div>
						</div>
						<div className={styles.ImageTextPair}>
							<img src={time} alt="KFC Game" className={styles.TopSmallImage} />
							<div className={styles.TopSmallImageText}>Ends In 01:35h</div>
						</div>
					</div>
				</div>
			</div>
			<div className={styles.container}>
				<div className={styles.text}>Tournament Leaderboard</div>
				{leaderboardEntries.map((entry) => (
					<div className={styles.userDetails} key={entry.id}>
						<span className={styles.id} id={styles.space}>
							{entry.id}
						</span>
						<img
							id={styles.space}
							src={entry.image}
							alt={entry.name}
							className={styles.image}
						/>
						<span id={styles.space} className={styles.name}>
							{entry.name}
						</span>
						<span id={styles.spacePoints} className={styles.points}>
							{entry.points}
						</span>
					</div>
				))}
			</div>
		</div>
	);
};

export default LeaderBoardPage;
