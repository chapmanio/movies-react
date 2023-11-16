import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { UserProvider } from "../hooks/useUser";
import { ListProvider } from "../hooks/useList";
import { ListModalProvider } from "../hooks/useListModal";

const queryClient = new QueryClient();

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <ListProvider>
            <ListModalProvider>{children}</ListModalProvider>
          </ListProvider>
        </UserProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default Providers;
