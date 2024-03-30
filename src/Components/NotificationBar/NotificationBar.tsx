import React, { useEffect, useState } from "react";
import styles from "./NotificationBar.module.scss";
import back from "../../images/back.svg";
import NotificationCard from "./NotificationCard";
import { useNavigate } from "react-router-dom";
import { getNotification } from "../../Utilities/ApiHandler";
import Header from "../Header/Header";

interface Notification {
  body: string;
  title: string;
  notificationTime: string;
  imageUrl: string;
  deepLink: string | null;
  isSeen: boolean;
  messageId: string;
}

const NotificationBar: React.FC = () => {
  const navigate = useNavigate();
  const sessionId = localStorage.getItem("sessionId");
  const [loading, setLoading] = useState<boolean>(true);
  const [allNotifications, setAllNotifications] = useState<Notification[]>([]);

  const handleBackClick = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        if (!sessionId) {
          console.error("Session ID not found");
          return;
        }

        const response = await getNotification(sessionId);
        console.log(response);
        if (response?.data?.data) {
          setAllNotifications(response?.data?.data);
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [sessionId]);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const currentDate = new Date();
    const today = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate()
    );
    const notificationDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );

    if (
      notificationDate.getDate() === today.getDate() &&
      notificationDate.getMonth() === today.getMonth() &&
      notificationDate.getFullYear() === today.getFullYear()
    ) {
      return "Today";
    } else {
      const month = date.toLocaleString("en-US", { month: "short" });
      const day = date.getDate();
      const year = date.getFullYear();
      return `${month} ${day} ${year}`;
    }
  };

  const groupedNotifications: { [date: string]: Notification[] } = {};

  allNotifications &&
  allNotifications.forEach((notification) => {
      const formattedDate = formatDate(notification.notificationTime);
      if (!groupedNotifications[formattedDate]) {
        groupedNotifications[formattedDate] = [];
      }
      groupedNotifications[formattedDate].push(notification);
    });

  return (
    <div className={styles.notificationBar}>

      <Header HeaderName={"Notifications"} />
      {loading ? (
        <div className={styles.loading}>Loading...</div>
      ) : (
        Object.entries(groupedNotifications).map(([date, notifications]) => (
          <>
            <div className={styles.todayText}>{date}</div>
            {notifications.map((notification) => (
              <NotificationCard
                key={notification.messageId}
                notification={notification}
              />
            ))}
          </>
        ))
      )}

    </div>
  );
};

export default NotificationBar;
