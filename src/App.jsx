import React, { useState, useEffect } from "react";
import "./index.css";

// --- Translations ---
const translations = {
    ru: {
        nav: {
            home: "Главная",
            about: "Обо мне",
            education: "Обучение",
            skills: "Навыки",
            contact: "Контакты",
        },
        hero: {
            title: "Зерде Канат",
            subtitle: "Будущий Преподаватель Химии и Биологии",
            gpa: "GPA: 3.03 / 4.0",
            download: "Скачать CV",
            contact: "Связаться",
        },
        about: {
            title: "Обо мне",
            lead: "Студентка 3 курса Shakarim University, специализирующаяся на педагогике (Химия и Биология).",
            description:
                "Я целеустремленный и ответственный будущий педагог, движимый глубоким интересом к естественным наукам. Моя цель — применять современные методики преподавания, чтобы вдохновлять учеников и развивать у них искренний интерес к химии и биологии. Я верю в сочетание теоретических знаний с практическим применением для создания увлекательной учебной среды.",
        },
        education: {
            title: "Образование",
            uni: "Shakarim University",
            year: "2023 – Настоящее время",
            degree: "Бакалавр педагогики",
            major: "Химия и Биология",
        },
        achievements: {
            title: "Достижения",
            gpa_title: "Академический GPA",
            participation: "Активное участие",
            universiry_events: "Университетские мероприятия",
            seminars: "Научные семинары",
            cert_holder: "Обладатель сертификатов",
        },
        certificates: {
            title: "Сертификаты",
            cert_title: "Сертификат по турецкому языку (B1)",
            open_new: "Открыть в новой вкладке",
            download: "Скачать",
        },
        practice: {
            title: "Педагогическая Практика",
            items: [
                {
                    school: "«№6 гимназия» КММ, г. Семей",
                    date: "12.01.2026 – 13.02.2026",
                    description: "Педагогическая практика, проведение уроков химии и биологии, работа с учащимися.",
                    image: "/practice/gym6.jpg"
                },
                {
                    school: "«Т.Айманов атындағы №16 ОЖББМ» КММ, г. Семей",
                    date: "21.04.2025 – 27.04.2025",
                    description: "Учебная практика, участие в учебном процессе и подготовке методических материалов.",
                    image: "/practice/school16.jpg"
                }
            ],
            gallery: "Галерея практики (Фото будут добавлены)",
        },
        languages: {
            title: "Языки",
            list: [
                { name: "Казахский", level: "Родной" },
                { name: "Русский", level: "A1" },
                { name: "Турецкий", level: "B1", note: "(есть сертификат)" },
            ]
        },
        skills: {
            title: "Профессиональные Навыки",
            chem: "Преподавание Химии",
            bio: "Преподавание Биологии",
            lab: "Лабораторная Работа",
            comm: "Коммуникация",
            class: "Управление Классом",
        },
        contact: {
            title: "Связаться со мной",
            email: "Email",
            telegram: "Telegram",
            phone: "Телефон",
            footer: "© 2026 Зерде Канат. Все права защищены.",
        },
    },
    kz: {
        nav: {
            home: "Басты",
            about: "Мен туралы",
            education: "Білім",
            skills: "Дағдылар",
            contact: "Байланыс",
        },
        hero: {
            title: "Зерде Қанат",
            subtitle: "Болашақ Химия және Биология Мұғалімі",
            gpa: "GPA: 3.03 / 4.0",
            download: "CV Жүктеу",
            contact: "Маған жазу",
        },
        about: {
            title: "Мен туралы",
            lead: "Химия және Биология пәндерінің болашақ мұғалімі, Shakarim University 3-курс студенті.",
            description:
                "Мен жаратылыстану ғылымдарына қызығушылығы зор, жауапкершілігі мол болашақ педагогпын. Менің мақсатым – оқушыларды шабыттандыру және олардың химия мен биологияға деген қызығушылығын арттыру үшін заманауи оқыту әдістерін қолдану. Мен қызықты оқу ортасын құру үшін теориялық білімді практикамен ұштастыруға сенемін.",
        },
        education: {
            title: "Білімі",
            uni: "Shakarim University",
            year: "2023 – Қазіргі уақыт",
            degree: "Педагогика бакалавры",
            major: "Химия және Биология",
        },
        achievements: {
            title: "Жетістіктер",
            gpa_title: "Академиялық GPA",
            participation: "Белсенді қатысу",
            universiry_events: "Университеттік іс-шаралар",
            seminars: "Ғылыми семинарлар",
            cert_holder: "Сертификат иегері",
        },
        certificates: {
            title: "Сертификаттар",
            cert_title: "Түрік тілі сертификаты (B1)",
            open_new: "Жаңа қойындыда ашу",
            download: "Жүктеу",
        },
        practice: {
            title: "Педагогикалық Практика",
            items: [
                {
                    school: "Семей қаласының «№6 гимназиясы» КММ",
                    date: "12.01.2026 – 13.02.2026",
                    description: "Педагогикалық тәжірибе, химия және биология сабақтарын өткізу, оқушылармен жұмыс.",
                    image: "/practice/gym6.jpg"
                },
                {
                    school: "Семей қаласы «Т.Айманов атындағы №16 ОЖББМ» КММ",
                    date: "21.04.2025 – 27.04.2025",
                    description: "Оқу тәжірибесі, сабақ процесіне қатысу және әдістемелік материалдар дайындау.",
                    image: "/practice/school16.jpg"
                }
            ],
            gallery: "Практика галереясы (Фото қосылады)",
        },
        languages: {
            title: "Тілдер",
            list: [
                { name: "Қазақ тілі", level: "Ана тілі" },
                { name: "Орыс тілі", level: "A1 деңгей" },
                { name: "Түрік тілі", level: "B1 деңгей", note: "(сертификат бар)" },
            ]
        },
        skills: {
            title: "Кәсіби Дағдылар",
            chem: "Химияны оқыту",
            bio: "Биологияны оқыту",
            lab: "Зертханалық жұмыс",
            comm: "Коммуникация",
            class: "Сыныпты басқару",
        },
        contact: {
            title: "Байланыс",
            email: "Email",
            telegram: "Telegram",
            phone: "Телефон",
            footer: "© 2026 Зерде Қанат. Барлық құқықтар қорғалған.",
        },
    },
};

