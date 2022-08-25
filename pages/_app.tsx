import '../styles/reset.css';
import '../styles/main.css';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

const components = {
  Heading: {
    baseStyle: {
      fontWeight: '300',
    },
    sizes: {
      // default size is md
      xl: {
        fontSize: '50px',
      },
    },
  },
};
const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};
const styles = {
  global: {
    'html, body': {
      color: 'gray.600',
      lineHeight: 'tall',
      backgroundColor: 'blue.900',
    },
    header: {
      bg: 'blue.800',
      px: '10',
      py: '2',
      mb: '5',
      w: '100%',
      h: 'max-content',
      fontSize: '2xl',
      color: 'gray.200',
    },
    a: {
      color: 'teal.500',
    },
  },
};

export const theme = extendTheme({ styles, components, config });

export default function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
