# 📘 Zerde Kanat Portfolio — Архитектура и Документация

Этот документ содержит полное описание архитектуры проекта, структуры файлов, используемых технологий и исходный код.

---

## 🛠 Технологический стек

*   **React 18**: Библиотека для построения пользовательского интерфейса. Используется функциональный подход с хуками (`useState`, `useEffect`).
*   **Vite**: Сборщик проекта. Обеспечивает мгновенный запуск dev-сервера и оптимизированную сборку (Build).
*   **CSS3**: Чистый CSS без препроцессоров. Используются CSS Variables (переменные) для легкой темизации и Flexbox/Grid для верстки.
*   **SVG Icons**: Иконки реализованы как React-компоненты (инлайн SVG), что исключает необходимость во внешних библиотеках иконок (как font-awesome), уменьшая размер бандла.

---

## 📂 Структура проекта

```text
Zerdeport/
├── index.html          # Точка входа HTML
├── package.json        # Зависимости и скрипты
├── vite.config.js      # Конфигурация Vite
├── public/             # Статические файлы (favicon и др.)
└── src/
    ├── main.jsx        # Точка входа React (Mounting)
    ├── App.jsx         # ГЛАВНЫЙ КОМПОНЕНТ (Вся логика здесь)
    └── index.css       # ГЛАВНЫЕ СТИЛИ (Весь дизайн здесь)
```

---

## 🧠 Архитектура приложения (`App.jsx`)

Приложение является **Single Page Application (SPA)**, построенным внутри одного основного компонента `App`.

### 1. Компоненты-Иконки
В начале файла определены легкие SVG-компоненты (`IconMolecule`, `IconDNA`, `IconFlask` и др.).
*   **Зачем**: Это делает код переносимым (copy-paste friendly) и избавляет от тяжелых зависимостей.

### 2. Состояние (State)
В `App` используются 3 основных состояния:
*   `activeHash`: Хранит ID текущей видимой секции для подсветки пункта меню.
*   `isScrolled`: Булевое значение (true/false). Если пользователь проскроллил страницу, хедер меняет стиль (становится полупрозрачным).
*   `menuOpen`: Состояние мобильного меню (открыто/закрыто).

### 3. Эффекты (Effects)
*   `useEffect`: Навешивает слушатель события `scroll`.
    *   Отслеживает позицию скролла для изменения хедера.
    *   Реализует "Spy Scroll" — автоматически определяет, какая секция сейчас на экране, и подсвечивает ссылку в меню.

### 4. Данные (Data Ops)
Данные для секций вынесены в массивы объектов (`achievements`, `certificates`, `skills`).
*   **Преимущество**: Легко добавлять новые сертификаты или навыки, просто добавляя объект в массив, не трогая JSX разметку.

### 5. Верстка (JSX)
Структура React-дерева:
*   `<nav>`: Навигация с адаптивным меню-бургером.
*   `<section id="home">`: Hero блок с приветствием.
*   `<section id="about">`: Описание.
*   `<section id="education">` & `<section id="practice">`: Образование и практика.
*   `<section id="skills">`: Прогресс-бары навыков.
*   `<section id="contact">`: Контакты и футер.

---

## 🎨 Архитектура стилей (`index.css`)

Используется подход **CSS Variables** для управления дизайн-системой.

### Переменные (`:root`)
```css
:root {
  --primary-green: #4CAF50;  /* Основной акцентный цвет */
  --secondary-blue: #2196F3; /* Вторичный цвет (молекулы, наука) */
  --soft-green: #E8F5E9;     /* Фон для мягких секций */
  --dark-text: #2c3e50;      /* Цвет текста */
  /* ... и другие */
}
```
Это позволяет менять цветовую гамму всего сайта в одном месте.

### Адаптивность
Используются Медиа-запросы (`@media (max-width: 768px)`):
*   Превращают горизонтальное меню в выпадающее.
*   Меняют Grid-сетку с 2 колонок на 1 для мобильных устройств.
*   Адаптируют размер шрифтов.

### Анимации
*   `@keyframes fadeIn`: Плавное появление элементов снизу вверх.
*   `@keyframes float`: Эффект "плавания" для молекул на заднем фоне.
*   Классы `.fade-in-up` и `.fade-on-scroll` применяются к элементам для оживления интерфейса.

---

## 💻 Полный Исходный Код

### 1. `src/App.jsx` (Логика и Разметка)

```jsx
import React, { useState, useEffect } from "react";
import "./index.css";

// --- Icons (Simple SVG Components) ---
const IconMolecule = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon"><circle cx="12" cy="12" r="3" /><path d="M14.7 13.5L19 19" /><path d="M9.3 10.5L5 5" /><circle cx="19" cy="19" r="2" /><circle cx="5" cy="5" r="2" /></svg>
);
// ... (остальные иконки для краткости скрыты в описании, но есть в файле)

function App() {
  const [activeHash, setActiveHash] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const sections = document.querySelectorAll("section");
      sections.forEach((sec) => {
        const top = sec.offsetTop - 100;
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

  // Данные
  const achievements = [
    { title: "Academic GPA", value: "3.03 / 4.0", icon: <IconFlask /> }, // ...
  ];
  
  // ... (JSX структура, см. файл)
  return (
      <div className="app-container">
          {/* Navigation, Hero, Sections... */}
      </div>
  );
}

export default App;
```

### 2. `src/index.css` (Все Стили)

```css
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;700&display=swap');

:root {
  --primary-green: #4CAF50;
  --secondary-blue: #2196F3;
  --soft-green: #E8F5E9;
  --dark-text: #2c3e50;
  /* ... */
}

body {
  font-family: 'Outfit', sans-serif;
  scroll-behavior: smooth;
}

/* Animations */
@keyframes float {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(20px) scale(1.1); }
}

/* ... (полные стили см. в файле) */
```

---

## 🚀 Как запустить

1.  Установите зависимости:
    ```bash
    npm install
    ```
2.  Запустите локальный сервер:
    ```bash
    npm run dev
    ```
3.  Откройте ссылку в браузере (обычно `http://localhost:5173`).
