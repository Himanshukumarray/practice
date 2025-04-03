import { createContext, useState, useContext } from "react";

// Create Notification Context
const NotificationContext = createContext();

// Custom hook for using the notification context
export const useNotification = () => useContext(NotificationContext);

// Provider component to wrap the app
export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);

    // Function to add a notification
    const addNotification = (message) => {
        setNotifications((prev) => [...prev, { id: Date.now(), message }]);
    };

    return (
        <NotificationContext.Provider value={{ notifications, addNotification }}>
            {children}
        </NotificationContext.Provider>
    );
};
