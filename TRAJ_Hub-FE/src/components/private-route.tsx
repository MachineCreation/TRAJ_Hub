//react
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

//redux
import { useDispatch } from 'react-redux';
import { setUsername } from '../store/user';

// variables
import { backend_url } from '../config/variables';

interface PrivateRouteProps {
  component: React.ComponentType<any> | JSX.Element;
}

const PrivateRoute = ({ component }: PrivateRouteProps): JSX.Element => {

  const dispatch = useDispatch();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(`${backend_url}/auth/check`, {
          method: 'GET',
          credentials: 'include',
        });
        const data = await response.json();
        const username: string = await data.username
        setIsAuthenticated(data.authenticated);
        dispatch(setUsername(username))
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
