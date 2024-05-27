import { Flex, Button as ChakraButton } from "@chakra-ui/react"
import React from "react"

const SubmitButton = () => {
  return (
    <Flex width="full" justifyContent="center" px={{ base: 4, md: 0 }}>
    <ChakraButton
      _hover={{
        backgroundColor: "brown",
      }}
      minH={"56px"}
      mx={{ base: 4, md: 0 }} 
      width={{ base: "70%", md: "100%" }}
      fontSize={"24px"}
      marginTop={"54px"}
      borderRadius={"20px"}
      backgroundColor={"black"}
      fontWeight={"bold"}
      color={"white"}
      type="submit"
      
    >
      Submit
    </ChakraButton>
    </Flex>
  )
}

export default SubmitButton
