import React from "react"
import CustomLink from "../CustomLink/CustomLink"
import { Text } from "@chakra-ui/react"

const NavigationLink = ({ children, ...props }) => {
  return (
    <CustomLink {...props}>
      <Text as={"span"} fontSize={"24px"}>
        {children}
      </Text>
    </CustomLink>
  )
}

export default NavigationLink
