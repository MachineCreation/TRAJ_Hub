//react
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

// routes
import { checkAuth } from '../config/helpers';

// types
import {RouteType} from '../config/routes'




interface PrivateRouteProps {
  route: RouteType
}

const PrivateRoute = ({ route }: PrivateRouteProps): JSX.Element => {

  const Auth = checkAuth();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const auth = async () => {
    const response = await Auth()
    setIsAuthenticated(response);    
  }
  
  auth();

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated && route.protected) {
    return <Navigate to="/login" />;
  }

  if (React.isValidElement(route.component)) {
    return route.component;
  } else {
    const Component = route.component as React.ComponentType<any>;
    return <Component />;
  }
};

export default PrivateRoute;
