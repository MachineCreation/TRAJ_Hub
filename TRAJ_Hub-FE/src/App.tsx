
//React
import { Suspense, lazy } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';

// components
import PrivateRoute from './components/private-route';
import ParticlesBackground from "./components/ParticlesBackground";


//config
import routes from "./config/routes"
import { useState } from 'react';

const Arcade = lazy(() => import('./pages/Arcade'))

function App() {
  const [isGameActive, setIsGameActive] = useState<boolean>(false);

  return (
      
        <HashRouter>
          {!isGameActive && <ParticlesBackground />}
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              { routes.map((route: any, index: any) => (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    route.path === '/Arcade' ? (
                      <Arcade setIsGameActive={setIsGameActive} />
                    ) : (
                        <PrivateRoute route={route} />
                    )
                  }
                />
              )) }
            </Routes>
          </Suspense>
      </HashRouter>
  )
}

export default App;
