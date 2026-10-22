import { useEffect, useRef, type CSSProperties } from 'react';
import logoV from '../assets/library/logo-v.webp';

// Interactive 3D brand mark for the hero: follows the pointer with tilt, parallax glows,
// a specular highlight that tracks the cursor, and a full spin on click.
export default function HeroLogo() {
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const hero = stage?.closest('section');
    if (!stage || !hero) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const target = { x: 0, y: 0, hover: 0, shineX: 50, shineY: 35 };
    const current = { ...target };
    let spinTarget = 0;
    let spin = 0;
    let frame = 0;

    const onMove = (event: PointerEvent) => {
      const bounds = hero.getBoundingClientRect();
      target.x = (event.clientX - bounds.left) / bounds.width - .5;
      target.y = (event.clientY - bounds.top) / bounds.height - .5;
      const box = stage.getBoundingClientRect();
      const inside = event.clientX > box.left && event.clientX < box.right && event.clientY > box.top && event.clientY < box.bottom;
      target.hover = inside ? 1 : 0;
      target.shineX = ((event.clientX - box.left) / box.width) * 100;
      target.shineY = ((event.clientY - box.top) / box.height) * 100;
    };
    const onLeave = () => Object.assign(target, { x: 0, y: 0, hover: 0, shineX: 50, shineY: 35 });
    const onClick = () => { spinTarget += 360; };

    const tick = (time: number) => {
      const ease = .075;
      current.x += (target.x - current.x) * ease;
      current.y += (target.y - current.y) * ease;
      current.hover += (target.hover - current.hover) * .1;
      current.shineX += (target.shineX - current.shineX) * .12;
      current.shineY += (target.shineY - current.shineY) * .12;
      spin += (spinTarget - spin) * .05;
      const float = reduced ? 0 : Math.sin(time / 1300) * 16;
      const sway = reduced ? 0 : Math.sin(time / 2100) * 4;
      stage.style.setProperty('--rx', `${-current.y * 30}deg`);
      stage.style.setProperty('--ry', `${current.x * 38 + sway + spin}deg`);
      stage.style.setProperty('--tx', `${current.x * 46}px`);
      stage.style.setProperty('--ty', `${current.y * 30 + float}px`);
      stage.style.setProperty('--scale', `${1 + current.hover * .07}`);
      stage.style.setProperty('--glow-x', `${-current.x * 90}px`);
      stage.style.setProperty('--glow-y', `${-current.y * 60}px`);
      stage.style.setProperty('--shine-x', `${current.shineX}%`);
      stage.style.setProperty('--shine-y', `${current.shineY}%`);
      stage.style.setProperty('--hover', `${current.hover}`);
      frame = requestAnimationFrame(tick);
    };

    hero.addEventListener('pointermove', onMove, { passive: true });
    hero.addEventListener('pointerleave', onLeave);
    stage.addEventListener('click', onClick);
    frame = requestAnimationFrame(tick);
    return () => {
      hero.removeEventListener('pointermove', onMove);
      hero.removeEventListener('pointerleave', onLeave);
      stage.removeEventListener('click', onClick);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="hero-logo" ref={stageRef} aria-hidden="true" style={{ '--logo-mask': `url(${logoV})` } as CSSProperties}>
      <span className="hero-logo-glow cyan" />
      <span className="hero-logo-glow pink" />
      <span className="hero-logo-ring" />
      <span className="hero-logo-ring ring-2" />
      <div className="hero-logo-body">
        <img src={logoV} alt="" />
        <span className="hero-logo-shine" />
      </div>
      <span className="hero-logo-floor" />
    </div>
  );
}
