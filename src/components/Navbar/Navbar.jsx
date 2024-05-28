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
      color="white"
      justifyContent={{ base: "space-between", xl: "center" }}
      backgroundColor="pink.300"
      boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
      borderRadius="15px"
      margin="10px"
    >
      <Flex align="center">
        <Box display="flex" justifyContent="center" alignItems="center">
          <Image
            src={imgLogo}
            alt="Corazón"
            boxSize={{ base: "100px", md: "100px", xl: "160px" }}
            objectFit="cover"
            borderRadius="full"
            filter="drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.3))"
          />
        </Box>
      </Flex>
      {user && (
        <Flex display={{ base: "flex", xl: "none" }} alignItems="center">
          <Box onClick={onToggle} mr={4}>
            <IconButton
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              variant="outline"
              aria-label="Toggle Navigation"
              colorScheme="pink"
            />
          </Box>
          <AuthLink onClick={logout} color="pink.500">
            Logout
          </AuthLink>
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
                  backgroundColor={isActiveLink ? "pink.500" : "transparent"}
                  color={isActiveLink ? COLORS.WHITE : "white"}
                  borderRadius="10px"
                  padding="8px"
                  marginX="2"
                  marginY={{ base: 2, md: 1 }}
                  _hover={{ backgroundColor: "pink.400", color: "white" }}
                  transition="background-color 0.2s, transform 0.2s"
                  _active={{ transform: "scale(0.95)" }}
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
            <Box textAlign="center" mr={{ xl: 10 }}>
              <Text fontWeight="bold">{user.name} {user.firstName} {user.lastName}</Text>
              <Text>{user.email}</Text>
              <UserRole role={user.role} />
            </Box>
            <AuthLink onClick={logout} color="pink.500">
              Logout
            </AuthLink>
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default Navbar;
