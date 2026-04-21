import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Float } from '@react-three/drei';
import { useTheme } from '../contexts/ThemeContext';

const MainIcosahedron = ({ isDark }) => {
  const meshRef = useRef();

  useFrame((state) => {
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.08;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.12;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.4} floatIntensity={1.2}>
      <mesh ref={meshRef} scale={2.4}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color={isDark ? '#4a7af0' : '#2554e8'}
          wireframe
          transparent
          opacity={isDark ? 0.55 : 0.18}
        />
      </mesh>
    </Float>
  );
};

const InnerIcosahedron = ({ isDark }) => {
  const meshRef = useRef();

  useFrame((state) => {
    meshRef.current.rotation.x = -state.clock.elapsedTime * 0.15;
    meshRef.current.rotation.y = -state.clock.elapsedTime * 0.1;
    meshRef.current.rotation.z = state.clock.elapsedTime * 0.05;
  });

  return (
    <mesh ref={meshRef} scale={1.2}>
      <icosahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color={isDark ? '#fbbf24' : '#f59f00'}
        wireframe
        transparent
        opacity={isDark ? 0.35 : 0.1}
      />
    </mesh>
  );
};

const OrbitingRing = ({ isDark, radius, speed, rotX, rotZ, color }) => {
  const meshRef = useRef();

  useFrame((state) => {
    meshRef.current.rotation.z = state.clock.elapsedTime * speed;
  });

  return (
    <mesh ref={meshRef} rotation={[rotX, 0, rotZ]}>
      <torusGeometry args={[radius, 0.012, 6, 120]} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={isDark ? 0.45 : 0.15}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  );
};

const SmallFloater = ({ position, color, isDark, speed = 0.4 }) => {
  const meshRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    meshRef.current.rotation.x = t * speed;
    meshRef.current.rotation.y = t * (speed * 1.3);
    meshRef.current.position.y = position[1] + Math.sin(t * 0.8 + position[0]) * 0.25;
    meshRef.current.position.x = position[0] + Math.cos(t * 0.5 + position[2]) * 0.1;
  });

  return (
    <mesh ref={meshRef} position={[...position]}>
      <octahedronGeometry args={[0.13, 0]} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={isDark ? 0.75 : 0.35}
        metalness={0.6}
        roughness={0.2}
      />
    </mesh>
  );
};

const SceneContent = ({ isDark }) => {
  return (
    <>
      <ambientLight intensity={isDark ? 0.25 : 0.5} />
      <pointLight
        position={[6, 4, 4]}
        intensity={isDark ? 2 : 0.8}
        color={isDark ? '#5b8af4' : '#2554e8'}
      />
      <pointLight
        position={[-6, -4, 2]}
        intensity={isDark ? 0.8 : 0.4}
        color={isDark ? '#fbbf24' : '#f59f00'}
      />

      {isDark && (
        <Stars
          radius={100}
          depth={50}
          count={2500}
          factor={3}
          fade
          speed={0.4}
        />
      )}

      <MainIcosahedron isDark={isDark} />
      <InnerIcosahedron isDark={isDark} />

      <OrbitingRing
        isDark={isDark}
        radius={3.8}
        speed={0.18}
        rotX={Math.PI / 4}
        rotZ={0}
        color={isDark ? '#4a7af0' : '#2554e8'}
      />
      <OrbitingRing
        isDark={isDark}
        radius={5.0}
        speed={-0.12}
        rotX={Math.PI / 3}
        rotZ={Math.PI / 6}
        color={isDark ? '#fbbf24' : '#f59f00'}
      />
      <OrbitingRing
        isDark={isDark}
        radius={6.2}
        speed={0.08}
        rotX={Math.PI / 6}
        rotZ={Math.PI / 4}
        color={isDark ? '#a78bfa' : '#6d5ce8'}
      />

      <SmallFloater position={[-4, 1.8, -1]} color={isDark ? '#fbbf24' : '#f59f00'} isDark={isDark} speed={0.35} />
      <SmallFloater position={[4.5, -1.2, -2]} color={isDark ? '#5b8af4' : '#2554e8'} isDark={isDark} speed={0.45} />
      <SmallFloater position={[-5, -2.5, 0.5]} color={isDark ? '#a78bfa' : '#7c3aed'} isDark={isDark} speed={0.3} />
      <SmallFloater position={[3.5, 2.8, -1]} color={isDark ? '#34d399' : '#059669'} isDark={isDark} speed={0.5} />
      <SmallFloater position={[-2.5, -3, -2]} color={isDark ? '#fbbf24' : '#f59f00'} isDark={isDark} speed={0.28} />
    </>
  );
};

const HeroScene = () => {
  const { isDarkMode } = useTheme();

  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 52 }}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
    >
      <Suspense fallback={null}>
        <SceneContent isDark={isDarkMode} />
      </Suspense>
    </Canvas>
  );
};

export default HeroScene;
