"use client";

import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment, Float} from "@react-three/drei";
import { Suspense,useRef,useState,useEffect} from "react";
import { gsap } from "gsap";
import { useThree} from "@react-three/fiber";




const GEOMETRIES = [
  {
    position: [0, 0, 0],
    r: 0.3,
    geometry: new THREE.IcosahedronGeometry(3),//Gem

  },

   {
   position: [1, -0.75, 4],
   r: 0.4,
   geometry: new THREE.CapsuleGeometry(0.4,1.2,3.5,16),//Pill
 },

  {
   position: [-1.4, 2, -4],
   r: 0.6,
   geometry: new THREE.DodecahedronGeometry(1.5),//Ball
 },

  {
   position: [-0.8, -0.75, 5],
   r: 0.5,
   geometry: new THREE.TorusGeometry(0.6,0.25,16,32),//Donut
 },

  {
   position: [1.6, 1.6, -4],
   r: 0.9,
   geometry: new THREE.OctahedronGeometry(1.3),//Dimond
 },
];

const MATERIALS = [
  new THREE.MeshNormalMaterial(),
  new THREE.MeshNormalMaterial(),
  new THREE.MeshNormalMaterial(),
  new THREE.MeshStandardMaterial({ color: 0x55efc4, roughness: 0.40, metalness: 0}),
  new THREE.MeshStandardMaterial({ color: 0xa29bfe, roughness: 0.40, metalness: 1}),
  new THREE.MeshStandardMaterial({ color: 0x00a8ff, roughness: 0.35, metalness: 0.9}),
  new THREE.MeshStandardMaterial({ color:0xff7f50, roughness: 0.35, metalness: 0.6}),
  new THREE.MeshStandardMaterial({ color:0x2ed573, roughness: 0.40, metalness: 0.7}),
  new THREE.MeshStandardMaterial({ color:0x1a1a1a, roughness: 0.25, metalness: 0.9}),
]

export default function Shapes() {
const [soundEffects, setSoundEffects] = useState([])
useEffect(() => {
  setSoundEffects([
    new Audio("/sound/knock1.ogg"),
    new Audio("/sound/knock2.ogg"),
    new Audio("/sound/knock3.ogg"),
  ])
}, [])


  return (
    <div className="row-span-1 row-start-1 -mt-9 aspect-square md:col-span-1">
      <Canvas
        className="z-0"
        shadows
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 27], fov: 30, near: 1, far: 40 }}
        gl={{ antialias: false }}
      >
        <Suspense fallback={null}>
        <Geometries soundEffects={soundEffects}  />
        <ambientLight intensity={0.10}/>
        <directionalLight position={[3,3,3]} intensity={0.8}/>
        <directionalLight position={[-3,-2,-4]} intensity={0.3}/>
          <ContactShadows
            position={[0, -3.5, 0]}
            opacity={0.65}
            scale={40}
            blur={1}
            far={9}
          />
          <Environment preset="city"/>
        </Suspense>
      </Canvas>
    </div>
  );
}

function Geometries({soundEffects}) {
  return GEOMETRIES.map(({ position, r, geometry}) => (
    <Geometry
      key={JSON.stringify(position)}
      position={position.map((p) => p * 2)}
      soundEffects={soundEffects}
      geometry={geometry}
      materials={MATERIALS}
      r={r}
    />
  ));
}

function Geometry({ r, position, geometry, materials, soundEffects=[] }) {
  function getRandomMaterial() {
    return materials[Math.floor(Math.random() * materials.length)];
}
  const [material, setMaterial] = useState(() => getRandomMaterial());

  function handleClick(e) {
    const mesh = e.object; //object
    if (!mesh) return;
    if (soundEffects.length>0){
    const sound = soundEffects[Math.floor(Math.random() * soundEffects.length)];
    sound.currentTime = 0;
    sound.play();
    }
  
    gsap.to(mesh.rotation, {
      x: `+=${Math.random() * 0.2}`,
      y: `+=${Math.random() * 0.2}`,
      z: `+=${Math.random() * 0.2}`,
      duration: 1.3,
      ease: "elastic.out(1,0.3)",
    });

    setMaterial(getRandomMaterial());
  }

  const handlePointerOver = () => {
    document.body.style.cursor = "pointer"; 
  };

  const handlePointerOut = () => {
    document.body.style.cursor = "default";
  };

  return (
    <group position={position}>
      <Float speed={5 * r} rotationIntensity={6 * r} floatIntensity={5 * r}>
        <mesh
          geometry={geometry}
          material={material}
          onClick={handleClick}
          onPointerDown={handleClick} // mobile 
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
        />
      </Float>
    </group>
  );
}
