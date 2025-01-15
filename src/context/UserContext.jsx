import React, { createContext, useState, useContext } from 'react';

// Create a Context for the user
const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
    const [userEmail, setUserEmail] = useState(null);

    const setUser = (email) => {
        setUserEmail(email); // Set the user's email in state
    };

    const clearUser = () => {
        setUserEmail(null); // Clear the user's email
    };

    return (
        <UserContext.Provider value={{ userEmail, setUser, clearUser }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook to use the UserContext
export const useUser = () => useContext(UserContext);