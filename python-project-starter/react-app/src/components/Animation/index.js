import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { OrbitControls } from '@react-three/drei'
import './animation.css'


//diffuse, Occlusion, Specular, Shadow
//disp and occ

export function Animation(props) {
    const ref = useRef();

    useFrame(({ clock }) => {

        const time = clock.getElapsedTime()
        ref.current.rotation.y = time / 4
    })

    return (
        <>
            <ambientLight intensity={0.3} />
            <points ref={ref}>
                <sphereGeometry args={[35, 64, 64]} />
                <pointsMaterial color='green' size='0.5' />
                <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} zoomSpeed={0.6}
                    panSpeed={0.5} rotateSpeed={0.4} />
            </points>
        </>
    )

}
