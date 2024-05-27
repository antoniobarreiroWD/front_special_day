import React, { useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Text, VStack, Flex, Textarea, Button } from '@chakra-ui/react';
import { UserContext } from '../../contexts/UserContext';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import LocationComponent from '../../components/LocationComponent/LocationComponent';

function ShowProcedure() {
  const { state } = useLocation();
  const procedure = state?.procedure;
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [address, setAddress] = useState('');

  const handleEdit = () => {
    navigate(`/editprocedure/${procedure?._id}`, { state: { procedure } });
  };


  const handleAddressFetch = (fetchedAddress) => {
    setAddress(fetchedAddress);
  };

  if (!procedure) {
    return <div><h1>Procedimiento no encontrado</h1></div>;
  }

  return (
    <PageWrapper>
      <Box maxW="80%" margin="auto" >
        <Flex direction={"row"} justify="space-around" wrap="wrap" alignItems="center">
          {procedure?.guardInfo && (
            <Box mt={5}>
              <Text fontSize="2xl" fontWeight="bold">Procedimiento iniciado por:</Text>
              <Text><strong>Nombre:</strong> {procedure.guardInfo.name}</Text>
              <Text><strong>Primer nombre:</strong> {procedure.guardInfo.firstName}</Text>
              <Text><strong>Apellido:</strong> {procedure.guardInfo.lastName}</Text>
              <Text><strong>Email:</strong> {procedure.guardInfo.email}</Text>
            </Box>
          )}

          {user && user._id === procedure.guardInfo?.guardId && !procedure.procedureCompleted && (
            <Button size="sm" margin={5} onClick={handleEdit}>Editar</Button>
          )}

        </Flex>
        <Flex direction={{ base: "column", lg: "row" }} justify="space-between" wrap="wrap" gap={8}>
          <Box flex={1} mt={5}>
            <LocationComponent location={procedure.location} onAddressFetch={handleAddressFetch} />
          </Box>

          <VStack flex={1} mt={5} align="flex-start" spacing={4}>
            <Text fontSize="2xl" fontWeight="bold">Procedimiento</Text>
            <Text><strong> Número de Procedimiento:</strong> {procedure.procedureNumber}</Text>
            <Text><strong>Nombre:</strong> {procedure.name}</Text>
            <Text><strong>Apellido:</strong> {procedure.lastName}</Text>
            <Text><strong>DNI:</strong> {procedure.dni}</Text>
            <Text><strong>Localización:</strong> {address}</Text>
            <Text><strong>Dirección:</strong> {procedure.address}</Text>
            <Text><strong>Violencia de género:</strong> {procedure.isGenderViolence ? "Sí" : "No"}</Text>
            <Text><strong>Violencia doméstica:</strong> {procedure.isDomesticViolence ? "Sí" : "No"}</Text>
            <Text><strong>Órgano judicial:</strong> {procedure.judicialBody}</Text>
          </VStack>
        </Flex>
        <Box mt={5}>
          <Text mb={2}><strong>Procedimiento:</strong></Text>
          <Textarea minHeight="280px" readOnly value={procedure.procedureReport || ''} />
        </Box>
        <Flex justify="space-between" wrap="wrap">
          <Text mb={2}><strong>Fecha de creación:</strong> {new Date(procedure.createdAt).toLocaleDateString()}</Text>
          <Text mb={2}><strong>Fecha de actualización:</strong> {new Date(procedure.updatedAt).toLocaleDateString()}</Text>
          <Text><strong>Informe Procedimiento Completado:</strong> {procedure.procedureCompleted ? "Sí" : "No"}</Text>
        </Flex>
        
    </Box>

    </PageWrapper >
  );
}

export default ShowProcedure;
