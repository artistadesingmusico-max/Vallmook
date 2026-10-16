import { useState, type FormEvent } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Menu, X } from 'lucide-react';
import './creatorculture.css';

const logo = '/__mockup/images/vallmook-logo.png';
const environment = '/__mockup/images/vallmook-environment.jpg';
const socialProfile = '/__mockup/images/vallmook-social.jpg';
const merchandise = '/__mockup/images/vallmook-merch.jpg';

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

export function CreatorCulture() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState<CreatorForm>(emptyForm);
  const [formError, setFormError] = useState('');
  const [openedWhatsApp, setOpenedWhatsApp] = useState(false);

  const setField = (field: keyof CreatorForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    if (formError) setFormError('');
  };

  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;
    const digits = form.phone.replace(/\D/g, '');
    if (digits.length < 10 || digits.length > 11) {
      setFormError('Informe um WhatsApp válido com DDD, por exemplo: (61) 99999-9999.');
      document.getElementById('cc-whatsapp')?.focus();
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
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="cc-page">
      <a className="cc-skip" href="#cc-conteudo">Pular para o conteúdo</a>
      <header className="cc-topbar">
        <div className="cc-nav">
          <a className="cc-brand" href="#cc-inicio" aria-label="Vallmook Agency, início">
            <img src={logo} alt="" />
            <span><b>VALLMOOK</b><small>AGENCY</small></span>
          </a>
          <nav id="cc-mobile-navigation" className={`cc-nav-links ${menuOpen ? 'cc-open' : ''}`} aria-label="Navegação principal">
            <a href="#cc-como-funciona" onClick={closeMenu}>Como funciona</a>
            <a href="#cc-para-quem" onClick={closeMenu}>Para quem é</a>
            <a href="#cc-duvidas" onClick={closeMenu}>Dúvidas</a>
            <a className="cc-mobile-brand-link" href="#cc-marcas" onClick={closeMenu}>Sou uma marca</a>
          </nav>
          <div className="cc-nav-actions">
            <a className="cc-mark-link" href="#cc-marcas">Sou uma marca</a>
            <a className="cc-button cc-button-small" href="#cc-analise">Quero minha análise <ArrowRight size={15} /></a>
            <button
              className="cc-menu-toggle"
              type="button"
              aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={menuOpen}
              aria-controls="cc-mobile-navigation"
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      <main id="cc-conteudo">
        <section className="cc-hero" id="cc-inicio" aria-labelledby="cc-hero-title">
          <div className="cc-hero-image" aria-hidden="true"><img src={environment} alt="" /></div>
          <div className="cc-hero-wash" aria-hidden="true" />
          <div className="cc-film-frame" aria-hidden="true"><span>VLMK / TAKE 01</span><span>BRASIL · 2026</span></div>
          <div className="cc-hero-copy">
            <div className="cc-kicker"><i /> Mais que criadores. Construímos impérios digitais.</div>
            <h1 id="cc-hero-title">Você já é<br />creator.<br /><em>A gente transforma</em><br />isso em carreira.</h1>
            <p className="cc-hero-description">Gestão, estratégia e negociação com marcas para streamers e influenciadores que querem viver de conteúdo de verdade. Você cria. A gente constrói o resto.</p>
            <div className="cc-hero-actions"><a className="cc-button cc-button-acid" href="#cc-analise">Quero minha análise gratuita <ArrowRight size={17} /></a><span>Leva 2 minutos <b>·</b> Sem custo <b>·</b> Continue pelo WhatsApp</span></div>
          </div>
          <div className="cc-hero-signature"><span>CREATOR CULTURE / 001</span><span className="cc-hero-side-note">ESTRATÉGIA · CONEXÃO · CARREIRA</span><a href="#cc-dor"><ArrowDown size={15} /> CONHEÇA A VALLMOOK</a></div>
          <div className="cc-hero-index" aria-hidden="true">01—09</div>
        </section>

        <div className="cc-ribbon" aria-hidden="true">
          <div className="cc-ribbon-track"><span>ESTRATÉGIA</span><b>✳</b><span>CONEXÃO</span><b>✳</b><span>CARREIRA</span><b>✳</b><span>ESTRATÉGIA</span><b>✳</b><span>CONEXÃO</span><b>✳</b><span>CARREIRA</span><b>✳</b></div>
        </div>

        <section className="cc-pain cc-section" id="cc-dor" aria-labelledby="cc-pain-title">
          <div className="cc-pain-layout">
            <div className="cc-pain-intro">
              <span className="cc-eyebrow"><i /> Você não precisa fazer tudo</span>
              <h2 id="cc-pain-title">Talento você tem.<br /><em>O que falta é</em><br />estrutura.</h2>
              <p>Você grava, edita, posta, responde direct, negocia publi, cobra pagamento atrasado e ainda tenta entender o que o algoritmo quer esta semana. Não é falta de talento. É excesso de função.</p>
              <div className="cc-stamp" aria-hidden="true">SEU<br />TIME<br />EXISTE <span>↘</span></div>
            </div>
            <div className="cc-pain-side">
              <span className="cc-serial">UM DIA NA VIDA DE QUEM FAZ TUDO / 08:14 → 23:48</span>
              <ul className="cc-pain-list" aria-label="Desafios comuns de creators">
                {painPoints.map((point, index) => <li key={point}><span>0{index + 1}</span><p>{point}</p><b aria-hidden="true">×</b></li>)}
              </ul>
              <p className="cc-transition">Os creators que crescem de verdade não fazem tudo sozinhos. <strong>Eles têm um time por trás.</strong></p>
            </div>
          </div>
        </section>

        <section className="cc-how cc-section" id="cc-como-funciona" aria-labelledby="cc-how-title">
          <div className="cc-section-head">
            <div><span className="cc-eyebrow"><i /> Como funciona</span><h2 id="cc-how-title">Você cria.<br /><em>A gente cuida do resto.</em></h2></div>
            <p>Um caminho claro para tirar sua carreira do improviso — respeitando o que faz o seu conteúdo ser seu.</p>
          </div>
          <div className="cc-steps">
            {steps.map((step, index) => <article className="cc-step" key={step.title}>
              <div className="cc-step-top"><span>0{index + 1} / 03</span>{index < steps.length - 1 && <ArrowUpRight size={19} />}</div>
              <span className="cc-step-number">0{index + 1}</span>
              <h3>{step.title}</h3><p>{step.text}</p>
            </article>)}
          </div>
          <a className="cc-button cc-button-dark" href="#cc-analise">Começar pela análise gratuita <ArrowRight size={16} /></a>
        </section>

        <section className="cc-benefits cc-section" aria-labelledby="cc-benefits-title">
          <div className="cc-benefits-heading"><span className="cc-eyebrow"><i /> Na prática</span><h2 id="cc-benefits-title">O que muda quando você tem a <em>Vallmook</em> do seu lado</h2><span className="cc-orbit" aria-hidden="true">V / V / V /</span></div>
          <div className="cc-benefit-grid">
            {benefits.map(([title, text], index) => <article className="cc-benefit" key={title}>
              <span className="cc-benefit-index">V / 0{index + 1}</span><span className="cc-benefit-arrow" aria-hidden="true">↗</span><h3>{title}</h3><p>{text}</p>
            </article>)}
          </div>
        </section>

        <section className="cc-fit cc-section" id="cc-para-quem" aria-labelledby="cc-fit-title">
          <div className="cc-fit-visual">
            <img src={socialProfile} alt="Referência visual de um perfil de creator apresentado em um smartphone" loading="lazy" />
            <span className="cc-fit-photo-caption">SEU CONTEÚDO. COM VISÃO DE CARREIRA.</span>
            <span className="cc-fit-photo-tag">ON AIR / VLMK</span>
          </div>
          <div className="cc-fit-copy">
            <span className="cc-eyebrow"><i /> Para quem é</span><h2 id="cc-fit-title">A Vallmook<br />é para você se…</h2>
            <ul className="cc-fit-list">
              <li><b aria-hidden="true">✓</b><span>Você é streamer, influenciador ou faz lives e quer transformar isso em renda.</span></li>
              <li><b aria-hidden="true">✓</b><span>Você posta com frequência e quer crescer com estratégia, não com sorte.</span></li>
              <li><b aria-hidden="true">✓</b><span>Você quer fechar com marcas, mas não sabe negociar nem por onde começar.</span></li>
              <li><b aria-hidden="true">✓</b><span>Você está disposto a seguir um plano e evoluir com feedback.</span></li>
            </ul>
            <div className="cc-not-for"><h3>Não é para você se…</h3><ul className="cc-fit-list">
              <li><b className="cc-cross" aria-hidden="true">×</b><span>Você procura seguidores comprados ou crescimento artificial.</span></li>
              <li><b className="cc-cross" aria-hidden="true">×</b><span>Você não pretende manter constância de conteúdo.</span></li>
            </ul></div>
          </div>
        </section>

        <section className="cc-receive cc-section" aria-labelledby="cc-receive-title">
          <div className="cc-receive-copy"><span className="cc-eyebrow"><i /> O que você recebe</span><h2 id="cc-receive-title">Um time inteiro trabalhando pela <em>sua carreira</em></h2>
            <div className="cc-receive-list">
              {['Análise completa de perfil e potencial', 'Estrategista de conteúdo e lives', 'Negociação e gestão de publis', 'Suporte em contratos e cobranças', 'Acompanhamento mensal de metas e resultados', 'Acesso a oportunidades com marcas parceiras'].map((item) => <div className="cc-receive-row" key={item}><span>+</span>{item}</div>)}
            </div>
          </div>
          <aside className="cc-free-card"><div className="cc-free-card-copy"><span className="cc-eyebrow"><i /> O primeiro passo</span><h3>A análise de perfil não custa nada e não te obriga a nada.</h3><p>Vamos olhar para o seu conteúdo, entender seus objetivos e mostrar caminhos possíveis para sua carreira como creator.</p><a className="cc-button cc-button-acid" href="#cc-analise">Quero minha análise gratuita <ArrowRight size={16} /></a></div><img src={merchandise} alt="Detalhes da identidade visual e de produtos da Vallmook Agency" loading="lazy" /></aside>
        </section>

        <section className="cc-faq cc-section" id="cc-duvidas" aria-labelledby="cc-faq-title">
          <div className="cc-faq-head"><span className="cc-eyebrow"><i /> Dúvidas</span><h2 id="cc-faq-title">Talvez você<br />esteja pensando…</h2><p>Sem rodeios. O que você precisa saber antes de dar o próximo passo.</p></div>
          <div className="cc-faq-list">{faq.map(({ question, answer }, index) => <details className="cc-faq-item" key={question}><summary><span>0{index + 1}</span>{question}<b aria-hidden="true">+</b></summary><div className="cc-faq-answer">{answer}</div></details>)}</div>
        </section>

        <section className="cc-form-section cc-section" id="cc-analise" aria-labelledby="cc-form-title">
          <div className="cc-form-copy"><span className="cc-eyebrow"><i /> Seu próximo passo</span><h2 id="cc-form-title">Faça sua análise de perfil gratuita</h2><p>Preencha em 2 minutos. Nosso time analisa seu perfil e você continua a conversa pelo WhatsApp.</p><div className="cc-form-steps"><span>01</span> SEU PERFIL <b>—</b> <span>02</span> SEU OBJETIVO <b>—</b> <span>03</span> WHATSAPP</div><div className="cc-form-aside">VALLMOOK<br />CREATOR<br />CULTURE <span>↗</span></div></div>
          <form className="cc-form-card" onSubmit={submitForm} noValidate>
            <h3>Conte um pouco sobre você</h3>
            <div className="cc-form-grid">
              <div className="cc-field cc-wide"><label htmlFor="cc-creator-name">Nome</label><input id="cc-creator-name" name="name" autoComplete="name" placeholder="Como podemos te chamar?" required value={form.name} onChange={(event) => setField('name', event.target.value)} /></div>
              <div className="cc-field cc-wide"><label htmlFor="cc-whatsapp">WhatsApp (com DDD)</label><input id="cc-whatsapp" name="phone" type="tel" autoComplete="tel-national" inputMode="tel" placeholder="(61) 99999-9999" required aria-describedby={formError ? 'cc-form-error' : 'cc-phone-help'} value={form.phone} onChange={(event) => setField('phone', event.target.value)} /><span id="cc-phone-help" className="cc-field-help">Inclua o código de área, sem precisar digitar o código do país.</span></div>
              <div className="cc-field cc-wide"><label htmlFor="cc-profile">@ do seu perfil principal</label><input id="cc-profile" name="profile" placeholder="@seuperfil" required value={form.profile} onChange={(event) => setField('profile', event.target.value)} /></div>
              <div className="cc-field"><label htmlFor="cc-platform">Plataforma principal</label><select id="cc-platform" name="platform" required value={form.platform} onChange={(event) => setField('platform', event.target.value)}><option value="" disabled>Selecione</option>{platforms.map((platform) => <option key={platform} value={platform}>{platform}</option>)}</select></div>
              <div className="cc-field"><label htmlFor="cc-followers">Quantos seguidores você tem?</label><select id="cc-followers" name="followers" required value={form.followers} onChange={(event) => setField('followers', event.target.value)}><option value="" disabled>Selecione</option>{ranges.map((range) => <option key={range} value={range}>{range}</option>)}</select></div>
              <div className="cc-field cc-wide"><label htmlFor="cc-niche">Qual é o seu nicho?</label><input id="cc-niche" name="niche" placeholder="Ex.: games, beleza, humor" required value={form.niche} onChange={(event) => setField('niche', event.target.value)} /></div>
              <div className="cc-field cc-wide"><label htmlFor="cc-goal">O que você mais quer agora?</label><select id="cc-goal" name="goal" required value={form.goal} onChange={(event) => setField('goal', event.target.value)}><option value="" disabled>Selecione seu objetivo</option>{goals.map((goal) => <option key={goal} value={goal}>{goal}</option>)}</select></div>
            </div>
            {formError && <p className="cc-form-error" id="cc-form-error" role="alert">{formError}</p>}
            {openedWhatsApp && <p className="cc-form-notice" role="status">O WhatsApp foi aberto com suas respostas. Confira a mensagem e toque em enviar para falar com a Vallmook. Ela só será enviada depois da sua confirmação no WhatsApp.</p>}
            <button className="cc-button cc-button-dark cc-submit" type="submit">Enviar minha análise <ArrowRight size={16} /></button>
            <p className="cc-privacy">Seus dados são usados para esta análise. Ao continuar, você abre uma mensagem no WhatsApp e decide se deseja enviá-la.</p>
          </form>
        </section>

        <section className="cc-closing" aria-labelledby="cc-closing-title">
          <div className="cc-closing-grain" aria-hidden="true" />
          <span className="cc-eyebrow"><i /> A próxima etapa começa aqui</span>
          <h2 id="cc-closing-title">Seu talento<br />já existe.<br /><em>Falta o time.</em></h2>
          <p>Imagine abrir o celular e ver uma proposta de marca negociada no valor certo, um plano claro para a semana e gente torcendo por você. Isso começa com uma análise de 2 minutos.</p>
          <a className="cc-button cc-button-acid" href="#cc-analise">Quero fazer parte da Vallmook <ArrowRight size={16} /></a>
          <span className="cc-closing-note">Análise gratuita <b>·</b> Sem compromisso <b>·</b> Continue pelo WhatsApp</span>
        </section>

        <section className="cc-brand-block" id="cc-marcas" aria-labelledby="cc-brand-title">
          <div><span className="cc-eyebrow"><i /> PARCERIAS / BUSINESS</span><h3 id="cc-brand-title">É uma marca?</h3><p>Conectamos sua empresa aos creators certos para o seu público, com campanha, contrato e entrega gerenciados do início ao fim.</p></div>
          <a className="cc-button cc-button-dark" href="https://wa.me/5561999999999?text=Ol%C3%A1%2C%20Vallmook!%20Sou%20uma%20marca%20e%20quero%20conversar%20sobre%20uma%20campanha." target="_blank" rel="noreferrer">Falar com o comercial <ArrowRight size={16} /></a>
        </section>
      </main>

      <footer className="cc-footer">
        <div className="cc-footer-top"><div><a className="cc-brand" href="#cc-inicio" aria-label="Vallmook Agency, voltar ao início"><img src={logo} alt="" /><span><b>VALLMOOK</b><small>AGENCY</small></span></a><p>Você não precisa de mais uma dica de algoritmo. Precisa de um time que pense sua carreira com você. A análise é gratuita.</p></div><nav aria-label="Links do rodapé"><a href="#cc-como-funciona">Como funciona</a><a href="#cc-para-quem">Para quem é</a><a href="#cc-duvidas">Dúvidas</a><a href="#cc-analise">Análise de perfil</a><a href="#cc-marcas">Contato comercial</a></nav></div>
        <div className="cc-footer-bottom"><span>© 2026 Vallmook Agency. Todos os direitos reservados.</span><span><i>A mensagem só é enviada depois da sua confirmação no WhatsApp.</i><b>BRASIL · DIGITAL</b></span></div>
      </footer>
    </div>
  );
}
