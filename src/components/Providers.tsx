import { HelmetProvider } from "react-helmet-async";

import { UserProvider } from "../hooks/useUser";
import { ListProvider } from "../hooks/useList";
import { ListModalProvider } from "../hooks/useListModal";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <HelmetProvider>
      <UserProvider>
        <ListProvider>
          <ListModalProvider>{children}</ListModalProvider>
        </ListProvider>
      </UserProvider>
    </HelmetProvider>
  );
};

export default Providers;
