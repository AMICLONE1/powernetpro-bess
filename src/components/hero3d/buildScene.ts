/**
 * Three.js hero scene — a static, stylized-but-professional diorama that says
 * "we are a BESS company": a warm bungalow with a clearly-visible rooftop solar
 * array and a highlighted BESS wall unit beside it, mountains behind, and the
 * PowerNetPro half-sun glowing in the sky.
 *
 * Design rules honoured here:
 *  - STATIC camera (no orbit / auto-rotate). Only subtle "premium" life:
 *    a slow sun-glow pulse, the BESS status ring breathing, gentle cloud drift.
 *  - Warm brand palette only (cream / terracotta / forest / gold). No neon.
 *  - The BESS unit and solar are the visual focus (glow + placement).
 *
 * Everything is plain three.js primitives (no external model files) so it loads
 * instantly and can't 404. The module exports a factory that mounts into a host
 * element and returns handles for resize / dispose / a render loop.
 */
import * as THREE from "three";

const PALETTE = {
  sky: {
    top: new THREE.Color("#F3E7D3"),
    bottom: new THREE.Color("#F6F2EA"),
  },
  cream: new THREE.Color("#EFE6D6"),
  wallShade: new THREE.Color("#E3D5BF"),
  roof: new THREE.Color("#7A4A34"), // terracotta-brown tile
  roofDark: new THREE.Color("#5E3826"),
  forest: new THREE.Color("#1F3D34"),
  forestLit: new THREE.Color("#2F5E50"),
  gold: new THREE.Color("#F5A623"),
  terracotta: new THREE.Color("#E4622E"),
  panel: new THREE.Color("#16324A"), // solar cell blue-black (kept muted)
  panelFrame: new THREE.Color("#C9BCA6"),
  bess: new THREE.Color("#20242B"),
  bessTrim: new THREE.Color("#0F1216"),
  mountainNear: new THREE.Color("#B7A488"),
  mountainFar: new THREE.Color("#CDBFA6"),
  ground: new THREE.Color("#C7B79B"),
  glass: new THREE.Color("#FCE9C0"),
};

export type SceneHandles = {
  render: () => void;
  resize: (w: number, h: number) => void;
  dispose: () => void;
  /** advance subtle idle animation; t is seconds */
  tick: (t: number) => void;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
};

