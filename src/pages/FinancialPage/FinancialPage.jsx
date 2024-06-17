import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  useToast,
  Flex,
  Icon
} from '@chakra-ui/react';
import { AiFillSmile, AiFillFrown } from 'react-icons/ai';
import SpecialDayService from '../../services/specialDay.service';
import PageWrapper from '../../components/PageWrapper/PageWrapper';

const FinancialOverview = () => {
  const [totalGifts, setTotalGifts] = useState(0);
  const [totalServices, setTotalServices] = useState(0);
  const toast = useToast();

  const fetchData = async () => {
    try {
      const specialDayData = await SpecialDayService.getUserSpecialDay();
      const giftsSum = specialDayData.guests.reduce((acc, guest) => acc + (guest.gift || 0), 0);
      const servicesSum = specialDayData.services.reduce((acc, service) => acc + (service.price || 0), 0);

      setTotalGifts(giftsSum);
      setTotalServices(servicesSum);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: 'Error',
        description: 'Unable to fetch financial data.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const balance = totalGifts - totalServices;
  const BalanceIcon = balance >= 0 ? AiFillSmile : AiFillFrown;

  return (
    <PageWrapper>
      <Box maxW="500px" mx="auto" p="20px" borderRadius="10px" boxShadow="lg">
        <Heading as="h2" size="xl" textAlign="center" mb="20px">
          Resumen Financiero
        </Heading>
        <Box>
          <Heading as="h3" size="md" mb="10px">
            Total de Regalos: €{totalGifts}
          </Heading>
          <Heading as="h3" size="md" mb="10px">
            Total de Coste de Servicios: €{totalServices}
          </Heading>
          <Flex align="center" gap="2">
            <Heading as="h3" size="md" mb="10px">
              Balance: €{Math.abs(balance)}
            </Heading>
            <Icon as={BalanceIcon} w={6} h={6} color={balance >= 0 ? 'green.500' : 'red.500'} />
          </Flex>
        </Box>
      </Box>
    </PageWrapper>
  );
};

export default FinancialOverview;
