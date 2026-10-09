import "./style.css";

type Manga = {
  id: number;
  title: string;
  author: string;
  tag: string;
  chapters: string;
  status: string;
  rating: string;
  cover: string;
  genre: "Shonen" | "Romantika" | "Fantastika" | "Action" | "Sarguzasht" | "Hayotiy";
};

type Chapter = {
  title: string;
  chapter: string;
  time: string;
  accent: string;
};

const mangaShelf: Manga[] = [
  {
    id: 1,
    title: "Solo Leveling",
    author: "Chugong",
    tag: "Action • Fantastika",
    chapters: "179 bob",
    status: "Davom etmoqda",
    rating: "4.9",
    cover:
      "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=900&q=80",
    genre: "Action",
  },
  {
    id: 2,
    title: "Jujutsu Kaisen",
    author: "Gege Akutami",
    tag: "Qorong'u • Jang",
    chapters: "236 bob",
    status: "Davom etmoqda",
    rating: "4.8",
    cover:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80",
    genre: "Shonen",
  },
  {
    id: 3,
    title: "One Piece",
    author: "Eiichiro Oda",
    tag: "Sarguzasht • Komediya",
    chapters: "1120 bob",
    status: "Davom etmoqda",
    rating: "5.0",
    cover:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
    genre: "Sarguzasht",
  },
  {
    id: 4,
    title: "Attack on Titan",
    author: "Hajime Isayama",
    tag: "Drama • Triller",
    chapters: "87 bob",
    status: "Yakunlangan",
    rating: "4.9",
    cover:
      "https://images.unsplash.com/photo-1526481280695-3c4691f1f1f5?auto=format&fit=crop&w=900&q=80",
    genre: "Fantastika",
  },
  {
    id: 5,
    title: "Your Name",
    author: "Makoto Shinkai",
    tag: "Romantika • Drama",
    chapters: "12 bob",
    status: "Yakunlangan",
    rating: "4.8",
    cover:
      "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=900&q=80",
    genre: "Romantika",
  },
  {
    id: 6,
    title: "Frieren",
    author: "Kanehito Yamada",
    tag: "Fantastika • Sir",
    chapters: "58 bob",
    status: "Davom etmoqda",
    rating: "4.9",
    cover:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=80",
    genre: "Fantastika",
  },
  {
    id: 7,
    title: "Spy x Family",
    author: "Tatsuya Endo",
    tag: "Komediya • Shonen",
    chapters: "104 bob",
    status: "Davom etmoqda",
    rating: "4.7",
    cover:
      "https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&w=900&q=80",
    genre: "Shonen",
  },
  {
    id: 8,
    title: "Blue Period",
    author: "Tsubasa Yamaguchi",
    tag: "Hayotiy • Drama",
    chapters: "36 bob",
    status: "Davom etmoqda",
    rating: "4.6",
    cover:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
    genre: "Hayotiy",
  },
];

const updates: Chapter[] = [
  { title: "Oyg'onish yo'li", chapter: "121-bob", time: "1 soat oldin", accent: "#ff6b57" },
  { title: "Temir tovushlar", chapter: "50-bob", time: "3 soat oldin", accent: "#8b5cf6" },
  { title: "Tunda pichoq", chapter: "78-bob", time: "Bugun", accent: "#f59e0b" },
  { title: "Abyss Runner", chapter: "22-bob", time: "Yaqin orada", accent: "#10b981" },
];

const trendingTopics = [
  "Shonen",
  "Romantika",
  "Fantastika",
  "Action",
  "Hayotiy",
  "Sarguzasht",
];

const categoryTabs = ["Barchasi", "Shonen", "Romantika", "Fantastika", "Action", "Sarguzasht", "Hayotiy"];

let selectedTab = "Barchasi";
let searchTerm = "";

const cardTemplate = (manga: Manga) => `
  <article class="manga-card">
    <div class="manga-cover" style="background-image:url('${manga.cover}')">
      <span class="status-pill">${manga.status}</span>
    </div>
    <div class="manga-body">
      <div class="meta-row">
        <span class="tag small">${manga.tag}</span>
        <span class="rating-badge">★ ${manga.rating}</span>
      </div>
      <h3>${manga.title}</h3>
      <p>${manga.author}</p>
      <div class="bottom-row">
        <span>${manga.chapters}</span>
        <button>O'qish</button>
      </div>
    </div>
  </article>
`;

