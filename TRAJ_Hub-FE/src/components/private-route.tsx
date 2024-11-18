import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { backend_url } from '../config/variables';

interface PrivateRouteProps {
  component: React.ComponentType<any> | JSX.Element;
}

const PrivateRoute = ({ component }: PrivateRouteProps): JSX.Element => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(`${backend_url}/auth/check`, {
          method: 'GET',
          credentials: 'include',
        });
        const data = await response.json();
        setIsAuthenticated(data.authenticated);
      } catch (error) {
        console.error('Error checking authentication:', error);
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);



  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated === false) {
    return <Navigate to="/login" />;
  }

  if (React.isValidElement(component)) {
    return component;
  } else {
    const Component = component as React.ComponentType<any>;
    return <Component />;
  }
};

export default PrivateRoute;
