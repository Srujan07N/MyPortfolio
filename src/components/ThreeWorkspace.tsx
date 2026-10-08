import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCw, Sparkles, Layers, Maximize2, ShieldCheck } from 'lucide-react';
import { playKeyClick } from '../lib/sound';

interface ThreeWorkspaceProps {
  onSelectTech?: (techName: string) => void;
  className?: string;
}

interface TechObjectData {
  name: string;
  category: string;
  description: string;
  mesh: THREE.Object3D;
  initialPos: THREE.Vector3;
  color: string;
}

export const ThreeWorkspace: React.FC<ThreeWorkspaceProps> = ({ onSelectTech, className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hoveredTech, setHoveredTech] = useState<TechObjectData | null>(null);
  const [isRotating, setIsRotating] = useState<boolean>(true);
  const [isWebGLSupported, setIsWebGLSupported] = useState<boolean>(true);
  const [statusMessage, setStatusMessage] = useState<string>('Ready');

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check WebGL availability
    try {
      const canvasTest = document.createElement('canvas');
      const gl = canvasTest.getContext('webgl') || canvasTest.getContext('experimental-webgl');
      if (!gl) {
        setIsWebGLSupported(false);
        return;
      }
    } catch {
      setIsWebGLSupported(false);
      return;
    }

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 450;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x060606);
    scene.fog = new THREE.FogExp2(0x060606, 0.035);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 2.2, 5.8);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    // Copper Key Light
    const copperKeyLight = new THREE.DirectionalLight(0xc8753d, 2.4);
    copperKeyLight.position.set(3, 4, 3);
    scene.add(copperKeyLight);

    // Subtle Cool Fill Light
    const fillLight = new THREE.DirectionalLight(0x708090, 0.8);
    fillLight.position.set(-4, 2, -2);
    scene.add(fillLight);

    // Rim Light from back
    const rimLight = new THREE.PointLight(0xf28a4b, 1.8, 10);
    rimLight.position.set(0, 3, -3);
    scene.add(rimLight);

    // Master Group for workspace
    const workspaceGroup = new THREE.Group();
    scene.add(workspaceGroup);

    // Grid Floor
    const gridHelper = new THREE.GridHelper(12, 24, 0xc8753d, 0x1f1f1f);
    gridHelper.position.y = -1.2;
    // Make lines subtle
    if (gridHelper.material instanceof THREE.Material) {
      gridHelper.material.transparent = true;
      gridHelper.material.opacity = 0.25;
    }
    workspaceGroup.add(gridHelper);

    // Desk Platform / Workstation Base
    const deskGeometry = new THREE.BoxGeometry(4.2, 0.08, 2.2);
    const deskMaterial = new THREE.MeshStandardMaterial({
      color: 0x0c0c0c,
      roughness: 0.35,
      metalness: 0.8,
    });
    const deskMesh = new THREE.Mesh(deskGeometry, deskMaterial);
    deskMesh.position.set(0, -0.6, 0);
    workspaceGroup.add(deskMesh);

    // Copper Edge Rim for Desk
    const deskEdgeGeo = new THREE.BoxGeometry(4.24, 0.02, 0.04);
    const deskEdgeMat = new THREE.MeshStandardMaterial({
      color: 0xc8753d,
      emissive: 0x7a3e22,
      emissiveIntensity: 0.5,
      roughness: 0.2,
      metalness: 0.9,
    });
    const deskEdge = new THREE.Mesh(deskEdgeGeo, deskEdgeMat);
    deskEdge.position.set(0, -0.56, 1.1);
    workspaceGroup.add(deskEdge);

    // Curved Ultrawide Monitor Stand & Screen
    const standPoleGeo = new THREE.CylinderGeometry(0.04, 0.05, 0.8, 16);
    const metalMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, metalness: 0.9, roughness: 0.2 });
    const standPole = new THREE.Mesh(standPoleGeo, metalMat);
    standPole.position.set(0, -0.2, -0.3);
    workspaceGroup.add(standPole);

    const standBaseGeo = new THREE.CylinderGeometry(0.35, 0.4, 0.03, 24);
    const standBase = new THREE.Mesh(standBaseGeo, metalMat);
    standBase.position.set(0, -0.58, -0.3);
    workspaceGroup.add(standBase);

    // Curved Monitor Screen
    const screenCurve = new THREE.CylinderGeometry(2.4, 2.4, 1.05, 32, 1, true, Math.PI * 0.35, Math.PI * 0.3);
    const screenBackMat = new THREE.MeshStandardMaterial({
      color: 0x111111,
      metalness: 0.8,
      roughness: 0.4,
      side: THREE.BackSide,
    });
    const monitorBack = new THREE.Mesh(screenCurve, screenBackMat);
    monitorBack.position.set(0, 0.4, -2.4);
    workspaceGroup.add(monitorBack);

    // Screen Front (Procedural Code Texture)
    const codeCanvas = document.createElement('canvas');
    codeCanvas.width = 1024;
    codeCanvas.height = 512;
    const ctx = codeCanvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#080808';
      ctx.fillRect(0, 0, 1024, 512);

      // Header bar
      ctx.fillStyle = 'var(--bg-element)';
      ctx.fillRect(0, 0, 1024, 40);
      ctx.fillStyle = 'var(--accent-base)';
      ctx.fillRect(20, 14, 12, 12);
      ctx.fillStyle = '#444444';
      ctx.fillRect(40, 14, 12, 12);
      ctx.fillRect(60, 14, 12, 12);

      ctx.fillStyle = '#888888';
      ctx.font = 'bold 16px monospace';
      ctx.fillText('srujan@dev: ~/portfolio/src (main)', 90, 26);

      // Code lines
      const codeLines = [
        { text: 'import { createServer } from "node:http";', color: 'var(--accent-base)' },
        { text: 'import { MongoClient } from "mongodb";', color: 'var(--accent-hover)' },
        { text: 'import { verifyToken, signPayload } from "./auth/jwt";', color: 'var(--text-secondary)' },
        { text: '', color: '' },
        { text: 'export async function bootstrapSystem() {', color: 'var(--text-primary)' },
        { text: '  const db = await connectDatabase(process.env.DB_URI);', color: 'var(--text-secondary)' },
        { text: '  const app = createMernGateway({ db, security: "STRICT" });', color: 'var(--accent-hover)' },
        { text: '  console.log("● SRUJAN.N System Initialized on port 3000");', color: 'var(--accent-base)' },
        { text: '  return { status: "ACTIVE", latency: "sub-10ms" };', color: 'var(--text-primary)' },
        { text: '}', color: 'var(--text-primary)' },
        { text: '', color: '' },
        { text: '// Full Stack Architecture · Ready for Production', color: 'var(--text-muted)' },
        { text: 'const srujanOS = await bootstrapSystem();', color: 'var(--accent-base)' },
      ];

      ctx.font = '19px monospace';
      codeLines.forEach((line, idx) => {
        if (line.text) {
          ctx.fillStyle = line.color;
          ctx.fillText(line.text, 36, 85 + idx * 30);
        }
      });

      // Subtle grid overlay
      ctx.strokeStyle = 'rgba(200, 117, 61, 0.08)';
      ctx.lineWidth = 1;
      for (let y = 50; y < 512; y += 20) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(1024, y);
        ctx.stroke();
      }
    }

    const codeTexture = new THREE.CanvasTexture(codeCanvas);
    const screenFrontMat = new THREE.MeshBasicMaterial({
      map: codeTexture,
      side: THREE.FrontSide,
    });
    const monitorFront = new THREE.Mesh(screenCurve, screenFrontMat);
    monitorFront.position.set(0, 0.4, -2.39);
    workspaceGroup.add(monitorFront);

    // Keyboard & Trackpad on Desk
    const kbGeo = new THREE.BoxGeometry(1.2, 0.02, 0.4);
    const kbMat = new THREE.MeshStandardMaterial({ color: 0x161616, roughness: 0.6, metalness: 0.4 });
    const keyboard = new THREE.Mesh(kbGeo, kbMat);
    keyboard.position.set(0, -0.55, 0.4);
    workspaceGroup.add(keyboard);

    // Trackpad
    const trackpadGeo = new THREE.BoxGeometry(0.35, 0.015, 0.22);
    const trackpadMat = new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.3, metalness: 0.7 });
    const trackpad = new THREE.Mesh(trackpadGeo, trackpadMat);
    trackpad.position.set(0, -0.55, 0.75);
    workspaceGroup.add(trackpad);

    // Interactive Floating Tech Nodes
    const techNodesData: TechObjectData[] = [];
    const interactiveMeshes: THREE.Object3D[] = [];

    // Helper: create glow badge
    const createTechNode = (
      name: string,
      category: string,
      description: string,
      pos: THREE.Vector3,
      geometry: THREE.BufferGeometry,
      colorHex: number
    ) => {
      const group = new THREE.Group();
      group.position.copy(pos);

      // Core Mesh
      const mat = new THREE.MeshStandardMaterial({
        color: colorHex,
        emissive: colorHex,
        emissiveIntensity: 0.4,
        roughness: 0.2,
        metalness: 0.85,
      });
      const mesh = new THREE.Mesh(geometry, mat);
      group.add(mesh);

      // Wireframe orbit ring around it
      const ringGeo = new THREE.TorusGeometry(0.32, 0.01, 8, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xc8753d,
        transparent: true,
        opacity: 0.4,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / 3;
      group.add(ringMesh);

      // Small secondary satellite particle
      const satGeo = new THREE.SphereGeometry(0.04, 12, 12);
      const satMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const satMesh = new THREE.Mesh(satGeo, satMat);
      satMesh.position.set(0.32, 0, 0);
      ringMesh.add(satMesh);

      // Register for Raycaster picking
      mesh.userData = { name, category, description, colorHex };
      interactiveMeshes.push(mesh);

      workspaceGroup.add(group);

      const nodeData: TechObjectData = {
        name,
        category,
        description,
        mesh: group,
        initialPos: pos.clone(),
        color: '#' + colorHex.toString(16).padStart(6, '0'),
      };
      techNodesData.push(nodeData);

      return group;
    };

    // 1. React (Orbital Torus Knot / Sphere)
    createTechNode(
      'React',
      'Frontend Library',
      'Modular state management, declarative component trees, and reactive UX.',
      new THREE.Vector3(-1.8, 0.85, -0.4),
      new THREE.TorusKnotGeometry(0.18, 0.05, 64, 16, 2, 3),
      0xc8753d
    );

    // 2. Node.js (Hexagonal Column)
    createTechNode(
      'Node.js',
      'Backend Runtime',
      'Non-blocking asynchronous I/O and scalable microservice APIs.',
      new THREE.Vector3(-1.1, 1.45, -0.8),
      new THREE.CylinderGeometry(0.18, 0.18, 0.28, 6),
      0xf28a4b
    );

    // 3. Next.js (Faceted Octahedron)
    createTechNode(
      'Next.js',
      'Full-Stack Framework',
      'Server-side rendering, routing optimization, and fast modern delivery.',
      new THREE.Vector3(1.1, 1.45, -0.8),
      new THREE.OctahedronGeometry(0.24, 0),
      0xffffff
    );

    // 4. MongoDB (Document Prism)
    createTechNode(
      'MongoDB',
      'NoSQL Database',
      'Flexible document modeling, aggregation pipelines, and atomic updates.',
      new THREE.Vector3(1.8, 0.85, -0.4),
      new THREE.CylinderGeometry(0.12, 0.2, 0.34, 8),
      0xc8753d
    );

    // 5. TypeScript (Precision Cube)
    createTechNode(
      'TypeScript',
      'Static Typing',
      'Interface contracts, robust compile-time safety, and refactoring confidence.',
      new THREE.Vector3(0, 1.6, -1.0),
      new THREE.BoxGeometry(0.26, 0.26, 0.26),
      0x7a3e22
    );

    // Floating Data Dust Particles
    const particlesCount = 80;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 6;
      particlePositions[i + 1] = Math.random() * 3 - 0.5;
      particlePositions[i + 2] = (Math.random() - 0.5) * 5;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xc8753d,
      size: 0.03,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    workspaceGroup.add(particles);

    // Raycaster for Hover Interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-999, -999);
    let targetCameraX = 0;
    let targetCameraY = 2.2;

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      mouse.x = (clientX / rect.width) * 2 - 1;
      mouse.y = -(clientY / rect.height) * 2 + 1;

      // Parallax subtle camera displacement
      targetCameraX = mouse.x * 0.45;
      targetCameraY = 2.2 + mouse.y * 0.25;
    };

    const handlePointerLeave = () => {
      mouse.x = -999;
      mouse.y = -999;
      targetCameraX = 0;
      targetCameraY = 2.2;
      setHoveredTech(null);
    };

    const handleClick = () => {
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(interactiveMeshes);
      if (intersects.length > 0) {
        const hitData = intersects[0].object.userData;
        if (hitData?.name) {
          playKeyClick();
          if (onSelectTech) {
            onSelectTech(hitData.name);
          }
        }
      }
    };

    container.addEventListener('mousemove', handlePointerMove);
    container.addEventListener('mouseleave', handlePointerLeave);
    container.addEventListener('click', handleClick);

    // Animation Loop
    let clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Camera smooth damping
      camera.position.x += (targetCameraX - camera.position.x) * 0.05;
      camera.position.y += (targetCameraY - camera.position.y) * 0.05;
      camera.lookAt(0, 0.4, -0.6);

      // Workstation gentle idle rotation
      if (isRotating) {
        workspaceGroup.rotation.y = Math.sin(elapsedTime * 0.3) * 0.08;
      }

      // Tech nodes floating & spinning
      techNodesData.forEach((node, index) => {
        const meshGroup = node.mesh;
        meshGroup.position.y = node.initialPos.y + Math.sin(elapsedTime * 1.5 + index * 1.2) * 0.08;
        meshGroup.rotation.y = elapsedTime * 0.6 + index;
        meshGroup.rotation.x = Math.sin(elapsedTime * 0.4 + index) * 0.2;
      });

      // Data dust particle slow drift
      particles.rotation.y = elapsedTime * 0.02;

      // Raycasting check
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(interactiveMeshes);

      if (intersects.length > 0) {
        const hitMesh = intersects[0].object;
        const hitName = hitMesh.userData.name;
        const matched = techNodesData.find((n) => n.name === hitName);
        if (matched) {
          setHoveredTech(matched);
          container.style.cursor = 'pointer';
        }
      } else {
        setHoveredTech(null);
        container.style.cursor = 'default';
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // WebGL Context Lost / Restored
    const handleContextLost = (event: Event) => {
      event.preventDefault();
      cancelAnimationFrame(animationFrameId);
      setStatusMessage('WebGL context suspended');
    };

    const handleContextRestored = () => {
      setStatusMessage('WebGL context restored');
      animate();
    };

    const canvasEl = renderer.domElement;
    canvasEl.addEventListener('webglcontextlost', handleContextLost);
    canvasEl.addEventListener('webglcontextrestored', handleContextRestored);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handlePointerMove);
      container.removeEventListener('mouseleave', handlePointerLeave);
      container.removeEventListener('click', handleClick);
      canvasEl.removeEventListener('webglcontextlost', handleContextLost);
      canvasEl.removeEventListener('webglcontextrestored', handleContextRestored);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      codeTexture.dispose();
    };
  }, [isRotating, onSelectTech]);

  // Graceful Fallback if WebGL is unavailable
  if (!isWebGLSupported) {
    return (
      <div className={`relative w-full h-[420px] rounded-xl border border-[var(--border-base)] bg-[var(--bg-panel)] p-6 flex flex-col justify-between overflow-hidden ${className}`}>
        <div className="flex items-center justify-between border-b border-[var(--border-base)] pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent-base)]"></span>
            <span className="text-xs uppercase tracking-wider text-[var(--text-secondary)] font-mono">3D WORKSPACE ARCHITECTURE</span>
          </div>
          <span className="text-xs text-[var(--text-secondary)] font-mono">Standard 2D Mode</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-auto">
          {['React.js', 'Node.js', 'Next.js', 'MongoDB'].map((tech) => (
            <div key={tech} className="p-4 rounded-lg border border-[var(--border-base)] bg-[var(--bg-panel-alt)] text-center">
              <span className="text-sm font-medium text-[var(--text-primary)]">{tech}</span>
              <p className="text-xs text-[var(--text-secondary)] mt-1">Core Architecture</p>
            </div>
          ))}
        </div>
        <div className="text-xs text-[var(--text-secondary)] font-mono flex items-center justify-between pt-3 border-t border-[var(--border-base)]">
          <span>GPU acceleration inactive</span>
          <span className="text-[var(--accent-base)]">MERN Stack Synchronized</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full h-[440px] md:h-[500px] rounded-xl border border-[var(--border-base)] bg-[#060606] overflow-hidden group select-none ${className}`}>
      {/* 3D Canvas Mount */}
      <div ref={mountRef} className="w-full h-full" />

      {/* Top HUD Bar */}
      <div className="absolute top-3 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-[var(--bg-panel)]/85 backdrop-blur-md border border-[var(--border-base)] pointer-events-auto">
          <span className="w-2 h-2 rounded-full bg-[var(--accent-base)] animate-pulse"></span>
          <span className="text-xs font-mono text-[var(--text-primary)] tracking-wide">SRUJAN.N 3D WORKSTATION</span>
          <span className="text-[var(--text-secondary)] text-xs">·</span>
          <span className="text-[11px] text-[var(--text-secondary)] font-mono">Interactive Viewport</span>
        </div>

        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            onClick={() => {
              playKeyClick();
              setIsRotating(!isRotating);
            }}
            title={isRotating ? 'Pause rotation' : 'Resume rotation'}
            className="p-1.5 rounded-md bg-[var(--bg-panel)]/80 hover:bg-[var(--bg-element)] border border-[var(--border-base)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            <RotateCw className={`w-3.5 h-3.5 ${isRotating ? '' : 'opacity-40'}`} />
          </button>
        </div>
      </div>

      {/* Hovered Tech Telemetry Card */}
      {hoveredTech && (
        <div className="absolute bottom-4 left-4 right-4 md:right-auto md:max-w-sm p-3.5 rounded-lg bg-[var(--bg-panel)]/90 backdrop-blur-md border border-[var(--accent-base)]/40 shadow-xl transition-all duration-200 z-10">
          <div className="flex items-center justify-between gap-3 mb-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: hoveredTech.color }}></span>
              <h4 className="text-sm font-semibold text-[var(--text-primary)] tracking-wide">{hoveredTech.name}</h4>
            </div>
            <span className="text-[11px] font-mono uppercase text-[var(--accent-base)] tracking-wider">{hoveredTech.category}</span>
          </div>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{hoveredTech.description}</p>
          <div className="mt-2.5 pt-2 border-t border-[var(--border-base)] flex items-center justify-between text-[11px] text-[var(--text-secondary)] font-mono">
            <span>Click token to inspect in Skills</span>
            <span className="text-[var(--accent-hover)]">Active Node →</span>
          </div>
        </div>
      )}

      {/* Subtle Default Hint if not hovered */}
      {!hoveredTech && (
        <div className="absolute bottom-3 left-4 flex items-center gap-2 px-3 py-1 rounded bg-[var(--bg-panel)]/60 backdrop-blur-sm border border-[var(--border-base)] pointer-events-none">
          <Sparkles className="w-3 h-3 text-[var(--accent-base)]" />
          <span className="text-[11px] font-mono text-[var(--text-secondary)]">Move cursor to navigate 3D space · Click tech nodes to view details</span>
        </div>
      )}

      {/* Bottom Right Camera Info */}
      <div className="absolute bottom-3 right-4 hidden md:flex items-center gap-2 px-2.5 py-1 rounded bg-[var(--bg-panel)]/60 backdrop-blur-sm border border-[var(--border-base)] pointer-events-none text-[11px] font-mono text-[var(--text-secondary)]">
        <span>PERSPECTIVE 45°</span>
        <span>·</span>
        <span className="text-[var(--accent-base)]">THREE.JS 0.180</span>
      </div>
    </div>
  );
};
