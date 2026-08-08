import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import {
  createEarthTextureCanvas,
  createEarthBumpCanvas,
  createEarthEmissiveNightCanvas,
  createEarthSpecularCanvas
} from '../utils/proceduralEarthTexture';
import { EcoHUD } from './EcoHUD';
import { BioSyncStatus, EarthViewMode, EarthMarker, DayNightMode } from '../types';
import { Globe, Moon, Flame, Wind, Layers, RefreshCw } from 'lucide-react';

interface EarthSceneProps {
  healthPercentage: number;
  bioSyncStatus: BioSyncStatus;
  onHealClick: () => void;
  onResetClick?: () => void;
  autoRotate?: boolean;
  userPoints?: number;
}

// Interactive 3D Markers on Globe
const EARTH_MARKERS: EarthMarker[] = [
  {
    id: 'm-1',
    name: 'Sydney Reforestation Squad',
    lat: -33.8688,
    lng: 151.2093,
    type: 'forest',
    co2ImpactKg: 1250,
    activeUsers: 840,
    description: 'Planted 15,000 native eucalyptus trees along the eastern coastline.'
  },
  {
    id: 'm-2',
    name: 'New Delhi AQI Restoration',
    lat: 28.6139,
    lng: 77.2090,
    type: 'project',
    co2ImpactKg: 3400,
    activeUsers: 2150,
    description: 'Community smog-free tower initiative and urban solar transition.'
  },
  {
    id: 'm-3',
    name: 'Amazon Canopy Shield',
    lat: -3.4653,
    lng: -62.2159,
    type: 'forest',
    co2ImpactKg: 8900,
    activeUsers: 4300,
    description: 'Satellite biodiversity protection and rainforest conservation drive.'
  },
  {
    id: 'm-4',
    name: 'Tokyo Zero-Carbon Grid',
    lat: 35.6762,
    lng: 139.6503,
    type: 'solar',
    co2ImpactKg: 4200,
    activeUsers: 1900,
    description: 'Rooftop solar expansion and smart grid energy sharing.'
  },
  {
    id: 'm-5',
    name: 'London Eco-Commute Hub',
    lat: 51.5074,
    lng: -0.1278,
    type: 'cleanup',
    co2ImpactKg: 2100,
    activeUsers: 1200,
    description: 'Electric bike networks and Thames micro-plastic filtration.'
  }
];

// Helper: Convert Lat/Lng to 3D Cartesian coordinates on sphere
function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