// --- SVG Components ---
const IconMolecule = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <circle cx="12" cy="12" r="3" />
        <path d="M14.7 13.5L19 19" />
        <path d="M9.3 10.5L5 5" />
        <circle cx="19" cy="19" r="2" />
        <circle cx="5" cy="5" r="2" />
    </svg>
);

const IconDNA = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M2 15c6.667-6 13.333 0 20-6" />
        <path d="M9 22c1.798-1.998 2.518-3.995 2.807-5.993" />
        <path d="M15 2c-1.798 1.998-2.518 3.995-2.807 5.993" />
        <path d="M17 6l-2.5-2.5" />
        <path d="M14 8l-1-1" />
        <path d="M7 18l2.5 2.5" />
        <path d="M3.5 14.5l.5.5" />
        <path d="M20 9l.5.5" />
        <path d="M6.5 16.5l1-1" />
        <path d="M2 9c6.667 6 13.333 0 20 6" />
    </svg>
);

const IconFlask = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M9 2v24.6l-5.6 9.4A2 2 0 0 0 5.1 19h13.8a2 2 0 0 0 1.7-2.9L15 4.6V2" />
        <path d="M10 2h4" />
        <path d="M10 10h4" />
    </svg>
);

const IconAtom = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <circle cx="12" cy="12" r="1" />
        <path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z" />
        <path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z" />
    </svg>
);

const IconGlobe = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
);

const IconFlag = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
        <line x1="4" y1="22" x2="4" y2="15" />
    </svg>
);

const IconSpeech = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
);

const IconCertificate = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
);

const IconWhatsapp = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
);

const IconInstagram = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
);

const IconMail = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
    </svg>
);


// --- Particle Background Component ---
const ParticleBackground = () => {
    const particles = Array.from({ length: 30 }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        animationDuration: `${Math.random() * 10 + 10}s`,
        animationDelay: `${Math.random() * 5}s`,
        size: `${Math.random() * 10 + 2}px`,
        opacity: Math.random() * 0.5 + 0.1
    }));

    return (
        <div className="particle-container">
            {particles.map(p => (
                <div
                    key={p.id}
                    className="particle"
                    style={{
                        left: p.left,
                        width: p.size,
                        height: p.size,
                        animationDuration: p.animationDuration,
                        animationDelay: p.animationDelay,
                        opacity: p.opacity
                    }}
                />
            ))}
        </div>
    );
};

// --- 3D Molecule Logic ---
const Molecule3D = () => {
    return (
        <div className="atom-scene">
            <div className="atom">
                <div className="nucleus"></div>
                <div className="orbit orbit1"></div>
                <div className="orbit orbit2"></div>
                <div className="orbit orbit3"></div>
            </div>
        </div>
    );
};

