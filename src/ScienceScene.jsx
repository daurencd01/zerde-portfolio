import { useEffect, useId, useRef, useState } from 'react'

function makeWater(THREE) {
  const group = new THREE.Group()
  const oxygen = new THREE.Mesh(new THREE.SphereGeometry(0.57, 32, 24), new THREE.MeshStandardMaterial({ color: 0xa54b3f, roughness: 0.34, metalness: 0.08 }))
  group.add(oxygen)
  const hydrogenMaterial = new THREE.MeshStandardMaterial({ color: 0xf4eee0, roughness: 0.38, metalness: 0.05 })
  const bondMaterial = new THREE.MeshStandardMaterial({ color: 0x947e67, roughness: 0.48 })
  const ends = [new THREE.Vector3(-1.12, -0.87, 0.26), new THREE.Vector3(1.12, -0.87, 0.26)]
  ends.forEach(end => {
    const hydrogen = new THREE.Mesh(new THREE.SphereGeometry(0.36, 28, 20), hydrogenMaterial)
    hydrogen.position.copy(end)
    group.add(hydrogen)
    const middle = end.clone().multiplyScalar(0.5)
    const bond = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, end.length(), 16), bondMaterial)
    bond.position.copy(middle)
    bond.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), end.clone().normalize())
    group.add(bond)
  })
  return group
}

function makeCell(THREE) {
  const group = new THREE.Group()
  const wall = new THREE.Mesh(new THREE.BoxGeometry(3.2, 2.2, 0.82), new THREE.MeshPhysicalMaterial({ color: 0x8eb79a, transparent: true, opacity: 0.28, roughness: 0.42, side: THREE.DoubleSide, depthWrite: false }))
  const outline = new THREE.LineSegments(new THREE.EdgesGeometry(wall.geometry), new THREE.LineBasicMaterial({ color: 0x2d6758 }))
  group.add(wall, outline)
  const inner = new THREE.Mesh(new THREE.BoxGeometry(2.93, 1.95, 0.64), new THREE.MeshPhysicalMaterial({ color: 0xe6e2b6, transparent: true, opacity: 0.12, side: THREE.DoubleSide, depthWrite: false }))
  group.add(inner)
  const nucleus = new THREE.Mesh(new THREE.SphereGeometry(0.41, 26, 20), new THREE.MeshStandardMaterial({ color: 0xb48d96, roughness: 0.5 }))
  nucleus.position.set(-0.15, 0.04, 0.1)
  group.add(nucleus)
  const chloroplastMaterial = new THREE.MeshStandardMaterial({ color: 0x41856b, roughness: 0.46 })
  const points = [[-1.04, 0.62, 0.22], [0.88, 0.6, 0.19], [1.04, -0.48, 0.15], [-1.03, -0.6, 0.2], [0.46, -0.68, 0.23]]
  points.forEach(([x, y, z], index) => {
    const chloroplast = new THREE.Mesh(new THREE.SphereGeometry(0.3, 22, 16), chloroplastMaterial)
    chloroplast.scale.set(1.22, 0.53, 0.46)
    chloroplast.position.set(x, y, z)
    chloroplast.rotation.z = index % 2 ? -0.35 : 0.33
    group.add(chloroplast)
  })
  return group
}

function disposeGroup(group) {
  group.traverse(object => {
    if (object.geometry) object.geometry.dispose()
    if (object.material) {
      const materials = Array.isArray(object.material) ? object.material : [object.material]
      materials.forEach(material => material.dispose())
    }
  })
}