const getFilteredManga = () => {
  return mangaShelf.filter((manga) => {
    const matchesTab = selectedTab === "Barchasi" || manga.genre === selectedTab;
    const haystack = `${manga.title} ${manga.author} ${manga.tag}`.toLowerCase();
    const matchesSearch = haystack.includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });
};

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("App container not found");
}

app.innerHTML = `
  <div class="page-shell">
    <header class="site-header">
      <div class="logo-wrap" aria-label="Manga bosh sahifa">
        <span class="logo-mark">M</span>
        <span class="logo-text">Manga<span>O'zbek</span></span>
      </div>

      <nav class="main-nav" aria-label="Asosiy menyu">
        <a href="#home" class="nav-link active">Bosh sahifa</a>
        <a href="#trending" class="nav-link">Trendlar</a>
        <a href="#popular" class="nav-link">Mashhur</a>
        <a href="#chapters" class="nav-link">Boblar</a>
        <a href="#community" class="nav-link">Jamiyat</a>
      </nav>

      <div class="header-actions">
        <button class="ghost-button">Kirish</button>
        <button class="primary-button">Hozir o'qing</button>
      </div>
    </header>

    <main class="main-layout" id="home">
      <section class="hero-section">
        <div class="hero-copy">
          <span class="eyebrow">Yangi mavsum • 2026</span>
          <h1>Eng yaxshi manga hikoyalarini <span>cheksiz</span> o'qing.</h1>
          <p>
            Harakatli sarguzashtlar, hissiy voqealar va eng yangi nashrlarni bitta platformada toping.
            To'plamingizni yarating va navbatdagi bobni qo'lmang.
          </p>

          <div class="hero-actions">
            <button class="primary-button large">Boshlash</button>
            <button class="secondary-button">Kutubxonani ko'rish</button>
          </div>

          <div class="hero-meta">
            <div>
              <strong>1.2M+</strong>
              <span>O'quvchilar</span>
            </div>
            <div>
              <strong>2400+</strong>
              <span>Nashrlar</span>
            </div>
            <div>
              <strong>4.9/5</strong>
              <span>Baholash</span>
            </div>
          </div>
        </div>

        <div class="hero-visual" aria-label="Tavsiya etilgan manga rasmi">
          <div class="feature-card big-card">
            <span class="tag">Tavsiya</span>
            <div class="cover-stack">
              <img src="https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=80" alt="Tavsiya etilgan manga muqova" />
            </div>
            <div class="feature-details">
              <div>
                <p>Haftaning eng ko'p o'qilgan</p>
                <h2>Black Reaper</h2>
              </div>
              <span class="rating">★ 4.9</span>
            </div>
          </div>
        </div>
      </section>

      <section class="library-bar" aria-label="Manga qidiruv va filtrlash">
        <label class="search-box" aria-label="Manga qidiruvi">
          <span>⌕</span>
          <input id="search-input" type="text" placeholder="Manga yoki muallifni qidiring..." value="${searchTerm}" />
        </label>

        <div class="category-tabs" aria-label="Janrlar">
          ${categoryTabs
            .map(
              (tab) =>
                `<button class="tab-btn ${selectedTab === tab ? "active" : ""}" data-tab="${tab}">${tab}</button>`,
            )
            .join("")}
        </div>
      </section>

      <section class="collection-grid" id="popular">
        <div class="featured-panel">
          <span class="eyebrow compact">Mavsum xususiyati</span>
          <h2>So'nggi xitlar</h2>
          <div class="highlight-list">
            <div>
              <strong>1.</strong>
              <span>Black Reaper</span>
            </div>
            <div>
              <strong>2.</strong>
              <span>Frieren</span>
            </div>
            <div>
              <strong>3.</strong>
              <span>Spy x Family</span>
            </div>
          </div>
        </div>

        <div class="stat-panel">
          <div class="stat-box">
            <span>Uchrashuvchi boblar</span>
            <strong>320+</strong>
          </div>
          <div class="stat-box accent">
            <span>Yangi nashrlar</span>
            <strong>12</strong>
          </div>
          <div class="stat-box">
            <span>O'quvchilar</span>
            <strong>1.2M</strong>
          </div>
        </div>
      </section>

      <section class="top-picks" id="trending">
        <div class="section-heading">
          <div>
            <span class="eyebrow compact">Trenddagi</span>
            <h2>Tanlangan manga</h2>
          </div>
          <button class="text-button">Hammasini ko'rish</button>
        </div>

        <div class="manga-grid" id="manga-grid">
          ${getFilteredManga().map(cardTemplate).join("") || '<div class="empty-state">Hech narsa topilmadi. Boshqa qidiruv soʻzini yozing.</div>'}
        </div>
      </section>

      <section class="spotlight-section">
        <div class="feature-panel">
          <div class="feature-copy">
            <span class="eyebrow compact">Muharrir tanlovi</span>
            <h2>Manga boblarini premium sifatda o'qing</h2>
            <p>
              Tezkor yangilanishlar, silliq o'qish va mukammal tanlangan to'plamlar bilan birga qoling.
            </p>
            <ul>
              <li>Kundalik tezkor yangilanishlar</li>
              <li>Sevimli seriyalarni saqlash</li>
              <li>Reklamasiz premium o'qish</li>
            </ul>
            <button class="primary-button">Kutubxonani ochish</button>
          </div>

          <div class="stack-panel">
            <div class="mini-card highlight">
              <span>Haftalik chiqish</span>
              <strong>12 ta yangi bob</strong>
            </div>
            <div class="mini-card">
              <span>Eng ko'p yoqtirilgan</span>
              <strong>Re:Zero</strong>
            </div>
            <div class="mini-card">
              <span>Yangi janr</span>
              <strong>Romantika • Mystery</strong>
            </div>
          </div>
        </div>
      </section>

      <section class="chapters-section" id="chapters">
        <div class="section-heading">
          <div>
            <span class="eyebrow compact">Yangi yangilanishlar</span>
            <h2>So'nggi boblar</h2>
          </div>
          <button class="text-button">Ko'proq</button>
        </div>

        <div class="chapter-list">
          ${updates
            .map(
              (item) => `
                <article class="chapter-row">
                  <span class="chapter-color" style="background:${item.accent}"></span>
                  <div class="chapter-text">
                    <strong>${item.title}</strong>
                    <span>${item.chapter}</span>
                  </div>
                  <time>${item.time}</time>
                </article>
              `,
            )
            .join("")}
        </div>
      </section>

      <section class="community-section" id="community">
        <div class="community-card">
          <div>
            <span class="eyebrow compact">Jamiyatga qo'shiling</span>
            <h2>Do'stlaringiz nima o'qiyotganini kuzatib boring</h2>
          </div>
          <div class="topic-row">
            ${trendingTopics.map((item) => `<span class="topic-pill">${item}</span>`).join("")}
          </div>
          <button class="primary-button">A'zo bo'lish</button>
        </div>
      </section>
    </main>

    <footer class="site-footer">
      <div class="footer-brand">
        <div class="logo-wrap small">
          <span class="logo-mark">M</span>
          <span class="logo-text">Manga<span>O'zbek</span></span>
        </div>
        <p>O'yinlaringizni yoqadigan hikoyalarni o'qing.</p>
      </div>

      <div class="footer-links">
        <div>
          <h3>Kutubxona</h3>
          <a href="#">Top manga</a>
          <a href="#">Janrlar</a>
          <a href="#">Reyting</a>
        </div>
        <div>
          <h3>Kompaniya</h3>
          <a href="#">Biz haqimizda</a>
          <a href="#">Yordam</a>
          <a href="#">Bog'lanish</a>
        </div>
      </div>
    </footer>
  </div>
`;

const bindLibraryControls = () => {
  const searchInput = document.querySelector<HTMLInputElement>("#search-input");
  const tabButtons = document.querySelectorAll<HTMLButtonElement>(".tab-btn");

  searchInput?.addEventListener("input", (event) => {
    searchTerm = (event.target as HTMLInputElement).value;
    const grid = document.querySelector<HTMLDivElement>("#manga-grid");
    if (!grid) return;
    grid.innerHTML = getFilteredManga().map(cardTemplate).join("") || '<div class="empty-state">Hech narsa topilmadi. Boshqa qidiruv soʻzini yozing.</div>';
  });

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      selectedTab = button.dataset.tab ?? "Barchasi";
      tabButtons.forEach((item) => item.classList.toggle("active", item === button));
      const grid = document.querySelector<HTMLDivElement>("#manga-grid");
      if (!grid) return;
      grid.innerHTML = getFilteredManga().map(cardTemplate).join("") || '<div class="empty-state">Hech narsa topilmadi. Boshqa qidiruv soʻzini yozing.</div>';
    });
  });
};

bindLibraryControls();
