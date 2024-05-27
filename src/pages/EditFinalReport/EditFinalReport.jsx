import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Button, FormControl, FormLabel, Textarea, Flex, Switch,Text, useDisclosure } from '@chakra-ui/react';
import finalreportService from '../../services/finalReport.service';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import authService from '../../services/auth.service';
import { COLORS } from '../../theme';
import Modal  from '../../components/Modal/Modal';

function EditFinalReport() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [finalReport, setFinalReport] = useState({
   procedureNumber: '',
    name: '',
    firstName: '',
    lastName: '',
    dni: '',
    location: '',
    observations: '',
    procedureReport: '',
    pathologyCompleted: false,
    judicialBody: '',
    guardValidate: false,
    pathologyValidate: false,
    finalReportCompleted: false,
    finalReport: '',
    guardInfo: {},
    pathologyInfo: {},
  });

  const [userInfo, setUserInfo] = useState({
    userId: '',
    name: '',
    firstName: '',
    lastName: '',
    email: '',
  });

  useEffect(() => {
    const fetchFinalReport = async () => {
      try {
        const loadedFinalReport = await finalreportService.getFinalReportById(id);
        setFinalReport(loadedFinalReport);
      } catch (error) {
        console.error('Error loading the Final Report:', error);
        navigate('/finalReport');
      }
    };

    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const user = await authService.getUser(token);
          setUserInfo({
            userId: user._id,
            name: user.name,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
          });
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchFinalReport();
    fetchUserData();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'finalReport') {
      setFinalReport(prevFinalReport => ({
        ...prevFinalReport,
        guardValidate: false,
        pathologyValidate: false,
        [name]: value,
      }));
    } else {
      setFinalReport(prevFinalReport => ({
        ...prevFinalReport,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };

  const handleSwitchChange = (field) => {
    if (field === 'finalReportCompleted') {
      if (!finalReport.guardValidate || !finalReport.pathologyValidate) {
        console.error("No se puede completar el informe final hasta que se validen guardia y patología.");
        onOpen();
        return;
      }
    }
    if (field === 'guardValidate' && finalReport.guardInfo.guardId !== userInfo.userId) {
      console.error("No tienes permiso para cambiar la validación de guardia.");
      return;
    }
    if (field === 'pathologyValidate' && finalReport.pathologyInfo.pathologyId !== userInfo.userId) {
      console.error("No tienes permiso para cambiar la validación de patología.",);
      return
    }
    setFinalReport(prevFinalReport => ({
      ...prevFinalReport,
      [field]: !prevFinalReport[field],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await finalreportService.updateFinalReport(id, finalReport);
      navigate('/finalReport');
    } catch (error) {
      console.error('Error updating the final report:', error);
    }
  };

  return (
    <PageWrapper>
      <Box p={4}>
        <form onSubmit={handleSubmit}>
          <Flex direction="column" gap="4">
          <Text><strong> Número de Procedimiento:</strong> {finalReport.procedureNumber}</Text>
            <FormControl>
              <FormLabel>Informe Final</FormLabel>
              <Textarea name="finalReport" value={finalReport.finalReport} onChange={handleChange} minHeight={300} />
            </FormControl>
           
            <FormControl>
              <FormLabel htmlFor="guardValidate">Validación de Guardia</FormLabel>
              <Switch id="guardValidate" isChecked={finalReport.guardValidate} onChange={() => handleSwitchChange('guardValidate')} />
            </FormControl>
            
            <FormControl>
              <FormLabel htmlFor="pathologyValidate">Validación de Patología</FormLabel>
              <Switch id="pathologyValidate" isChecked={finalReport.pathologyValidate} onChange={() => handleSwitchChange('pathologyValidate')} />
            </FormControl>
            
            <FormControl>
              <FormLabel htmlFor="finalReportCompleted">Informe Final Completado</FormLabel>
              <Switch id="finalReportCompleted" isChecked={finalReport.finalReportCompleted} onChange={() => handleSwitchChange('finalReportCompleted')} />
            </FormControl>
            
            <Button type="submit" colorScheme="blue">
              Actualizar
            </Button>
          </Flex>
        </form>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Text fontSize="2xl" fontWeight="bold" color={COLORS.PRIMARY}>Error, Informe Final no completado. Falta validación de otro departamento</Text>
       
      </Modal>
    </PageWrapper>
  );
}

export default EditFinalReport;
