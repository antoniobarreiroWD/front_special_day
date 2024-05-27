import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Flex, Box, Button, IconButton, Text, useDisclosure, } from "@chakra-ui/react";
import { MdGpsFixed } from 'react-icons/md';
import { FormInput, FormSwitch, FormSelect } from '../../components/FormControls/FormControls';
import Modal from '../../components/Modal/Modal';
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import authService from "../../services/auth.service";
import proceduresService from "../../services/procedures.service";
import { JUDICIAL_BODY_OPTIONS } from '../../consts';
import { COLORS } from "../../theme";

function CreateProcedurePage() {
  const [procedureData, setProcedureData] = useState({
    name: "",
    firstName: "",
    lastName: "",
    dni: "",
    location: "",
    address: "",
    observations: "",
    isGenderViolence: false,
    isDomesticViolence: false,
    judicialBody: '',
    procedureReport: "",
  });

  const [userInfo, setUserInfo] = useState({
    guardId: null,
    name: "",
    firstName: "",
    lastName: "",
    email: "",
  });

  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const user = await authService.getUser(token);
          setUserInfo({
            guardId: user._id,
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
    fetchUserData();
  }, []);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProcedureData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const getDeviceLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setProcedureData(prevState => ({
            ...prevState,
            location: {
              type: "Point",
              coordinates: [longitude, latitude],
            },
          }));
        },
        (error) => {
          console.error("Error obteniendo la ubicación: ", error);
          onOpen();
        }
      );
    } else {
      onOpen();
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const procedureDataWithUserInfo = {
      ...procedureData,
      guardInfo: {
        guardId: userInfo.guardId,
        name: userInfo.name,
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        email: userInfo.email,
      },
    };
    try {
      await proceduresService.createProcedure(procedureDataWithUserInfo);
      navigate('/guardhome');
    } catch (err) {
      console.error('Error creating procedure:', err);
      onOpen();
    }
  };

  return (
    <PageWrapper>
      <Box p={4}>
        <form onSubmit={onSubmit}>
          <Flex direction="column" gap="4">
            <Flex direction="row" gap="4">
              <FormInput label="Nombre" name="name" value={procedureData.name} onChange={onChange} mb={{ base: '8', sm: '2' }} />
              <FormInput label="Primer Apellido" name="firstName" value={procedureData.firstName} onChange={onChange} />
              <FormInput label="Segundo Apellido" name="lastName" value={procedureData.lastName} onChange={onChange} />
            </Flex>
            <Flex direction="row" gap="2">
              <FormInput label="DNI" name="dni" value={procedureData.dni} onChange={onChange} />
              <FormSelect label="Cuerpo Judicial" name="judicialBody" value={procedureData.judicialBody} onChange={onChange} options={JUDICIAL_BODY_OPTIONS} />
            </Flex>
            <Flex direction="row" gap="2">
              <FormInput label="Dirección" name="address" value={procedureData.address} onChange={onChange} />
              <FormInput
                label="Localización"
                name="location"
                value={procedureData.location ? `Lat: ${procedureData.location.coordinates[1]}, Lon: ${procedureData.location.coordinates[0]}` : ''}
                onChange={onChange}
                readOnly
                placeholder="Haga clic en el icono para geolocalizar"
                rightElement={
                  <IconButton
                    aria-label="Geolocalizar"
                    icon={<MdGpsFixed />}
                    onClick={getDeviceLocation}
                    size="sm"
                    variant="ghost"
                  />
                }
              />
            </Flex>
            <Flex direction="row" gap="1">
              <FormSwitch label="Violencia De Género" name="isGenderViolence" isChecked={procedureData.isGenderViolence} onChange={onChange} />
              <FormSwitch label="Violencia Doméstica" name="isDomesticViolence" isChecked={procedureData.isDomesticViolence} onChange={onChange} />
            </Flex>
            <FormInput label="Informe de Procedimiento" name="procedureReport" isTextArea={true} value={procedureData.procedureReport} onChange={onChange} minH="200px" />
            <Button type="submit" colorScheme="blue">Crear Procedimiento</Button>
          </Flex>
        </form>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Text fontSize="2xl" fontWeight="bold" color={COLORS.PRIMARY}>Error creando el procedimiento. Por favor, rellene todos los campos</Text>
      </Modal>
    </PageWrapper>
  );
}

export default CreateProcedurePage;
