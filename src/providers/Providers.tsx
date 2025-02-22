'use client';
import { HeroUIProvider } from '@heroui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// Create a client
const queryClient = new QueryClient();

const Providers = ({ children }: React.PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>
      <HeroUIProvider>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </HeroUIProvider>
    </QueryClientProvider>
  );
};

export default Providers;
