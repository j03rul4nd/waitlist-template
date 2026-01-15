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
      2,
      20
    )
    camera.position.set(0, 0, 5)

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: "high-performance",
      precision: "highp"
    })
    renderer.setSize(400, 400)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    containerRef.current.appendChild(renderer.domElement)

    // Load texture maps
    const textureLoader = new THREE.TextureLoader()
    const baseColorMap = textureLoader.load('https://res.cloudinary.com/dbxohjdng/image/upload/v1768469118/Base_Color_Albedo.png')
    baseColorMap.colorSpace = THREE.SRGBColorSpace
    
    const normalMap = textureLoader.load('https://res.cloudinary.com/dbxohjdng/image/upload/v1768476074/paper_normal_pbr_s89hjz.png')

    // Business card geometry (matching texture dimensions ratio: 2048 × 1345)
    const aspectRatio = 2048 / 1345
    const cardHeight = 2
    const cardWidth = cardHeight * aspectRatio
    const cardGeometry = new THREE.PlaneGeometry(cardWidth, cardHeight)

    // Material con configuración correcta para PBR - aspecto mate de papel
    const cardMaterial = new THREE.MeshStandardMaterial({
      map: baseColorMap,
      normalMap: normalMap,
      normalScale: new THREE.Vector2(1, 1),
      roughness: 0.95, // Very matte, paper-like
      metalness: 0.0,
      side: THREE.FrontSide,
      transparent: false,
      depthWrite: true,
      depthTest: true
    })

    const card = new THREE.Mesh(cardGeometry, cardMaterial)
    card.castShadow = true
    card.receiveShadow = true
    card.renderOrder = 0
    card.rotation.y = Math.PI // Rotar 180 grados para que se vea correctamente
    scene.add(card)

    // Lighting setup - Iluminación profesional mejorada
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2)
    scene.add(ambientLight)

    // Main directional light (key light)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2.0)
    directionalLight.position.set(5, 5, 5)
    directionalLight.castShadow = true
    directionalLight.shadow.mapSize.width = 2048
    directionalLight.shadow.mapSize.height = 2048
    scene.add(directionalLight)

    // Fill light from opposite side
    const fillLight = new THREE.DirectionalLight(0xffffff, 1.2)
    fillLight.position.set(-5, 3, 4)
    scene.add(fillLight)

    // Top light for better definition
    const topLight = new THREE.DirectionalLight(0xffffff, 0.8)
    topLight.position.set(0, 8, 0)
    scene.add(topLight)

    // Bottom bounce light
    const bounceLight = new THREE.DirectionalLight(0xe0e7ff, 0.6)
    bounceLight.position.set(0, -5, 3)
    scene.add(bounceLight)

    // Rim lights for depth and elegance
    const rimLight1 = new THREE.DirectionalLight(0x6366f1, 0.5)
    rimLight1.position.set(-5, 3, -3)
    scene.add(rimLight1)

    const rimLight2 = new THREE.DirectionalLight(0x8b5cf6, 0.4)
    rimLight2.position.set(5, -3, -3)
    scene.add(rimLight2)

    // Back rim light for extra definition
    const backRimLight = new THREE.DirectionalLight(0xa78bfa, 0.3)
    backRimLight.position.set(0, 0, -5)
    scene.add(backRimLight)

    // Subtle accent lights
    const accentLight1 = new THREE.PointLight(0x60a5fa, 0.4, 10)
    accentLight1.position.set(3, 2, 2)
    scene.add(accentLight1)

    const accentLight2 = new THREE.PointLight(0xc084fc, 0.3, 10)
    accentLight2.position.set(-3, -2, 2)
    scene.add(accentLight2)

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

      renderer.render(scene, camera)
    }

    animate()

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return
      const size = Math.min(containerRef.current.clientWidth, 400)
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
      baseColorMap.dispose()
      normalMap.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div className="relative w-full pb-16">
      <div className="relative w-full max-w-[400px] mx-auto" style={{ height: "400px" }}>
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:64px_64px]" />

        {/* Three.js container */}
        <div 
          ref={containerRef} 
          className="absolute inset-0 flex items-center justify-center"
        />

        {/* Accent glow effects */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="absolute w-[350px] h-[350px] rounded-full bg-gradient-to-br from-blue-500/30 via-purple-500/20 to-pink-500/10 blur-[100px]" 
               style={{ animation: 'pulse 3s ease-in-out infinite' }} />
        </div>
      </div>

      {/* Text below */}
      <div className="mt-8 text-center">
        <p className="text-lg text-gray-700 max-w-xl mx-auto px-4 leading-relaxed">
Thanks to their personal brand, our clients generate 237% more revenue on average.
        </p>
      </div>
    </div>
  )
}