import { useEffect, useState } from 'react'
import { content } from './content'
import ScienceScene from './ScienceScene'
import './index.css'

function LeafMark() {
  return <svg viewBox="0 0 34 34" fill="none" aria-hidden="true"><path d="M7 27C18 25 25 17 27 5 17 7 9 13 7 27Z" fill="currentColor" opacity=".18"/><path d="M7 27C18 25 25 17 27 5 17 7 9 13 7 27Zm0 0c7-8 12-12 19-17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
}

function Arrow() {
  return <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M3 10h13m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
}

function App() {
  const [language, setLanguage] = useState('ru')
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const t = content[language]

  useEffect(() => {
    document.documentElement.lang = language === 'kz' ? 'kk' : 'ru'
    document.title = `${t.name} — ${t.portfolio}`
    const description = document.querySelector('meta[name="description"]')
    if (description) description.content = `${t.name}. ${t.role}. ${t.practiceIntro}`
  }, [language, t])

  useEffect(() => {
    const id = window.location.hash.slice(1)
    if (!id) return undefined
    const frame = window.requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'instant', block: 'start' })
    })
    return () => window.cancelAnimationFrame(frame)
  }, [])

  useEffect(() => {
    const sections = [...document.querySelectorAll('main section[id]')]
    let frame = 0
    const update = () => {
      frame = 0
      const marker = window.scrollY + Math.min(window.innerHeight * 0.35, 260)
      const current = sections.filter(section => section.getBoundingClientRect().top + window.scrollY <= marker).at(-1)
      setActiveSection(current?.id in content.ru.nav ? current.id : '')
    }
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      window.cancelAnimationFrame(frame)
    }
  }, [])

  return <div className="site-shell">
    <a className="skip-link" href="#main">{t.skip}</a>
    <header className="site-header">
      <div className="page-width header-inner">
        <a href="#home" className="brand" aria-label={`${t.name} — ${t.portfolio}`} onClick={() => setMenuOpen(false)}><LeafMark /><span>{t.name}</span></a>
        <nav id="site-nav" className={`site-nav ${menuOpen ? 'is-open' : ''}`} aria-label={language === 'ru' ? 'Главная навигация' : 'Негізгі навигация'}>
          {Object.entries(t.nav).map(([id, label]) => <a key={id} href={`#${id}`} className={activeSection === id ? 'is-active' : ''} onClick={() => setMenuOpen(false)}>{label}</a>)}
        </nav>
        <div className="header-controls">
          <div className="language-switch" role="group" aria-label={language === 'ru' ? 'Язык сайта' : 'Сайт тілі'}>
            <button type="button" className={language === 'ru' ? 'selected' : ''} aria-pressed={language === 'ru'} onClick={() => { setLanguage('ru'); setMenuOpen(false) }}>RU</button>
            <button type="button" className={language === 'kz' ? 'selected' : ''} aria-pressed={language === 'kz'} onClick={() => { setLanguage('kz'); setMenuOpen(false) }}>KZ</button>
          </div>
          <button type="button" className="menu-button" aria-label={menuOpen ? t.menuClose : t.menuOpen} aria-expanded={menuOpen} aria-controls="site-nav" onClick={() => setMenuOpen(open => !open)}><span/><span/></button>
        </div>
      </div>
    </header>

    <main id="main">
      <section id="home" className="hero page-width" aria-labelledby="hero-title">
        <div className="hero-copy">
          <div className="hero-index"><span>{t.portfolio}</span><span>{t.field}</span></div>
          <h1 id="hero-title">{t.name}</h1>
          <p className="hero-role">{t.role}</p>
          <p className="hero-approach">{t.approach}</p>
          <div className="hero-actions">
            <a href={language === 'ru' ? '/cv-zerde-kanat.pdf' : '/cv-zerde-kanat-kz.pdf'} download className="button button-solid">{t.cv}<Arrow /></a>
            <a href="#contact" className="button button-outline">{t.write}<Arrow /></a>
          </div>
          <div className="hero-facts"><span>{t.heroFacts[0]}</span><span>{t.heroFacts[1]}</span></div>
        </div>
        <div className="hero-visual"><img className="hero-botanical" src="/illustrations/botanical-plate.webp" alt="" aria-hidden="true"/><figure className="hero-portrait"><div className="portrait-frame"><img src="/profile.jpg" alt={language === 'ru' ? 'Портрет Зерде Канат' : 'Зерде Қанаттың портреті'} /></div><figcaption>{t.name} / {t.portfolio}</figcaption><a href="#science" className="portrait-stamp" aria-label={t.view3d}>3D<br/>H₂O</a></figure></div>
      </section>

      <section id="practice" className="section practice-section" aria-labelledby="practice-title"><div className="page-width">
        <div className="section-heading"><span className="section-index" aria-hidden="true">01 / 05</span><h2 id="practice-title">{t.practiceTitle}</h2><p>{t.practiceIntro}</p></div>
        <div className="case-list">{t.cases.map((item, index) => <article className={`case-study case-${index + 1}`} key={item.school}>
          <figure className="case-image"><img src={item.image} alt={item.alt} loading="lazy" /><span className="case-image-number" aria-hidden="true">0{index + 1}</span></figure>
          <div className="case-content"><div className="case-meta"><span>{item.kind}</span><time>{item.period}</time></div><h3>{item.school}</h3><p className="case-summary">{item.summary}</p><div className="case-detail"><h4>{t.work}</h4><ul>{item.actions.map(action => <li key={action}>{action}</li>)}</ul></div><div className="case-result"><span>{t.outcome}</span><p>{item.result}</p></div></div>
        </article>)}</div>
      </div></section>

      <section id="approach" className="section approach-section" aria-labelledby="approach-title"><div className="page-width approach-layout"><div className="approach-mark"><LeafMark/></div><div><h2 id="approach-title">{t.aboutTitle}</h2><p>{t.about}</p></div></div></section>

      <section id="science" className="section science-section" aria-labelledby="science-title"><div className="page-width science-layout"><div className="science-copy"><span className="section-index" aria-hidden="true">02 / 05</span><h2 id="science-title">{t.scienceTitle}</h2><p>{t.science}</p><small>{t.schematic}</small></div><ScienceScene labels={t} /></div></section>

      <section id="education" className="section education-section" aria-labelledby="education-title"><div className="page-width"><div className="section-heading"><span className="section-index" aria-hidden="true">03 / 05</span><h2 id="education-title">{t.educationTitle}</h2><p>{t.educationIntro}</p></div><div className="education-card"><img src="/shakarim-logo.png" alt="" loading="lazy"/><div><h3>Shakarim University</h3><p>{t.degree} · {t.major}</p><time>{t.studyPeriod}</time></div><div className="education-gpa"><span>{t.gpa}</span><strong>3.12 <small>/ 4.0</small></strong></div></div></div></section>

      <section id="skills" className="section skills-section" aria-labelledby="skills-title"><div className="page-width"><div className="section-heading"><span className="section-index" aria-hidden="true">04 / 05</span><h2 id="skills-title">{t.skillsTitle}</h2><p>{t.skillsIntro}</p></div><div className="skills-list">{t.skills.map((skill, index) => <article className="skill-row" key={skill.title}><span className="skill-count">{String(index + 1).padStart(2, '0')}</span><h3>{skill.title}</h3><p>{skill.detail}</p></article>)}</div><div className="languages"><h3>{t.languagesTitle}</h3><div>{t.languages.map(([name, level]) => <p key={name}><strong>{name}</strong><span>{level}</span></p>)}</div></div></div></section>

      <section id="certificates" className="section certificate-section" aria-labelledby="certificate-title"><div className="page-width certificate-layout"><div><span className="section-index" aria-hidden="true">05 / 05</span><h2 id="certificate-title">{t.certificateTitle}</h2><h3>{t.certificateName}</h3><p>{t.certificateText}</p><div className="certificate-actions"><a href="/certificates/turkish-b1.pdf" target="_blank" rel="noopener noreferrer">{t.openCertificate}<Arrow/></a><a href="/certificates/turkish-b1.pdf" download>{t.downloadCertificate}<Arrow/></a></div></div><div className="certificate-preview"><img src="/certificates/turkish-b1-preview.webp" alt={language === 'ru' ? 'Сертификат Зерде Канат по турецкому языку уровня B1' : 'Зерде Қанаттың түрік тілі B1 деңгейіндегі сертификаты'} loading="lazy" /></div></div></section>

      <section id="contact" className="section contact-section" aria-labelledby="contact-title"><div className="page-width contact-layout"><div><h2 id="contact-title">{t.contactTitle}</h2><p>{t.contactText}</p></div><div className="contact-links"><a href="https://wa.me/77078287473" target="_blank" rel="noopener noreferrer">{t.whatsapp}<Arrow/></a><a href="mailto:asoltankazy@gmail.com">{t.email}<Arrow/></a><a href="https://instagram.com/_zerdekanat_" target="_blank" rel="noopener noreferrer">{t.instagram}<Arrow/></a></div></div></section>
    </main>
    <footer className="site-footer"><div className="page-width"><span>© {new Date().getFullYear()} {t.name}. {t.footer}</span><a href="#home">{t.name} ↑</a></div></footer>
  </div>
}

export default App