export const EarthScene: React.FC<EarthSceneProps> = ({
  healthPercentage,
  bioSyncStatus,
  onHealClick,
  onResetClick,
  autoRotate: initialAutoRotate = true,
  userPoints = 2450
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const earthMeshRef = useRef<THREE.Mesh | null>(null);
  const cloudMeshRef = useRef<THREE.Mesh | null>(null);
  const textureRef = useRef<THREE.CanvasTexture | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const markersGroupRef = useRef<THREE.Group | null>(null);
  const particleSystemRef = useRef<THREE.Points | null>(null);

  // Dynamic Day/Night Lighting Refs
  const sunLightRef = useRef<THREE.DirectionalLight | null>(null);
  const ambientLightRef = useRef<THREE.AmbientLight | null>(null);
  const atmosphereMaterialRef = useRef<THREE.MeshBasicMaterial | null>(null);
  const earthMaterialRef = useRef<THREE.MeshStandardMaterial | null>(null);

  // States
  const [viewMode, setViewMode] = useState<EarthViewMode>('satellite');
  const [isRotating, setIsRotating] = useState(initialAutoRotate);
  const [showClouds, setShowClouds] = useState(true);
  const [selectedMarker, setSelectedMarker] = useState<EarthMarker | null>(null);
  const [isParticleActive, setIsParticleActive] = useState(false);

  // Day / Night Cycle State
  const [dayNightMode, setDayNightMode] = useState<DayNightMode>('realtime');
  const [dayNightTime, setDayNightTime] = useState<number>(() => {
    const d = new Date();
    return d.getHours() + d.getMinutes() / 60;
  });

  const dayNightModeRef = useRef<DayNightMode>(dayNightMode);
  const dayNightTimeRef = useRef<number>(dayNightTime);

  useEffect(() => {
    dayNightModeRef.current = dayNightMode;
  }, [dayNightMode]);

  useEffect(() => {
    dayNightTimeRef.current = dayNightTime;
  }, [dayNightTime]);

  // Drag interaction refs
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });

  // Handle Heal Action with Restoration Particle Explosion!
  const handleTriggerHeal = () => {
    onHealClick();
    setIsParticleActive(true);
    setTimeout(() => setIsParticleActive(false), 2200);
  };

  // Update Earth Texture when Health or View Mode changes
  useEffect(() => {
    if (earthMeshRef.current && textureRef.current) {
      const newCanvas = createEarthTextureCanvas(healthPercentage, viewMode);
      textureRef.current.image = newCanvas;
      textureRef.current.needsUpdate = true;
    }
  }, [healthPercentage, viewMode]);

  // Main Three.js Scene Setup
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 520;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 5.2;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    // 2. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.45);
    ambientLightRef.current = ambientLight;
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffffff, 2.2);
    sunLightRef.current = sunLight;
    sunLight.position.set(-6, 2.5, 5);
    scene.add(sunLight);

    const rimLight = new THREE.DirectionalLight(0x00d2ff, 1.4);
    rimLight.position.set(6, -2, -4);
    scene.add(rimLight);

    // 3. Earth Globe Mesh with Specular, Bump & Emissive Night City Lights
    const earthCanvas = createEarthTextureCanvas(healthPercentage, viewMode);
    const texture = new THREE.CanvasTexture(earthCanvas);
    textureRef.current = texture;

    const nightCanvas = createEarthEmissiveNightCanvas();
    const nightTexture = new THREE.CanvasTexture(nightCanvas);

    const specularCanvas = createEarthSpecularCanvas();
    const specularTexture = new THREE.CanvasTexture(specularCanvas);

    const bumpCanvas = createEarthBumpCanvas();
    const bumpTexture = new THREE.CanvasTexture(bumpCanvas);

    const earthGeometry = new THREE.SphereGeometry(1.85, 64, 64);
    const earthMaterial = new THREE.MeshStandardMaterial({
      map: texture,
      bumpMap: bumpTexture,
      bumpScale: 0.02,
      emissiveMap: nightTexture,
      emissive: new THREE.Color(0xffe082),
      emissiveIntensity: viewMode === 'night' ? 1.5 : 0.9,
      roughnessMap: specularTexture,
      roughness: 0.65,
      metalness: 0.1,
    });
    earthMaterialRef.current = earthMaterial;

    const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
    earthMesh.rotation.y = Math.PI * 1.32; // Rotates India to center stage
    earthMesh.rotation.x = 0.18;
    earthMeshRef.current = earthMesh;
    scene.add(earthMesh);

    // 4. Cloud Layer
    const cloudGeometry = new THREE.SphereGeometry(1.89, 64, 64);
    const cloudCanvas = document.createElement('canvas');
    cloudCanvas.width = 1024;
    cloudCanvas.height = 512;
    const cCtx = cloudCanvas.getContext('2d');
    if (cCtx) {
      cCtx.fillStyle = 'rgba(255,255,255,0)';
      cCtx.fillRect(0, 0, 1024, 512);
      cCtx.fillStyle = 'rgba(255,255,255,0.5)';
      for (let i = 0; i < 140; i++) {
        const x = Math.random() * 1024;
        const y = Math.random() * 512;
        const rx = 25 + Math.random() * 50;
        const ry = 12 + Math.random() * 25;
        cCtx.beginPath();
        cCtx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
        cCtx.fill();
      }
    }
    const cloudTexture = new THREE.CanvasTexture(cloudCanvas);
    const cloudMaterial = new THREE.MeshStandardMaterial({
      map: cloudTexture,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
    });
    const cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial);
    cloudMeshRef.current = cloudMesh;
    scene.add(cloudMesh);

    // 5. Intense Electric Cyan/Blue Atmosphere Outer Glow Shells
    const atmosphereGeometry = new THREE.SphereGeometry(1.97, 64, 64);
    const atmosphereMaterial = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.32,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
    });
    atmosphereMaterialRef.current = atmosphereMaterial;
    const atmosphereMesh = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    scene.add(atmosphereMesh);

    // Outer soft blue halo
    const outerHaloGeometry = new THREE.SphereGeometry(2.05, 64, 64);
    const outerHaloMaterial = new THREE.MeshBasicMaterial({
      color: 0x0284c7,
      transparent: true,
      opacity: 0.15,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
    });
    const outerHaloMesh = new THREE.Mesh(outerHaloGeometry, outerHaloMaterial);
    scene.add(outerHaloMesh);

    // 6. 3D Interactive Location Markers Group
    const markersGroup = new THREE.Group();
    markersGroupRef.current = markersGroup;
    earthMesh.add(markersGroup);

    EARTH_MARKERS.forEach(m => {
      const pos = latLngToVector3(m.lat, m.lng, 1.87);
      
      // Marker Pin Geometry
      const pinGeom = new THREE.SphereGeometry(0.045, 16, 16);
      const pinMat = new THREE.MeshBasicMaterial({
        color: m.type === 'forest' ? 0xa3e635 : m.type === 'solar' ? 0xfacc15 : 0x38bdf8,
      });
      const pinMesh = new THREE.Mesh(pinGeom, pinMat);
      pinMesh.position.copy(pos);
      pinMesh.userData = { markerData: m };

      // Outer Pulsing Ring
      const ringGeom = new THREE.RingGeometry(0.06, 0.08, 16);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x84cc16,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.8
      });
      const ringMesh = new THREE.Mesh(ringGeom, ringMat);
      ringMesh.position.copy(pos);
      ringMesh.lookAt(new THREE.Vector3(0,0,0));

      markersGroup.add(pinMesh);
      markersGroup.add(ringMesh);
    });

    // 7. Restoration Swarm Particle System
    const pCount = 180;
    const pGeom = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount * 3; i += 3) {
      pPos[i] = (Math.random() - 0.5) * 6;
      pPos[i + 1] = (Math.random() - 0.5) * 6;
      pPos[i + 2] = (Math.random() - 0.5) * 6;
    }
    pGeom.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0x84cc16,
      size: 0.06,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });
    const pSystem = new THREE.Points(pGeom, pMat);
    particleSystemRef.current = pSystem;
    pSystem.visible = false;
    scene.add(pSystem);

    // 8. Raycasting for Marker Clicks & Hover
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onPointerDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };

      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(markersGroup.children);

      if (intersects.length > 0) {
        const hitData = intersects[0].object.userData.markerData as EarthMarker;
        if (hitData) {
          setSelectedMarker(hitData);
        }
      }
    };

    const onPointerMove = (e: MouseEvent) => {
      if (!isDraggingRef.current || !earthMeshRef.current) return;

      const deltaX = e.clientX - previousMousePositionRef.current.x;
      const deltaY = e.clientY - previousMousePositionRef.current.y;

      earthMeshRef.current.rotation.y += deltaX * 0.005;
      earthMeshRef.current.rotation.x += deltaY * 0.005;

      if (cloudMeshRef.current) {
        cloudMeshRef.current.rotation.y += deltaX * 0.005;
        cloudMeshRef.current.rotation.x += deltaY * 0.005;
      }

      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const onPointerUp = () => {
      isDraggingRef.current = false;
    };

    const domElem = renderer.domElement;
    domElem.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    // 9. Animation Loop
    let animationFrameId: number;
    let lastFrameTime = performance.now();

    const animate = (now: number) => {
      animationFrameId = requestAnimationFrame(animate);

      const deltaSec = (now - lastFrameTime) / 1000;
      lastFrameTime = now;

      let activeHours = dayNightTimeRef.current;

      if (dayNightModeRef.current === 'realtime') {
        const d = new Date();
        activeHours = d.getHours() + d.getMinutes() / 60 + d.getSeconds() / 3600;
        dayNightTimeRef.current = activeHours;
        setDayNightTime(activeHours);
      } else if (dayNightModeRef.current === 'cycle') {
        // Continuous cycle transition loop (24 hours in ~30 seconds)
        activeHours = (activeHours + deltaSec * 0.8) % 24;
        dayNightTimeRef.current = activeHours;
        setDayNightTime(activeHours);
      }

      // 3D Sun Orbit calculation
      // 06:00 -> angle 0 rad (Sunrise)
      // 12:00 -> angle PI/2 rad (Noon - overhead)
      // 18:00 -> angle PI rad (Sunset)
      // 00:00 -> angle 3PI/2 rad (Midnight - behind globe)
      const sunAngle = ((activeHours - 6) / 24) * Math.PI * 2;
      const radius = 8.5;

      const sunX = radius * Math.cos(sunAngle);
      const sunY = radius * Math.sin(sunAngle) * 0.35 + 1.2;
      const sunZ = radius * Math.sin(sunAngle);

      if (sunLightRef.current) {
        sunLightRef.current.position.set(sunX, sunY, sunZ);
      }

      const elevation = Math.sin(sunAngle);

      const cSun = new THREE.Color();
      const cAmb = new THREE.Color();
      const cAtmo = new THREE.Color();

      let sunIntensity = 2.2;
      let ambIntensity = 0.45;
      let atmoOpacity = 0.32;
      let emissiveIntensity = 0.9;

      if (elevation > 0.2) {
        // High Daytime
        cSun.setHex(0xffffff);
        sunIntensity = 2.2;

        cAmb.setHex(0xe2e8f0);
        ambIntensity = 0.45;

        cAtmo.setHex(0x38bdf8);
        atmoOpacity = 0.32;

        emissiveIntensity = 0.3;
      } else if (elevation >= -0.3 && elevation <= 0.2) {
        // Sunset / Dawn Twilight Transition
        const t = (elevation + 0.3) / 0.5;

        cSun.lerpColors(new THREE.Color(0xf97316), new THREE.Color(0xffffff), t);
        sunIntensity = 1.2 + t * 1.0;

        cAmb.lerpColors(new THREE.Color(0x2a1820), new THREE.Color(0xe2e8f0), t);
        ambIntensity = 0.2 + t * 0.25;

        cAtmo.lerpColors(new THREE.Color(0xf43f5e), new THREE.Color(0x38bdf8), t);
        atmoOpacity = 0.42;

        emissiveIntensity = 1.6 - t * 1.3;
      } else {
        // Nighttime
        cSun.setHex(0x38bdf8);
        sunIntensity = 0.5;

        cAmb.setHex(0x070d19);
        ambIntensity = 0.15;

        cAtmo.setHex(0x0284c7);
        atmoOpacity = 0.18;

        emissiveIntensity = 1.8;
      }

      if (sunLightRef.current) {
        sunLightRef.current.intensity = sunIntensity;
        sunLightRef.current.color.copy(cSun);
      }
      if (ambientLightRef.current) {
        ambientLightRef.current.intensity = ambIntensity;
        ambientLightRef.current.color.copy(cAmb);
      }
      if (atmosphereMaterialRef.current) {
        atmosphereMaterialRef.current.color.copy(cAtmo);
        atmosphereMaterialRef.current.opacity = atmoOpacity;
      }
      if (earthMaterialRef.current) {
        earthMaterialRef.current.emissiveIntensity = emissiveIntensity;
      }

      if (isRotating && !isDraggingRef.current) {
        if (earthMeshRef.current) earthMeshRef.current.rotation.y += 0.0025;
        if (cloudMeshRef.current) cloudMeshRef.current.rotation.y += 0.0032;
      }

      // Animate Particles if triggered
      if (particleSystemRef.current && particleSystemRef.current.visible) {
        particleSystemRef.current.rotation.y += 0.05;
        particleSystemRef.current.rotation.x += 0.02;
      }

      renderer.render(scene, camera);
    };

    animate(performance.now());

    // 10. Resize Observer
    let resizeRafId: number | null = null;
    const resizeObserver = new ResizeObserver(() => {
      if (resizeRafId) cancelAnimationFrame(resizeRafId);
      resizeRafId = requestAnimationFrame(() => {
        if (!container || !rendererRef.current) return;
        const newW = container.clientWidth;
        const newH = container.clientHeight;
        if (newW > 0 && newH > 0) {
          camera.aspect = newW / newH;
          camera.updateProjectionMatrix();
          rendererRef.current.setSize(newW, newH, false);
        }
      });
    });

    resizeObserver.observe(container);

    return () => {
      if (resizeRafId) cancelAnimationFrame(resizeRafId);
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();

      domElem.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }

      earthGeometry.dispose();
      earthMaterial.dispose();
      cloudGeometry.dispose();
      cloudMaterial.dispose();
      atmosphereGeometry.dispose();
      atmosphereMaterial.dispose();
    };
  }, []);

  // Update Particle Visibility
  useEffect(() => {
    if (particleSystemRef.current) {
      particleSystemRef.current.visible = isParticleActive;
    }
  }, [isParticleActive]);

  // Update Cloud Visibility
  useEffect(() => {
    if (cloudMeshRef.current) {
      cloudMeshRef.current.visible = showClouds;
    }
  }, [showClouds]);

  return (
    <div
      className="relative w-full h-full min-h-[520px] lg:min-h-[640px] flex items-center justify-center overflow-hidden rounded-[32px] border border-lime-500/20 shadow-2xl"
      style={{ background: 'radial-gradient(circle at center, rgba(20, 60, 35, 0.35), #000 75%)' }}
    >
      
      {/* ThreeJS WebGL Canvas Container */}
      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing select-none"
        title="Drag to rotate Earth in 3D"
      />

      {/* Top Controls Toolbar: Globe View Mode Switcher */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-1 p-1 rounded-2xl bg-black/70 border border-white/10 shadow-xl backdrop-blur-xl">
        <button
          onClick={() => setViewMode('satellite')}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-[11px] font-bold transition-all cursor-pointer ${
            viewMode === 'satellite' ? 'bg-lime-400 text-black shadow-md' : 'text-slate-400 hover:text-white'
          }`}
          title="Satellite Blue Marble View"
        >
          <Globe className="w-3 h-3" />
          <span className="hidden sm:inline">Satellite</span>
        </button>

        <button
          onClick={() => setViewMode('night')}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-[11px] font-bold transition-all cursor-pointer ${
            viewMode === 'night' ? 'bg-amber-400 text-black shadow-md' : 'text-slate-400 hover:text-white'
          }`}
          title="Night City Lights View"
        >
          <Moon className="w-3 h-3" />
          <span className="hidden sm:inline">Night</span>
        </button>

        <button
          onClick={() => setViewMode('health')}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-[11px] font-bold transition-all cursor-pointer ${
            viewMode === 'health' ? 'bg-emerald-400 text-black shadow-md' : 'text-slate-400 hover:text-white'
          }`}
          title="Bio-Sync Health Heatmap"
        >
          <Flame className="w-3 h-3" />
          <span className="hidden sm:inline">Health</span>
        </button>

        <button
          onClick={() => setViewMode('aqi')}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-[11px] font-bold transition-all cursor-pointer ${
            viewMode === 'aqi' ? 'bg-cyan-400 text-black shadow-md' : 'text-slate-400 hover:text-white'
          }`}
          title="Global Air Quality Overlay"
        >
          <Wind className="w-3 h-3" />
          <span className="hidden sm:inline">AQI</span>
        </button>
      </div>

      {/* Toggle Rotation & Clouds toolbar bottom left */}
      <div className="absolute bottom-4 left-4 z-20 flex items-center gap-1.5">
        <button
          onClick={() => setIsRotating(!isRotating)}
          className={`px-2.5 py-1 rounded-xl border text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer ${
            isRotating ? 'bg-lime-950/80 border-lime-500/40 text-lime-400' : 'bg-black/70 border-white/10 text-slate-400'
          }`}
          title="Toggle Earth Auto Rotation"
        >
          <RefreshCw className={`w-3 h-3 ${isRotating ? 'animate-spin-slow' : ''}`} />
          <span className="hidden sm:inline">{isRotating ? 'Rotating' : 'Paused'}</span>
        </button>

        <button
          onClick={() => setShowClouds(!showClouds)}
          className={`px-2.5 py-1 rounded-xl border text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer ${
            showClouds ? 'bg-cyan-950/80 border-cyan-500/40 text-cyan-400' : 'bg-black/70 border-white/10 text-slate-400'
          }`}
          title="Toggle Cloud Layer"
        >
          <Layers className="w-3 h-3" />
          <span className="hidden sm:inline">Clouds</span>
        </button>
      </div>

      {/* Floating HUD Overlays matching exact design */}
      <EcoHUD
        healthPercentage={healthPercentage}
        onHealClick={handleTriggerHeal}
        userPoints={userPoints}
        dayNightMode={dayNightMode}
        dayNightTime={dayNightTime}
        onModeChange={(mode) => setDayNightMode(mode)}
        onTimeChange={(time) => setDayNightTime(time)}
      />

      {/* Interactive 3D Marker Tooltip Modal */}
      {selectedMarker && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 p-5 rounded-2xl glass-panel-dark border border-lime-500/40 shadow-2xl max-w-xs w-full animate-in fade-in zoom-in-95 duration-200">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[10px] font-mono-tech text-lime-400 uppercase font-bold tracking-wider">
              3D ECO PINPOINT
            </span>
            <button
              onClick={() => setSelectedMarker(null)}
              className="text-slate-400 hover:text-white text-xs font-bold"
            >
              ✕
            </button>
          </div>
          <h4 className="text-base font-extrabold text-white mb-1">{selectedMarker.name}</h4>
          <p className="text-xs text-slate-300 mb-3">{selectedMarker.description}</p>
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10 text-xs">
            <div>
              <span className="text-[10px] text-slate-400 block">CO₂ Offsets</span>
              <span className="font-bold text-lime-400">{selectedMarker.co2ImpactKg} kg</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">Active Eco Squad</span>
              <span className="font-bold text-white">{selectedMarker.activeUsers} members</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
