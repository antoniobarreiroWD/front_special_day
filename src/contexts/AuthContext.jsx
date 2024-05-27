import React, { createContext, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext'; 

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  
  const navigateBasedOnRole = (role) => {
    switch(role) {
      case 'Guard':
        navigate('/guardhome');
        break;
      case 'Pathologist':
        navigate('/pathology');
        break;
      default:
        navigate('/');
    }
  };

  useEffect(() => {
   
    if (user) {
      navigateBasedOnRole(user.role);
    } else {
  
      navigate('/login');
    }
  }, [user, navigate]);

  return (
    <AuthContext.Provider value={{}}>
      {children}
    </AuthContext.Provider>
  );
};
