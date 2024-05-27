import { Flex, Spinner } from "@chakra-ui/react"
import React from "react"

const Loading = () => {
  return (
    <Flex
      height={"calc(100vh - 322px)"}
      justify={"center"}
      alignItems={"center"}
    >
      <Spinner />
    </Flex>
  )
}

export default Loading
