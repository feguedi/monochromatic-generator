/* eslint-disable import/no-extraneous-dependencies */
import { mode } from '@chakra-ui/theme-tools';

const styles = {
  global: (props) => ({
    body: {
      margin: 0,
      display: 'flex',
      minWidth: '100vw',
      minHeight: '100vh',
      fontFamily: 'Inter, Avenir, Helvetica, Arial, sans-serif;',
      bg: mode('whiteAlpha.900', '#242424')(props),
      color: mode('#213547', 'whiteAlpha.900')(props),
    },
  }),
};

export default styles;
