'use client'

import { OrbitControls, useAnimations, useGLTF, SpotLight } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import React, { useEffect, useRef } from 'react'
import { Vector3 } from 'three'

const Torch = ({vec = new Vector3(), ...props}) => {
  const light = useRef<THREE.SpotLight>(null)
  const viewport = useThree(state => state.viewport)
  useFrame((state) => {
    console.log(state)
    light.current?.target.position.lerp(
      vec.set(( state.pointer.x * viewport.width) / 2,
              ( state.pointer.y * viewport.width) / 2,
               0),
               0.1
      )
      light.current?.target.updateMatrixWorld()
  })
  return <SpotLight 
    ref={light}
    castShadow
    penumbra={1}
    distance={10}
    angle={0.35}
    attenuation={5}
    anglePower={4}
    intensity={3}
    {...props}
  />
}
const Head = () => {
  // const model = useGLTF('/buddha_head.glb')
  // const model = useGLTF('/head.glb')
  const model = useGLTF('/head.glb')
  // console.log(model)
  const animation = useAnimations(model.animations, model.scene)
  const action = animation.actions.Animation
  console.log(action)
  useEffect(() => {
    // action?.play()
    // action?.stop()
  }, [action])
  return (
    <>
      <primitive object={model.scene} scale={3} rotation-z={0.2} />
      <Torch color='blue' position={[3, 2, 2]} />
      <Torch color='#B00C3F' position={[-3, 2, 2]} />
    </>
  )
}

export const ChatBotCanvas = () => {
  return (
    <Canvas>
      <OrbitControls 
        enableDamping
        enableZoom={false} 
        maxPolarAngle={Math.PI} 
        minAzimuthAngle={-Math.PI * .5}
        maxAzimuthAngle={Math.PI * .5}
      />
      <ambientLight intensity={.480}/>
      <Head />
    </Canvas>
  )
}

export default ChatBotCanvas