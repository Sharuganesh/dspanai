import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, Lightformer, OrbitControls } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

/**
 * Interactive 3D hero backdrop: a slowly orbiting cluster of palm-candy
 * crystals with palmyra leaf silhouettes drifting behind them.
 * Drag to orbit. Purely decorative — no text lives inside the canvas.
 */

type CrystalSpec = {
  position: [number, number, number];
  scale: number;
  rotation: [number, number, number];
  speed: number;
};

function useCrystals(count: number): CrystalSpec[] {
  return useMemo(() => {
    const rng = mulberry32(20260828);
    return Array.from({ length: count }, () => {
      const angle = rng() * Math.PI * 2;
      const radius = 3.6 + rng() * 2.4;
      return {
        position: [
          Math.cos(angle) * radius,
          (rng() - 0.5) * 4.6,
          Math.sin(angle) * radius * 0.6 - 1.2,
        ],
        scale: 0.16 + rng() * 0.26,
        rotation: [rng() * Math.PI, rng() * Math.PI, rng() * Math.PI],
        speed: 0.4 + rng() * 0.9,
      } satisfies CrystalSpec;
    });
  }, [count]);
}

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function Crystal({ spec }: { spec: CrystalSpec }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);
    if (!ref.current) return;
    ref.current.rotation.y += dt * 0.24 * spec.speed;
    ref.current.rotation.x += dt * 0.1 * spec.speed;
  });

  return (
    <Float speed={spec.speed} rotationIntensity={0.35} floatIntensity={0.9}>
      <mesh ref={ref} position={spec.position} rotation={spec.rotation} scale={spec.scale}>
        <dodecahedronGeometry args={[1, 0]} />
        <meshPhysicalMaterial
          color="#e6c48a"
          roughness={0.34}
          metalness={0}
          clearcoat={0.6}
          clearcoatRoughness={0.4}
          transmission={0.45}
          thickness={1.4}
          ior={1.42}
          attenuationColor="#c08b3e"
          attenuationDistance={1.6}
          flatShading
        />
      </mesh>
    </Float>
  );
}

function palmLeafShape() {
  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.bezierCurveTo(0.5, 0.5, 1.6, 0.7, 2.6, 0.16);
  shape.bezierCurveTo(1.7, 0.05, 0.7, -0.2, 0, 0);
  return shape;
}

function LeafSilhouette({
  position,
  rotation,
  scale,
  opacity,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  opacity: number;
}) {
  const geometry = useMemo(() => new THREE.ShapeGeometry(palmLeafShape(), 24), []);
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.rotation.z = rotation[2] + Math.sin(t * 0.12 + position[0]) * 0.06;
  });

  return (
    <group ref={group} position={position} rotation={rotation} scale={scale}>
      {[0, 1, 2, 3, 4].map((i) => (
        <mesh key={i} geometry={geometry} rotation={[0, 0, -0.5 + i * 0.25]}>
          <meshBasicMaterial
            color="#173a27"
            transparent
            opacity={opacity}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

function PointerTilt({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);
  const { pointer } = useThree();
  useFrame((_, delta) => {
    if (!group.current) return;
    const k = 1 - Math.exp(-2.4 * Math.min(delta, 0.05));
    group.current.rotation.y += (pointer.x * 0.25 - group.current.rotation.y) * k;
    group.current.rotation.x += (-pointer.y * 0.16 - group.current.rotation.x) * k;
  });
  return <group ref={group}>{children}</group>;
}

function Scene() {
  const crystals = useCrystals(10);
  return (
    <>
      <ambientLight intensity={0.75} />
      <directionalLight position={[4, 6, 5]} intensity={1.5} color="#fff3dd" />
      <directionalLight position={[-5, -2, -3]} intensity={0.4} color="#b99652" />

      <Environment resolution={128}>
        <Lightformer intensity={2.4} position={[0, 5, 2]} scale={[12, 12, 1]} color="#fffaf0" />
        <Lightformer
          intensity={1.1}
          color="#d8b877"
          position={[-6, 1, -2]}
          rotation-y={Math.PI / 2}
          scale={[20, 2, 1]}
        />
        <Lightformer
          intensity={0.8}
          color="#5c7a63"
          position={[6, -2, 1]}
          rotation-y={-Math.PI / 2}
          scale={[20, 2, 1]}
        />
      </Environment>

      <PointerTilt>
        <group position={[0, 0, -3]}>
          <LeafSilhouette
            position={[-4.4, 2.3, 0]}
            rotation={[0, 0, -0.5]}
            scale={1.5}
            opacity={0.1}
          />
          <LeafSilhouette
            position={[4.6, -2.1, 0.4]}
            rotation={[0, Math.PI, 2.6]}
            scale={1.7}
            opacity={0.08}
          />
          <LeafSilhouette
            position={[3.4, 2.8, -1]}
            rotation={[0, Math.PI, 3.4]}
            scale={1.2}
            opacity={0.06}
          />
        </group>
        {crystals.map((spec, i) => (
          <Crystal key={i} spec={spec} />
        ))}
      </PointerTilt>
    </>
  );
}

export default function CrystalScene() {
  return (
    <Canvas
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, 8], fov: 45 }}
      style={{ pointerEvents: "auto" }}
    >
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.35}
        rotateSpeed={0.4}
        minPolarAngle={Math.PI / 2.9}
        maxPolarAngle={Math.PI / 1.7}
      />
    </Canvas>
  );
}
