import { lazy, Suspense, useEffect, useRef, useState, type CSSProperties, type FormEvent } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, Check, Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import HeroLogo from './components/HeroLogo';
import HeroBackdrop from './components/HeroBackdrop';
import logo from './assets/library/logo-v.webp';
import brandBoard from './assets/library/brand-board.webp';
import merchBoard from './assets/library/merch-board.webp';
import creatorGaming from './assets/library/creator-gaming.webp';
import creatorLaughing from './assets/library/creator-laughing.webp';
import creatorGuitar from './assets/library/creator-guitar.webp';
import creatorCoffee from './assets/library/creator-coffee.webp';
import creatorBedroom from './assets/library/creator-bedroom.webp';
import iconBadge from './assets/library/icon-badge.webp';
import iconGift from './assets/library/icon-gift.webp';
import iconTripod from './assets/library/icon-tripod.webp';
import iconChat from './assets/library/icon-chat.webp';
import iconDiamond from './assets/library/icon-diamond.webp';
import iconCrownGold from './assets/library/icon-crown-gold.webp';
import iconCrownSilver from './assets/library/icon-crown-silver.webp';
import iconCrownDark from './assets/library/icon-crown-dark.webp';
import iconCrownBox from './assets/library/icon-crown-box.webp';
import iconCrownPedestal from './assets/library/icon-crown-pedestal.webp';
import iconCoins from './assets/library/icon-coins.webp';
import iconSearch from './assets/library/icon-search.webp';
import iconVCrystal from './assets/library/icon-v-crystal.webp';
import tiktokLive from './assets/library/tiktok-live.webp';
const AuroraCanvas = lazy(() => import('./components/AuroraCanvas'));

type CreatorForm = {
  name: string;
  phone: string;
  profile: string;
  platform: string;
  followers: string;
  niche: string;
  goal: string;
};

const platforms = ['Instagram', 'TikTok', 'YouTube', 'Twitch', 'Kwai', 'Outra'];
const ranges = ['Até 10 mil', '10 a 50 mil', '50 a 200 mil', 'Mais de 200 mil'];
const goals = [
  'Fechar com marcas',
  'Crescer audiência',
  'Monetizar lives',
  'Profissionalizar minha carreira',
];

const painPoints = [
  'Você posta todo dia e os números não saem do lugar.',
  'Uma marca te chamou e você não sabia quanto cobrar, então cobrou pouco.',
  'Você passa mais tempo resolvendo burocracia do que criando.',
  'Você vê creators com menos conteúdo crescendo mais rápido que você.',
  'Sua live é boa, mas a audiência ainda não virou renda fixa.',
];

const requirements = [
  'Maiores de 18 anos',
  'Ter conta no TikTok',
  'Disponibilidade para lives.',
  'Comprometimento e vontade de crescer.',
];

const perks = [
  { title: 'Bonificações exclusivas', icon: iconGift },
  { title: 'Treinamentos e cursos', icon: iconTripod },
  { title: 'Suporte 24h', icon: iconChat },
  { title: 'Campanhas especiais', icon: iconDiamond },
  { title: 'Ranking e premiações', icon: iconCrownGold },
];

const joinSteps = [
  'Preencha o formulário de inscrição.',
  'Aguarde nossa análise (até 3 dias).',
  'Receba o contato da nossa equipe.',
  'Comece sua jornada como streamer.',
];

const joinIcons = [iconSearch, iconBadge, iconChat, iconCrownGold];

const liveCreators =[creatorGaming, creatorLaughing, creatorBedroom, creatorGuitar, creatorCoffee];

const stepIcons = [iconSearch, iconTripod, iconCrownSilver];

const steps = [
  {
    title: 'Análise de perfil',
    text: 'Olhamos seus números, seu conteúdo e seu público para mostrar onde está o seu potencial e o que está travando seu crescimento.',
  },
  {
    title: 'Estratégia sob medida',
    text: 'Montamos um plano de conteúdo, lives e posicionamento feito para o seu perfil, não um modelo pronto.',
  },
  {
    title: 'Marcas e resultados',
    text: 'Conectamos você às marcas certas, negociamos valores justos e cuidamos de contrato e cobrança.',
  },
];

const benefits = [
  ['Você para de cobrar pouco.', 'Suas publis são negociadas com base no seu valor real de mercado.'],
  ['Você volta a ter tempo.', 'Contrato, cobrança e burocracia deixam de ser problema seu.'],
  ['Você cresce com direção.', 'Cada post e cada live passam a ter um objetivo.'],
  ['Você chega em marcas maiores.', 'A agência abre portas que um perfil sozinho não abre.'],
  ['Você entende seus números.', 'Metas e indicadores explicados de forma simples.'],
  ['Você vira uma marca.', 'Posicionamento e reputação profissional, não só um perfil.'],
];

const faq = [
  {
    question: 'Como funciona uma parceria com a agência?',
    answer: 'A análise de perfil é gratuita e não te obriga a nada. Se fizer sentido seguir juntos, conversamos com transparência sobre o modelo e os próximos passos antes de qualquer contrato. Você decide se quer avançar.',
  },
  {
    question: 'Preciso ter muitos seguidores?',
    answer: 'Não. Avaliamos potencial, constância e nicho — não só o número de seguidores.',
  },
  {
    question: 'Vocês trabalham com quem faz live?',
    answer: 'Sim. Streamers e talentos de live são parte central do nosso trabalho.',
  },
  {
    question: 'Vou perder o controle do meu conteúdo?',
    answer: 'Não. A gente orienta, você aprova. Seu conteúdo continua sendo seu e o plano é feito junto com você.',
  },
  {
    question: 'Já tentei crescer e não deu certo. E agora?',
    answer: 'Provavelmente faltou estratégia, não talento. Com direção, cada esforço passa a contar.',
  },
];

