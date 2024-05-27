import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flex, Input } from '@chakra-ui/react';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import Title from '../../components/Title/Title';
import CustomTable from '../../components/CustomTable/CustomTable';
import useSearchAndFilter from '../../hooks/useSearchAndFilter';
import PathologyService from '../../services/pathology.service';

function PathologyHome() {
  const [pathologies, setPathologies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    PathologyService.getAllPathologies()
      .then(data => {
        setPathologies(data);
      })
      .catch(err => console.error('Error fetching pathologies:', err));
  }, []);

  const filteredPathologies = useSearchAndFilter(pathologies, searchTerm, (pathology, term) => (
    pathology.name.toLowerCase().includes(term.toLowerCase()) ||
    pathology.firstName.toLowerCase().includes(term.toLowerCase()) ||
    pathology.lastName.toLowerCase().includes(term.toLowerCase()) ||
    pathology.dni.includes(term) ||
    (pathology.procedureNumber && pathology.procedureNumber.toString().includes(term)) ||
    (pathology.location && pathology.location.coordinates ? pathology.location.coordinates.join(", ").includes(term) : false)
  ));

  const handleRowClick = (pathology) => {
    navigate(`/showPathology/${pathology._id}`, { state: { pathology } });
  };

  const columns = [
    { title: 'Nombre', render: item => item.name, display: { base: 'none', md: 'table-cell' } },
    { title: 'Primer apellido', render: item => item.firstName, display: { base: 'none', md: 'table-cell' } },
    { title: 'Segundo apellido', render: item => item.lastName, display: { base: 'none', md: 'table-cell' } },
    { title: 'Número procedimiento', render: item => item.procedureNumber, display: 'table-cell' },
    { title: 'DNI', render: item => item.dni, display: 'table-cell' },
    { title: 'Ubicación', render: item => item.location && item.location.coordinates ? item.location.coordinates.join(", ") : 'No disponible', display: { base: 'none', md: 'table-cell' } },
    { title: 'Violencia de Género', render: item => item.isGenderViolence ? 'Sí' : 'No', display: { base: 'none', md: 'table-cell' } },
    { title: 'Violencia Doméstica', render: item => item.isDomesticViolence ? 'Sí' : 'No', display: { base: 'none', md: 'table-cell' } },
    { title: 'Órgano Judicial', render: item => item.judicialBody, display: 'table-cell' },
    { title: 'Patología Completada', render: item => item.pathologyCompleted ? 'Sí' : 'No', display: { base: 'none', md: 'table-cell' } },
    { title: 'Creado', render: item => new Date(item.createdAt).toLocaleDateString(), display: { base: 'none', md: 'table-cell' } },
    { title: 'Actualizado', render: item => new Date(item.updatedAt).toLocaleDateString(), display: { base: 'none', md: 'table-cell' } },
  ];

  return (
    <PageWrapper>
      <Flex direction="column" align="center" mt={{ base: '3vh', md: '5vh' }} width="100%">
        <Title><h2>Gastos</h2></Title>
        <Input
          placeholder="Buscar procedimientos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          my="4"
        />
        <CustomTable columns={columns} data={filteredPathologies} onRowClick={handleRowClick} />
      </Flex>
    </PageWrapper>
  );
}

export default PathologyHome;
