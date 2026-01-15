import { useEffect, useRef } from "react"
import * as THREE from "three"

export default function WaitlistVisual() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      45,
      1,
      0.1,
      1000
    )
    camera.position.set(0, 0, 5)

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: "high-performance"
    })
    renderer.setSize(600, 600)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    containerRef.current.appendChild(renderer.domElement)

    // Texture loader con configuración correcta
    const textureLoader = new THREE.TextureLoader()
    
    const albedoMap = textureLoader.load("https://res.cloudinary.com/dbxohjdng/image/upload/v1768469118/Base_Color_Albedo.png")
    albedoMap.colorSpace = THREE.SRGBColorSpace
    
    const normalMap = textureLoader.load("https://res.cloudinary.com/dbxohjdng/image/upload/v1768469748/normal.png")
    normalMap.colorSpace = THREE.NoColorSpace // Importante para normal maps
    
    const roughnessMap = textureLoader.load("https://res.cloudinary.com/dbxohjdng/image/upload/v1768469196/Roughness.png")
    roughnessMap.colorSpace = THREE.NoColorSpace
    
    const metalnessMap = textureLoader.load("https://res.cloudinary.com/dbxohjdng/image/upload/v1768469903/Metallic_Metalness.png")
    metalnessMap.colorSpace = THREE.NoColorSpace

    // Business card geometry (standard credit card dimensions ratio)
    const cardWidth = 3.5
    const cardHeight = 2
    const cardGeometry = new THREE.PlaneGeometry(cardWidth, cardHeight, 1, 1)

    // Material con configuración correcta para PBR
    const cardMaterial = new THREE.MeshStandardMaterial({
      map: albedoMap,
      normalMap: normalMap,
      normalScale: new THREE.Vector2(1.0, 1.0),
      roughnessMap: roughnessMap,
      metalnessMap: metalnessMap,
      metalness: 0.0, // Override del mapa
      roughness: 1.0, // Override del mapa  
      side: THREE.DoubleSide,
      transparent: false
    })

    const card = new THREE.Mesh(cardGeometry, cardMaterial)
    card.castShadow = true
    card.receiveShadow = true
    scene.add(card)

    // Lighting setup - Luz más brillante y neutral
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2.0)
    directionalLight.position.set(5, 5, 5)
    directionalLight.castShadow = true
    directionalLight.shadow.mapSize.width = 2048
    directionalLight.shadow.mapSize.height = 2048
    scene.add(directionalLight)

    const pointLight1 = new THREE.PointLight(0x4a9eff, 0.5, 10)
    pointLight1.position.set(-3, 2, 2)
    scene.add(pointLight1)

    const pointLight2 = new THREE.PointLight(0xff6b9d, 0.3, 10)
    pointLight2.position.set(3, -2, 2)
    scene.add(pointLight2)

    // Animation variables
    let mouseX = 0
    let mouseY = 0
    let targetRotationX = 0
    let targetRotationY = 0

    const handleMouseMove = (event: MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1
      mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1
    }

    window.addEventListener("mousemove", handleMouseMove)

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)

      // Smooth rotation based on mouse position
      targetRotationY = mouseX * 0.3
      targetRotationX = mouseY * 0.3

      card.rotation.y += (targetRotationY - card.rotation.y) * 0.05
      card.rotation.x += (targetRotationX - card.rotation.x) * 0.05

      // Subtle floating animation
      card.position.y = Math.sin(Date.now() * 0.001) * 0.1

      // Animate lights
      pointLight1.position.x = Math.sin(Date.now() * 0.001) * 3
      pointLight2.position.x = Math.cos(Date.now() * 0.001) * 3

      renderer.render(scene, camera)
    }

    animate()

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return
      const size = Math.min(containerRef.current.clientWidth, 600)
      camera.aspect = 1
      camera.updateProjectionMatrix()
      renderer.setSize(size, size)
    }

    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleResize)
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement)
      }
      cardGeometry.dispose()
      cardMaterial.dispose()
      albedoMap.dispose()
      normalMap.dispose()
      roughnessMap.dispose()
      metalnessMap.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div className="relative hidden lg:block">
      <div className="relative aspect-square w-full max-w-[600px] mx-auto">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:64px_64px]" />

        {/* Three.js container */}
        <div 
          ref={containerRef} 
          className="absolute inset-0 flex items-center justify-center"
          style={{ width: "600px", height: "600px" }}
        />

        {/* Accent glow effects */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="absolute w-[400px] h-[400px] rounded-full bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-transparent blur-3xl animate-pulse" />
        </div>
      </div>
    </div>
  )
}