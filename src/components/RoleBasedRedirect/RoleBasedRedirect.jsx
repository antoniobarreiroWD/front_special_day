import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import {UserContext } from '../../contexts/UserContext';


const RoleBasedRedirect = () => {
  const { user } = useContext(UserContext);

  
  if (user) {
    switch (user.role) {
      case 'Guard':
        return <Navigate to="/guardhome" />;
      case 'Pathologist':
        return <Navigate to="/pathology" />;
      default:
        return <Navigate to="/" />;
    }
  }

  
  return <Navigate to="/login" />;
};

export default RoleBasedRedirect;
