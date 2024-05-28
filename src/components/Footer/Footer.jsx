import { Flex } from "@chakra-ui/layout";
import CustomLink from "../CustomLink/CustomLink";
import GithubIcon from "../GithubIcon/GithubIcon";
import CodeIcon from "../CodeIcon/CodeIcon";

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
  ];

  return (
    <Flex
      width={"100%"}
      position={"fixed"}
      bottom={"0"}
      padding={"10px 60px"}
      justifyContent={"space-between"}
      alignItems={"center"}
      backgroundColor={"pink.300"}
      boxShadow={"0 -4px 6px rgba(0, 0, 0, 0.1)"}
      borderRadius={"15px 15px 0 0"}
      marginTop={"10px"}
      zIndex={1}
    >
      {ICONS.map(({ component, link, id }) => {
        return (
          <CustomLink to={link} cursor={"pointer"} key={id}>
            <Flex
              alignItems={"center"}
              justifyContent={"center"}
              width={"40px"}
              height={"40px"}
              backgroundColor={"pink.500"}
              borderRadius={"50%"}
              transition={"background-color 0.2s, transform 0.2s"}
              _hover={{ backgroundColor: "pink.400", transform: "scale(1.1)" }}
            >
              {component}
            </Flex>
          </CustomLink>
        );
      })}
    </Flex>
  );
};

export default Footer;
