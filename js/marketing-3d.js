/**
 * KIVO DIGITAL MARKETING - REAL-TIME 3D HOLOGRAPHIC BACKGROUND
 * Built with Three.js
 * White / Light Interface Edition with Exact Kivo Logo Dark Navy Blue (#130a43) & Amber Gold
 * Features:
 * 1. 3D Concentric Marketing Target Bullseye with Arrow (Echoing Kivo's Logo)
 * 2. Floating 3D Video Reels & Ad Creative Wireframes in Logo Navy & Gold
 * 3. 1,800+ Logo Dark Navy & Amber Gold Particles on an Undulating Cyber-Grid Wave
 * 4. Pulsing 3D Growth ROI Bar Pillars
 * 5. Smooth Mouse / Touch Parallax Camera Dynamics
 */

(function () {
  let scene, camera, renderer;
  let particles, targetGroup, reelsGroup, barsGroup, jetGroup;
  let mouseX = 0, mouseY = 0;
  let targetX = 0, targetY = 0;
  const windowHalfX = window.innerWidth / 2;
  const windowHalfY = window.innerHeight / 2;
  let animationFrameId;

  function init() {
    const container = document.getElementById('three-bg-container');
    const canvas = document.getElementById('marketing-3d-canvas');
    if (!container || !canvas || typeof THREE === 'undefined') return;

    // 1. Scene & Camera Setup
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 2000);
    camera.position.z = 700;

    // 2. WebGL Renderer with Alpha for White Background
    renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    const width = Math.min(window.innerWidth, document.documentElement.clientWidth || window.innerWidth);
    renderer.setSize(width, window.innerHeight);

    // 3. Ambient & Point Lighting (Tuned for Logo Dark Navy Palette)
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.2);
    scene.add(ambientLight);

    const navyLight = new THREE.PointLight(0x241679, 3, 1000);
    navyLight.position.set(-250, 200, 300);
    scene.add(navyLight);

    const goldLight = new THREE.PointLight(0xd97706, 2.2, 1000);
    goldLight.position.set(300, -150, 250);
    scene.add(goldLight);

    // 4. Create 3D Marketing Target (Kivo Signature Bullseye in Logo Dark Navy & Gold)
    create3DTargetBullseye();

    // 5. Create Floating 3D Video Reels & Ad Creative Cubes
    create3DReelsElements();

    // 6. Create 3D Undulating Particle Wave Surface
    createParticleWave();

    // 7. Create 3D Growth ROI Bar Pillars
    createGrowthPillars();

    // 8. Create 3D Flying Jet / Paper Plane (Campaign Momentum)
    create3DJet();

    // 9. Event Listeners
    window.addEventListener('resize', onWindowResize, { passive: true });
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    // 10. Start Animation Loop
    animate();
  }

  // 3D Concentric Marketing Target Bullseye with 3D Arrow
  function create3DTargetBullseye() {
    targetGroup = new THREE.Group();

    // Outer Navy Torus Ring (#130a43)
    const outerRingGeo = new THREE.TorusGeometry(85, 2.2, 16, 64);
    const outerRingMat = new THREE.MeshBasicMaterial({
      color: 0x130a43,
      transparent: true,
      opacity: 0.5,
      wireframe: true
    });
    const outerRing = new THREE.Mesh(outerRingGeo, outerRingMat);
    targetGroup.add(outerRing);

    // Middle Gold Torus Ring
    const midRingGeo = new THREE.TorusGeometry(55, 3.5, 16, 64);
    const midRingMat = new THREE.MeshStandardMaterial({
      color: 0xd97706,
      metalness: 0.5,
      roughness: 0.3,
      emissive: 0x331c02,
      wireframe: false
    });
    const midRing = new THREE.Mesh(midRingGeo, midRingMat);
    targetGroup.add(midRing);

    // Center Bullseye Disc (#130a43)
    const centerGeo = new THREE.SphereGeometry(22, 24, 24);
    const centerMat = new THREE.MeshStandardMaterial({
      color: 0x130a43,
      emissive: 0x0a0524,
      metalness: 0.6,
      roughness: 0.2
    });
    const centerSphere = new THREE.Mesh(centerGeo, centerMat);
    targetGroup.add(centerSphere);

    // 3D Target Arrow passing through center
    const arrowShaftGeo = new THREE.CylinderGeometry(2, 2, 160, 16);
    const arrowShaftMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      metalness: 0.4,
      roughness: 0.5
    });
    const arrowShaft = new THREE.Mesh(arrowShaftGeo, arrowShaftMat);
    arrowShaft.rotation.z = Math.PI / 4;
    arrowShaft.position.set(20, 20, 10);
    targetGroup.add(arrowShaft);

    // Arrow Cone Head
    const coneGeo = new THREE.ConeGeometry(8, 20, 16);
    const coneMat = new THREE.MeshStandardMaterial({
      color: 0xd97706,
      metalness: 0.6
    });
    const arrowHead = new THREE.Mesh(coneGeo, coneMat);
    arrowHead.rotation.z = -Math.PI / 4;
    arrowHead.position.set(-36, -36, 10);
    targetGroup.add(arrowHead);

    targetGroup.position.set(360, 60, -200);
    scene.add(targetGroup);
  }

  // Floating 3D Video Reels & Ad Creative Cubes
  function create3DReelsElements() {
    reelsGroup = new THREE.Group();

    // Floating 9:16 Reel Frames (Aspect Ratio of Instagram Reels & TikTok)
    const reelFrameGeo = new THREE.BoxGeometry(45, 80, 8);
    
    for (let i = 0; i < 6; i++) {
      const isGold = i % 2 === 0;
      const reelFrameMat = new THREE.MeshStandardMaterial({
        color: isGold ? 0xd97706 : 0x130a43,
        transparent: true,
        opacity: 0.35,
        wireframe: true
      });
      const reelMesh = new THREE.Mesh(reelFrameGeo, reelFrameMat);
      
      // Distribute in 3D orbit
      const angle = (i / 6) * Math.PI * 2;
      const radius = 340 + (i % 3) * 60;
      reelMesh.position.x = Math.cos(angle) * radius;
      reelMesh.position.y = Math.sin(angle) * 160 - 60;
      reelMesh.position.z = Math.sin(angle) * radius * 0.4 - 100;
      
      reelMesh.rotation.x = Math.random() * Math.PI;
      reelMesh.rotation.y = Math.random() * Math.PI;
      reelMesh.userData = {
        speedX: (Math.random() - 0.5) * 0.015,
        speedY: (Math.random() - 0.5) * 0.015,
        floatOffset: Math.random() * Math.PI * 2
      };

      reelsGroup.add(reelMesh);
    }

    scene.add(reelsGroup);
  }

  // Undulating 3D Particle Cyber Wave (Exact Logo Navy #130a43 & Amber Gold)
  function createParticleWave() {
    const particleCount = 1800;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const navyColor = new THREE.Color(0x130a43);
    const goldColor = new THREE.Color(0xd97706);

    let idx = 0;
    const cols = 60;
    const rows = 30;
    const spacingX = 35;
    const spacingZ = 35;

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const x = (i - cols / 2) * spacingX;
        const z = (j - rows / 2) * spacingZ - 200;
        const y = Math.sin(i * 0.3) * 35 + Math.cos(j * 0.3) * 35 - 180;

        positions[idx * 3] = x;
        positions[idx * 3 + 1] = y;
        positions[idx * 3 + 2] = z;

        // Gradient mix between logo dark navy and amber gold
        const ratio = (i + j) / (cols + rows);
        const mixedColor = navyColor.clone().lerp(goldColor, ratio);

        colors[idx * 3] = mixedColor.r;
        colors[idx * 3 + 1] = mixedColor.g;
        colors[idx * 3 + 2] = mixedColor.b;

        idx++;
        if (idx >= particleCount) break;
      }
      if (idx >= particleCount) break;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 3.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.42,
      blending: THREE.NormalBlending
    });

    particles = new THREE.Points(geometry, material);
    scene.add(particles);
  }

  // 3D Growth ROI Bar Pillars (Visualizing ROI & Ad performance metrics)
  function createGrowthPillars() {
    barsGroup = new THREE.Group();
    const heights = [60, 95, 140, 185, 230];
    const width = 14;

    for (let i = 0; i < heights.length; i++) {
      const h = heights[i];
      const barGeo = new THREE.BoxGeometry(width, h, width);
      const isGold = i === heights.length - 1;
      const barMat = new THREE.MeshStandardMaterial({
        color: isGold ? 0xd97706 : 0x130a43,
        emissive: isGold ? 0x2a1600 : 0x0a0524,
        transparent: true,
        opacity: 0.45,
        metalness: 0.6,
        wireframe: true
      });
      const bar = new THREE.Mesh(barGeo, barMat);
      bar.position.set(-360 + i * 26, -160 + h / 2, -120 + i * 15);
      bar.userData = { baseHeight: h, phase: i * 0.8 };
      barsGroup.add(bar);
    }

    scene.add(barsGroup);
  }

  // 3D Origami Flying Jet (Signifying Campaign Velocity & Reach)
  function create3DJet() {
    jetGroup = new THREE.Group();

    // Origami Paper Plane Triangular Wings
    const planeGeo = new THREE.BufferGeometry();
    const vertices = new Float32Array([
      // Left Wing
      0, 0, 35,   -28, 5, -22,   0, 3, -15,
      // Right Wing
      0, 0, 35,    0, 3, -15,    28, 5, -22,
      // Left Keel Fold
      0, 0, 35,    0, -9, -15,  -28, 5, -22,
      // Right Keel Fold
      0, 0, 35,    28, 5, -22,    0, -9, -15
    ]);
    planeGeo.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    planeGeo.computeVertexNormals();

    const planeMat = new THREE.MeshStandardMaterial({
      color: 0x130a43,
      emissive: 0x1d1066,
      metalness: 0.5,
      roughness: 0.35,
      side: THREE.DoubleSide
    });
    const jetMesh = new THREE.Mesh(planeGeo, planeMat);
    jetGroup.add(jetMesh);

    // Gold Center Crease
    const spineGeo = new THREE.CylinderGeometry(0.8, 0.8, 50, 8);
    const spineMat = new THREE.MeshBasicMaterial({ color: 0xd97706 });
    const spine = new THREE.Mesh(spineGeo, spineMat);
    spine.rotation.x = Math.PI / 2;
    jetGroup.add(spine);

    jetGroup.position.set(-220, 140, -180);
    scene.add(jetGroup);
  }

  function onWindowResize() {
    if (!camera || !renderer) return;
    const width = Math.min(window.innerWidth, document.documentElement.clientWidth || window.innerWidth);
    camera.aspect = width / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(width, window.innerHeight);
  }

  function onMouseMove(event) {
    mouseX = (event.clientX - windowHalfX) * 0.45;
    mouseY = (event.clientY - windowHalfY) * 0.45;
  }

  function onTouchMove(event) {
    if (event.touches.length > 0) {
      mouseX = (event.touches[0].clientX - windowHalfX) * 0.35;
      mouseY = (event.touches[0].clientY - windowHalfY) * 0.35;
    }
  }

  // Animation Loop (60 FPS)
  function animate() {
    animationFrameId = requestAnimationFrame(animate);

    const time = performance.now() * 0.001;

    // Smooth Camera Parallax Lerp
    targetX += (mouseX - targetX) * 0.05;
    targetY += (mouseY - targetY) * 0.05;
    camera.position.x = targetX * 0.35;
    camera.position.y = -targetY * 0.35 + 20;
    camera.lookAt(0, 0, 0);

    // Rotate 3D Bullseye Target
    if (targetGroup) {
      targetGroup.rotation.y = time * 0.45;
      targetGroup.rotation.x = Math.sin(time * 0.3) * 0.15;
      targetGroup.position.y = 80 + Math.sin(time * 1.2) * 15;
    }

    // Animate Floating 3D Video Reels & Cubes
    if (reelsGroup) {
      reelsGroup.rotation.y = time * 0.1;
      reelsGroup.children.forEach((reel) => {
        reel.rotation.x += reel.userData.speedX;
        reel.rotation.y += reel.userData.speedY;
        reel.position.y += Math.sin(time * 1.5 + reel.userData.floatOffset) * 0.3;
      });
    }

    // Animate Particle Cyber Wave
    if (particles && particles.geometry) {
      const positions = particles.geometry.attributes.position.array;
      const count = positions.length / 3;
      for (let i = 0; i < count; i++) {
        const x = positions[i * 3];
        const z = positions[i * 3 + 2];
        positions[i * 3 + 1] = Math.sin(x * 0.015 + time * 1.5) * 22 + Math.cos(z * 0.015 + time * 1.2) * 22 - 180;
      }
      particles.geometry.attributes.position.needsUpdate = true;
      particles.rotation.y = time * 0.03;
    }

    // Animate Growth ROI Bar Pillars (Subtle Pulsing)
    if (barsGroup) {
      barsGroup.children.forEach((bar) => {
        const scaleFactor = 1 + Math.sin(time * 2 + bar.userData.phase) * 0.12;
        bar.scale.y = scaleFactor;
      });
    }

    // Animate 3D Origami Flying Jet
    if (jetGroup) {
      const jetTime = time * 0.45;
      jetGroup.position.x = Math.cos(jetTime) * 380;
      jetGroup.position.y = Math.sin(jetTime * 1.5) * 80 + 130;
      jetGroup.position.z = Math.sin(jetTime) * 220 - 180;
      jetGroup.rotation.y = -jetTime + Math.PI / 2;
      jetGroup.rotation.z = Math.sin(jetTime * 1.5) * 0.35;
      jetGroup.rotation.x = Math.cos(jetTime * 1.5) * 0.15;
    }

    renderer.render(scene, camera);
  }

  // Initialize once DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
