import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null); // 🔥 add this to track current user
    const [userPlan, setUserPlan] = useState(null); // 'free' or 'pro'
    const [formsUsed, setFormsUsed] = useState(0);  // Only for free users

    return (
        <UserContext.Provider
            value={{
                isLoggedIn,
                setIsLoggedIn,
                user,
                setUser, // 🔥 export setUser to set it on login
                userPlan,
                setUserPlan,
                formsUsed,
                setFormsUsed
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);


