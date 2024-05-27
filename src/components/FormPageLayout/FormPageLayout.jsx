import { Flex } from "@chakra-ui/react";

const FormPageLayout = ({children }) => {
  return (
    
     
      <Flex 
        direction="column" 
        alignItems="center"
        justifyContent="center" 
        minH="100vh" 
      >
        {children} 
      </Flex>
    
  );
};

export default FormPageLayout;