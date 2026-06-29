"use client";

import { useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  MeshReflectorMaterial,
  Stars,
  ContactShadows,
  Sparkles,
  Environment,
} from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
  Vignette,
  DepthOfField,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import TruckModel from "./TruckModel";

gsap.registerPlugin(ScrollTrigger);

function Road() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.45, 0]} receiveShadow>
        <planeGeometry args={[240, 16]} />
        <MeshReflectorMaterial
          color="#08111b"
          roughness={0.14}
          metalness={0}
          mirror={0.7}
          mixBlur={10}
          mixStrength={1.4}
          resolution={1024}
          blur={[512, 128]}
          depthScale={1.15}
          minDepthThreshold={0.15}
          maxDepthThreshold={1.8}
          depthToBlurRatioBias={0.22}
        />
      </mesh>

      {[-1, 1].map((s) => (
        <mesh key={`edge-${s}`} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.444, s * 3.4]}>
          <planeGeometry args={[240, 0.24]} />
          <meshStandardMaterial
            color="#f4f4f4"
            roughness={0.95}
            emissive="#ffffff"
            emissiveIntensity={0.08}
          />
        </mesh>
      ))}

      {Array.from({ length: 44 }).map((_, i) => (
        <mesh
          key={`dash-${i}`}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[(i - 22) * 5, -0.443, 0]}
        >
          <planeGeometry args={[2.4, 0.12]} />
          <meshStandardMaterial
            color="#e9c92c"
            emissive="#e9c92c"
            emissiveIntensity={0.42}
            roughness={0.8}
          />
        </mesh>
      ))}

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.46, 0]} receiveShadow>
        <planeGeometry args={[1000, 1000]} />
        <meshStandardMaterial color="#04070d" roughness={1} metalness={0} />
      </mesh>
    </group>
  );
}

const SKYLINE = [
  { x: -26, z: -16, w: 2.2, h: 8, d: 2.2, win: 6 },
  { x: -21, z: -15, w: 1.5, h: 14, d: 1.4, win: 10 },
  { x: -17, z: -18, w: 2.0, h: 10, d: 2.0, win: 8 },
  { x: -13, z: -14, w: 1.4, h: 18, d: 1.4, win: 14 },
  { x: -8, z: -17, w: 2.6, h: 9, d: 2.0, win: 7 },
  { x: -4, z: -15, w: 1.8, h: 16, d: 1.7, win: 12 },
  { x: 1, z: -19, w: 1.2, h: 22, d: 1.2, win: 18 },
  { x: 5, z: -16, w: 2.4, h: 12, d: 2.1, win: 10 },
  { x: 9, z: -18, w: 1.7, h: 15, d: 1.5, win: 12 },
  { x: 14, z: -14, w: 2.0, h: 11, d: 1.8, win: 8 },
  { x: 18, z: -17, w: 1.6, h: 20, d: 1.5, win: 14 },
  { x: 23, z: -15, w: 1.1, h: 13, d: 1.1, win: 9 },
  { x: 28, z: -16, w: 2.2, h: 7, d: 2.1, win: 5 },
];

const buildingMat = new THREE.MeshStandardMaterial({
  color: "#091427",
  roughness: 0.78,
  metalness: 0.18,
});
const windowMatWarm = new THREE.MeshStandardMaterial({
  color: "#ffd98a",
  emissive: "#ffd98a",
  emissiveIntensity: 1.35,
  roughness: 0.35,
});
const windowMatCool = new THREE.MeshStandardMaterial({
  color: "#8fc9ff",
  emissive: "#8fc9ff",
  emissiveIntensity: 1.05,
  roughness: 0.35,
});

function seededRand(seed) {
  const x = Math.sin(seed + 1) * 43758.5453123;
  return x - Math.floor(x);
}

function CityScape() {
  return (
    <group>
      {SKYLINE.map((b, bi) => (
        <group key={`b-${bi}`}>
          <mesh position={[b.x, b.h / 2 - 0.45, b.z]} material={buildingMat} castShadow>
            <boxGeometry args={[b.w, b.h, b.d]} />
          </mesh>

          {Array.from({ length: b.win }).map((_, wi) => {
            const seed = bi * 100 + wi;
            const px = b.x + (seededRand(seed) - 0.5) * (b.w * 0.72);
            const py = seededRand(seed + 1) * (b.h - 0.8) - 0.45;
            const warm = seededRand(seed + 2) > 0.42;

            return (
              <mesh
                key={`w-${bi}-${wi}`}
                position={[px, py, b.z + b.d / 2 + 0.012]}
                material={warm ? windowMatWarm : windowMatCool}
              >
                <planeGeometry args={[0.1, 0.16]} />
              </mesh>
            );
          })}
        </group>
      ))}
    </group>
  );
}

