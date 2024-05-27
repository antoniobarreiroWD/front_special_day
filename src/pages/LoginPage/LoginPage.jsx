import React from 'react';
import { Flex, Box, VStack } from '@chakra-ui/react';
import LoginForm from '../../components/FormFront/FormFront';
import { AuthProvider } from '../../contexts/AuthContext';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

const LoginPage = () => {
  return (
    <Flex
      direction="column"
      h="100vh"
      overflow="hidden" 
    >
      <Navbar />
      <Box flex="1" overflowY="auto"> 
        <AuthProvider>
          <VStack justify="center" height="full">
            <LoginForm />
          </VStack>
        </AuthProvider>
      </Box>
      <Footer />
    </Flex>
  );
};

export default LoginPage;
