import React, { createContext, useState, useEffect } from "react";
import authService from "../services/auth.service";
import specialDayService from "../services/specialDay.service"; 

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [specialDay, setSpecialDay] = useState(null); 
  const [isLoading, setIsLoading] = useState(true);

  const login = async (userData) => {
    setIsLoading(true);
    try {
      const { token } = await authService.login(userData);
      localStorage.setItem("token", token);
      const loggedUser = await authService.getUser(token);
      setUser(loggedUser);

    
      const userSpecialDay = await specialDayService.getUserSpecialDay(token);
      setSpecialDay(userSpecialDay);

    } catch (error) {
      console.error("Error en login:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setSpecialDay(null); 
    setIsLoading(false); 
  };

  useEffect(() => {
    const initUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const loggedUser = await authService.getUser(token);
          setUser(loggedUser);

          
          const userSpecialDay = await specialDayService.getUserSpecialDay(token);
          setSpecialDay(userSpecialDay);

        } catch (error) {
          console.log("Error =>", error);
          setUser(null);
        }
      }
      setIsLoading(false);
    };

    initUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, specialDay, setUser, isLoading, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
