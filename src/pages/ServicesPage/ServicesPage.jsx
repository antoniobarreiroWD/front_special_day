import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flex, Input } from '@chakra-ui/react';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import Title from '../../components/Title/Title';
import CustomTable from '../../components/CustomTable/CustomTable';
import useSearchAndFilter from '../../hooks/useSearchAndFilter';

const ServicesPage = () => {





  

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
        
      </Flex>
    </PageWrapper>
  );
}

export default ServicesPage;
