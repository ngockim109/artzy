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

  const showNotification = (message: string) => {
    setNotificationMessage(message);
    setNotificationVisible(true);

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
