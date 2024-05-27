import { Flex } from "@chakra-ui/layout"
import { COLORS } from "../../theme" 
import CustomLink from "../CustomLink/CustomLink"
import GithubIcon from "../GithubIcon/GithubIcon"
import CodeIcon from "../CodeIcon/CodeIcon"

const Footer = () => {
  const ICONS = [
    {
      component: <GithubIcon />,
      link: "https://github.com/antoniobarreiroimmune",
      id: 1,
    },
    {
      component: <CodeIcon />,
      link: "#",
      id: 3,
    },
  ]
  return (
    <Flex
      width={"100%"}
      position={"fixed"}
      bottom={"0"}
      padding={"5px 80px"} 
      backgroundColor={COLORS.PRIMARY} 
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      {ICONS.map(({ component, link, id }) => {
        return (
          <CustomLink to={link} cursor={"pointer"} key={id}>
            {component}
          </CustomLink>
        )
      })}
    </Flex>
  )
}

export default Footer
