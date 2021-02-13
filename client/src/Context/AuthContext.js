import React, { createContext, useState, useEffect } from "react";
import AuthService from "../Services/AuthService";

/* 
    AuthContext object gives us <Provider> and <Consumer> 
    Anything that is wrapped within a <Provider> will have access
    to the global state. You also have to "consume" the global state
*/

export const AuthContext = createContext();

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        AuthService.isAuthenticated().then((data) => {
            console.log(data);
            setUser(data.user);
            setIsAuthenticated(data.isAuthenticated);
            setIsLoaded(true);
        });
    }, []);

    return (
        <div>
            {!isLoaded ? (
                <h1>Loading</h1>
            ) : (
                <AuthContext.Provider
                    value={{
                        user,
                        setUser,
                        isAuthenticated,
                        setIsAuthenticated,
                    }}
                >
                    {children}
                </AuthContext.Provider>
            )}
        </div>
    );
}
export default AuthProvider;
