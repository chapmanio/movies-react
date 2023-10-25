import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = ({ children }: { children: React.ReactNode }) => {
  // Hooks
  const location = useLocation();

  // Layout effects
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);

  // Render
  return <>{children}</>;
};

export default ScrollToTop;
