import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { Engine } from "@tsparticles/engine";
import { loadFull } from "tsparticles";
import { loadPolygonPath } from "@tsparticles/path-polygon";
import particlesOptions from "../particles_1.json";
import { ISourceOptions } from "@tsparticles/engine";

const ParticlesBackground = () => {
    const [init, setInit] = useState(false);
    const [key, setKey] = useState(0);

    useEffect(() => {
        const initParticles = async (engine: Engine) => {
            await loadFull(engine);
            await loadPolygonPath(engine as any);
        };

        initParticlesEngine(initParticles).then(() => {
            setInit(true);
        });

        // Restart animation every 10 seconds
        const interval = setInterval(() => {
            setKey(prevKey => prevKey + 1);
        }, 100000); // 10000ms = 10 seconds
  
        return () => clearInterval(interval);
    }, []);
  
    return init ? <Particles key={key} options={particlesOptions as ISourceOptions} /> : null;
  };

  export default ParticlesBackground;
