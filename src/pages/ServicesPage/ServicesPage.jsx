import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react';
import { useSpring, animated } from 'react-spring';
import { AiFillHeart } from 'react-icons/ai'; 
import specialDayService from '../../services/specialDay.service';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import bgImage from '../../assets/special_day_1.jpg';

const FloatingHearts = ({ show }) => {
  const props = useSpring({
    from: { transform: 'translateY(100%)', opacity: 0 },
    to: {
      transform: show ? 'translateY(-100%)' : 'translateY(100%)',
      opacity: show ? 1 : 0,
    },
    config: { duration: 7000 },
    reset: true
  });

  return show ? (
    <animated.div style={{ ...props, position: 'fixed', bottom: 20, right: 20 }}>
      <AiFillHeart size="30px" color="red" />
    </animated.div>
  ) : null;
};

const ServicesList = () => {
  const [userSpecialDay, setUserSpecialDay] = useState(null);
  const [newService, setNewService] = useState({ name: '', price: 0 });
  const [services, setServices] = useState([]);
  const [editingService, setEditingService] = useState(null);
  const [specialDayId, setSpecialDayId] = useState(null);
  const [showHearts, setShowHearts] = useState(false);

  const fetchServices = async () => {
    try {
      const specialDayData = await specialDayService.getUserSpecialDay();
      setServices(specialDayData.services || []);
      setSpecialDayId(specialDayData._id);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleAddService = async () => {
    try {
      const serviceToAdd = {
        ...newService,
        price: newService.price !== "" ? parseInt(newService.price) : null,
      };
      const updatedSpecialDay = await specialDayService.addService({ service: serviceToAdd });
      setUserSpecialDay(updatedSpecialDay);
      setNewService({ name: "", price: "" });
      setShowHearts(true);
      setTimeout(() => setShowHearts(false), 7000);  

      fetchServices();
    } catch (error) {
      console.error('Error adding service:', error);
    }
  };

  const handleEditService = (service) => {
    setEditingService({ ...service });
  };

  const handleSaveService = async () => {
    try {
      const updatedServices = services.map((service) =>
        service._id === editingService._id ? editingService : service
      );
      await specialDayService.updateSpecialDay(specialDayId, { services: updatedServices });
      setServices(updatedServices);
      setEditingService(null);
    } catch (error) {
      console.error('Error updating service:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingService({ ...editingService, [name]: value });
  };

  const handleDeleteService = async (serviceId) => {
    try {
      const updatedServices = services.filter(service => service._id !== serviceId);
      await specialDayService.updateSpecialDay(specialDayId, { services: updatedServices });
      setServices(updatedServices);
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  return (
    <PageWrapper>
      <Box display="flex" flexDirection={{ base: "column", md: "row" }} justifyContent="center" alignItems="center">
        <Box
          width={{ base: "100%", md: "300px" }}
          height={{ base: "200px", md: "300px" }}
          bgImage={`url(${bgImage})`}
          bgSize="cover"
          bgPosition="center"
          marginX={{ base: "0", md: "10px" }}
        />
        <Box width={{ base: "100%", md: "auto" }} p="20px" borderRadius="10px" boxShadow="lg">
          <Heading as="h2" size="xl" textAlign="center" mb="20px" color="pink.600">
            Lista de Servicios
          </Heading>
          <Box mb="20px">
            <Heading as="h3" size="md" mb="10px">
              Añadir nuevo Servicio
            </Heading>
            <Flex align="center" gap="2" flexDirection={{ base: "column", md: "row" }}>
              <Input
                placeholder="Nombre del Servicio"
                width="full"
                value={newService.name}
                onChange={(e) => setNewService({ ...newService, name: e.target.value })}
              />
              <Input
                placeholder="Precio"
                type="number"
                width="full"
                value={newService.price}
                onChange={(e) => setNewService({ ...newService, price: e.target.value })}
              />
              <Button colorScheme="teal" width="full" onClick={handleAddService}>
                Añadir Servicio
              </Button>
            </Flex>
          </Box>
          <TableContainer overflowX="auto">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Nombre</Th>
                  <Th>Precio</Th>
                  <Th>Acciones</Th>
                </Tr>
              </Thead>
              <Tbody>
                {services.map((service) => (
                  <Tr key={service._id}>
                    <Td>{service.name}</Td>
                    {editingService && editingService._id === service._id ? (
                      <>
                        <Td>
                          <Input
                            type="number"
                            name="price"
                            width="full"
                            value={editingService.price || ""}
                            onChange={handleChange}
                            placeholder="Precio"
                          />
                        </Td>
                        <Td>
                          <Flex gap="2" flexDirection="column">
                            <Button colorScheme="blue" width="full" onClick={handleSaveService}>
                              Guardar
                            </Button>
                            <Button colorScheme="red" width="full" onClick={() => setEditingService(null)}>
                              Cancelar
                            </Button>
                          </Flex>
                        </Td>
                      </>
                    ) : (
                      <>
                        <Td>{service.price !== null ? service.price : "Precio"}</Td>
                        <Td>
                          <Flex gap="2" flexDirection="column">
                            <Button colorScheme="teal" width="full" onClick={() => handleEditService(service)}>
                              Editar
                            </Button>
                            <Button colorScheme="red" width="full" onClick={() => handleDeleteService(service._id)}>
                              Eliminar
                            </Button>
                          </Flex>
                        </Td>
                      </>
                    )}
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
        <Box
          width={{ base: "100%", md: "300px" }}
          height={{ base: "200px", md: "300px" }}
          bgImage={`url(${bgImage})`}
          bgSize="cover"
          bgPosition="center"
          marginX={{ base: "0", md: "10px" }}
        />
      </Box>
      <FloatingHearts show={showHearts} />
    </PageWrapper>
  );
};

export default ServicesList;