function App() {
    const [lang, setLang] = useState("ru");
    const [activeHash, setActiveHash] = useState("");
    const [isScrolled, setIsScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const t = translations[lang];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
            const sections = document.querySelectorAll("section");
            sections.forEach((sec) => {
                const top = sec.offsetTop - 150;
                const bottom = top + sec.offsetHeight;
                if (window.scrollY >= top && window.scrollY < bottom) {
                    setActiveHash(`#${sec.id}`);
                }
            });
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
            setMenuOpen(false);
        }
    };

    const toggleLang = () => {
        setLang((prev) => (prev === "ru" ? "kz" : "ru"));
    };

    const skills = [
        { name: t.skills.chem, level: 90, Icon: IconFlask },
        { name: t.skills.bio, level: 85, Icon: IconDNA },
        { name: t.skills.lab, level: 80, Icon: IconMolecule },
        { name: t.skills.comm, level: 95, Icon: IconGlobe },
        { name: t.skills.class, level: 85, Icon: IconAtom },
    ];

    return (
        <div className="app-container">
            <ParticleBackground />

            {/* Navigation */}
            <nav className={`navbar glass-panel ${isScrolled ? "scrolled" : ""}`}>
                <div className="nav-content">
                    <div className="logo" onClick={() => scrollToSection("home")}>
                        <IconFlask className="logo-icon" /> ZK.
                    </div>

                    <div className={`nav-links ${menuOpen ? "active glass-panel" : ""}`}>
                        {Object.entries(t.nav).map(([key, label]) => (
                            <a
                                key={key}
                                href={`#${key}`}
                                className={activeHash === `#${key}` ? "active neon-text" : ""}
                                onClick={(e) => {
                                    e.preventDefault();
                                    scrollToSection(key);
                                }}
                            >
                                {label}
                            </a>
                        ))}
                    </div>

                    <div className="controls">
                        <button className="lang-btn glass-btn" onClick={toggleLang}>
                            {lang === "ru" ? "🇰🇿 KZ" : "🇷🇺 RU"}
                        </button>
                        <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section id="home" className="hero-section">
                <div className="hero-content fade-in-up">
                    <div className="hero-text">
                        <div className="profile-wrapper">
                            <div className="profile-container">
                                <img src="/profile.jpg" alt="Zerde Kanat" className="profile-img" />
                                <div className="profile-glow"></div>
                            </div>
                        </div>
                        <h1 className="neon-text-lg">{t.hero.title}</h1>
                        <p className="subtitle">{t.hero.subtitle}</p>
                        <div className="gpa-badge glass-panel">
                            <span>{t.hero.gpa}</span>
                        </div>
                        <div className="hero-buttons">
                            <button className="btn btn-primary glow-effect">
                                {t.hero.download}
                            </button>
                            <button className="btn btn-outline glow-effect" onClick={() => scrollToSection("contact")}>
                                {t.hero.contact}
                            </button>
                        </div>
                    </div>
                    <div className="hero-visual">
                        <Molecule3D />
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="section-padding">
                <div className="container glass-panel p-large fade-on-scroll">
                    <h2 className="section-title neon-text">{t.about.title}</h2>
                    <div className="about-content">
                        <p className="lead-text">{t.about.lead}</p>
                        <p>{t.about.description}</p>
                    </div>
                </div>
            </section>

            {/* Education & Achievements */}
            <section id="education" className="section-padding">
                <div className="container">
                    <div className="grid-2">
                        <div className="glass-panel p-medium fade-on-scroll">
                            <h2 className="section-title gradient-text">{t.education.title}</h2>
                            <div className="education-card">
                                <div className="edu-header">
                                    <img
                                        src="/shakarim-logo.png"
                                        alt="Shakarim University Logo"
                                        className="edu-logo"
                                    />
                                    <div>
                                        <h3>{t.education.uni}</h3>
                                        <span className="year">{t.education.year}</span>
                                    </div>
                                </div>
                                <p className="degree">{t.education.degree}</p>
                                <p className="major">{t.education.major}</p>
                                <div className="gpa-box box-glow">{t.hero.gpa}</div>
                            </div>
                        </div>

                        <div className="glass-panel p-medium fade-on-scroll delay-100">
                            <h2 className="section-title gradient-text">{t.achievements.title}</h2>
                            <div className="achievements-list">
                                <div className="achievement-card">
                                    <IconFlask className="ach-icon" />
                                    <div>
                                        <h4>{t.achievements.gpa_title}</h4>
                                        <p>{t.hero.gpa}</p>
                                    </div>
                                </div>
                                <div className="achievement-card">
                                    <IconMolecule className="ach-icon" />
                                    <div>
                                        <h4>{t.achievements.participation}</h4>
                                        <p>{t.achievements.universiry_events}</p>
                                    </div>
                                </div>
                                <div className="achievement-card">
                                    <IconDNA className="ach-icon" />
                                    <div>
                                        <h4>{t.achievements.seminars}</h4>
                                        <p>{t.achievements.cert_holder}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Practice */}
            <section id="practice" className="section-padding">
                <div className="container">
                    <h2 className="section-title neon-text">{t.practice.title}</h2>
                    <div className="practice-grid">
                        {t.practice.items.map((item, idx) => (
                            <div key={idx} className="practice-card glass-panel fade-on-scroll">
                                <div className="practice-header">
                                    <div>
                                        <h3>{item.school}</h3>
                                        <span className="practice-date highlight-text">{item.date}</span>
                                    </div>
                                </div>
                                <p>{item.description}</p>
                                {item.image && (
                                    <img src={item.image} alt="Practice Photo" className="practice-image" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Certificates PDF Embed */}
            <section id="certificates" className="section-padding">
                <div className="container">
                    <h2 className="section-title neon-text">{t.certificates.title}</h2>
                    <div className="certificates-wrapper center-grid">
                        <div className="cert-card glass-panel fade-on-scroll">
                            <h3 className="cert-title">{t.certificates.cert_title}</h3>
                            <iframe
                                src="/certificates/turkish-b1.pdf"
                                title="Turkish Language Certificate"
                                className="pdf-preview"
                            />
                            <div className="cert-actions">
                                <a href="/certificates/turkish-b1.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-outline small-btn">
                                    {t.certificates.open_new}
                                </a>
                                <a href="/certificates/turkish-b1.pdf" download className="btn btn-primary small-btn">
                                    {t.certificates.download}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Skills */}
            <section id="skills" className="section-padding">
                <div className="container">
                    <h2 className="section-title neon-text">{t.skills.title}</h2>
                    <div className="skills-grid">
                        {skills.map((skill, idx) => (
                            <div key={idx} className="skill-card glass-panel fade-on-scroll">
                                <div className="skill-icon-wrapper">
                                    <skill.Icon className="skill-icon" />
                                </div>
                                <h3>{skill.name}</h3>
                                <div
                                    className="skill-circle"
                                    style={{
                                        background: `conic-gradient(var(--primary-green) ${skill.level * 3.6}deg, rgba(255,255,255,0.1) 0deg)`,
                                    }}
                                >
                                    <div className="inner-circle">
                                        <span>{skill.level}%</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Languages */}
            <section id="languages" className="section-padding">
                <div className="container">
                    <h2 className="section-title gradient-text">{t.languages.title}</h2>
                    <div className="languages-grid">
                        {t.languages.list.map((lang, idx) => {
                            let Icon;
                            if (idx === 0) Icon = IconFlag;
                            else if (idx === 1) Icon = IconSpeech;
                            else Icon = IconCertificate;

                            return (
                                <div key={idx} className="lang-card glass-panel fade-on-scroll">
                                    <Icon className="lang-icon-lg spin-slow" />
                                    <div className="lang-info">
                                        <h3>{lang.name}</h3>
                                        <p className="lang-level">{lang.level}</p>
                                        {lang.note && <p className="lang-note">{lang.note}</p>}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Contact */}
            <section id="contact" className="section-padding footer-section">
                <div className="container">
                    <h2 className="section-title text-white neon-text">{t.contact.title}</h2>
                    <div className="contact-wrapper">
                        <a href="https://wa.me/77078287473" target="_blank" rel="noopener noreferrer" className="contact-icon-btn whatsapp">
                            <IconWhatsapp className="c-icon" />
                        </a>
                        <a href="https://instagram.com/_zerdekanat_" target="_blank" rel="noopener noreferrer" className="contact-icon-btn instagram">
                            <IconInstagram className="c-icon" />
                        </a>
                        <a href="mailto:asoltankazy@gmail.com" className="contact-icon-btn email">
                            <IconMail className="c-icon" />
                        </a>
                    </div>
                    <div className="footer">
                        <p>{t.contact.footer}</p>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default App;
