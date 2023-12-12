import React, { useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  chakra,
  Stack,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Select,
  Textarea,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useFrappeCreateDoc, useFrappeUpdateDoc } from 'frappe-react-sdk';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  selectedExpense: FormFields | null;
}

interface FormFields {
  name: string;
  amount: string;
  type: string;
  description: string;
  remarks: string;
  formated_amount:string;
  owner:string;
}

export const AddExpenseRecord = ({ isOpen, onClose, selectedExpense }: Props) => {
  const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm<FormFields>();
  const { createDoc, loading: createLoading } = useFrappeCreateDoc();
  const { updateDoc, loading: updateLoading } = useFrappeUpdateDoc();

  useEffect(() => {
    if (selectedExpense) {
      Object.entries(selectedExpense).forEach(([key, value]) => {
        setValue(key as keyof FormFields, value);
      });
    } else {
      reset();
    }
  }, [selectedExpense, setValue, reset]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setValue(e.target.name as keyof FormFields, e.target.value);
  };

  const onSubmit = (data: FormFields) => {
    if (selectedExpense ) {
      updateDoc('Expense Record', selectedExpense.name, { ...data })
        .then(() => {
          onClose();
        })
        .catch((error) => {
          console.error('Error editing document:', error.message);
        });
        console.log(data)
    } else {
      createDoc('Expense Record', data)
        .then(() => {
          onClose();
        })
        .catch((error) => {
          console.error('Error creating document:', error.message);
        });
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <chakra.form onSubmit={handleSubmit(onSubmit)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedExpense ? 'Edit' : 'Add'} Expense</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <FormControl isInvalid={errors.description}>
                <FormLabel>Description</FormLabel>
                <Input
                  type="text"
                  {...register('description', {
                    required: 'Description is required',
                    minLength: {
                      value: 5,
                      message: 'Description should be at least 5 characters',
                    },
                  })}
                  onChange={handleChange}
                />
                <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.amount}>
                <FormLabel>Amount</FormLabel>
                <Input
                  type="number"
                  {...register('amount', {
                    required: 'Amount is required',
                    min: {
                      value: 0,
                      message: 'Amount should be at least 1',
                    },
                  })}
                  onChange={handleChange}
                />
                <FormErrorMessage>{errors.amount?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.type}>
                <FormLabel>Type</FormLabel>
                <Select {...register('type', { required: 'Type is required' })} onChange={handleChange}>
                  <option value="">Select Type</option>
                  <option value="Credit">Credit</option>
                  <option value="Debit">Debit</option>
                </Select>
                <FormErrorMessage>{errors.type?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.remarks}>
                <FormLabel>Remarks</FormLabel>
                <Textarea {...register('remarks')} onChange={handleChange} />
                <FormErrorMessage>{errors.remarks?.message}</FormErrorMessage>
              </FormControl>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost" type="submit" isLoading={createLoading || updateLoading}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </chakra.form>
    </Modal>
  );
};
