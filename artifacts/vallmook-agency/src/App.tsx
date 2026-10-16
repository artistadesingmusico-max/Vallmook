import { useState, type FormEvent } from 'react';
import { ArrowDown, ArrowRight, Menu, X } from 'lucide-react';
import logo from '../../../attached_assets/Vallmook-Logo-3D_1792112116854.png';
import environment from '../../../attached_assets/Vallmook_brand_identity_board_2K_20261015155433_1792112116854.jpg';
import socialProfile from '../../../attached_assets/Smartphone_mockup_of_Instagram_p…_2K_20261015160521_1792112116854.jpg';
import merchandise from '../../../attached_assets/VALLMOOK_AGENCY_merchandise_bran…_2K_20261015160927_1792112116854.jpg';

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

function App() {
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
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site-shell noise">
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <header className="topbar">
        <div className="container nav-wrap">
          <a className="brand-lockup" href="#inicio" aria-label="Vallmook Agency, início">
            <img src={logo} alt="" />
            <span>
              <span className="brand-name">VALLMOOK</span>
              <span className="brand-sub">AGENCY</span>
            </span>
          </a>
          <nav id="mobile-navigation" aria-label="Navegação principal" className={`nav-links ${menuOpen ? 'open' : ''}`}>
            <a href="#como-funciona" onClick={closeMenu}>Como funciona</a>
            <a href="#para-quem" onClick={closeMenu}>Para quem é</a>
            <a href="#duvidas" onClick={closeMenu}>Dúvidas</a>
            <a className="mobile-brand-link" href="#marcas" onClick={closeMenu}>Sou uma marca</a>
          </nav>
          <div className="nav-actions">
            <a className="brand-link" href="#marcas">Sou uma marca</a>
            <a className="button button-small" href="#analise">Quero minha análise <ArrowRight size={14} /></a>
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
          <div className="hero-environment" aria-hidden="true"><img src={environment} alt="" /></div>
          <div className="hero-art" aria-hidden="true"><img src={logo} alt="" /></div>
          <div className="container">
            <div className="hero-content">
              <div className="hero-kicker eyebrow">Mais que criadores. Construímos impérios digitais.</div>
              <h1 className="display" id="hero-title">Você já é creator.<br /><span>A gente transforma</span><br />isso em carreira.</h1>
              <p className="hero-copy">Gestão, estratégia e negociação com marcas para streamers e influenciadores que querem viver de conteúdo de verdade. Você cria. A gente constrói o resto.</p>
              <div className="hero-buttons">
                <a className="button" href="#analise">Quero minha análise gratuita <ArrowRight size={16} /></a>
              </div>
              <p className="hero-note">Leva 2 minutos <span aria-hidden="true">·</span> Sem custo <span aria-hidden="true">·</span> Continue pelo WhatsApp</p>
              <a className="scroll-cue" href="#dor"><span /> CONHEÇA A VALLMOOK <ArrowDown size={13} /></a>
            </div>
          </div>
          <span className="side-note">ESTRATÉGIA · CONEXÃO · CARREIRA</span>
        </section>

        <section className="pain section-pad" id="dor" aria-labelledby="pain-title">
          <div className="container pain-grid">
            <div>
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
              <p className="transition-line">Os creators que crescem de verdade não fazem tudo sozinhos. Eles têm um time por trás.</p>
            </div>
          </div>
        </section>

        <section className="how section-pad" id="como-funciona" aria-labelledby="how-title">
          <div className="container">
            <div className="how-top">
              <div>
                <span className="eyebrow">Como funciona</span>
                <h2 className="display section-heading" id="how-title">Você cria.<br />A gente cuida do resto.</h2>
              </div>
              <p>Um caminho claro para tirar sua carreira do improviso — respeitando o que faz o seu conteúdo ser seu.</p>
            </div>
            <div className="steps">
              {steps.map((step, index) => (
                <article className="step" key={step.title}>
                  <span className="step-num">0{index + 1} / 03</span>
                  {index < steps.length - 1 && <span className="step-arrow" aria-hidden="true">↗</span>}
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </article>
              ))}
            </div>
            <a className="button button-dark" href="#analise">Começar pela análise gratuita <ArrowRight size={15} /></a>
          </div>
        </section>

        <section className="benefits section-pad" aria-labelledby="benefits-title">
          <div className="container">
            <div className="benefits-head">
              <span className="eyebrow">Na prática</span>
              <h2 className="display section-heading" id="benefits-title">O que muda quando você tem a Vallmook do seu lado</h2>
            </div>
            <div className="benefits-grid">
              {benefits.map(([title, text], index) => (
                <article className="benefit" key={title} data-testid={`benefit-${index}`}>
                  <span className="benefit-index">V / 0{index + 1}</span>
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
              <img src={socialProfile} alt="Referência visual de um perfil de creator apresentado em um smartphone" loading="lazy" />
              <span className="fit-photo-caption">SEU CONTEÚDO. COM VISÃO DE CARREIRA.</span>
            </div>
            <div className="fit-content">
              <span className="eyebrow">Para quem é</span>
              <h2 className="display section-heading" id="fit-title">A Vallmook é para você se…</h2>
              <ul className="fit-list">
                <li><span className="checkmark" aria-hidden="true">✓</span><span>Você é streamer, influenciador ou faz lives e quer transformar isso em renda.</span></li>
                <li><span className="checkmark" aria-hidden="true">✓</span><span>Você posta com frequência e quer crescer com estratégia, não com sorte.</span></li>
                <li><span className="checkmark" aria-hidden="true">✓</span><span>Você quer fechar com marcas, mas não sabe negociar nem por onde começar.</span></li>
                <li><span className="checkmark" aria-hidden="true">✓</span><span>Você está disposto a seguir um plano e evoluir com feedback.</span></li>
              </ul>
              <div className="not-for">
                <h3>Não é para você se…</h3>
                <ul className="fit-list">
                  <li><span className="pain-x" aria-hidden="true">×</span><span>Você procura seguidores comprados ou crescimento artificial.</span></li>
                  <li><span className="pain-x" aria-hidden="true">×</span><span>Você não pretende manter constância de conteúdo.</span></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="receive section-pad" aria-labelledby="receive-title">
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
                ].map((item) => <div className="receive-row" key={item}><span className="receive-mark" aria-hidden="true">+</span>{item}</div>)}
              </div>
            </div>
            <aside className="free-callout">
              <span className="eyebrow">O primeiro passo</span>
              <h3>A análise de perfil não custa nada e não te obriga a nada.</h3>
              <p>Vamos olhar para o seu conteúdo, entender seus objetivos e mostrar caminhos possíveis para sua carreira como creator.</p>
              <a className="button" href="#analise">Quero minha análise gratuita <ArrowRight size={15} /></a>
              <img className="merch-visual" src={merchandise} alt="Detalhes da identidade visual e de produtos da Vallmook Agency" loading="lazy" />
            </aside>
          </div>
        </section>

        <section className="faq section-pad" id="duvidas" aria-labelledby="faq-title">
          <div className="container faq-layout">
            <div className="faq-heading">
              <span className="eyebrow">Dúvidas</span>
              <h2 className="display section-heading" id="faq-title">Talvez você esteja pensando…</h2>
              <p>Sem rodeios. O que você precisa saber antes de dar o próximo passo.</p>
            </div>
            <div className="faq-list">
              {faq.map(({ question, answer }) => (
                <details className="faq-item" key={question}>
                  <summary>{question}</summary>
                  <div className="faq-answer">{answer}</div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="form-section" id="analise" aria-labelledby="form-title">
          <div className="container form-layout">
            <div className="form-copy">
              <span className="eyebrow">Seu próximo passo</span>
              <h2 className="display section-heading" id="form-title">Faça sua análise de perfil gratuita</h2>
              <p>Preencha em 2 minutos. Nosso time analisa seu perfil e você continua a conversa pelo WhatsApp.</p>
              <div className="form-steps"><span>01</span> SEU PERFIL <span>—</span> <span>02</span> SEU OBJETIVO <span>—</span> <span>03</span> WHATSAPP</div>
            </div>
            <form className="form-card" onSubmit={submitForm} noValidate>
              <h3>Conte um pouco sobre você</h3>
              <div className="form-grid">
                <div className="field wide">
                  <label htmlFor="creator-name">Nome</label>
                  <input id="creator-name" name="name" autoComplete="name" placeholder="Como podemos te chamar?" required value={form.name} onChange={(event) => setField('name', event.target.value)} data-testid="input-creator-name" />
                </div>
                <div className="field wide">
                  <label htmlFor="whatsapp">WhatsApp (com DDD)</label>
                  <input id="whatsapp" name="phone" type="tel" autoComplete="tel-national" inputMode="tel" placeholder="(61) 99999-9999" required aria-describedby={formError ? 'form-error' : 'phone-help'} value={form.phone} onChange={(event) => setField('phone', event.target.value)} data-testid="input-whatsapp" />
                  <span id="phone-help" className="field-error" style={{ color: '#687073' }}>Inclua o código de área, sem precisar digitar o código do país.</span>
                </div>
                <div className="field wide">
                  <label htmlFor="profile">@ do seu perfil principal</label>
                  <input id="profile" name="profile" placeholder="@seuperfil" required value={form.profile} onChange={(event) => setField('profile', event.target.value)} data-testid="input-main-profile" />
                </div>
                <div className="field">
                  <label htmlFor="platform">Plataforma principal</label>
                  <select id="platform" name="platform" required value={form.platform} onChange={(event) => setField('platform', event.target.value)} data-testid="select-platform">
                    <option value="" disabled>Selecione</option>
                    {platforms.map((platform) => <option key={platform} value={platform}>{platform}</option>)}
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="followers">Quantos seguidores você tem?</label>
                  <select id="followers" name="followers" required value={form.followers} onChange={(event) => setField('followers', event.target.value)} data-testid="select-followers">
                    <option value="" disabled>Selecione</option>
                    {ranges.map((range) => <option key={range} value={range}>{range}</option>)}
                  </select>
                </div>
                <div className="field wide">
                  <label htmlFor="niche">Qual é o seu nicho?</label>
                  <input id="niche" name="niche" placeholder="Ex.: games, beleza, humor" required value={form.niche} onChange={(event) => setField('niche', event.target.value)} data-testid="input-niche" />
                </div>
                <div className="field wide">
                  <label htmlFor="goal">O que você mais quer agora?</label>
                  <select id="goal" name="goal" required value={form.goal} onChange={(event) => setField('goal', event.target.value)} data-testid="select-goal">
                    <option value="" disabled>Selecione seu objetivo</option>
                    {goals.map((goal) => <option key={goal} value={goal}>{goal}</option>)}
                  </select>
                </div>
              </div>
              {formError && <p className="field-error" id="form-error" role="alert">{formError}</p>}
              {openedWhatsApp && (
                <p className="form-notice" role="status" data-testid="status-whatsapp-opened">
                  O WhatsApp foi aberto com suas respostas. Confira a mensagem e toque em enviar para falar com a Vallmook. Ela só será enviada depois da sua confirmação no WhatsApp.
                </p>
              )}
              <button className="button submit-button" type="submit" data-testid="button-submit-analysis">Enviar minha análise <ArrowRight size={15} /></button>
              <p className="form-privacy">Seus dados são usados para esta análise. Ao continuar, você abre uma mensagem no WhatsApp e decide se deseja enviá-la.</p>
            </form>
          </div>
        </section>

        <section className="closing" aria-labelledby="closing-title">
          <div className="container closing-inner">
            <span className="eyebrow">A próxima etapa começa aqui</span>
            <h2 className="display" id="closing-title">Seu talento já existe.<br /><span style={{ color: '#70e7f3' }}>Falta o time.</span></h2>
            <p>Imagine abrir o celular e ver uma proposta de marca negociada no valor certo, um plano claro para a semana e gente torcendo por você. Isso começa com uma análise de 2 minutos.</p>
            <a className="button" href="#analise">Quero fazer parte da Vallmook <ArrowRight size={15} /></a>
            <p className="hero-note">Análise gratuita <span aria-hidden="true">·</span> Sem compromisso <span aria-hidden="true">·</span> Continue pelo WhatsApp</p>
          </div>
        </section>

        <section className="brand-block" id="marcas" aria-labelledby="brand-title">
          <div className="container brand-block-inner">
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
              <a href="#como-funciona">Como funciona</a>
              <a href="#para-quem">Para quem é</a>
              <a href="#duvidas">Dúvidas</a>
              <a href="#analise">Análise de perfil</a>
              <a href="#marcas">Contato comercial</a>
            </nav>
          </div>
          <div className="footer-bottom">
            <span>© 2026 Vallmook Agency. Todos os direitos reservados.</span>
            <span className="footer-legal"><span>A mensagem só é enviada depois da sua confirmação no WhatsApp.</span><span>BRASIL · DIGITAL</span></span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