export function buildScene(host: HTMLElement): SceneHandles {
  const width = host.clientWidth || 1;
  const height = host.clientHeight || 1;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(width, height);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  host.appendChild(renderer.domElement);
  renderer.domElement.style.display = "block";
  renderer.domElement.style.width = "100%";
  renderer.domElement.style.height = "100%";

  const scene = new THREE.Scene();

  // ---- Camera: static 3/4 hero framing. Pulled BACK + raised so the scene
  // sits in the LOWER half of the frame, leaving clear sky up top for the copy.
  const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 100);
  camera.position.set(7.2, 4.2, 12.8); // eye-level-ish 3/4 view, good depth
  camera.lookAt(0.2, 1.0, 0);

  // ---- Lighting: warm key (low sun) + soft sky fill + a focused glow on BESS.
  const hemi = new THREE.HemisphereLight(0xffe9c8, 0x8a7d63, 0.9);
  scene.add(hemi);

  const sun = new THREE.DirectionalLight(0xffd9a0, 2.1);
  sun.position.set(-6, 7, 4);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  sun.shadow.camera.near = 1;
  sun.shadow.camera.far = 40;
  sun.shadow.camera.left = -12;
  sun.shadow.camera.right = 12;
  sun.shadow.camera.top = 12;
  sun.shadow.camera.bottom = -12;
  sun.shadow.bias = -0.0004;
  scene.add(sun);

  const rim = new THREE.DirectionalLight(0xfff0d6, 0.5);
  rim.position.set(5, 4, -6);
  scene.add(rim);

  // ---- Sky backdrop (vertical warm gradient plane, far behind everything).
  {
    const geo = new THREE.PlaneGeometry(80, 44);
    const mat = new THREE.ShaderMaterial({
      depthWrite: false,
      uniforms: {
        top: { value: PALETTE.sky.top },
        bottom: { value: PALETTE.sky.bottom },
      },
      vertexShader: `varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`,
      fragmentShader: `varying vec2 vUv; uniform vec3 top; uniform vec3 bottom; void main(){ gl_FragColor=vec4(mix(bottom, top, smoothstep(0.0,1.0,vUv.y)),1.0);}`,
    });
    const sky = new THREE.Mesh(geo, mat);
    sky.position.set(0, 6, -20);
    scene.add(sky);
  }

  // ---- Sun (the PowerNetPro half-sun): a glowing disc + starburst rays.
  const sunGroup = new THREE.Group();
  {
    // core disc
    const disc = new THREE.Mesh(
      new THREE.CircleGeometry(1.5, 48),
      new THREE.MeshBasicMaterial({ color: PALETTE.gold }),
    );
    sunGroup.add(disc);
    // soft inner glow
    const glow = new THREE.Mesh(
      new THREE.CircleGeometry(2.6, 48),
      new THREE.MeshBasicMaterial({ color: PALETTE.gold, transparent: true, opacity: 0.22, depthWrite: false }),
    );
    glow.position.z = -0.05;
    sunGroup.add(glow);
    // starburst rays (echoes the logo mark)
    const rayMat = new THREE.MeshBasicMaterial({ color: PALETTE.gold });
    const rayCount = 16;
    for (let i = 0; i < rayCount; i++) {
      const ray = new THREE.Mesh(new THREE.PlaneGeometry(0.16, 1.1), rayMat);
      const a = (i / rayCount) * Math.PI * 2;
      const r = 2.05;
      ray.position.set(Math.cos(a) * r, Math.sin(a) * r, -0.02);
      ray.rotation.z = a - Math.PI / 2;
      sunGroup.add(ray);
    }
    sunGroup.position.set(-6.5, 8.2, -16);
    scene.add(sunGroup);
  }

  // ---- Mountains: two layered ridgelines (near + far) as extruded silhouettes.
  function ridge(color: THREE.Color, z: number, scaleY: number, yBase: number) {
    const shape = new THREE.Shape();
    const pts = [
      [-24, 0], [-18, 4.2 * scaleY], [-12, 1.6 * scaleY], [-6, 5.4 * scaleY],
      [0, 2.2 * scaleY], [6, 6.0 * scaleY], [12, 2.4 * scaleY], [18, 4.6 * scaleY], [24, 1.2 * scaleY], [24, -8], [-24, -8],
    ];
    shape.moveTo(pts[0][0], pts[0][1]);
    for (let i = 1; i < pts.length; i++) shape.lineTo(pts[i][0], pts[i][1]);
    const geo = new THREE.ShapeGeometry(shape);
    const mat = new THREE.MeshBasicMaterial({ color });
    const m = new THREE.Mesh(geo, mat);
    m.position.set(0, yBase, z);
    scene.add(m);
    return m;
  }
  ridge(PALETTE.mountainFar, -14, 1.0, 0.5);
  ridge(PALETTE.mountainNear, -11, 0.8, -0.2);

  // ---- Ground plane (receives shadows).
  {
    const geo = new THREE.PlaneGeometry(60, 60);
    const mat = new THREE.MeshStandardMaterial({ color: PALETTE.ground, roughness: 1 });
    const ground = new THREE.Mesh(geo, mat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = 0;
    ground.receiveShadow = true;
    scene.add(ground);
  }

  // ======================= THE BUNGALOW =======================
  const house = new THREE.Group();
  house.position.set(-0.6, 0, 0);

  const wallMat = new THREE.MeshStandardMaterial({ color: PALETTE.cream, roughness: 0.9 });
  const wallShadeMat = new THREE.MeshStandardMaterial({ color: PALETTE.wallShade, roughness: 0.95 });
  const trimMat = new THREE.MeshStandardMaterial({ color: PALETTE.forest, roughness: 0.6 });
  const glassMat = new THREE.MeshStandardMaterial({ color: PALETTE.glass, emissive: PALETTE.gold, emissiveIntensity: 0.35, roughness: 0.25, metalness: 0.1 });

  // main single-storey block
  const bodyW = 5, bodyH = 2.2, bodyD = 3.4;
  const body = new THREE.Mesh(new THREE.BoxGeometry(bodyW, bodyH, bodyD), wallMat);
  body.position.set(0, bodyH / 2, 0);
  body.castShadow = true; body.receiveShadow = true;
  house.add(body);

  // side wing (lower, adds a real-bungalow silhouette)
  const wing = new THREE.Mesh(new THREE.BoxGeometry(2.2, 1.6, 2.6), wallShadeMat);
  wing.position.set(-3.0, 0.8, 0.4);
  wing.castShadow = true; wing.receiveShadow = true;
  house.add(wing);

  // base plinth
  const plinth = new THREE.Mesh(new THREE.BoxGeometry(bodyW + 0.4, 0.25, bodyD + 0.4), trimMat);
  plinth.position.set(0, 0.12, 0);
  plinth.receiveShadow = true;
  house.add(plinth);

  // ---- GABLE ROOF. Built from a triangular prism so the FRONT slope faces the
  // camera — that slope is where the solar array lives, in clear view.
  const roofMat = new THREE.MeshStandardMaterial({ color: PALETTE.roof, roughness: 0.85, flatShading: true });
  const roofPitch = THREE.MathUtils.degToRad(30);
  const roofRise = 1.0;
  const roofHalfD = bodyD / 2 + 0.25;
  const slopeLen = Math.sqrt(roofRise * roofRise + roofHalfD * roofHalfD);
  const eaveY = bodyH;              // roof starts at wall top
  const ridgeY = bodyH + roofRise;  // peak

  // Triangular prism gable (extruded triangle across the house width).
  {
    const tri = new THREE.Shape();
    tri.moveTo(-roofHalfD, 0);
    tri.lineTo(roofHalfD, 0);
    tri.lineTo(0, roofRise);
    tri.closePath();
    const geo = new THREE.ExtrudeGeometry(tri, { depth: bodyW + 0.5, bevelEnabled: false });
    geo.translate(0, 0, -(bodyW + 0.5) / 2);
    geo.rotateY(Math.PI / 2); // face width along X
    const gable = new THREE.Mesh(geo, roofMat);
    gable.position.set(0, eaveY, 0);
    gable.castShadow = true; gable.receiveShadow = true;
    house.add(gable);
  }

  // ---- ROOFTOP SOLAR ARRAY on the front slope (the point of the scene).
  const solar = new THREE.Group();
  const cellMat = new THREE.MeshStandardMaterial({ color: PALETTE.panel, roughness: 0.22, metalness: 0.55, emissive: new THREE.Color("#1b5c86"), emissiveIntensity: 0.4 });
  const frameMat = new THREE.MeshStandardMaterial({ color: PALETTE.panelFrame, roughness: 0.5, metalness: 0.5 });
  const cols = 5, rows = 2;
  const pw = 0.86, ph = 0.62, gap = 0.05;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const frame = new THREE.Mesh(new THREE.BoxGeometry(pw, 0.04, ph), frameMat);
      const cell = new THREE.Mesh(new THREE.BoxGeometry(pw - 0.08, 0.05, ph - 0.08), cellMat);
      // thin grid lines suggested via a slightly raised inset
      cell.position.y = 0.02;
      const panel = new THREE.Group();
      panel.add(frame); panel.add(cell);
      panel.position.set(
        (c - (cols - 1) / 2) * (pw + gap),
        0,
        (r - (rows - 1) / 2) * (ph + gap),
      );
      panel.castShadow = true;
      solar.add(panel);
    }
  }
  // Sit the array on the FRONT slope: pitch it to match the roof and push it
  // forward + up so it lies flush on the camera-facing face.
  const slopeMidZ = roofHalfD / 2;
  const slopeMidY = eaveY + roofRise / 2 + 0.04;
  solar.rotation.x = -roofPitch;
  solar.position.set(0, slopeMidY, slopeMidZ);
  void slopeLen; void ridgeY;
  house.add(solar);

  // ---- Windows (warm glow) + door.
  const winGeo = new THREE.BoxGeometry(0.9, 1.0, 0.08);
  const w1 = new THREE.Mesh(winGeo, glassMat); w1.position.set(-1.4, 1.15, bodyD / 2 + 0.01); house.add(w1);
  const w2 = new THREE.Mesh(winGeo, glassMat); w2.position.set(1.4, 1.15, bodyD / 2 + 0.01); house.add(w2);
  const door = new THREE.Mesh(new THREE.BoxGeometry(0.85, 1.5, 0.1), trimMat);
  door.position.set(0, 0.85, bodyD / 2 + 0.01); house.add(door);

  scene.add(house);

  // ======================= THE BESS UNIT (hero of the scene) =======================
  const bess = new THREE.Group();
  const bessBodyMat = new THREE.MeshStandardMaterial({ color: PALETTE.bess, roughness: 0.4, metalness: 0.5 });
  const bessTrimMat = new THREE.MeshStandardMaterial({ color: PALETTE.bessTrim, roughness: 0.5, metalness: 0.6 });

  const cab = new THREE.Mesh(new THREE.BoxGeometry(1.5, 2.4, 0.8), bessBodyMat);
  cab.position.y = 1.2; cab.castShadow = true; cab.receiveShadow = true;
  bess.add(cab);
  // trim edges
  const cap = new THREE.Mesh(new THREE.BoxGeometry(1.62, 0.14, 0.92), bessTrimMat);
  cap.position.y = 2.42; bess.add(cap);
  const foot = new THREE.Mesh(new THREE.BoxGeometry(1.62, 0.12, 0.92), bessTrimMat);
  foot.position.y = 0.06; bess.add(foot);

  // front display panel (screen)
  const screenMat = new THREE.MeshStandardMaterial({ color: new THREE.Color("#0a1a16"), emissive: PALETTE.forestLit, emissiveIntensity: 0.9, roughness: 0.2 });
  const screen = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.5, 0.04), screenMat);
  screen.position.set(0, 1.7, 0.41); bess.add(screen);

  // glowing status ring (this "breathes" — draws the eye to the BESS)
  const ringMat = new THREE.MeshStandardMaterial({ color: PALETTE.forestLit, emissive: PALETTE.forestLit, emissiveIntensity: 1.4, roughness: 0.3 });
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.26, 0.045, 16, 40), ringMat);
  ring.position.set(0, 0.95, 0.42); bess.add(ring);

  // charge bars
  const barMat = new THREE.MeshStandardMaterial({ color: PALETTE.gold, emissive: PALETTE.gold, emissiveIntensity: 0.7 });
  for (let i = 0; i < 3; i++) {
    const bar = new THREE.Mesh(new THREE.BoxGeometry(0.7 - i * 0.02, 0.06, 0.03), barMat);
    bar.position.set(0, 1.35 - i * 0.12, 0.41);
    bess.add(bar);
  }

  // a focused fill light so the BESS reads as the highlighted element
  const bessGlow = new THREE.PointLight(0x2f5e50, 6, 6, 2);
  bessGlow.position.set(2.9, 1.6, 1.2);
  bess.add(bessGlow);

  bess.position.set(3.1, 0, 1.0);
  bess.rotation.y = THREE.MathUtils.degToRad(-18);
  scene.add(bess);

  // ---- A couple of soft "bushes" to ground the scene (low, brand-green).
  function bush(x: number, z: number, s: number) {
    const m = new THREE.Mesh(
      new THREE.IcosahedronGeometry(s, 1),
      new THREE.MeshStandardMaterial({ color: PALETTE.forestLit, roughness: 1, flatShading: true }),
    );
    m.position.set(x, s * 0.7, z); m.castShadow = true; m.receiveShadow = true;
    scene.add(m);
  }
  bush(-3.4, 2.0, 0.45);
  bush(4.4, 1.8, 0.38);
  bush(-4.2, 1.2, 0.3);

  // ---- Drifting clouds (very slow — the only large-scale motion).
  const clouds: THREE.Mesh[] = [];
  {
    const cloudMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.5, depthWrite: false });
    for (let i = 0; i < 3; i++) {
      const c = new THREE.Mesh(new THREE.CircleGeometry(1.4 + i * 0.4, 24), cloudMat);
      c.position.set(-8 + i * 6, 7 + (i % 2), -13);
      c.scale.set(1.8, 0.7, 1);
      scene.add(c);
      clouds.push(c);
    }
  }

  // ---------- handles ----------
  const handles: SceneHandles = {
    scene,
    camera,
    render: () => renderer.render(scene, camera),
    resize: (w: number, h: number) => {
      renderer.setSize(w, h);
      camera.aspect = w / h;
      const portrait = w / h < 0.85;
      // reframe on portrait so the whole diorama (BESS + solar) stays in view.
      if (portrait) {
        camera.position.set(6.4, 4.8, 17.0);
        camera.fov = 40;
      } else {
        camera.position.set(7.2, 4.2, 12.8);
        camera.fov = 35;
      }
      camera.lookAt(0.2, 1.0, 0);
      // Shift the rendered frustum DOWN so the diorama sits in the lower ~55%
      // of the frame (clear top band for the copy) WITHOUT flattening the 3/4
      // perspective. Portrait needs a bigger push since copy is taller.
      const shiftFrac = portrait ? 0.30 : 0.22;
      camera.setViewOffset(w, h, 0, -h * shiftFrac, w, h);
      camera.updateProjectionMatrix();
    },
    tick: (t: number) => {
      // sun glow pulse
      const pulse = 0.85 + Math.sin(t * 0.8) * 0.15;
      sunGroup.scale.setScalar(pulse);
      sunGroup.rotation.z = t * 0.03;
      // BESS status ring breathing
      const rm = ring.material as THREE.MeshStandardMaterial;
      rm.emissiveIntensity = 1.0 + Math.sin(t * 1.6) * 0.6;
      // clouds drift
      clouds.forEach((c, i) => {
        c.position.x += 0.004 + i * 0.001;
        if (c.position.x > 12) c.position.x = -12;
      });
    },
    dispose: () => {
      renderer.dispose();
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        if (m.geometry) m.geometry.dispose();
        const mat = m.material as THREE.Material | THREE.Material[] | undefined;
        if (Array.isArray(mat)) mat.forEach((x) => x.dispose());
        else mat?.dispose();
      });
      if (renderer.domElement.parentElement === host) host.removeChild(renderer.domElement);
    },
  };

  handles.resize(width, height);
  return handles;
}
