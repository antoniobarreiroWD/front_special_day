import { useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import { Box, Text, VStack, Button, Textarea, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import LocationComponent from "../../components/LocationComponent/LocationComponent";

function ShowFinalReport() {
  const { state } = useLocation();
  const finalReport = state?.finalReport;
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [address, setAddress] = useState('');

  if (!finalReport) {
    return (
      <div>
        <h1>Informe Final no encontrado</h1>
      </div>
    );
  }

  const handleEdit = (finalReport) => {
    navigate(`/editFinalReport/${finalReport._id}`, { state: { finalReport } });
  };

  const handleAddressFetch = (fetchedAddress) => {
    setAddress(fetchedAddress);
  };

  return (
    <PageWrapper>
      <Box maxW="80%" margin="auto" >
        <Flex direction={"row"} justify="space-around" wrap="wrap" alignItems="center">
          {finalReport?.guardInfo && (
            <Box mt={5}>
              <Text fontSize="2xl" fontWeight="bold">Procedimiento iniciado por:</Text>
              <Text><strong>Nombre:</strong> {finalReport.guardInfo.name}</Text>
              <Text><strong>Primer nombre:</strong> {finalReport.guardInfo.firstName}</Text>
              <Text><strong>Apellido:</strong> {finalReport.guardInfo.lastName}</Text>
              <Text><strong>Email:</strong> {finalReport.guardInfo.email}</Text>
            </Box>
          )}

          {
            ((user && user._id === finalReport.guardInfo?.guardId) ||
              (user && user._id === finalReport.pathologyInfo?.pathologyId)) &&
            !finalReport.finalReportCompleted && (
              <Button size="sm" margin={5} onClick={() => handleEdit(finalReport)}>
                Editar
              </Button>
            )
          }

          {finalReport?.pathologyInfo && (
            <Box mt={5}>
              <Text fontSize="2xl" fontWeight="bold">Patología realizada por:</Text>
              <Text><strong>Nombre:</strong> {finalReport.pathologyInfo.name}</Text>
              <Text><strong>Primer nombre:</strong> {finalReport.pathologyInfo.firstName}</Text>
              <Text><strong>Apellido:</strong> {finalReport.pathologyInfo.lastName}</Text>
              <Text><strong>Email:</strong> {finalReport.pathologyInfo.email}</Text>
            </Box>
          )}
        </Flex>
        <Flex direction={{ base: "column", lg: "row" }} justify="space-between" wrap="wrap" gap={8}>

          <Box flex={1} mt={5}>
            <LocationComponent location={finalReport.location} onAddressFetch={handleAddressFetch} />
          </Box>


          <VStack flex={1} mt={5} align="flex-start" spacing={4}>
            <Text fontSize="2xl" fontWeight="bold">Detalles del Informe</Text>
            <Text><strong> Número de Procedimiento:</strong> {finalReport.procedureNumber}</Text>
            <Text><strong>Nombre:</strong> {finalReport.name}</Text>
            <Text><strong>Apellido:</strong> {finalReport.lastName}</Text>
            <Text><strong>DNI:</strong> {finalReport.dni}</Text>
            <Text><strong>Localización:</strong> {address}</Text>
            <Text><strong>Dirección:</strong> {finalReport.address}</Text>
            <Text><strong>Violencia de género:</strong> {finalReport.isGenderViolence ? "Sí" : "No"}</Text>
            <Text><strong>Violencia doméstica:</strong> {finalReport.isDomesticViolence ? "Sí" : "No"}</Text>
            <Text><strong>Órgano judicial:</strong> {finalReport.judicialBody}</Text>
          </VStack>
        </Flex>


        <Box mt={5}>
          <Text mb={2}><strong>Informe final:</strong></Text>
          <Textarea minHeight="280px" readOnly value={finalReport.finalReport || ''} />
        </Box>
        <Flex justify="space-between" wrap="wrap">
          <Text mb={2}><strong>Fecha de creación:</strong> {new Date(finalReport.createdAt).toLocaleDateString()}</Text>
          <Text mb={2}><strong>Fecha de actualización:</strong> {new Date(finalReport.updatedAt).toLocaleDateString()}</Text>
          <Text><strong>Informe Final Completado:</strong> {finalReport.finalReportCompleted ? "Sí" : "No"}</Text>
        </Flex>

     
      </Box>
    </PageWrapper>
  );
}

export default ShowFinalReport;
