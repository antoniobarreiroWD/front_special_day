import { Flex, Text, Box, IconButton, useDisclosure, Image } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useLocation } from "react-router-dom";
import AuthLink from "../AuthLink/AuthLink";
import NavigationLink from "../NavigationLink/NavigationLink";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import UserRole from "../UserRole/UserRole";
import { COLORS } from "../../theme";
import imgLogo from "../../assets/LogoApp.jpg";

const Navbar = () => {
  const { isOpen, onToggle } = useDisclosure();
  const { user, logout } = useContext(UserContext);
  const location = useLocation();

  let NAVIGATION_LINK = [
    { link: "/guardhome", text: "Servicios Contratados" },
    { link: "/pathology", text: "Gastos" },
    { link: "/finalreport", text: "Agenda" },
  ];

  if (user?.role === "Guard") {
    NAVIGATION_LINK = [{ link: "/create", text: "Nuevo Procedimiento" }, ...NAVIGATION_LINK];
  }

  return (
    <Flex
      as="nav"
      padding={{ base: "12px", md: "34px 80px", xl: "20px 60px" }}
      alignItems="center"
      wrap="wrap"
      bg={COLORS.PRIMARY}
      color="white"
      justifyContent={{ base: "space-between", xl: "center" }}
    >
      <Flex align="center">
      
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Image
              src={imgLogo}
              alt="Libro de Autopsias"
              boxSize={{ base: "100px", md: "100px", xl: "160px" }}
              objectFit="cover"
              borderRadius="full"
            />
          </Box>
       
      </Flex>
      {user && (
      <Flex
        display={{ base: "flex", xl: "none" }}
        alignItems="center"
      >
       
        <Box onClick={onToggle} mr={4}>
          <IconButton
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            variant="outline"
            aria-label="Toggle Navigation"
            colorScheme="white"
          />
        </Box>
        
        
        
          <AuthLink onClick={logout}>Logout</AuthLink>
        
      </Flex>
      )}

       {user && (
      <Flex
        display={{ base: isOpen ? "block" : "none", xl: "flex" }}
        width={{ base: "full", xl: "auto" }}
        flexGrow={1}
        justifyContent={{ base: "flex-start", xl: "center" }}
      >
        <Flex
          direction={{ base: "column", xl: "row" }}
          justifyContent={{ base: "flex-start", xl: "center" }}
          width="100%"
        >
          {NAVIGATION_LINK.map(({ link, text }) => {
            const isActiveLink = location.pathname === link;
            return (
              <NavigationLink
                to={link}
                key={text}
                textDecoration={isActiveLink ? "underline" : "none"}
                fontWeight={isActiveLink ? "bold" : "normal"}
                backgroundColor={isActiveLink ? COLORS.ACCENT : "transparent"}
                color={isActiveLink ? COLORS.WHITE : "white"}
                borderRadius="5px"
                padding="2"
                marginX="2" 
                marginY={{ base: 2, md: 1 }}
              >
                <Text fontSize={{ base: "sm", md: "md", xl: "lg" }}>
                  {text}
                </Text>
              </NavigationLink>
            );
          })}
        </Flex>
      </Flex>
      )}

      <Flex
        direction={{ base: "column", md: "row" }}
        alignItems="center"
        display={{ base: "none", xl: "flex" }}
        ml={{ base: 0, md: 4 }}
      >
        {user && (
          <>
            <Box mr={{ xl: 10}}>
              <Text>{user.name} {user.firstName} {user.lastName}</Text>
              <Text>{user.email}</Text>
              <UserRole role={user.role} />
            </Box>
            <AuthLink onClick={logout}>Logout</AuthLink>
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default Navbar;
