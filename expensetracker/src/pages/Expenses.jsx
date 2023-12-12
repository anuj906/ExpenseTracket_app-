
import React from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import {ExpenseListTab} from '../components/ExpenseListTab'
import {Dashboard} from '../components/Dashboard'
import {Login} from "../components/Login"
export const Expenses = () => {
  return (
    <Tabs>
      <TabList>
     
        <Tab>Expenses List</Tab>
        <Tab>Dashboard</Tab>
        {/* <Tab>Login</Tab> */}
      </TabList>
      <TabPanels>
        <TabPanel>
          <ExpenseListTab />
        </TabPanel>
        <TabPanel>
          <Dashboard/>
        </TabPanel> 
        {/* <TabPanel>
          <Login/>
        </TabPanel> */}
      </TabPanels>
    </Tabs>
  );
};
