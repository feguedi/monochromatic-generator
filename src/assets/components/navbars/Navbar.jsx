import React from 'react';
import {
  Flex,
  Heading,
  Link,
  Text,
} from '@chakra-ui/react';

export default function Navbar() {
  return (
    <Flex
      shadow="dark-lg"
      minW="100vw"
      w="100vw"
      bg="#00000022"
      h="4.5rem"
      alignItems="center"
      justifyContent="center"
    >
      <Flex
        minH="100%"
        w="100%"
        maxW={['90vw', '80vw', '80vw', '75rem']}
        alignItems="center"
        justifyContent="center"
      >
        <Heading as="h4" fontWeight="black" fontSize="xl">
          IXE
        </Heading>
        <Link ml="auto" to="https://ixe.dev/contacto">
          <Text>Contáctame</Text>
        </Link>
      </Flex>
    </Flex>
  );
}
