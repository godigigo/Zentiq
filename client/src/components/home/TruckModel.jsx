"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const MAT = {
  paintPrimary: new THREE.MeshPhysicalMaterial({
    color: "#0a1d3d",
    roughness: 0.16,
    metalness: 0.82,
    clearcoat: 1,
    clearcoatRoughness: 0.08,
    envMapIntensity: 1.2,
  }),
  paintSecondary: new THREE.MeshPhysicalMaterial({
    color: "#10284f",
    roughness: 0.2,
    metalness: 0.72,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
    envMapIntensity: 1.05,
  }),
  darkPaint: new THREE.MeshPhysicalMaterial({
    color: "#061226",
    roughness: 0.28,
    metalness: 0.7,
    clearcoat: 0.7,
    clearcoatRoughness: 0.14,
  }),
  chrome: new THREE.MeshPhysicalMaterial({
    color: "#d9d9d9",
    roughness: 0.04,
    metalness: 1,
    clearcoat: 0.4,
    clearcoatRoughness: 0.03,
  }),
  glass: new THREE.MeshPhysicalMaterial({
    color: "#9cc7ff",
    roughness: 0.02,
    metalness: 0,
    transmission: 0.92,
    thickness: 0.22,
    ior: 1.5,
    transparent: true,
    opacity: 1,
    envMapIntensity: 1.2,
  }),
  rubber: new THREE.MeshStandardMaterial({
    color: "#101010",
    roughness: 0.96,
    metalness: 0.02,
  }),
  matteBlack: new THREE.MeshStandardMaterial({
    color: "#05070b",
    roughness: 0.98,
    metalness: 0.05,
  }),
  grille: new THREE.MeshStandardMaterial({
    color: "#0a0f18",
    roughness: 0.82,
    metalness: 0.1,
  }),
  tailRed: new THREE.MeshStandardMaterial({
    color: "#ff1b16",
    emissive: "#ff1b16",
    emissiveIntensity: 5.5,
    roughness: 0.35,
    metalness: 0.05,
  }),
  tailAmber: new THREE.MeshStandardMaterial({
    color: "#ff9b1f",
    emissive: "#ff9b1f",
    emissiveIntensity: 4.2,
    roughness: 0.35,
    metalness: 0.05,
  }),
  headlight: new THREE.MeshStandardMaterial({
    color: "#fff7e6",
    emissive: "#fff7e6",
    emissiveIntensity: 9,
    roughness: 0.2,
    metalness: 0,
  }),
  shadow: new THREE.ShadowMaterial({ opacity: 0.42 }),
};

function Wheel({ position, spinRef }) {
  const wheelRef = useRef(null);

  useFrame((state) => {
    if (!wheelRef.current) return;
    const speed = 3.2;
    wheelRef.current.rotation.x = state.clock.elapsedTime * speed;
    if (spinRef?.current) spinRef.current.rotation.x = wheelRef.current.rotation.x;
  });

  return (
    <group position={position} ref={spinRef}>
      <mesh ref={wheelRef} castShadow material={MAT.rubber}>
        <cylinderGeometry args={[0.46, 0.46, 0.34, 56, 1, false]} />
      </mesh>

      <mesh rotation={[Math.PI / 2, 0, 0]} material={MAT.matteBlack}>
        <torusGeometry args={[0.43, 0.035, 16, 56]} />
      </mesh>

      <mesh rotation={[Math.PI / 2, 0, 0]} material={MAT.chrome}>
        <cylinderGeometry args={[0.26, 0.26, 0.05, 28]} />
      </mesh>

      <mesh rotation={[Math.PI / 2, 0, 0]} material={MAT.chrome}>
        <cylinderGeometry args={[0.085, 0.085, 0.055, 16]} />
      </mesh>

      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i / 8) * Math.PI * 2;
        return (
          <mesh
            key={`spoke-${i}`}
            rotation={[Math.PI / 2, 0, a]}
            material={MAT.chrome}
            position={[0, 0, 0.02]}
          >
            <boxGeometry args={[0.04, 0.34, 0.03]} />
          </mesh>
        );
      })}

      {Array.from({ length: 6 }).map((_, i) => {
        const a = (i / 6) * Math.PI * 2;
        return (
          <mesh
            key={`lug-${i}`}
            rotation={[Math.PI / 2, 0, 0]}
            position={[Math.cos(a) * 0.16, 0, Math.sin(a) * 0.16 + 0.02]}
            material={MAT.chrome}
          >
            <cylinderGeometry args={[0.022, 0.022, 0.055, 8]} />
          </mesh>
        );
      })}

      <mesh rotation={[Math.PI / 2, 0, 0]} material={MAT.matteBlack}>
        <torusGeometry args={[0.305, 0.018, 10, 32]} />
      </mesh>
    </group>
  );
}

