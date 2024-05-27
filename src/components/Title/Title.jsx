import { Text } from "@chakra-ui/react"
import React from "react"

const Title = ({ fontSize = "56px", children, ...props }) => {
  return (
    <Text
      textAlign={"center"}
      fontSize={["24px", fontSize]}
      fontWeight={"bold"}
      {...props}
    >
      {children}
    </Text>
  )
}

export default Title
