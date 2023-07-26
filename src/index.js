import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ChakraProvider, extendTheme, theme} from '@chakra-ui/react';

const root = ReactDOM.createRoot(document.getElementById('root'));

// const theme = extendTheme({
//   styles: {
//     global: {
//       // styles for the `body`
//       body: {
//         bg: 'blackAlpha.400',
//         color: 'white',
//       },
//     },
//   },
// })

root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);

export const server = "http://127.0.0.1:8080";