function ExhaustStack({ position }) {
  return (
    <group position={position}>
      <mesh castShadow material={MAT.chrome}>
        <cylinderGeometry args={[0.07, 0.09, 1.25, 20]} />
      </mesh>
      <mesh position={[0, 0.62, 0]} material={MAT.chrome}>
        <cylinderGeometry args={[0.1, 0.1, 0.05, 20]} />
      </mesh>
      <mesh position={[0, -0.33, 0]} material={MAT.chrome}>
        <torusGeometry args={[0.1, 0.018, 8, 20]} />
      </mesh>
    </group>
  );
}

function PanelLine({ position, args, material = MAT.matteBlack }) {
  return (
    <mesh position={position} material={material}>
      <boxGeometry args={args} />
    </mesh>
  );
}

function LightCluster({ position, side = 1 }) {
  return (
    <group position={position}>
      <mesh material={MAT.headlight}>
        <boxGeometry args={[0.09, 0.2, 0.42]} />
      </mesh>
      <mesh position={[0, -0.14, 0]} material={MAT.headlight}>
        <boxGeometry args={[0.08, 0.05, 0.46]} />
      </mesh>
      <pointLight
        position={[-0.22 * side, 0.02, 0]}
        color="#fff6df"
        intensity={28}
        distance={14}
        decay={2}
      />
    </group>
  );
}

