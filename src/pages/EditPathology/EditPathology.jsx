import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, FormControl, FormLabel, Flex, Switch, Textarea, Text, useDisclosure} from '@chakra-ui/react';
import pathologyService from '../../services/pathology.service';
import authService from '../../services/auth.service';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import Modal from '../../components/Modal/Modal';

function EditPathology() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [pathology, setPathology] = useState({
    procedureNumber: '',
    name: '',
    firstName: '',
    lastName: '',
    dni: '',
    address: '',
    location: { type: '', coordinates: [] },
    observations: '',
    procedureReport: '',
    pathologyReport: '',
    pathologyCompleted: false,
    judicialBody: '',
    pathologyInfo: {},
    isGenderViolence: false,
    isDomesticViolence: false,
    histopathology: false,
    toxics: false,
    biology: false,
  });

  const [userInfo, setUserInfo] = useState({
    userId: '',
    name: '',
    firstName: '',
    lastName: '',
    email: '',
  });


  useEffect(() => {
    const fetchPathology = async () => {
      try {
        const loadedPathology = location.state?.pathology || await pathologyService.getPathologyById(id);
        setPathology(loadedPathology);
      } catch (error) {
        console.error('Error loading the pathology:', error);
        onOpen();
        navigate('/Pathology');
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
          onOpen();
        }
      }
    };

    fetchPathology();
    fetchUserData();

  }, [id, location.state, navigate, onOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setPathology(prevPathology => ({ ...prevPathology, [name]: checked }));
    } else {
      setPathology(prevPathology => ({ ...prevPathology, [name]: value }));
    }
  };




  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedPathology = {
        ...pathology,
        pathologyInfo: {
          pathologyId: userInfo.userId,
          name: userInfo.name,
          firstName: userInfo.firstName,
          lastName: userInfo.lastName,
          email: userInfo.email
        }
      };
      await pathologyService.updatePathology(id, updatedPathology);
      navigate('/Pathology');
    } catch (error) {
      console.error('Error updating the pathology:', error);
      onOpen();
    }
  };

  return (
    <PageWrapper>
      <Box p={4}>
        <form onSubmit={handleSubmit}>
          <Flex direction="column" gap="4">
            <FormControl>
              <Text><strong> Número de Procedimiento:</strong> {pathology.procedureNumber}</Text>
              <FormLabel>Informe de Patología:</FormLabel>
              <Textarea
                id="pathologyReport"
                name="pathologyReport"
                value={pathology.pathologyReport}
                onChange={handleChange}
                minHeight={300}
              />
            </FormControl>
            <Box>
              <Text mb={4}><strong>Pruebas Complementarias del INTCF</strong></Text>

              <FormControl display="flex" alignItems="center">
                <FormLabel htmlFor="histopathology" mb="0">
                  Histopatología
                </FormLabel>
                <Switch id="histopathology" name="histopathology" isChecked={pathology.histopathology} onChange={handleChange} />
              </FormControl>

              <FormControl display="flex" alignItems="center">
                <FormLabel htmlFor="toxics" mb="0">
                  Tóxicos
                </FormLabel>
                <Switch id="toxics" name="toxics" isChecked={pathology.toxics} onChange={handleChange} />
              </FormControl>

              <FormControl display="flex" alignItems="center">
                <FormLabel htmlFor="biology" mb="0">
                  Biología
                </FormLabel>
                <Switch id="biology" name="biology" isChecked={pathology.biology} onChange={handleChange} />
              </FormControl>
            </Box>
            <FormControl display="flex" alignItems="center" mt="4">
              <FormLabel htmlFor="pathologyCompleted" mb="0">
                Informe de Patología Completado
              </FormLabel>
              <Switch
                id="pathologyCompleted"
                isChecked={pathology.pathologyCompleted}
                onChange={() => setPathology(prev => ({ ...prev, pathologyCompleted: !prev.pathologyCompleted }))}
              />
            </FormControl>
            <Button type="submit" colorScheme="blue">
              Actualizar Patología
            </Button>
          </Flex>
        </form>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Text fontSize="2xl" fontWeight="bold">
          Ha ocurrido un error. Por favor, inténtelo de nuevo más tarde.
        </Text>
      </Modal>
    </PageWrapper>
  );
}

export default EditPathology;
