import React from 'react';
import { Divider, Heading } from '@chakra-ui/react';
import MainLayout from '../components/layouts/MainLayout';

export default function HomeView() {
  return (
    <MainLayout>
      <Heading as="h2">HomeView</Heading>
      <Divider />
    </MainLayout>
  );
}
