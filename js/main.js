// Mo Tami — portfolio
// One particle field that morphs between five "latent" shapes as you scroll:
// 0 hero: a sphere of embeddings · 1 work: one cluster per project
// 2 path: a helix (a timeline) · 3 research: stacked network layers · 4 contact: a calm wave
import * as THREE from "three";

document.documentElement.classList.add("js");
requestAnimationFrame(() => document.documentElement.classList.add("ready"));

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const coarse = window.matchMedia("(pointer: coarse)").matches;
const canvas = document.getElementById("field");

// ---------- nav highlight (works with or without WebGL) ----------
const navLinks = [...document.querySelectorAll(".topbar nav a")];
const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      navLinks.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === "#" + e.target.id));
    });
  },
  { rootMargin: "-45% 0px -50% 0px" }
);
document.querySelectorAll("section[id]").forEach((s) => navObserver.observe(s));

// ---------- WebGL field ----------
let renderer;
try {
  renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false, powerPreference: "high-performance" });
} catch (err) {
  canvas.style.display = "none";
  console.warn("WebGL unavailable, showing the page without the particle field.", err);
}

if (renderer) startField();

function startField() {
  const CLUSTER_COLORS = ["#f4a261", "#7ed6c8", "#e98fa8", "#f2d27a", "#a99cf0"].map((c) => new THREE.Color(c));
  const BASE = [new THREE.Color("#f4a261"), new THREE.Color("#7ed6c8"), new THREE.Color("#eee8f7")];

  const scene = new THREE.Scene();
  scene.background = new THREE.Color("#14122b");
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
  camera.position.set(0, 0, 8);

  const group = new THREE.Group();
  scene.add(group);

  const COUNT = coarse || window.innerWidth < 760 ? 5200 : 10000;

  // seeded RNG so the field looks the same on every visit
  let seed = 7;
  const rand = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
  const gauss = () => {
    let u = 0, v = 0;
    while (u === 0) u = rand();
    while (v === 0) v = rand();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  };

  // per-particle constants
  const rnd = new Float32Array(COUNT * 4);
  for (let i = 0; i < COUNT * 4; i++) rnd[i] = rand();
  const cluster = new Float32Array(COUNT);
  for (let i = 0; i < COUNT; i++) cluster[i] = i % 5;

  const geometry = new THREE.BufferGeometry();
  const shapes = [0, 1, 2, 3, 4].map(() => new Float32Array(COUNT * 3));
  const colors = new Float32Array(COUNT * 3);
  const ccolors = new Float32Array(COUNT * 3);

  for (let i = 0; i < COUNT; i++) {
    const r = rnd[i * 4];
    const base = r < 0.46 ? BASE[0] : r < 0.86 ? BASE[1] : BASE[2];
    base.toArray(colors, i * 3);
    CLUSTER_COLORS[cluster[i]].toArray(ccolors, i * 3);
  }

  function buildShapes() {
    const w = window.innerWidth;
    const wide = w / window.innerHeight > 1.05 && w > 760;
    const ox = wide ? 2.5 : 0; // shapes sit to the right of the text column on wide screens
    const hy = wide ? 0.1 : 2.05; // on phones the hero sphere floats above the title
    const sc = wide ? 1 : 0.72;
    seed = 11;

    for (let i = 0; i < COUNT; i++) {
      const k = i * 3;
      const a = rnd[i * 4], b = rnd[i * 4 + 1], c = rnd[i * 4 + 2], d = rnd[i * 4 + 3];

      // 0 — sphere of embeddings: fibonacci shell + soft interior
      {
        const t = i / COUNT;
        const phi = Math.acos(1 - 2 * t);
        const th = Math.PI * (1 + Math.sqrt(5)) * i;
        const shell = d < 0.78;
        const rad = (shell ? 2.15 + 0.12 * gauss() : 2.0 * Math.cbrt(a)) * sc;
        shapes[0][k] = ox + rad * Math.sin(phi) * Math.cos(th);
        shapes[0][k + 1] = hy + rad * Math.cos(phi);
        shapes[0][k + 2] = rad * Math.sin(phi) * Math.sin(th);
      }

      // 1 — one cluster per project
      {
        const ci = cluster[i];
        const centres = wide
          ? [[1.4, 1.5, 0.3], [3.3, 1.0, -0.6], [1.7, -0.6, 0.6], [3.7, -1.3, 0.0], [2.4, 0.3, -1.6]]
          : [[-1.1, 1.9, 0], [1.1, 1.4, -0.4], [-0.9, -0.2, 0.4], [1.2, -0.9, 0], [0.1, 0.6, -1.4]];
        const spread = (ci === 1 || ci === 3 ? 0.55 : 0.42) * sc;
        const tail = d < 0.08 ? 2.4 : 1; // a few outliers drifting between clusters
        shapes[1][k] = centres[ci][0] + gauss() * spread * tail;
        shapes[1][k + 1] = centres[ci][1] + gauss() * spread * tail;
        shapes[1][k + 2] = centres[ci][2] + gauss() * spread * tail;
      }

      // 2 — double helix: a timeline you can turn
      {
        const t = a * 2 - 1;
        const strand = i % 2 ? Math.PI : 0;
        const ang = t * Math.PI * 3.2 + strand;
        const rung = d < 0.18; // rungs between the strands
        const rad = (rung ? (b * 2 - 1) * 0.85 : 0.85 + 0.06 * gauss()) * sc;
        const len = wide ? 3.4 : 2.9;
        let x = rad * Math.cos(ang), y = t * len, z = rad * Math.sin(ang);
        // tilt the helix diagonally
        const tilt = wide ? -0.5 : -0.25;
        const xr = x * Math.cos(tilt) - y * Math.sin(tilt);
        const yr = x * Math.sin(tilt) + y * Math.cos(tilt);
        shapes[2][k] = ox + (wide ? 0.45 : 0) + xr;
        shapes[2][k + 1] = yr;
        shapes[2][k + 2] = z;
      }

      // 3 — stacked layers: a small network seen at an angle
      {
        const layers = 5;
        const L = Math.floor(b * layers);
        const lw = [1.6, 2.2, 2.5, 2.2, 1.2][L] * sc;
        const gx = Math.round((a * 2 - 1) * 7) / 7;
        const gy = Math.round((c * 2 - 1) * 7) / 7;
        const jitter = 0.03;
        const zLayer = (L - (layers - 1) / 2) * 0.9 * sc;
        let x = gx * lw + gauss() * jitter, y = gy * lw + gauss() * jitter, z = zLayer;
        // rotate so layers read as a stack
        const ry = 0.62, rx = 0.32;
        const x1 = x * Math.cos(ry) + z * Math.sin(ry);
        const z1 = -x * Math.sin(ry) + z * Math.cos(ry);
        const y1 = y * Math.cos(rx) - z1 * Math.sin(rx);
        const z2 = y * Math.sin(rx) + z1 * Math.cos(rx);
        shapes[3][k] = ox + (wide ? 0.55 : 0) + x1;
        shapes[3][k + 1] = y1;
        shapes[3][k + 2] = z2;
      }

      // 4 — calm wave field below the contact text
      {
        const x = (a * 2 - 1) * 7.5;
        const z = (b * 2 - 1) * 4 - 1;
        shapes[4][k] = x;
        shapes[4][k + 1] = -2.1 + 0.35 * Math.sin(x * 0.9) * Math.cos(z * 0.8) + gauss() * 0.03;
        shapes[4][k + 2] = z;
      }
    }
    for (let s = 0; s < 5; s++) {
      const attr = geometry.getAttribute("p" + s);
      if (attr) { attr.array.set(shapes[s]); attr.needsUpdate = true; }
    }
  }

  buildShapes();
  for (let s = 0; s < 5; s++) geometry.setAttribute("p" + s, new THREE.BufferAttribute(shapes[s], 3));
  geometry.setAttribute("position", new THREE.BufferAttribute(shapes[0], 3)); // bounding only
  geometry.setAttribute("aRnd", new THREE.BufferAttribute(rnd, 4));
  geometry.setAttribute("aCluster", new THREE.BufferAttribute(cluster, 1));
  geometry.setAttribute("aColor", new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute("aCColor", new THREE.BufferAttribute(ccolors, 3));
  geometry.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 20);

  const uniforms = {
    uTime: { value: 0 },
    uState: { value: 0 },
    uHot: { value: -1 },
    uHotAmt: { value: 0 },
    uPixel: { value: Math.min(window.devicePixelRatio, 2) },
    uSize: { value: coarse ? 30 : 34 },
    uIntro: { value: reduceMotion ? 1 : 0 },
  };

  const material = new THREE.ShaderMaterial({
    uniforms,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexShader: /* glsl */ `
      attribute vec3 p0; attribute vec3 p1; attribute vec3 p2; attribute vec3 p3; attribute vec3 p4;
      attribute vec4 aRnd; attribute float aCluster; attribute vec3 aColor; attribute vec3 aCColor;
      uniform float uTime, uState, uHot, uHotAmt, uPixel, uSize, uIntro;
      varying vec3 vColor; varying float vAlpha;

      vec3 shapeAt(float s) {
        if (s < 0.5) return p0;
        if (s < 1.5) return p1;
        if (s < 2.5) return p2;
        if (s < 3.5) return p3;
        return p4;
      }

      void main() {
        // each particle starts its trip a little late, so morphs ripple instead of snapping
        float base = floor(uState);
        float f = uState - base;
        float delay = aRnd.y * 0.35;
        float t = clamp((f - delay) / (1.0 - 0.35), 0.0, 1.0);
        t = t * t * (3.0 - 2.0 * t);
        vec3 a = shapeAt(base);
        vec3 b = shapeAt(min(base + 1.0, 4.0));
        vec3 pos = mix(a, b, t);

        // arc through space while travelling
        pos.z += sin(t * 3.14159) * (aRnd.z - 0.5) * 2.2;

        // breathing
        float ph = aRnd.x * 6.2831;
        pos += 0.045 * vec3(sin(uTime * 0.7 + ph), cos(uTime * 0.6 + ph * 1.3), sin(uTime * 0.5 + ph * 0.7));

        // intro: gather from a wide scatter
        vec3 scatter = (aRnd.xyz - 0.5) * vec3(22.0, 14.0, 10.0);
        float it = clamp((uIntro - aRnd.w * 0.5) / 0.5, 0.0, 1.0);
        it = 1.0 - pow(1.0 - it, 3.0);
        pos = mix(scatter, pos, it);

        // project colours only while the clusters are on screen
        float clusterMix = clamp(1.0 - abs(uState - 1.0), 0.0, 1.0);
        vec3 col = mix(aColor, aCColor, clusterMix);

        float hotMask = step(abs(aCluster - uHot), 0.1);
        float h = uHotAmt * clusterMix;
        float isHot = hotMask * h;
        float dim = 1.0 - 0.7 * h * (1.0 - hotMask);

        vec4 mv = modelViewMatrix * vec4(pos, 1.0);
        gl_Position = projectionMatrix * mv;
        float size = uSize * (0.35 + aRnd.w * 0.9) * (1.0 + isHot * 0.9);
        gl_PointSize = size * uPixel / -mv.z;
        vColor = col;
        vAlpha = (0.7 + 0.3 * aRnd.x) * dim * (0.35 + 0.65 * it);
      }
    `,
    fragmentShader: /* glsl */ `
      varying vec3 vColor; varying float vAlpha;
      void main() {
        vec2 c = gl_PointCoord - 0.5;
        float d = length(c);
        if (d > 0.5) discard;
        float core = smoothstep(0.5, 0.0, d);
        gl_FragColor = vec4(vColor * core * 0.9, core * vAlpha);
      }
    `,
  });

  const clock = new THREE.Timer();
  let time = 0, rafId = null, visible = true;

  const points = new THREE.Points(geometry, material);
  group.add(points);

  // ---------- sizing ----------
  function resize() {
    const w = window.innerWidth, h = window.innerHeight;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    uniforms.uPixel.value = Math.min(window.devicePixelRatio, 2) * (h / 900);
  }
  let lastWide = null;
  function onResize() {
    resize();
    const wide = window.innerWidth / window.innerHeight > 1.05 && window.innerWidth > 760;
    if (wide !== lastWide) { buildShapes(); lastWide = wide; }
    requestRender();
  }
  window.addEventListener("resize", onResize);
  onResize();

  // ---------- scroll → state ----------
  const sections = [...document.querySelectorAll("[data-state]")];
  let targetState = 0;
  function computeState() {
    const mid = window.innerHeight * 0.5;
    const tops = sections.map((s) => s.getBoundingClientRect().top);
    let st = 0;
    for (let i = 0; i < sections.length; i++) {
      const top = tops[i];
      const next = i + 1 < sections.length ? tops[i + 1] : Infinity;
      if (mid >= top && mid < next) {
        const f = next === Infinity ? 0 : (mid - top) / (next - top);
        const e = Math.min(Math.max((f - 0.55) / 0.45, 0), 1);
        st = i + e * e * (3 - 2 * e);
        break;
      }
      if (mid < tops[0]) st = 0;
    }
    targetState = Math.min(st, 4);
  }
  window.addEventListener("scroll", () => { computeState(); requestRender(); }, { passive: true });
  computeState();
  uniforms.uState.value = targetState;

  // ---------- project hover → cluster highlight ----------
  let hot = -1;
  const projects = [...document.querySelectorAll(".project")];
  const setHot = (idx) => {
    hot = idx;
    projects.forEach((p) => p.classList.toggle("is-hot", Number(p.dataset.cluster) === idx));
    if (idx >= 0) uniforms.uHot.value = idx;
    requestRender();
  };
  projects.forEach((p) => {
    const idx = Number(p.dataset.cluster);
    p.addEventListener("pointerenter", () => setHot(idx));
    p.addEventListener("pointerleave", () => setHot(-1));
    p.addEventListener("focusin", () => setHot(idx));
    p.addEventListener("focusout", () => setHot(-1));
  });
  if (coarse) {
    // on touch screens the project nearest the middle of the screen lights its cluster
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setHot(Number(e.target.dataset.cluster)); }),
      { rootMargin: "-40% 0px -40% 0px" }
    );
    projects.forEach((p) => io.observe(p));
  }

  // ---------- pointer parallax ----------
  const pointer = { x: 0, y: 0 };
  window.addEventListener("pointermove", (e) => {
    pointer.x = e.clientX / window.innerWidth - 0.5;
    pointer.y = e.clientY / window.innerHeight - 0.5;
    requestRender();
  }, { passive: true });

  // ---------- pause control ----------
  let paused = reduceMotion;
  const toggle = document.querySelector(".motion-toggle");
  const label = () => {
    toggle.textContent = paused ? "Play the field" : "Pause the field";
    toggle.setAttribute("aria-pressed", String(paused));
  };
  label();
  toggle.addEventListener("click", () => { paused = !paused; label(); requestRender(); });

  // ---------- loop ----------
  document.addEventListener("visibilitychange", () => { visible = !document.hidden; if (visible) requestRender(); });

  function requestRender() { if (rafId === null) rafId = requestAnimationFrame(frame); }

  function frame() {
    rafId = null;
    clock.update();
    const dt = Math.min(clock.getDelta(), 0.05);
    let busy = false;

    if (!paused) { time += dt; busy = true; }
    uniforms.uTime.value = time;

    // ease toward the scroll target; jump straight there when motion is reduced
    const ds = targetState - uniforms.uState.value;
    if (reduceMotion) uniforms.uState.value = targetState;
    else if (Math.abs(ds) > 0.0005) { uniforms.uState.value += ds * Math.min(dt * 3.2, 1); busy = true; }

    if (uniforms.uIntro.value < 1) { uniforms.uIntro.value = Math.min(uniforms.uIntro.value + dt / 2.6, 1); busy = true; }

    const hotTarget = hot >= 0 ? 1 : 0;
    const dh = hotTarget - uniforms.uHotAmt.value;
    if (Math.abs(dh) > 0.002) { uniforms.uHotAmt.value += dh * Math.min(dt * 6, 1); busy = true; }

    // slow drift and pointer parallax
    const spin = paused ? 0 : Math.sin(time * 0.12) * 0.28;
    const tx = pointer.y * 0.25, ty = spin + pointer.x * 0.4;
    group.rotation.x += (tx - group.rotation.x) * 0.06;
    group.rotation.y += (ty - group.rotation.y) * 0.06;
    if (Math.abs(tx - group.rotation.x) > 0.0005 || Math.abs(ty - group.rotation.y) > 0.0005) busy = true;

    renderer.render(scene, camera);
    if (busy && visible) requestRender();
  }
  requestRender();
}