export default function ScienceScene({ labels }) {
  const [mode, setMode] = useState('water')
  const [playing, setPlaying] = useState(true)
  const [status, setStatus] = useState('loading')
  const [reducedMotion, setReducedMotion] = useState(false)
  const frameRef = useRef(null)
  const controlsRef = useRef(null)
  const motionRef = useRef(true)
  const descriptionId = useId()

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    motionRef.current = playing && !reducedMotion
    if (motionRef.current) controlsRef.current?.resume()
  }, [playing, reducedMotion])

  useEffect(() => {
    const frame = frameRef.current
    if (!frame) return undefined
    let cancelled = false
    let cleanup = () => {}
    setStatus('loading')

    const setup = async () => {
      try {
        const THREE = await import('three')
        if (cancelled) return
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' })
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6))
        renderer.outputColorSpace = THREE.SRGBColorSpace
        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100)
        camera.position.set(0, 0.15, 6.5)
        scene.add(new THREE.HemisphereLight(0xffffff, 0xb7bdad, 2.2))
        const key = new THREE.DirectionalLight(0xffffff, 2.6)
        key.position.set(-2, 4, 5)
        scene.add(key)
        const fill = new THREE.DirectionalLight(0xa8c5b0, 1.4)
        fill.position.set(3, -2, -2)
        scene.add(fill)
        const model = mode === 'water' ? makeWater(THREE) : makeCell(THREE)
        model.rotation.set(-0.18, -0.28, 0)
        scene.add(model)
        frame.appendChild(renderer.domElement)
        renderer.domElement.setAttribute('aria-hidden', 'true')

        let raf = 0
        let baseRotation = -0.28
        let inView = true
        const resize = () => {
          const width = Math.max(frame.clientWidth, 1)
          const height = Math.max(frame.clientHeight, 1)
          camera.aspect = width / height
          camera.updateProjectionMatrix()
          renderer.setSize(width, height)
          renderer.render(scene, camera)
        }
        const draw = time => {
          raf = 0
          if (!inView || document.hidden) return
          if (motionRef.current) {
            model.rotation.y = baseRotation + Math.sin(time * 0.0011) * 0.38
            model.rotation.x = -0.18 + Math.sin(time * 0.0007) * 0.06
          }
          renderer.render(scene, camera)
          if (motionRef.current) raf = requestAnimationFrame(draw)
        }
        const resume = () => { if (!raf && inView && !document.hidden) raf = requestAnimationFrame(draw) }
        const pause = () => { if (raf) cancelAnimationFrame(raf); raf = 0 }
        const rotate = direction => { baseRotation += direction * 0.36; model.rotation.y = baseRotation; renderer.render(scene, camera) }
        controlsRef.current = { resume, rotate }
        const visibility = new IntersectionObserver(entries => { inView = entries[0]?.isIntersecting ?? true; if (inView) resume(); else pause() }, { threshold: 0.05 })
        visibility.observe(frame)
        const resizeObserver = new ResizeObserver(resize)
        resizeObserver.observe(frame)
        const onVisibilityChange = () => { if (document.hidden) pause(); else resume() }
        document.addEventListener('visibilitychange', onVisibilityChange)
        resize()
        resume()
        setStatus('ready')
        cleanup = () => {
          pause()
          visibility.disconnect()
          resizeObserver.disconnect()
          document.removeEventListener('visibilitychange', onVisibilityChange)
          controlsRef.current = null
          disposeGroup(model)
          renderer.dispose()
          renderer.domElement.remove()
        }
      } catch {
        if (!cancelled) setStatus('fallback')
      }
    }

    const loadObserver = new IntersectionObserver(entries => {
      if (entries[0]?.isIntersecting) { loadObserver.disconnect(); setup() }
    }, { rootMargin: '300px' })
    loadObserver.observe(frame)
    return () => { cancelled = true; loadObserver.disconnect(); cleanup() }
  }, [mode])

  return <div className="science-viewer">
    <div className="science-tabs" role="group" aria-label={labels.schematic}>
      <button type="button" className={mode === 'water' ? 'selected' : ''} aria-pressed={mode === 'water'} onClick={() => setMode('water')}>{labels.molecule}</button>
      <button type="button" className={mode === 'cell' ? 'selected' : ''} aria-pressed={mode === 'cell'} onClick={() => setMode('cell')}>{labels.cell}</button>
    </div>
    <div className="science-frame" ref={frameRef} role="group" aria-label={`${labels.schematic}: ${mode === 'water' ? labels.molecule : labels.cell}`} aria-describedby={descriptionId}>
      {status !== 'ready' && <div className={`science-placeholder ${mode}`}><strong>{mode === 'water' ? 'H₂O' : labels.cell}</strong><span>{status === 'fallback' ? labels.fallbackModel : labels.loadingModel}</span><small>{mode === 'water' ? labels.waterDescription : labels.cellDescription}</small></div>}
    </div>
    <span id={descriptionId} hidden>{mode === 'water' ? labels.waterDescription : labels.cellDescription}{status === 'fallback' ? ` ${labels.fallbackModel}` : ''}</span>
    <div className="science-controls">
      <button type="button" disabled={status !== 'ready'} onClick={() => controlsRef.current?.rotate(-1)} aria-label={labels.rotateLeft}>{labels.rotateLeft}</button>
      <button type="button" disabled={status !== 'ready'} onClick={() => controlsRef.current?.rotate(1)} aria-label={labels.rotateRight}>{labels.rotateRight}</button>
      {!reducedMotion && <button type="button" disabled={status !== 'ready'} onClick={() => setPlaying(value => !value)}>{playing ? labels.pause : labels.play}</button>}
    </div>
  </div>
}
