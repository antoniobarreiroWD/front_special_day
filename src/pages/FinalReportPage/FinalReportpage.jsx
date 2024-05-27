import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flex, Input } from '@chakra-ui/react';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import Title from '../../components/Title/Title';
import CustomTable from '../../components/CustomTable/CustomTable';
import useSearchAndFilter from '../../hooks/useSearchAndFilter';
import FinalReportService from '../../services/finalReport.service';

function FinalReport() {
  const [finalReports, setFinalReports] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    FinalReportService.getAllFinalReports()
      .then(data => {
        setFinalReports(data);
      })
      .catch(err => console.error('Error fetching finalReports:', err));
  }, []);

  const filteredFinalReports = useSearchAndFilter(finalReports, searchTerm, (finalReport, term) => (
    finalReport.name.toLowerCase().includes(term.toLowerCase()) ||
    finalReport.firstName.toLowerCase().includes(term.toLowerCase()) ||
    finalReport.lastName.toLowerCase().includes(term.toLowerCase()) ||
    finalReport.dni.includes(term) ||
    (finalReport.procedureNumber && finalReport.procedureNumber.toString().includes(term)) ||
    (finalReport.location && finalReport.location.coordinates ? finalReport.location.coordinates.join(", ").includes(term) : false)
  ));

  const handleRowClick = (finalReport) => {
    navigate(`/showFinalReport/${finalReport._id}`, { state: { finalReport } });
  };

  const columns = [
    { title: 'Nombre', render: item => item.name, display: { base: 'none', md: 'table-cell' } },
    { title: 'Primer apellido', render: item => item.firstName, display: { base: 'none', md: 'table-cell' } },
    { title: 'Segundo apellido', render: item => item.lastName, display: { base: 'none', md: 'table-cell' } },
    { title: 'Número de procedimiento', render: item => item.procedureNumber, display: 'table-cell' },
    { title: 'DNI', render: item => item.dni, display:'table-cell' },
    { title: 'Ubicación', render: item => item.location && item.location.coordinates ? item.location.coordinates.join(", ") : 'No disponible', display: { base: 'none', md: 'table-cell' } },
    { title: 'Violencia de Género', render: item => item.isGenderViolence ? 'Sí' : 'No', display: { base: 'none', md: 'table-cell' } },
    { title: 'Violencia Doméstica', render: item => item.isDomesticViolence ? 'Sí' : 'No', display: { base: 'none', md: 'table-cell' } },
    { title: 'Órgano Judicial', render: item => item.judicialBody, display: 'table-cell' },
    { title: 'Informe Final Completado', render: item => item.finalReportCompleted ? 'Sí' : 'No', display: { base: 'none', md: 'table-cell' } },
    { title: 'Creado', render: item => new Date(item.createdAt).toLocaleDateString(), display: { base: 'none', md: 'table-cell' } },
    { title: 'Actualizado', render: item => new Date(item.updatedAt).toLocaleDateString(), display: { base: 'none', md: 'table-cell' } },
  ];

  return (
    <PageWrapper>
      <Flex direction="column" align="center" mt={{ base: '3vh', md: '5vh' }} width="100%">
        <Title>Agenda</Title>
        <Input
          placeholder="Buscar Informe Final..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          my="4"
        />
        <CustomTable columns={columns} data={filteredFinalReports} onRowClick={handleRowClick} />
      </Flex>
    </PageWrapper>
  );
}

export default FinalReport;

