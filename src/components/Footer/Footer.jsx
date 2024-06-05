import React, { useState, useEffect } from "react";
import { Box, Flex } from "@chakra-ui/layout";
import CustomLink from "../CustomLink/CustomLink";
import GithubIcon from "../GithubIcon/GithubIcon";
import CodeIcon from "../CodeIcon/CodeIcon";

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;

      if (scrollTop + clientHeight >= scrollHeight) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
    <Box
      position="fixed"
      bottom={isVisible ? "0" : "-100px"}
      left="50%"
      transform="translateX(-50%)"
      width="80%"
      maxWidth="1200px"
      backgroundColor="pink.300"
      boxShadow="0 -4px 6px rgba(0, 0, 0, 0.1)"
      zIndex={1}
      padding="10px 0"
      borderRadius="15px 15px 0 0"
      transition="bottom 0.3s"
    >
      <Box margin="0 auto" padding="0 16px">
        <Flex
          justifyContent="space-between"
          alignItems="center"
          borderRadius="15px 15px 0 0"
        >
          {ICONS.map(({ component, link, id }) => (
            <CustomLink to={link} cursor="pointer" key={id}>
              <Flex
                alignItems="center"
                justifyContent="center"
                width="40px"
                height="40px"
                backgroundColor="pink.500"
                borderRadius="50%"
                transition="background-color 0.2s, transform 0.2s"
                _hover={{ backgroundColor: "pink.400", transform: "scale(1.1)" }}
              >
                {component}
              </Flex>
            </CustomLink>
          ))}
        </Flex>
      </Box>
    </Box>
  );
};

export default Footer;