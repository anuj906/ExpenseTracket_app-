import React, { useState } from 'react';
import { AddExpenseRecord } from '../components/AddExpenseRecord';
import {
  VStack,
  HStack,
  Heading,
  Box,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useFrappeGetDocList, useFrappeDocTypeEventListener, useFrappeDeleteDoc } from 'frappe-react-sdk';

interface ExpenseFields {
  name: string;
  amount: string;
  type: string;
  description: string;
  remarks: string;
  formated_amount:string; 
  owner:string;
}
export const ExpenseListTab = () => {
  const [selectedExpense, setSelectedExpense] = useState<ExpenseFields | null>(null); 
  const { data, isLoading, error, mutate } = useFrappeGetDocList<ExpenseFields>('Expense Record', {
    fields: ['name', 'formated_amount', 'type', 'description','remarks','owner'],
  });
  useFrappeDocTypeEventListener('Expense Record', (d) => {
    console.log('Event triggered:', d);
    if (d.doctype === 'Expense Record') {
        mutate();
    }
});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { deleteDoc, isDeleting, error: deleteError } = useFrappeDeleteDoc();
  const handleEditClick = (doc: ExpenseFields) => {
    onOpen();
    setSelectedExpense(doc);
 console.log({doc} );
  };
  const handleDeleteClick = async (name: string) => {
    try {
      await deleteDoc('Expense Record', name);
      mutate();
    } catch (error) {
      console.error('Error deleting document:', error.message);
    }
  };
  if (isLoading) {
    return <Spinner />;
  }
  if (error) {
    return <Text color="red">Error loading data: {error.message}</Text>;
  }
  return (
    <VStack spacing={4}>
      <HStack justify="space-between" w="100%">
        <Heading as="h1" fontSize="xl">
          Expenses
        </Heading>
        <Box>
          <Button colorScheme="blue" color="white" bg="teal.500" _hover={{ bg: 'teal.600' }} onClick={onOpen}>
            Add
          </Button>
        </Box>
      </HStack>
      {data && (
        <Table>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Amount</Th>
              <Th>Type</Th>
              <Th>Description</Th>
              <Th>Remarks</Th>
              <Th>Owner</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((doc: ExpenseFields) => (
              <Tr key={doc.name}>
                <td>{doc.name}</td>
                <Td>{doc.formated_amount}</Td>
                <Td>{doc.type}</Td>
                <Td>{doc.description}</Td>
                <Td>{doc.remarks}</Td>
                <Td>{doc.owner}</Td>
                <Td>
                  <Button color="white" bg="green" onClick={() => handleEditClick(doc)}>
                    Edit
                  </Button>
                  <Button marginLeft="6" color="white" bg="red" onClick={() => handleDeleteClick(doc.name)}>
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
      <AddExpenseRecord isOpen={isOpen} onOpen={onOpen} onClose={onClose} selectedExpense={selectedExpense} />
    </VStack>
  );
};
