import { useState, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Box, VStack, Heading, Text, Center, Spinner, FormControl, FormLabel, Input, Button, Alert, AlertIcon } from "@chakra-ui/react";
import ProfileService from "../../services/profile.service";

const ProfilePage = () => {
  const { user, setUser } = useContext(UserContext);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstname: user.firstname,
    lastName: user.lastName,
    name: user.name
  });
  const [successMessage, setSuccessMessage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = await ProfileService.updateProfile(user.id, formData);
      setUser(updatedUser);
      setEditing(false);
      setSuccessMessage("Profile updated successfully!");
      // Clear the success message after a few seconds
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

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
          {successMessage && (
            <Alert status="success">
              <AlertIcon />
              {successMessage}
            </Alert>
          )}
          {editing ? (
            <form onSubmit={handleSubmit}>
              <FormControl>
                <FormLabel>First Name</FormLabel>
                <Input type="text" name="firstname" value={formData.firstname} onChange={handleInputChange} />
              </FormControl>
              <FormControl>
                <FormLabel>Last Name</FormLabel>
                <Input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} />
              </FormControl>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input type="text" name="name" value={formData.name} onChange={handleInputChange} />
              </FormControl>
              <Button type="submit">Save</Button>
            </form>
          ) : (
            <Box>
              <Heading as="h2" size="xl">User Details:</Heading>
              <Text fontSize="xl"><strong>Username:</strong> {user.username}</Text>
              <Text fontSize="xl"><strong>Email:</strong> {user.email}</Text>
              <Text fontSize="xl"><strong>{user.role}</strong> </Text>
              <Button onClick={() => setEditing(true)}>Edit</Button>
            </Box>
          )}
        </VStack>
      </Box>
    </Center>
  );
};

export default ProfilePage;
