import React from 'react';
import { Box, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import { COLORS } from '../../theme/index'; 

const CustomTable = ({ columns, data, onRowClick }) => (
  <Box width="100%" overflowX="auto">
    <Table variant="simple" size="sm">
      <Thead>
        <Tr>
          {columns.map((col, index) => (
            <Th key={index} textAlign="center" display={col.display}>{col.title}</Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        {data.map((item, index) => (
          <Tr key={item._id}
              bg={index % 2 === 0 ? COLORS.TABLEONE : COLORS.TABLETWO}
              onClick={() => onRowClick(item)}
              style={{ cursor: 'pointer' }}
              sx={{ '&:hover': { backgroundColor: COLORS.ACCENT } }}>
            {columns.map((col, idx) => (
              <Td key={idx} textAlign="center" display={col.display}>{col.render(item)}</Td>
            ))}
          </Tr>
        ))}
      </Tbody>
    </Table>
  </Box>
);

export default CustomTable;
