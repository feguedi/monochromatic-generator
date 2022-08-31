import { extendTheme } from '@chakra-ui/react';
import styles from './styles';

const theme = extendTheme({
  styles,
  colors: {
    brand: {
      900: '#1a365d',
      800: '#153e75',
      700: '#2a69ac',
    },
  },
  config: {
    initialColorMode: 'dark',
  },
});

export default theme;