export default function TruckModel({ truckRef }) {
  const axleRefs = useRef([]);

  const wheelPairs = useMemo(
    () => [
      { id: "front", x: -2.1 },
      { id: "drive", x: -1.0 },
      { id: "trailer1", x: 2.55 },
      { id: "trailer2", x: 3.8 },
    ],
    []
  );

  return (
    <group ref={truckRef} position={[0, -0.48, 0]}>
      <group>
        <mesh position={[-1.62, 0.95, 0]} castShadow material={MAT.paintPrimary}>
          <boxGeometry args={[1.92, 1.5, 2.5]} />
        </mesh>

        <mesh position={[-1.98, 1.67, 0]} castShadow material={MAT.paintSecondary}>
          <boxGeometry args={[1.08, 0.28, 2.46]} />
        </mesh>

        <mesh position={[-2.22, 1.12, 0]} rotation={[0, 0, 0.26]} material={MAT.glass}>
          <boxGeometry args={[0.07, 0.95, 2.02]} />
        </mesh>

        {[-1, 1].map((s) => (
          <mesh key={`side-window-${s}`} position={[-1.33, 1.06, s * 1.25]} material={MAT.glass}>
            <boxGeometry args={[0.98, 0.56, 0.06]} />
          </mesh>
        ))}

        {[-1, 1].map((s) => (
          <PanelLine
            key={`door-line-${s}`}
            position={[-1.58, 0.56, s * 1.26]}
            args={[1.72, 0.02, 0.04]}
            material={MAT.darkPaint}
          />
        ))}

        <mesh position={[-2.48, 0.22, 0]} castShadow material={MAT.chrome}>
          <boxGeometry args={[0.14, 0.46, 2.34]} />
        </mesh>

        <mesh position={[-2.47, 0.02, 0]} material={MAT.matteBlack}>
          <boxGeometry args={[0.12, 0.16, 2.38]} />
        </mesh>

        {[-0.18, 0, 0.18, 0.36].map((y, i) => (
          <mesh key={`grille-slat-${i}`} position={[-2.39, 0.74 + y, 0]} material={MAT.grille}>
            <boxGeometry args={[0.05, 0.1, 1.98]} />
          </mesh>
        ))}

        <mesh position={[-2.39, 0.79, 0]} castShadow material={MAT.chrome}>
          <boxGeometry args={[0.055, 0.96, 2.1]} />
        </mesh>

        {[-1, 1].map((s) => (
          <group key={`mirror-${s}`} position={[-2.16, 1.35, s * 1.32]}>
            <mesh material={MAT.darkPaint}>
              <boxGeometry args={[0.06, 0.08, 0.3]} />
            </mesh>
            <mesh position={[0, 0, s * 0.2]} material={MAT.chrome}>
              <boxGeometry args={[0.26, 0.16, 0.05]} />
            </mesh>
          </group>
        ))}

        {[-1, 1].map((s) => (
          <group key={`head-${s}`} position={[-2.46, 0.76, s * 0.83]}>
            <LightCluster side={s} />
          </group>
        ))}

        {[-1, 1].map((s) => (
          <mesh key={`fog-${s}`} position={[-2.47, 0.28, s * 0.68]} material={MAT.headlight}>
            <boxGeometry args={[0.05, 0.09, 0.26]} />
          </mesh>
        ))}

        <ExhaustStack position={[-1.4, 1.86, -1.04]} />
        <ExhaustStack position={[-1.4, 1.86, 1.04]} />

        {[-1, 1].map((s) => (
          <mesh key={`step-${s}`} position={[-2.16, -0.06, s * 1.24]} material={MAT.chrome}>
            <boxGeometry args={[0.52, 0.06, 0.42]} />
          </mesh>
        ))}
      </group>

      <group>
        <mesh position={[1.92, 1.0, 0]} castShadow material={MAT.paintSecondary}>
          <boxGeometry args={[4.9, 1.92, 2.56]} />
        </mesh>

        <mesh position={[1.92, 1.98, 0]} material={MAT.darkPaint}>
          <boxGeometry args={[4.96, 0.1, 2.58]} />
        </mesh>

        {[-1, 1].map((s) => (
          <mesh key={`stripe-${s}`} position={[1.92, 0.96, s * 1.28]} material={MAT.paintPrimary}>
            <boxGeometry args={[4.7, 0.28, 0.03]} />
          </mesh>
        ))}

        <mesh position={[-0.7, 1.16, 0]} material={MAT.paintPrimary}>
          <boxGeometry args={[0.02, 0.62, 1.88]} />
        </mesh>

        {Array.from({ length: 10 }).map((_, i) => (
          <mesh
            key={`rib-front-${i}`}
            position={[-0.44 + i * 0.55, 0.98, 1.287]}
            material={MAT.darkPaint}
          >
            <boxGeometry args={[0.035, 1.78, 0.03]} />
          </mesh>
        ))}
        {Array.from({ length: 10 }).map((_, i) => (
          <mesh
            key={`rib-back-${i}`}
            position={[-0.44 + i * 0.55, 0.98, -1.287]}
            material={MAT.darkPaint}
          >
            <boxGeometry args={[0.035, 1.78, 0.03]} />
          </mesh>
        ))}

        {[-1, 1].map((s) => (
          <mesh key={`rear-door-${s}`} position={[4.37, 1.0, s * 0.63]} material={MAT.paintSecondary} castShadow>
            <boxGeometry args={[0.05, 1.82, 1.2]} />
          </mesh>
        ))}

        <mesh position={[4.4, 1.0, 0]} material={MAT.chrome}>
          <boxGeometry args={[0.06, 1.9, 0.05]} />
        </mesh>

        <mesh position={[4.42, 1.0, 0.42]} material={MAT.chrome}>
          <cylinderGeometry args={[0.025, 0.025, 0.56, 12]} />
        </mesh>

        {[-1, 1].map((s) => (
          <group key={`tail-${s}`} position={[4.42, 1.21, s * 0.92]}>
            <mesh material={MAT.tailRed}>
              <boxGeometry args={[0.05, 0.24, 0.32]} />
            </mesh>
            <pointLight color="#ff1500" intensity={5} distance={5} decay={2} />
          </group>
        ))}

        {[-1, 1].map((s) => (
          <group key={`amber-${s}`} position={[4.42, 0.81, s * 0.92]}>
            <mesh material={MAT.tailAmber}>
              <boxGeometry args={[0.05, 0.15, 0.22]} />
            </mesh>
          </group>
        ))}

        <mesh position={[1.0, -0.08, 0]} material={MAT.matteBlack} castShadow>
          <boxGeometry args={[7.6, 0.16, 1.95]} />
        </mesh>

        {[-1, 1].map((s) => (
          <mesh key={`fuel-${s}`} position={[-0.5, 0.1, s * 1.16]} material={MAT.chrome}>
            <cylinderGeometry args={[0.23, 0.23, 1.12, 24]} />
          </mesh>
        ))}

        <mesh position={[-0.58, 0.06, 0]} material={MAT.chrome}>
          <boxGeometry args={[0.84, 0.08, 1.42]} />
        </mesh>

        {[-0.25, 0, 0.25].map((z, i) => (
          <mesh key={`hose-${i}`} position={[-0.6, 0.24, z]} material={MAT.rubber}>
            <cylinderGeometry args={[0.024, 0.024, 0.3, 8]} />
          </mesh>
        ))}
      </group>

      <group>
        {wheelPairs.map((axle, idx) => (
          <group key={axle.id}>
            <Wheel position={[axle.x, 0.42, -1.3]} spinRef={(el) => (axleRefs.current[idx * 2] = el)} />
            <Wheel position={[axle.x, 0.42, 1.3]} spinRef={(el) => (axleRefs.current[idx * 2 + 1] = el)} />
          </group>
        ))}
      </group>

      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[1.0, -0.44, 0]}
        receiveShadow
        material={MAT.shadow}
      >
        <planeGeometry args={[14, 5]} />
      </mesh>
    </group>
  );
}