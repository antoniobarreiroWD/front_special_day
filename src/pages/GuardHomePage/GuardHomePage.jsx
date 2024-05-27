import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flex, Input } from '@chakra-ui/react';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import Title from '../../components/Title/Title';
import CustomTable from '../../components/CustomTable/CustomTable';
import useSearchAndFilter from '../../hooks/useSearchAndFilter';
import proceduresService from '../../services/procedures.service';


function GuardHomePage() {
  const [procedures, setProcedures] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadProcedures = async () => {
      try {
        const loadedProcedures = await proceduresService.getAllProcedures();
        setProcedures(loadedProcedures);
      } catch (error) {
        console.error('Error loading procedures:', error);
      }
    };

    loadProcedures();
  }, []);

  const filteredProcedures = useSearchAndFilter(procedures, searchTerm, (procedure, term) => (
    procedure.name.toLowerCase().includes(term.toLowerCase()) ||
    procedure.firstName.toLowerCase().includes(term.toLowerCase()) ||
    procedure.lastName.toLowerCase().includes(term.toLowerCase()) ||
    procedure.dni.includes(term) ||
    (procedure.procedureNumber && procedure.procedureNumber.toString().includes(term)) || 
    ((procedure.location && procedure.location.coordinates) ? procedure.location.coordinates.join(", ").includes(term) : false)
  ));

  const handleRowClick = (procedure) => {
    navigate(`/showprocedure/${procedure._id}`, { state: { procedure } });
  };

  const columns = [
    { title: 'Servicio', render: item => item.name, display: { base: 'none', md: 'table-cell' } },
    { title: 'Empresa', render: item => item.firstName, display: { base: 'none', md: 'table-cell' } },
    { title: 'Precio', render: item => item.procedureNumber, display: 'table-cell' },
    { title: 'Pagado por', render: item => new Date(item.updatedAt).toLocaleDateString(), display: { base: 'none', md: 'table-cell' } },
    { title: 'Contratado', render: item => new Date(item.createdAt).toLocaleDateString(), display: { base: 'none', md: 'table-cell' } },
  ];

  return (
    <PageWrapper>
      <Flex direction="column" align="center" mt={{ base: '3vh', md: '5vh' }} width="100%">
        <Title><h2>Servicios Contratados</h2></Title>
        <Input
          placeholder="Buscar servicios..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          my="4"
        />
        <CustomTable columns={columns} data={filteredProcedures} onRowClick={handleRowClick} />
      </Flex>
    </PageWrapper>
  );
}

export default GuardHomePage;
