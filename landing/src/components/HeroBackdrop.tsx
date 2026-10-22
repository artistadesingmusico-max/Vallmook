import { useEffect, useState } from 'react';
import heroWall from '../assets/backgrounds/hero-wall.webp';
import heroHub from '../assets/backgrounds/hero-hub.webp';
import heroPortraits from '../assets/backgrounds/hero-portraits.webp';

const scenes = [
  { src: heroWall, position: '60% 50%' },
  { src: heroPortraits, position: '70% 40%' },
  { src: heroHub, position: '50% 60%' },
];

// Cross-fading hero backdrop: wall of lives -> creator portraits -> live hub.
export default function HeroBackdrop() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % scenes.length), 7000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="hero-environment" aria-hidden="true">
      {scenes.map((scene, index) => (
        <img
          key={scene.src}
          src={scene.src}
          alt=""
          className={index === active ? 'is-active' : ''}
          style={{ objectPosition: scene.position }}
          fetchPriority={index === 0 ? 'high' : 'low'}
        />
      ))}
    </div>
  );
}
