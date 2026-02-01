import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'

function Scene() {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />

      {/* Ground Plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#2d4a2d" />
      </mesh>

      {/* Placeholder - will be replaced with dynamic sprites */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#14b8a6" />
      </mesh>

      {/* Camera Controls */}
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 3}
      />
    </>
  )
}

export function SceneCanvas() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{
          position: [8, 8, 8],
          fov: 50,
        }}
      >
        <Scene />
        <Environment preset="forest" />
      </Canvas>
    </div>
  )
}
