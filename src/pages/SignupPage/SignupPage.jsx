import React, { useState, useContext } from 'react';
import CustomForm from '../../components/CustomForm/CustomForm';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/auth.service';

const SignupPage = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    role:''
  });
  const navigate = useNavigate();

  const onChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await authService.signup(userData);
      
      navigate('/login'); 
    } catch (error) {
      console.error('Signup Error', error);
      
    }
  };

  const options = [
    { name: 'username', type: 'text' },
    { name: 'email', type: 'email' },
    { name: 'password', type: 'password' },
    { name: 'role', type: 'text'}
  ];

  return (
    <CustomForm
      title="Sign Up"
      subtitle="Create your account"
      onChange={onChange}
      onSubmit={onSubmit}
      options={options}
    />
  );
};

export default SignupPage;
