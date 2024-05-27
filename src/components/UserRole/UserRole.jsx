import React from 'react';

function UserRole({ role }) {
  function getRoleName(role) {
    switch (role) {
      case 'Guard':
        return 'Forense de Guardia';
      case 'Pathologist':
        return 'Patólogo Forense';
      
    }
  }

  return <span>{getRoleName(role)}</span>;
}

export default UserRole;