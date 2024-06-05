import React from "react"
import { Box, Flex } from "@chakra-ui/react"


const ContentWrapper = ({ children }) => {
  return (
    <Box maxWidth="1200px" margin="0 auto" padding="0 16px">
      {children}
    </Box>
  )
}

export default ContentWrapper