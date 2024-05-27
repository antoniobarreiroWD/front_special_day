import { useLocation } from "react-router-dom";
import { Box, Text, VStack, Flex, Textarea, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { useContext, useState } from "react";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import LocationComponent from "../../components/LocationComponent/LocationComponent";


function ShowPathology() {
  const { state } = useLocation();
  const pathology = state?.pathology;
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [address, setAddress] = useState('');


  if (!pathology) {
    return (
      <div>
        <h1>Patología no encontrada</h1>
      </div>
    );
  }

  const handleEdit = (pathology) => {
    navigate(`/editpathology/${pathology._id}`, { state: { pathology } });
  };

  const handleAddressFetch = (fetchedAddress) => {
    setAddress(fetchedAddress);
  };

  const showEditButton = (
    user && user.role === "Pathologist" && !pathology.pathologyCompleted && (
      !pathology.pathologyInfo || pathology.pathologyInfo.pathologyId === user._id
    )
  );
  return (
    <PageWrapper>
      <Box maxW="80%" margin="auto" >
        <Flex direction={"row"} justify="space-around" wrap="wrap" alignItems="center">
          {pathology?.guardInfo && (
            <Box mt={5}>
              <Text fontSize="2xl" fontWeight="bold">Procedimiento iniciado por:</Text>
              <Text><strong>Nombre:</strong> {pathology.guardInfo.name}</Text>
              <Text><strong>Primer nombre:</strong> {pathology.guardInfo.firstName}</Text>
              <Text><strong>Apellido:</strong> {pathology.guardInfo.lastName}</Text>
              <Text><strong>Email:</strong> {pathology.guardInfo.email}</Text>
            </Box>
          )}

          {showEditButton && (
            <Button size="sm" margin={5} onClick={() => handleEdit(pathology)}>Editar</Button>
          )}

        </Flex>
        <Flex direction={{ base: "column", lg: "row" }} justify="space-between" wrap="wrap" gap={8}>
          <Box flex={1} mt={5}>
            <LocationComponent location={pathology.location} onAddressFetch={handleAddressFetch} />
          </Box>

          <VStack flex={1} mt={5} align="flex-start" spacing={4}>
            <Text fontSize="2xl" fontWeight="bold">Procedimiento</Text>
            <Text><strong> Número de Procedimiento:</strong> {pathology.procedureNumber}</Text>
            <Text><strong>Nombre:</strong> {pathology.name}</Text>
            <Text><strong>Apellido:</strong> {pathology.lastName}</Text>
            <Text><strong>DNI:</strong> {pathology.dni}</Text>
            <Text><strong>Localización:</strong> {address}</Text>
            <Text><strong>Dirección:</strong> {pathology.address}</Text>
            <Text><strong>Violencia de género:</strong> {pathology.isGenderViolence ? "Sí" : "No"}</Text>
            <Text><strong>Violencia doméstica:</strong> {pathology.isDomesticViolence ? "Sí" : "No"}</Text>
            <Text><strong>Órgano judicial:</strong> {pathology.judicialBody}</Text>
          </VStack>
        </Flex>
        <Box mt={5}>
          <Text mb={2}><strong>Informe de Patología:</strong></Text>
          <Textarea minHeight="280px" readOnly value={pathology.pathologyReport || ''} />
        </Box>
        <Box mt={5}>
          <Text mb={4}><strong>Pruebas solicitadas al INTCF:</strong></Text>
          <Flex direction={{ base: "column", md: "row" }}
            justify="space-between"
            wrap="wrap"
            mb={2}>
            <Text mb={2}><strong>Histopatología:</strong> {pathology.histopathology ? "Sí" : "No"}</Text>
            <Text mb={2}><strong>Tóxicos:</strong> {pathology.toxics ? "Sí" : "No"}</Text>
            <Text><strong>Biología:</strong> {pathology.biology ? "Sí" : "No"}</Text>
          </Flex>
        </Box>
        <Box mt={5}>
          <Text mb={2}><strong>Informe de Procedimiento</strong></Text>
          <Textarea minHeight="280px" readOnly value={pathology.procedureReport || ''} />
        </Box>
        <Flex justify="space-between" wrap="wrap">
          <Text mb={2}><strong>Fecha de creación:</strong> {new Date(pathology.createdAt).toLocaleDateString()}</Text>
          <Text mb={2}><strong>Fecha de actualización:</strong> {new Date(pathology.updatedAt).toLocaleDateString()}</Text>
          <Text><strong>Informe Patología Completado:</strong> {pathology.pathologyCompleted ? "Sí" : "No"}</Text>
        </Flex>

      </Box>

    </PageWrapper >

  );
}

export default ShowPathology;