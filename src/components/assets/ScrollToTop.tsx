import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop: React.FC = ({ children }) => {
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
