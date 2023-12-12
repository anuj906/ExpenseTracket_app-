import React, { useState } from 'react';
import { useFrappeAuth } from 'frappe-react-sdk';
import {
  Box,
  Button,
  Input,
  Stack,
  Heading,
  Text,
  Center,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';

export const Login = () => {
  const {
    currentUser,
    isValidating,
    isLoading,
    login,
    logout,
    error,
    updateCurrentUser,
  } = useFrappeAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await login(username, password);
      console.log("Login successful");
      // Additional logic after a successful login
    } catch (error) {
      console.error("Login failed", error);
      // Handle the error, e.g., display an error message
    }
  };

  return (
    <Center h="100vh">
      <Box p={8} maxW="md" borderWidth="1px" borderRadius="md" boxShadow="lg">
        <Heading mb={4} textAlign="center">Login</Heading>

        {error && <Text color="red.500" mb={4} textAlign="center">Invalid username or password</Text>}

        <Stack spacing={4}>
          <FormControl>
            <FormLabel htmlFor="username">Username</FormLabel>
            <Input
              type="text"
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>

          <Button colorScheme="blue" onClick={handleLogin} isLoading={isLoading} size="lg">
            Login
          </Button>
        </Stack>

        <Text mt={4} textAlign="center">
          {currentUser ? `Logged in as ${currentUser.name}` : 'Not logged in'}
        </Text>

        <Stack mt={4} direction="row" spacing={3} justify="center">
          <Button colorScheme="gray" onClick={logout}>
            Logout
          </Button>
          <Button colorScheme="teal" onClick={updateCurrentUser}>
            Fetch current user
          </Button>
        </Stack>
      </Box>
    </Center> 
  );
};