const LAMP_POSITIONS = [-16, -10, -4, 2, 8, 14, 20, 26, 32];

function StreetLamps() {
  return (
    <>
      {LAMP_POSITIONS.map((x, i) => (
        <group key={`lamp-${i}`} position={[x, 0, -4.1]}>
          <mesh position={[0, 2.45, 0]} castShadow>
            <cylinderGeometry args={[0.045, 0.065, 4.9, 10]} />
            <meshStandardMaterial color="#535353" metalness={0.72} roughness={0.35} />
          </mesh>

          <mesh position={[0.42, 4.8, 0]} rotation={[0, 0, -0.22]}>
            <cylinderGeometry args={[0.03, 0.03, 1.0, 8]} />
            <meshStandardMaterial color="#535353" metalness={0.72} roughness={0.35} />
          </mesh>

          <mesh position={[0.9, 4.66, 0]}>
            <boxGeometry args={[0.34, 0.12, 0.22]} />
            <meshStandardMaterial color="#fff6d9" emissive="#fff6d9" emissiveIntensity={2.5} />
          </mesh>

          <pointLight
            position={[0.9, 4.35, 0]}
            color="#ffdf9e"
            intensity={8}
            distance={14}
            decay={2}
          />
        </group>
      ))}
    </>
  );
}

function SceneAnimator({ truckRef, scrollerRef }) {
  const { camera } = useThree();
  const progressRef = useRef(0);
  const pointerRef = useRef({ x: 0, y: 0 });
  const camPos = useRef(new THREE.Vector3(-24, 4.5, 8));
  const camLook = useRef(new THREE.Vector3(-4, 0.7, 0));

  useEffect(() => {
    if (!scrollerRef?.current) return;

    const trig = ScrollTrigger.create({
      trigger: scrollerRef.current,
      start: "top top",
      end: "+=200%",
      scrub: 2,
      onUpdate: (self) => {
        progressRef.current = self.progress;
      },
    });

    const onMove = (e) => {
      pointerRef.current.x = ((e.clientX / window.innerWidth) - 0.5) * 2;
      pointerRef.current.y = ((e.clientY / window.innerHeight) - 0.5) * 2;
    };

    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      trig.kill();
      window.removeEventListener("pointermove", onMove);
    };
  }, [scrollerRef]);

  useFrame((state, delta) => {
    const p = progressRef.current;
    const px = pointerRef.current.x;
    const py = pointerRef.current.y;
    const t = state.clock.elapsedTime;

    let tx, ty, tz, lx, ly, lz;

    if (p < 0.25) {
      const u = p / 0.25;
      tx = THREE.MathUtils.lerp(-24, -7.5, u);
      ty = THREE.MathUtils.lerp(1.45, 2.2, u);
      tz = THREE.MathUtils.lerp(6.5, 5.0, u);
      lx = THREE.MathUtils.lerp(-5.5, -1.2, u);
      ly = THREE.MathUtils.lerp(0.35, 0.6, u);
      lz = 0;
    } else if (p < 0.5) {
      const u = (p - 0.25) / 0.25;
      tx = THREE.MathUtils.lerp(-7.5, -1.8, u);
      ty = THREE.MathUtils.lerp(2.2, 4.3, u);
      tz = THREE.MathUtils.lerp(5.0, 9.0, u);
      lx = THREE.MathUtils.lerp(-1.2, 0.2, u);
      ly = THREE.MathUtils.lerp(0.6, 0.8, u);
      lz = 0;
    } else if (p < 0.75) {
      const u = (p - 0.5) / 0.25;
      tx = THREE.MathUtils.lerp(-1.8, 3.2, u);
      ty = THREE.MathUtils.lerp(4.3, 3.0, u);
      tz = THREE.MathUtils.lerp(9.0, 12.0, u);
      lx = THREE.MathUtils.lerp(0.2, 0.9, u);
      ly = THREE.MathUtils.lerp(0.8, 0.6, u);
      lz = 0;
    } else {
      const u = (p - 0.75) / 0.25;
      tx = THREE.MathUtils.lerp(3.2, 10.0, u);
      ty = THREE.MathUtils.lerp(3.0, 1.8, u);
      tz = THREE.MathUtils.lerp(12.0, 8.0, u);
      lx = THREE.MathUtils.lerp(0.9, 4.0, u);
      ly = THREE.MathUtils.lerp(0.6, 0.5, u);
      lz = 0;
    }

    tx += Math.sin(t * 0.35) * 0.09;
    ty += Math.sin(t * 0.28) * 0.05;
    tx += px * 0.45;
    ty += -py * 0.22;

    camPos.current.set(tx, ty, tz);
    camLook.current.set(lx, ly, lz);

    camera.position.lerp(camPos.current, delta * 2.4);
    camera.lookAt(camLook.current);

    if (truckRef.current) {
      if (p < 0.25) {
        const u = p / 0.25;
        truckRef.current.position.x = THREE.MathUtils.lerp(-34, 0, u);
      }
      truckRef.current.position.y = -0.48 + Math.sin(t * 2.9) * 0.018;
      truckRef.current.rotation.z = Math.sin(t * 2.8) * 0.004;
      truckRef.current.rotation.y = Math.sin(t * 0.7) * 0.01;
    }
  });

  return null;
}

