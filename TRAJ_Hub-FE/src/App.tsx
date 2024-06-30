import { useState } from "react"
import { HashRouter, Routes, Route } from 'react-router-dom';

// components

import ParticlesBackground from "./components/ParticlesBackground";

//config
import routes from "./config/routes"

function App() {

  const [test, setTest] = useState(true)

  return (
      
        <HashRouter>
          <ParticlesBackground />
          <Routes>
            { routes.map((route: any, index: any) => (
              <Route
                key={index}
                path={route.path}
                element={
                  <route.component />
                }
              />
            )) }
          </Routes>
      </HashRouter>
  )
}

export default App;
