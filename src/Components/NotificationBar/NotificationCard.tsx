import React, { useState } from "react";
import styles from "./NotificationBar.module.scss";
import { updateNotification } from "../../Utilities/ApiHandler";
import { useNavigate } from "react-router-dom";
import NotificatioImg from "../../images/notificationIcon.jpg";
interface Notification {
  body: string;
  title: string;
  notificationTime: string;
  imageUrl: string;
  deepLink: string | null;
  isSeen: boolean;
  messageId: string;
}

interface NotificationCardProps {
  notification: Notification;
}

const NotificationCard: React.FC<NotificationCardProps> = ({ notification }) => {
  const [seen, setSeen] = useState<boolean>(notification.isSeen);
  const sessionId = localStorage.getItem("sessionId");
  const navigate = useNavigate();

  const fetchNotifications = async () => {
    try {
      if (sessionId) {
        const response = await updateNotification(sessionId, notification.messageId);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  }



  const handleClick = async () => {
    setSeen(true)
    fetchNotifications()
    navigate("/");
  };

  return (
    <>
      <div onClick={handleClick} className={`${styles.notificationCardContainer} ${seen ? styles.seenNotification : styles.unseenNotification}`}>
        {notification.imageUrl && <div className={styles.notificationImageContainer}>
          <img src={notification.imageUrl} alt="Notification Image" className={styles.notificationImage} />
        </div>}
        <div className={styles.notificationText}>{notification.body}</div>
      </div>
    </>
  );
};

export default NotificationCard;
