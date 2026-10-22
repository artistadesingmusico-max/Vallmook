import { Component, useEffect, useRef, type ReactNode } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Vector2, type ShaderMaterial } from 'three';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;
  uniform float uTime;
  uniform vec2 uPointer;
  uniform float uScroll;
  varying vec2 vUv;
  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
  }
  void main() {
    vec2 uv = vUv;
    vec2 p = uv * 3.0;
    float t = uTime * 0.035;
    float flow = noise(p + vec2(t, -t)) + noise(p * 1.8 - vec2(t * .7, t));
    float pointerDistance = distance(uv, uPointer);
    float cursor = exp(-pointerDistance * 4.0) * .55;
    float ripple = sin(pointerDistance * 38.0 - uTime * 1.6) * exp(-pointerDistance * 7.0) * .5 + .5;
    float cyan = smoothstep(.72, 1.55, flow + cursor) * (1.0 - uScroll * .48);
    float magenta = smoothstep(.8, 1.5, noise(p + vec2(4.2, -2.0) + t) + uScroll * .5 + cursor * .6) * (.35 + uScroll * .8);
    vec3 color = vec3(.015, .018, .03);
    color += vec3(.02, .48, .58) * cyan * .22;
    color += vec3(.5, .035, .2) * magenta * .18;
    color += mix(vec3(.05, .5, .62), vec3(.6, .06, .3), uv.x) * cursor * ripple * .22;
    gl_FragColor = vec4(color, .36);
  }
`;

class WebGLBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

function AuroraShader() {
  const material = useRef<ShaderMaterial>(null);
  const pointer = useRef({ x: .5, y: .5 });
  const target = useRef({ x: .5, y: .5 });
  const scroll = useRef(0);
  const { setFrameloop } = useThree();

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      target.current = { x: event.clientX / window.innerWidth, y: 1 - event.clientY / window.innerHeight };
    };
    const onScroll = () => {
      const span = document.documentElement.scrollHeight - window.innerHeight;
      scroll.current = span > 0 ? window.scrollY / span : 0;
    };
    const onVisibility = () => setFrameloop(document.hidden ? 'never' : 'always');
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);
    onScroll();
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [setFrameloop]);

  useFrame(({ clock }) => {
    if (!material.current) return;
    pointer.current.x += (target.current.x - pointer.current.x) * .035;
    pointer.current.y += (target.current.y - pointer.current.y) * .035;
    material.current.uniforms.uTime.value = clock.getElapsedTime();
    material.current.uniforms.uPointer.value.set(pointer.current.x, pointer.current.y);
    material.current.uniforms.uScroll.value = scroll.current;
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial ref={material} vertexShader={vertexShader} fragmentShader={fragmentShader} transparent uniforms={{
        uTime: { value: 0 }, uPointer: { value: new Vector2(.5, .5) }, uScroll: { value: 0 },
      }} />
    </mesh>
  );
}

export default function AuroraCanvas() {
  return (
    <WebGLBoundary>
      <Canvas className="aurora-canvas" dpr={[1, 1.5]} gl={{ alpha: true, antialias: false, powerPreference: 'low-power' }} aria-hidden="true">
        <AuroraShader />
      </Canvas>
    </WebGLBoundary>
  );
}