function PostFX() {
  return (
    <EffectComposer>
      <Bloom
        intensity={1.15}
        luminanceThreshold={0.7}
        luminanceSmoothing={0.25}
        mipmapBlur
      />
      <DepthOfField
        focusDistance={0.02}
        focalLength={0.045}
        bokehScale={1.6}
        height={480}
      />
      <ChromaticAberration
        blendFunction={BlendFunction.NORMAL}
        offset={[0.00035, 0.00025]}
      />
      <Vignette
        offset={0.38}
        darkness={0.56}
        blendFunction={BlendFunction.NORMAL}
      />
    </EffectComposer>
  );
}

export default function TruckScene({ scrollerRef }) {
  const truckRef = useRef(null);

  return (
    <Canvas
      shadows="soft"
      dpr={[1, 1.5]}
      camera={{ position: [-24, 4.5, 8], fov: 48, near: 0.1, far: 700 }}
      gl={{
        antialias: true,
        alpha: false,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.0,
      }}
      style={{ background: "transparent" }}
    >
      <color attach="background" args={["#02060d"]} />
      <fog attach="fog" args={["#050912", 18, 115]} />

      <ambientLight intensity={0.06} color="#1a2a4a" />

      <directionalLight
        position={[-12, 18, 10]}
        intensity={2.1}
        color="#c7dcff"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-near={0.5}
        shadow-camera-far={120}
        shadow-camera-left={-35}
        shadow-camera-right={35}
        shadow-camera-top={22}
        shadow-camera-bottom={-18}
        shadow-bias={-0.00035}
      />

      <pointLight position={[6, 4.5, 8]} color="#ffd38a" intensity={5.5} distance={28} decay={2} />
      <pointLight position={[14, 5, -10]} color="#143dff" intensity={13} distance={40} decay={2} />
      <pointLight position={[-7, 2.2, -7]} color="#2e67ff" intensity={7} distance={30} decay={2} />
      <hemisphereLight args={["#1c2e52", "#050810", 0.32]} />

      <Environment preset="city" />

      <Stars radius={180} depth={80} count={2200} factor={4} saturation={0.15} fade speed={0.35} />
      <Sparkles
        count={40}
        scale={[34, 10, 16]}
        size={1}
        speed={0.12}
        opacity={0.12}
        color="#9ab8ff"
        position={[0, 3.5, 0]}
      />

      <CityScape />
      <Road />
      <StreetLamps />
      <TruckModel truckRef={truckRef} />

      <ContactShadows
        position={[0, -0.44, 0]}
        opacity={0.66}
        scale={24}
        blur={3.2}
        far={3.2}
        color="#000818"
      />

      <PostFX />

      <SceneAnimator truckRef={truckRef} scrollerRef={scrollerRef} />
    </Canvas>
  );
}