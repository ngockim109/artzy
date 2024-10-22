import React, { createContext, useContext, useState } from "react";
import Notification from "./Notification";

type NotificationContextType = {
  showNotification: (message: string) => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const NotificationProvider = ({ children }) => {
  const [notificationMessage, setNotificationMessage] = useState<string | null>(
    null
  );
  const [notificationVisible, setNotificationVisible] = useState(false);
  // const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const showNotification = (message: string) => {
    // if (timeoutId) {
    //   clearTimeout(timeoutId);
    // }
    // console.log(timeoutId);

    setNotificationMessage(message);
    setNotificationVisible(true);

    // Hide notification after 4 seconds
    // const newTimeoutId = setTimeout(() => {
    //   setNotificationVisible(false);
    //   setNotificationMessage(null);
    // }, 4000);
    // setTimeoutId(newTimeoutId);
    setTimeout(() => {
      setNotificationVisible(false);
    }, 4000);
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <Notification
        message={notificationMessage || ""}
        visible={notificationVisible}
        onDismiss={() => setNotificationVisible(false)}
      />
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
};
