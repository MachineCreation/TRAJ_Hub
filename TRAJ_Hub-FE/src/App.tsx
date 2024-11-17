
//React
import { Suspense } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';

// components

import ParticlesBackground from "./components/ParticlesBackground";
import Arcade from './pages/Arcade';

//config
import routes from "./config/routes"
import { useState } from 'react';

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
                      <route.component />
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