const emptyForm: CreatorForm = {
  name: '',
  phone: '',
  profile: '',
  platform: '',
  followers: '',
  niche: '',
  goal: '',
};

const formFieldOrder: (keyof CreatorForm)[] = ['name', 'profile', 'platform', 'followers', 'niche', 'goal', 'phone'];
const transitionCopy = 'Os creators que crescem de verdade não fazem tudo sozinhos. Eles têm um time por trás.';
const transitionCopyWords = transitionCopy.split(' ');

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState<CreatorForm>(emptyForm);
  const [formError, setFormError] = useState('');
  const [openedWhatsApp, setOpenedWhatsApp] = useState(false);
  const [formStep, setFormStep] = useState(0);
  const [celebrating, setCelebrating] = useState(false);
  const [loading, setLoading] = useState(true);
  const [fitMode, setFitMode] = useState<'yes' | 'no'>('yes');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [cursorLabel, setCursorLabel] = useState('');
  const [activeJoin, setActiveJoin] = useState(0);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorPoint = useRef({ x: -100, y: -100 });
  const cursorRendered = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) { setLoading(false); return; }
    const timer = window.setTimeout(() => setLoading(false), 1200);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    // The registration step closest to the middle of the viewport becomes the active one.
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveJoin(Number((entry.target as HTMLElement).dataset.joinIndex));
      });
    }, { rootMargin: '-45% 0px -45% 0px' });
    document.querySelectorAll('.join-step').forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!celebrating) return;
    const timer = window.setTimeout(() => setCelebrating(false), 1700);
    return () => window.clearTimeout(timer);
  }, [celebrating]);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;
    const lenis = new Lenis({ duration: 1.25, smoothWheel: true, anchors: { offset: -96 } });
    const onTick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);
    gsap.registerPlugin(ScrollTrigger);
    lenis.on('scroll', ScrollTrigger.update);
    const updateProgress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      setScrollProgress(progress);
      setScrolled(window.scrollY > 36);
      const marquee = document.querySelector<HTMLElement>('.marquee-track');
      if (marquee) marquee.style.animationDuration = `${32 - progress * 14}s`;
    };
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: .12 });
    document.querySelectorAll('main > section:not(.hero), .brand-block, .footer').forEach((node) => {
      node.classList.add('reveal');
      revealObserver.observe(node);
    });
    document.querySelectorAll('.pain-item, .benefit, .receive-row, .perk, .join-step, .creator-card, .requirement').forEach((node) => {
      node.classList.add('reveal-item');
      revealObserver.observe(node);
    });
    const benefitCards = document.querySelectorAll<HTMLElement>('.benefit, .perk, .step, .join-step, .requirements-card');
    const spotlight = (event: PointerEvent) => {
      const box = (event.currentTarget as HTMLElement).getBoundingClientRect();
      (event.currentTarget as HTMLElement).style.setProperty('--mx', `${event.clientX - box.left}px`);
      (event.currentTarget as HTMLElement).style.setProperty('--my', `${event.clientY - box.top}px`);
    };
    benefitCards.forEach((card) => card.addEventListener('pointermove', spotlight));
    // The steps stay in a normal grid; the progress line fills while the section crosses the viewport.
    ScrollTrigger.create({
      trigger: '.how',
      start: 'top 75%',
      end: 'bottom 60%',
      scrub: true,
      onUpdate: (self) => {
        document.querySelector<HTMLElement>('.steps-progress-fill')?.style.setProperty('transform', `scaleX(${self.progress})`);
      },
    });
    const transitionWords = document.querySelectorAll<HTMLElement>('.transition-word');
    const transitionTrigger = ScrollTrigger.create({
      trigger: '.transition-line',
      start: 'top 75%',
      end: 'bottom 35%',
      scrub: true,
      onUpdate: (self) => {
        const litCount = Math.ceil(self.progress * transitionWords.length);
        transitionWords.forEach((word, index) => word.classList.toggle('is-lit', index < litCount));
      },
    });
    gsap.to('.footer-brand-word', {
      '--footer-fill': '100%',
      ease: 'none',
      scrollTrigger: { trigger: '.footer-brand-word', start: 'top bottom', end: 'bottom bottom', scrub: true },
    });
    const buttons = Array.from(document.querySelectorAll<HTMLElement>('.button'));
    const onMagneticMove = (event: PointerEvent) => {
      const button = event.currentTarget as HTMLElement;
      const bounds = button.getBoundingClientRect();
      button.style.setProperty('--mag-x', `${(event.clientX - bounds.left - bounds.width / 2) * .07}px`);
      button.style.setProperty('--mag-y', `${(event.clientY - bounds.top - bounds.height / 2) * .1}px`);
    };
    const onMagneticLeave = (event: PointerEvent) => {
      const button = event.currentTarget as HTMLElement;
      button.style.setProperty('--mag-x', '0px');
      button.style.setProperty('--mag-y', '0px');
    };
    buttons.forEach((button) => {
      button.addEventListener('pointermove', onMagneticMove, { passive: true });
      button.addEventListener('pointerleave', onMagneticLeave);
    });
    const closing = document.querySelector<HTMLElement>('.closing');
    const particles = Array.from(document.querySelectorAll<HTMLElement>('.closing-particle'));
    let particleFrame: number | null = null;
    let pendingParticlePointer: PointerEvent | null = null;
    const onClosingPointerMove = (event: PointerEvent) => {
      pendingParticlePointer = event;
      if (particleFrame !== null) return;
      particleFrame = requestAnimationFrame(() => {
        if (!closing || !pendingParticlePointer) return;
        const bounds = closing.getBoundingClientRect();
        const pointerX = pendingParticlePointer.clientX - bounds.left;
        const pointerY = pendingParticlePointer.clientY - bounds.top;
        particles.forEach((particle) => {
          const particleBox = particle.getBoundingClientRect();
          const dx = particleBox.left + particleBox.width / 2 - pendingParticlePointer!.clientX;
          const dy = particleBox.top + particleBox.height / 2 - pendingParticlePointer!.clientY;
          const distance = Math.hypot(dx, dy);
          const radius = 120;
          const force = distance < radius ? (radius - distance) * .35 : 0;
          const safeDistance = Math.max(distance, 1);
          particle.style.setProperty('--push-x', `${(dx / safeDistance) * force}px`);
          particle.style.setProperty('--push-y', `${(dy / safeDistance) * force}px`);
        });
        closing.style.setProperty('--pointer-x', `${pointerX}px`);
        closing.style.setProperty('--pointer-y', `${pointerY}px`);
        particleFrame = null;
      });
    };
    const onClosingPointerLeave = () => {
      particles.forEach((particle) => {
        particle.style.setProperty('--push-x', '0px');
        particle.style.setProperty('--push-y', '0px');
      });
    };
    closing?.addEventListener('pointermove', onClosingPointerMove, { passive: true });
    closing?.addEventListener('pointerleave', onClosingPointerLeave);
    const onPointerMove = (event: PointerEvent) => { cursorPoint.current = { x: event.clientX, y: event.clientY }; };
    const onCursorTarget = (event: Event) => {
      const target = event.target as HTMLElement | null;
      const interactive = target?.closest('a, button, .benefit, .step, .perk, .creator-card');
      setCursorLabel(interactive ? (interactive.matches('a, button') ? 'IR' : 'VER') : '');
    };
    const root = document.documentElement;
    const onFrame = () => {
      cursorRendered.current.x += (cursorPoint.current.x - cursorRendered.current.x) * .35;
      cursorRendered.current.y += (cursorPoint.current.y - cursorRendered.current.y) * .35;
      if (cursorRef.current) cursorRef.current.style.transform = `translate(${cursorRendered.current.x}px, ${cursorRendered.current.y}px) translate(-50%,-50%)`;
      // Drives the cursor light, the dot grid and the parallax of the floating icons.
      root.style.setProperty('--cx', `${cursorRendered.current.x}px`);
      root.style.setProperty('--cy', `${cursorRendered.current.y}px`);
      root.style.setProperty('--px', `${cursorRendered.current.x / window.innerWidth - .5}`);
      root.style.setProperty('--py', `${cursorRendered.current.y / window.innerHeight - .5}`);
      cursorFrame = requestAnimationFrame(onFrame);
    };
    const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    let cursorFrame: number | null = null;
    if (hasFinePointer) {
      root.classList.add('has-v-cursor');
      cursorFrame = requestAnimationFrame(onFrame);
      window.addEventListener('pointermove', onPointerMove, { passive: true });
      document.addEventListener('pointerover', onCursorTarget);
      document.addEventListener('pointerout', onCursorTarget);
    }
    return () => {
      window.removeEventListener('scroll', updateProgress);
      if (hasFinePointer) {
        root.classList.remove('has-v-cursor');
        window.removeEventListener('pointermove', onPointerMove);
        document.removeEventListener('pointerover', onCursorTarget);
        document.removeEventListener('pointerout', onCursorTarget);
        if (cursorFrame !== null) cancelAnimationFrame(cursorFrame);
      }
      benefitCards.forEach((card) => card.removeEventListener('pointermove', spotlight));
      buttons.forEach((button) => {
        button.removeEventListener('pointermove', onMagneticMove);
        button.removeEventListener('pointerleave', onMagneticLeave);
      });
      closing?.removeEventListener('pointermove', onClosingPointerMove);
      closing?.removeEventListener('pointerleave', onClosingPointerLeave);
      if (particleFrame !== null) cancelAnimationFrame(particleFrame);
      revealObserver.disconnect();
      transitionTrigger.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      lenis.off('scroll', ScrollTrigger.update);
      gsap.ticker.remove(onTick);
      lenis.destroy();
    };
  }, []);

  const setField = (field: keyof CreatorForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    if (formError) setFormError('');
  };

  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;
    if (formStep < formFieldOrder.length - 1) {
      setFormStep((current) => current + 1);
      return;
    }
    const digits = form.phone.replace(/\D/g, '');
    if (digits.length < 10 || digits.length > 11) {
      setFormError('Informe um WhatsApp válido com DDD, por exemplo: (61) 99999-9999.');
      document.getElementById('whatsapp')?.focus();
      return;
    }
    const message = [
      'Olá, Vallmook! Quero fazer minha análise de perfil gratuita.',
      '',
      `Nome: ${form.name.trim()}`,
      `WhatsApp: ${form.phone.trim()}`,
      `Perfil principal: ${form.profile.trim()}`,
      `Plataforma: ${form.platform}`,
      `Faixa de seguidores: ${form.followers}`,
      `Nicho: ${form.niche.trim()}`,
      `Objetivo agora: ${form.goal}`,
    ].join('\n');
    const url = `https://wa.me/5561999999999?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setOpenedWhatsApp(true);
    setCelebrating(true);
  };

  const closeMenu = () => setMenuOpen(false);
  const formStage = formStep < 2 ? 0 : formStep < 6 ? 1 : 2;
  const renderFormField = () => {
    switch (formFieldOrder[formStep]) {
      case 'name':
        return <div className="field wide"><label htmlFor="creator-name">Nome</label><input id="creator-name" name="name" autoComplete="name" placeholder="Como podemos te chamar?" required value={form.name} onChange={(event) => setField('name', event.target.value)} data-testid="input-creator-name" /></div>;
      case 'profile':
        return <div className="field wide"><label htmlFor="profile">@ do seu perfil principal</label><input id="profile" name="profile" placeholder="@seuperfil" required value={form.profile} onChange={(event) => setField('profile', event.target.value)} data-testid="input-main-profile" /></div>;
      case 'platform':
        return <div className="field wide"><label htmlFor="platform">Plataforma principal</label><select id="platform" name="platform" required value={form.platform} onChange={(event) => setField('platform', event.target.value)} data-testid="select-platform"><option value="" disabled>Selecione</option>{platforms.map((platform) => <option key={platform} value={platform}>{platform}</option>)}</select></div>;
      case 'followers':
        return <div className="field wide"><label htmlFor="followers">Quantos seguidores você tem?</label><select id="followers" name="followers" required value={form.followers} onChange={(event) => setField('followers', event.target.value)} data-testid="select-followers"><option value="" disabled>Selecione</option>{ranges.map((range) => <option key={range} value={range}>{range}</option>)}</select></div>;
      case 'niche':
        return <div className="field wide"><label htmlFor="niche">Qual é o seu nicho?</label><input id="niche" name="niche" placeholder="Ex.: games, beleza, humor" required value={form.niche} onChange={(event) => setField('niche', event.target.value)} data-testid="input-niche" /></div>;
      case 'goal':
        return <div className="field wide"><label htmlFor="goal">O que você mais quer agora?</label><select id="goal" name="goal" required value={form.goal} onChange={(event) => setField('goal', event.target.value)} data-testid="select-goal"><option value="" disabled>Selecione seu objetivo</option>{goals.map((goal) => <option key={goal} value={goal}>{goal}</option>)}</select></div>;
      case 'phone':
        return <div className="field wide"><label htmlFor="whatsapp">WhatsApp (com DDD)</label><input id="whatsapp" name="phone" type="tel" autoComplete="tel-national" inputMode="tel" placeholder="(61) 99999-9999" required aria-describedby={formError ? 'form-error' : 'phone-help'} value={form.phone} onChange={(event) => setField('phone', event.target.value)} data-testid="input-whatsapp" /><span id="phone-help" className="field-error" style={{ color: '#687073' }}>Inclua o código de área, sem precisar digitar o código do país.</span></div>;
    }
  };

  return (
    <div className="site-shell noise">
      {!window.matchMedia('(max-width: 900px), (hover: none), (prefers-reduced-motion: reduce)').matches && (
        <Suspense fallback={null}><AuroraCanvas /></Suspense>
      )}
      {loading && <div className="entry-curtain" aria-hidden="true"><img src={logo} alt="" /></div>}
      <div className="reading-progress" style={{ transform: `scaleX(${scrollProgress})` }} aria-hidden="true" />
      <div className="cursor-light" aria-hidden="true" />
      <div className="cursor-dots" aria-hidden="true" />
      <div ref={cursorRef} className={`custom-cursor ${cursorLabel ? 'active' : ''}`} aria-hidden="true"><img src={logo} alt="" /></div>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <header className={`topbar ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="container nav-wrap">
          <a className="brand-lockup" href="#inicio" aria-label="Vallmook Agency, início">
            <img src={logo} alt="" />
            <span>
              <span className="brand-name">VALLMOOK</span>
              <span className="brand-sub">AGENCY</span>
            </span>
          </a>
          <nav id="mobile-navigation" aria-label="Navegação principal" className={`nav-links ${menuOpen ? 'open' : ''}`}>
            <a href="#inicio" onClick={closeMenu}>Início</a>
            <a href="#sobre" onClick={closeMenu}>Sobre</a>
            <a href="#seja-streamer" onClick={closeMenu}>Seja Streamer</a>
            <a href="#duvidas" onClick={closeMenu}>Dúvidas</a>
            <a className="mobile-brand-link" href="#marcas" onClick={closeMenu}>Sou uma marca</a>
          </nav>
          <div className="nav-actions">
            <a className="brand-link" href="#marcas">Sou uma marca</a>
            <a className="button button-small" href="#analise">Quero ser streamer <ArrowRight size={14} /></a>
            <button
              className="menu-toggle"
              type="button"
              aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMenuOpen((open) => !open)}
              data-testid="button-mobile-menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      <main id="conteudo">
        <section className="hero" id="inicio" aria-labelledby="hero-title">
          <HeroBackdrop />
          <div className="container hero-grid">
            <div className="hero-headline">
              <div className="hero-kicker eyebrow">Talentos reais, grandes conquistas.</div>
              <h1 className="display" id="hero-title">
                {['Quer', 'transformar', 'seu', 'talento'].map((word, index) => (
                  <span key={word}><span className="hero-word shine-word" style={{ '--word-index': index } as CSSProperties}>{word}</span>{index % 2 ? <br /> : ' '}</span>
                ))}
                <span className="hero-accent">
                  <span className="hero-word" style={{ '--word-index': 4 } as CSSProperties}>em</span>{' '}
                  <span className="hero-word" style={{ '--word-index': 5 } as CSSProperties}>dólares?</span>
                </span>
              </h1>
            </div>
            <div className="hero-content">
              <p className="hero-copy">Somos uma agência de lives no TikTok, conectando pessoas talentosas a grandes oportunidades. Aqui, você tem suporte, treinamento, bonificações e toda a estrutura para crescer.</p>
              <div className="hero-buttons">
                <a className="button" href="#analise">Quero ser streamer <ArrowRight size={16} /></a>
                <p className="hero-note">Leva 2 minutos <span aria-hidden="true">·</span> Sem custo <span aria-hidden="true">·</span> Resposta pelo WhatsApp</p>
              </div>
              <div className="hero-pills" aria-label="Pilares da Vallmook">
                <img className="tiktok-live-chip" src={tiktokLive} alt="TikTok LIVE" />
                <span>Estratégia</span><span>Conexão</span><span>Carreira</span>
              </div>
            </div>
            <HeroLogo />
          </div>
          <a className="scroll-cue" href="#sobre"><span /> CONHEÇA A VALLMOOK <ArrowDown size={13} /></a>
        </section>

        <div className="platform-marquee" aria-label="TikTok, Instagram, YouTube, Twitch, Kwai, Lives">
          <div className="marquee-track" aria-hidden="true">
            {[0, 1].map((copy) => (
              <span key={copy}>
                TikTok <b>·</b> Instagram <b>·</b> YouTube <b>·</b> Twitch <b>·</b> Kwai <b>·</b> Lives <b>·</b>
              </span>
            ))}
          </div>
        </div>

        <section className="about section-pad bg-section bg-about" id="sobre" aria-labelledby="about-title">
          <div className="container about-grid">
            <div className="about-collage">
              <figure className="collage-main"><img src={creatorGaming} alt="Streamer da Vallmook sorrindo em seu setup de lives" loading="lazy" /></figure>
              <figure className="collage-side"><img src={creatorLaughing} alt="Creator dando risada durante uma live" loading="lazy" /><span className="live-chip">AO VIVO</span></figure>
              <figure className="collage-merch"><img src={merchBoard} alt="Produtos e identidade visual da Vallmook Agency" loading="lazy" /></figure>
              <img className="collage-float" src={iconVCrystal} alt="" aria-hidden="true" loading="lazy" />
            </div>
            <div className="about-content">
              <span className="eyebrow">Sobre</span>
              <h2 className="display section-heading" id="about-title">Seu talento, nosso compromisso.</h2>
              <p className="about-lead">Vallmook Agency nasceu de uma visão: transformar oportunidades em crescimento e ajudar criadores a alcançarem seu verdadeiro potencial no universo das lives do TikTok.</p>
              <p>Pensada e criada pelo patrocinador de lives Paulo, a Vallmook surgiu com o propósito de apoiar streamers em sua jornada de evolução dentro da plataforma, oferecendo orientação, incentivo e oportunidades para que cada criador possa desenvolver suas habilidades, conquistar seu espaço e alcançar novos objetivos.</p>
              <p>Mais do que uma agência, a Vallmook Agency foi idealizada para ser uma parceira de crescimento, acreditando que por trás de cada live existe uma pessoa com sonhos, talentos e vontade de vencer. Por isso, nosso compromisso é valorizar cada streamer, incentivar seu desenvolvimento e construir um ambiente onde a dedicação, a evolução e a colaboração sejam pilares do sucesso.</p>
              <p>Acreditamos que crescer é muito mais do que conquistar números: é desenvolver talentos, fortalecer comunidades, criar conexões e abrir portas para novas oportunidades.</p>
              <blockquote className="mission-card">
                <span className="eyebrow">Nossa missão</span>
                <p>Nossa missão é ajudar streamers a crescer, evoluir e conquistar seu espaço no TikTok.</p>
              </blockquote>
              <p>Com visão, compromisso e paixão pelo universo das lives, a Vallmook Agency inicia sua trajetória com um objetivo claro: crescer junto com seus talentos, construindo uma comunidade forte, unida e preparada para ir cada vez mais longe.</p>
              <p className="about-signature">Vallmook Agency — seu talento, nosso compromisso, seu crescimento, nossa missão.</p>
            </div>
          </div>
        </section>

        <section className="streamer section-pad" id="seja-streamer" aria-labelledby="streamer-title">
          <div className="container">
            <div className="streamer-head bg-band bg-tiktok">
              <img className="float-icon streamer-float left" src={iconDiamond} alt="" aria-hidden="true" loading="lazy" />
              <img className="float-icon streamer-float right" src={iconCrownGold} alt="" aria-hidden="true" loading="lazy" />
              <img className="streamer-tiktok" src={tiktokLive} alt="TikTok LIVE" loading="lazy" />
              <span className="eyebrow">Seja um streamer</span>
              <h2 className="display section-heading" id="streamer-title">Transforme seu talento em renda.</h2>
              <p className="streamer-lead">A Vallmook Agency é a ponte entre você e o sucesso no TikTok Live.</p>
              <p>Aqui, você tem suporte, treinamentos, bonificações e será reconhecido como um dos novos streamers.</p>
            </div>
            <div className="creator-strip" aria-label="Streamers ao vivo">
              {liveCreators.map((image, index) => (
                <figure className="creator-card" key={image} style={{ '--card-index': index } as CSSProperties}>
                  <img src={image} alt="" loading="lazy" />
                  <span className="live-chip">AO VIVO</span>
                </figure>
              ))}
            </div>
            <div className="streamer-grid bg-band bg-benefits">
              <article className="requirements-card">
                <img className="requirements-icon" src={iconBadge} alt="" aria-hidden="true" loading="lazy" />
                <h3>Quem pode participar</h3>
                <ul>
                  {requirements.map((item) => <li className="requirement" key={item}><span className="receive-mark" aria-hidden="true"><Check size={16} /></span>{item}</li>)}
                </ul>
              </article>
              <div className="perks">
                <h3 className="perks-title">Benefícios</h3>
                <div className="perks-grid">
                  {perks.map((perk) => (
                    <article className="perk" key={perk.title}>
                      <img src={perk.icon} alt="" aria-hidden="true" loading="lazy" />
                      <h4>{perk.title}</h4>
                    </article>
                  ))}
                </div>
              </div>
            </div>
            <div className="join bg-band bg-join" style={{ '--join-progress': activeJoin / (joinSteps.length - 1) } as CSSProperties}>
              <div className="join-panel">
                <h3 className="display join-title">Como se inscrever?</h3>
                <div className="join-orb" aria-hidden="true">
                  <span className="join-orb-ring" />
                  <span className="join-orb-num">0{activeJoin + 1}</span>
                  {joinIcons.map((icon, index) => <img key={icon} src={icon} alt="" className={index === activeJoin ? 'is-active' : ''} />)}
                </div>
                <div className="join-dots" aria-hidden="true">
                  {joinSteps.map((step, index) => <span key={step} className={index <= activeJoin ? 'is-on' : ''} />)}
                </div>
                <a className="button" href="#analise">Quero ser streamer <ArrowRight size={15} /></a>
                <img className="join-tiktok" src={tiktokLive} alt="TikTok LIVE" loading="lazy" />
              </div>
              <ol className="join-steps">
                <span className="join-line" aria-hidden="true"><span /></span>
                {joinSteps.map((step, index) => (
                  <li
                    className={`join-step${index === activeJoin ? ' is-active' : ''}${index < activeJoin ? ' is-done' : ''}`}
                    key={step}
                    data-join-index={index}
                    onPointerEnter={() => setActiveJoin(index)}
                  >
                    <span className="join-num">0{index + 1}</span>
                    <p>{step}</p>
                    <img className="join-step-icon" src={joinIcons[index]} alt="" aria-hidden="true" loading="lazy" />
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="pain section-pad bg-section bg-pain" id="dor" aria-labelledby="pain-title">
          <div className="container pain-grid">
            <div>
              <img className="pain-icon float-icon" src={iconCoins} alt="" aria-hidden="true" loading="lazy" />
              <span className="eyebrow">Você não precisa fazer tudo</span>
              <h2 className="display section-heading" id="pain-title">Talento você tem.<br />O que falta é estrutura.</h2>
              <p className="pain-intro">Você grava, edita, posta, responde direct, negocia publi, cobra pagamento atrasado e ainda tenta entender o que o algoritmo quer esta semana. Não é falta de talento. É excesso de função.</p>
            </div>
            <div>
              <ul className="pain-list" aria-label="Desafios comuns de creators">
                {painPoints.map((point, index) => (
                  <li className="pain-item" key={point} data-testid={`pain-point-${index}`}>
                    <span className="pain-x" aria-hidden="true">×</span><span>{point}</span>
                  </li>
                ))}
              </ul>
              <p className="transition-line">{transitionCopyWords.map((word, index) => <span className="transition-word" key={`${word}-${index}`}>{word}{index < transitionCopyWords.length - 1 ? ' ' : ''}</span>)}</p>
            </div>
          </div>
        </section>

        <section className="how section-pad bg-section bg-how" id="como-funciona" aria-labelledby="how-title">
          <div className="container">
            <div className="how-top">
              <img className="float-icon how-float" src={iconVCrystal} alt="" aria-hidden="true" loading="lazy" />
              <div>
                <span className="eyebrow">Como funciona</span>
                <h2 className="display section-heading" id="how-title">Você cria.<br />A gente cuida do resto.</h2>
              </div>
              <p>Um caminho claro para tirar sua carreira do improviso — respeitando o que faz o seu conteúdo ser seu.</p>
            </div>
            <div className="steps-progress" aria-hidden="true"><span className="steps-progress-fill" /></div>
            <div className="steps">
              {steps.map((step, index) => (
                <article className="step" key={step.title} data-step-number={`0${index + 1}`}>
                  <span className="step-num">0{index + 1} / 03</span>
                  {index < steps.length - 1 && <span className="step-arrow" aria-hidden="true">↗</span>}
                  <img className="step-icon" src={stepIcons[index]} alt="" aria-hidden="true" loading="lazy" />
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </article>
              ))}
            </div>
            <a className="button button-dark" href="#analise">Começar pela análise gratuita <ArrowRight size={15} /></a>
          </div>
        </section>

        <section className="benefits section-pad bg-section bg-change" aria-labelledby="benefits-title">
          <div className="container">
            <div className="benefits-head">
              <img className="float-icon benefits-float" src={iconGift} alt="" aria-hidden="true" loading="lazy" />
              <span className="eyebrow">Na prática</span>
              <h2 className="display section-heading" id="benefits-title">O que muda quando você tem a Vallmook do seu lado</h2>
            </div>
            <div className="benefits-grid">
              {benefits.map(([title, text], index) => (
                <article className="benefit" key={title} data-testid={`benefit-${index}`}>
                  <span className="benefit-index">V / 0{index + 1}</span>
                  {index === 0 && <img className="benefit-icon" src={iconCoins} alt="" aria-hidden="true" loading="lazy" />}
                  {index === 5 && <img className="benefit-icon" src={iconCrownDark} alt="" aria-hidden="true" loading="lazy" />}
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="fit section-pad" id="para-quem" aria-labelledby="fit-title">
          <div className="container fit-layout">
            <div className="fit-photo">
              <img className="float-icon fit-float" src={iconDiamond} alt="" aria-hidden="true" loading="lazy" />
              <img src={creatorBedroom} alt="Streamer fazendo live no TikTok no quarto" loading="lazy" />
              <span className="live-chip">AO VIVO</span>
              <span className="fit-photo-caption">SEU CONTEÚDO. COM VISÃO DE CARREIRA.</span>
            </div>
            <div className="fit-content">
              <span className="eyebrow">Para quem é</span>
              <h2 className="display section-heading" id="fit-title">A Vallmook é para você se…</h2>
               <div className="fit-switch" role="group" aria-label="Alternar perfil de elegibilidade">
                 <motion.button type="button" whileTap={{ scale: .97 }} aria-pressed={fitMode === 'yes'} className={fitMode === 'yes' ? 'selected' : ''} onClick={() => setFitMode('yes')}>É para você</motion.button>
                 <motion.button type="button" whileTap={{ scale: .97 }} aria-pressed={fitMode === 'no'} className={fitMode === 'no' ? 'selected' : ''} onClick={() => setFitMode('no')}>Não é para você</motion.button>
               </div>
                <AnimatePresence mode="wait" initial={false}>
                  {fitMode === 'yes' ? (
                    <motion.ul key="fit-yes" className="fit-list fit-state" layout initial={{ opacity: 0, y: 12, filter: 'blur(5px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }} transition={{ duration: .28 }}>
                      <li><span className="checkmark" aria-hidden="true">✓</span><span>Você é streamer, influenciador ou faz lives e quer transformar isso em renda.</span></li>
                      <li><span className="checkmark" aria-hidden="true">✓</span><span>Você posta com frequência e quer crescer com estratégia, não com sorte.</span></li>
                      <li><span className="checkmark" aria-hidden="true">✓</span><span>Você quer fechar com marcas, mas não sabe negociar nem por onde começar.</span></li>
                      <li><span className="checkmark" aria-hidden="true">✓</span><span>Você está disposto a seguir um plano e evoluir com feedback.</span></li>
                    </motion.ul>
                  ) : (
                    <motion.div key="fit-no" className="not-for fit-state" layout initial={{ opacity: 0, y: 12, filter: 'blur(5px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }} transition={{ duration: .28 }}>
                      <h3>Não é para você se…</h3>
                      <ul className="fit-list">
                        <li><span className="pain-x" aria-hidden="true">×</span><span>Você procura seguidores comprados ou crescimento artificial.</span></li>
                        <li><span className="pain-x" aria-hidden="true">×</span><span>Você não pretende manter constância de conteúdo.</span></li>
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
            </div>
          </div>
        </section>

        <section className="receive section-pad bg-section bg-receive" aria-labelledby="receive-title">
          <div className="container receive-layout">
            <div>
              <span className="eyebrow">O que você recebe</span>
              <h2 className="display section-heading" id="receive-title">Um time inteiro trabalhando pela sua carreira</h2>
              <div className="receive-list">
                {[
                  'Análise completa de perfil e potencial',
                  'Estrategista de conteúdo e lives',
                  'Negociação e gestão de publis',
                  'Suporte em contratos e cobranças',
                  'Acompanhamento mensal de metas e resultados',
                  'Acesso a oportunidades com marcas parceiras',
                ].map((item) => <div className="receive-row" key={item}><span className="receive-mark" aria-hidden="true"><Check size={16} /></span>{item}</div>)}
              </div>
            </div>
            <aside className="free-callout">
              <span className="eyebrow">O primeiro passo</span>
              <h3>A análise de perfil não custa nada e não te obriga a nada.</h3>
              <p>Vamos olhar para o seu conteúdo, entender seus objetivos e mostrar caminhos possíveis para sua carreira como creator.</p>
              <a className="button" href="#analise">Quero minha análise gratuita <ArrowRight size={15} /></a>
              <div className="crown-showcase" aria-hidden="true"><img src={iconCrownBox} alt="" loading="lazy" /></div>
            </aside>
          </div>
        </section>

        <section className="faq section-pad bg-section bg-faq" id="duvidas" aria-labelledby="faq-title">
          <div className="container faq-layout">
            <div className="faq-heading">
              <img className="faq-icon float-icon" src={iconChat} alt="" aria-hidden="true" loading="lazy" />
              <span className="eyebrow">Dúvidas</span>
              <h2 className="display section-heading" id="faq-title">Talvez você esteja pensando…</h2>
              <p>Sem rodeios. O que você precisa saber antes de dar o próximo passo.</p>
            </div>
            <div className="faq-list">
              {faq.map(({ question, answer }) => (
                <details className="faq-item" key={question}>
                  <summary>{question}</summary>
                  <div className="faq-answer"><div className="faq-answer-inner">{answer}</div></div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="form-section bg-section bg-crown" id="analise" aria-labelledby="form-title">
          <div className="container form-layout">
            <div className="form-copy">
              <span className="eyebrow">Seu próximo passo</span>
              <h2 className="display section-heading" id="form-title">Faça sua análise de perfil gratuita</h2>
              <p>Preencha em 2 minutos. Nosso time analisa seu perfil e você continua a conversa pelo WhatsApp.</p>
              <div className="form-steps"><span className={formStage === 0 ? 'active' : ''}>01</span> SEU PERFIL <span>—</span> <span className={formStage === 1 ? 'active' : ''}>02</span> SEU OBJETIVO <span>—</span> <span className={formStage === 2 ? 'active' : ''}>03</span> WHATSAPP</div>
            </div>
            {celebrating && <div className="analysis-celebration" aria-hidden="true"><img src={logo} alt="" />{Array.from({ length: 20 }, (_, index) => <i key={index} style={{ '--spark-angle': `${index * 18}deg`, '--spark-delay': `${index * 8}ms` } as CSSProperties} />)}</div>}
            <form className="form-card" onSubmit={submitForm} noValidate>
              <img className="form-crown float-icon" src={iconCrownPedestal} alt="" aria-hidden="true" loading="lazy" />
              <h3>Conte um pouco sobre você</h3>
              <div className="form-progress" role="progressbar" aria-label="Progresso do formulário" aria-valuemin={1} aria-valuemax={formFieldOrder.length} aria-valuenow={formStep + 1}>
                {formFieldOrder.map((field, index) => <span className={index <= formStep ? 'complete' : ''} key={field} />)}
              </div>
              <div className="form-grid">
                <motion.div
                  key={formFieldOrder[formStep]}
                  className="field-step"
                  initial={{ opacity: 0, x: 28, filter: 'blur(5px)' }}
                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  transition={{ duration: .32, ease: [.22, .75, .24, 1] }}
                >
                  {renderFormField()}
                </motion.div>
              </div>
              {formError && <p className="field-error" id="form-error" role="alert">{formError}</p>}
              {openedWhatsApp && (
                <p className="form-notice" role="status" data-testid="status-whatsapp-opened">
                  O WhatsApp foi aberto com suas respostas. Confira a mensagem e toque em enviar para falar com a Vallmook. Ela só será enviada depois da sua confirmação no WhatsApp.
                </p>
              )}
              <div className="form-navigation">
                {formStep > 0 && <button className="form-back" type="button" aria-label="Voltar" onClick={() => setFormStep((current) => Math.max(0, current - 1))}><ArrowLeft size={17} /></button>}
                {formStep < formFieldOrder.length - 1
                  ? <button className="button form-next" type="submit" aria-label="Continuar" data-testid="button-next-question"><ArrowRight size={16} /></button>
                  : <button className="button submit-button" type="submit" data-testid="button-submit-analysis">Enviar minha análise <ArrowRight size={15} /></button>}
              </div>
              <p className="form-privacy">Seus dados são usados para esta análise. Ao continuar, você abre uma mensagem no WhatsApp e decide se deseja enviá-la.</p>
            </form>
          </div>
        </section>

        <section className="closing bg-section bg-closing" aria-labelledby="closing-title">
          <div className="closing-particle-field" aria-hidden="true">{Array.from({ length: 32 }, (_, index) => <span className="closing-particle" key={index} style={{ left: `${(index * 37 + 11) % 96 + 2}%`, top: `${(index * 61 + 13) % 90 + 5}%` }} />)}</div>
          <img className="closing-float left" src={iconDiamond} alt="" aria-hidden="true" loading="lazy" />
          <img className="closing-float right" src={iconCrownSilver} alt="" aria-hidden="true" loading="lazy" />
          <div className="container closing-inner">
            <span className="eyebrow">A próxima etapa começa aqui</span>
            <h2 className="display" id="closing-title">Seu talento já existe.<br /><span style={{ color: '#70e7f3' }}>Falta o time.</span></h2>
            <p>Imagine abrir o celular e ver uma proposta de marca negociada no valor certo, um plano claro para a semana e gente torcendo por você. Isso começa com uma análise de 2 minutos.</p>
            <a className="button" href="#analise">Quero fazer parte da Vallmook <ArrowRight size={15} /></a>
            <p className="hero-note">Análise gratuita <span aria-hidden="true">·</span> Sem compromisso <span aria-hidden="true">·</span> Continue pelo WhatsApp</p>
          </div>
        </section>

        <section className="brand-block" id="marcas" aria-labelledby="brand-title">
          <div className="container brand-block-inner" style={{ '--brand-bg': `url(${brandBoard})` } as CSSProperties}>
            <div>
              <h3 id="brand-title">É uma marca?</h3>
              <p>Conectamos sua empresa aos creators certos para o seu público, com campanha, contrato e entrega gerenciados do início ao fim.</p>
            </div>
            <a className="button button-dark" href="https://wa.me/5561999999999?text=Ol%C3%A1%2C%20Vallmook!%20Sou%20uma%20marca%20e%20quero%20conversar%20sobre%20uma%20campanha." target="_blank" rel="noreferrer">Falar com o comercial <ArrowRight size={15} /></a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-top">
            <div>
              <a className="brand-lockup" href="#inicio" aria-label="Vallmook Agency, voltar ao início">
                <img src={logo} alt="" />
                <span><span className="brand-name">VALLMOOK</span><span className="brand-sub">AGENCY</span></span>
              </a>
              <p className="footer-note">Você não precisa de mais uma dica de algoritmo. Precisa de um time que pense sua carreira com você. A análise é gratuita.</p>
            </div>
            <nav className="footer-links" aria-label="Links do rodapé">
              <a href="#inicio">Início</a>
              <a href="#sobre">Sobre</a>
              <a href="#seja-streamer">Seja Streamer</a>
              <a href="#duvidas">Dúvidas</a>
              <a href="#marcas">Sou uma marca</a>
            </nav>
          </div>
          <div className="footer-bottom">
            <span>© 2026 Vallmook Agency. Todos os direitos reservados.</span>
            <span className="footer-legal"><span>A mensagem só é enviada depois da sua confirmação no WhatsApp.</span><span>BRASIL · DIGITAL</span></span>
          </div>
          <div className="footer-brand-word" aria-hidden="true">VALLMOOK</div>
        </div>
      </footer>
    </div>
  );
}

export default App;
