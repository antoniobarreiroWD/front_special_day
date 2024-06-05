import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  useToast,
} from '@chakra-ui/react';
import SpecialDayService from '../../services/specialDay.service';
import PageWrapper from '../../components/PageWrapper/PageWrapper';

const CreateSpecialDayForm = () => {
  const toast = useToast();
  const [formData, setFormData] = useState({
    brideName: '',
    brideFirstName: '',
    brideLastName: '',
    brideEmail: '',
    groomName: '',
    groomFirstName: '',
    groomLastName: '',
    groomEmail: '',
    date: '',
    services: '',
    guests: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { services, guests, ...rest } = formData;
    const data = {
      couple: {
        bride: {
          name: rest.brideName,
          firstName: rest.brideFirstName,
          lastName: rest.brideLastName,
          email: rest.brideEmail,
        },
        groom: {
          name: rest.groomName,
          firstName: rest.groomFirstName,
          lastName: rest.groomLastName,
          email: rest.groomEmail,
        },
      },
      services: services.split(',').map((service) => ({
        type: service.trim(),
        price: 0,
        image: '',
        status: true,
      })),
      guests: guests.split(',').map((guest) => ({
        name: guest.trim(),
        companion: '',
        gift: 1,
        table: 1,
      })),
      date: rest.date,
    };

    try {
      const response = await SpecialDayService.createSpecialDay(data);
      toast({
        title: 'Special Day created.',
        description: "Your special day has been created successfully.",
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      console.log('SpecialDay created:', response);
    } catch (error) {
      toast({
        title: 'An error occurred.',
        description: "Unable to create special day.",
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      console.error('Error creating SpecialDay:', error);
    }
  };

  return (
    <PageWrapper>
    <Box p={5} shadow='md' borderWidth='1px' borderRadius='md'>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl id='brideName' isRequired>
            <FormLabel>Nombre Novia</FormLabel>
            <Input name='brideName' value={formData.brideName} onChange={handleChange} />
          </FormControl>
          <FormControl id='brideFirstName' isRequired>
            <FormLabel>Primer Apellido Novia</FormLabel>
            <Input name='brideFirstName' value={formData.brideFirstName} onChange={handleChange} />
          </FormControl>
          <FormControl id='brideLastName' isRequired>
            <FormLabel>Segundo Apellido Novia</FormLabel>
            <Input name='brideLastName' value={formData.brideLastName} onChange={handleChange} />
          </FormControl>
          <FormControl id='brideEmail' isRequired>
            <FormLabel>Email Novia</FormLabel>
            <Input name='brideEmail' value={formData.brideEmail} onChange={handleChange} />
          </FormControl>
          <FormControl id='groomName' isRequired>
            <FormLabel>Nombre Novio</FormLabel>
            <Input name='groomName' value={formData.groomName} onChange={handleChange} />
          </FormControl>
          <FormControl id='groomFirstName' isRequired>
            <FormLabel>Primer Apellido Novio</FormLabel>
            <Input name='groomFirstName' value={formData.groomFirstName} onChange={handleChange} />
          </FormControl>
          <FormControl id='groomLastName' isRequired>
            <FormLabel>Segundo Apellido Novio</FormLabel>
            <Input name='groomLastName' value={formData.groomLastName} onChange={handleChange} />
          </FormControl>
          <FormControl id='groomEmail' isRequired>
            <FormLabel>Email Novio</FormLabel>
            <Input name='groomEmail' value={formData.groomEmail} onChange={handleChange} />
          </FormControl>
          <FormControl id='date' isRequired>
            <FormLabel>Fecha</FormLabel>
            <Input type='date' name='date' value={formData.date} onChange={handleChange} />
          </FormControl>
          <FormControl id='services'>
            <FormLabel>Servicios (comma-separated)</FormLabel>
            <Textarea name='services' value={formData.services} onChange={handleChange} />
          </FormControl>
          <FormControl id='guests'>
            <FormLabel>Invitados (comma-separated)</FormLabel>
            <Textarea name='guests' value={formData.guests} onChange={handleChange} />
          </FormControl>
          <Button type='submit' colorScheme='teal'>
            Crear SpecialDay
          </Button>
        </VStack>
      </form>
    </Box>
    </PageWrapper>
  );
};

export default CreateSpecialDayForm;
