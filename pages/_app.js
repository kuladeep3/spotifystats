import { QueryClient, QueryClientProvider } from 'react-query';
import { Poppins } from 'next/font/google';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default MyApp;
