import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Box, VStack, Heading, Text, Center, Spinner } from "@chakra-ui/react";

const ProfilePage = () => {
  const { user } = useContext(UserContext);

  if (!user) {
    return (
      <Center height="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <Center height="100vh">
      <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={5}>
        <VStack spacing={4} align="stretch">
          <Heading as="h1" size="2xl" textAlign="center">Profile Page</Heading>
          <Box>
            <Heading as="h2" size="xl">User Details:</Heading>
            <Text fontSize="xl"><strong>Username:</strong> {user.username}</Text>
            <Text fontSize="xl"><strong>Email:</strong> {user.email}</Text>
            <Text fontSize="xl"><strong>Department:</strong> {user.role}</Text>
          </Box>
        </VStack>
      </Box>
    </Center>
  );
};

export default ProfilePage;
