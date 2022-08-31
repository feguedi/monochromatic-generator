import React from 'react';
import PropTypes from 'prop-types';
import { Flex } from '@chakra-ui/react';

import Navbar from '../navbars/Navbar';

export default function MainLayout({ children }) {
  return (
    <Flex direction="column" minW="100vw" minH="100vh">
      <Navbar />
      <Flex
        direction="column"
        alignItems="center"
        justify="center"
        minH="100%"
        w="100%"
        maxW={['90vw', '80vw', '80vw', '75rem']}
        m="auto"
      >
        {children}
      </Flex>
    </Flex>
  );
}

MainLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
    PropTypes.element,
  ]).isRequired,
};
