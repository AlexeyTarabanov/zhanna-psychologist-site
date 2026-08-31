import { ArrowUpRight, Brain, Check, HeartHandshake, MapPin, MessageCircle, Monitor, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const requests = [
  { title: "Тревога", text: "Когда мысли не дают выдохнуть, а напряжение стало привычным фоном." },
  { title: "Самооценка", text: "Когда сложно опираться на себя, замечать свои силы и выбирать себя." },
  { title: "Отношения", text: "Когда близость приносит боль, повторяются сценарии или трудно говорить о важном." },
  { title: "Выгорание", text: "Когда сил всё меньше, привычные дела не радуют и хочется вернуть вкус к жизни." },
  { title: "РПП", text: "Когда еда, тело и контроль занимают слишком много места в жизни." },
  { title: "Депрессивные состояния", text: "Когда трудно вставать, чувствовать интерес и верить, что может стать легче." },
];

const education = [
  "Практическая психология — Академия EdPRO, резидент Сколково",
  "Официальный курс 101 по транзактному анализу, сертифицированный EATA",
  "Базовый тренинг по Process Communication Model (PCM)",
  "Полный курс терапии принятия и ответственности (ACT)",
  "Комплексная стратегия работы с нарушениями пищевого поведения — Докмед Академия и Женя Донова",
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="В начало страницы">Жанна Тарабанова</a>
        <nav aria-label="Навигация">
          <a href="#requests">С чем работаю</a><a href="#about">Обо мне</a><a href="#format">Формат</a>
        </nav>
        <Button asChild className="header-cta"><a href="https://t.me/Jeanna_T" target="_blank" rel="noreferrer">Написать в Telegram</a></Button>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><Sparkles aria-hidden="true" /> Психолог для взрослых и подростков</p>
          <h1>Место, где можно быть <em>собой</em></h1>
          <p className="hero-lead">Помогаю бережно разобраться в чувствах, увидеть привычные сценарии и найти опору внутри — без оценок, давления и готовых рецептов.</p>
          <div className="hero-actions">
            <Button asChild size="lg" className="primary-cta"><a href="https://t.me/Jeanna_T" target="_blank" rel="noreferrer">Записаться на консультацию <ArrowUpRight aria-hidden="true" /></a></Button>
            <a className="text-link" href="#format">Как проходят встречи</a>
          </div>
          <div className="quick-facts"><span><Monitor aria-hidden="true" /> Онлайн по всему миру</span><span><MapPin aria-hidden="true" /> Очно в Санкт-Петербурге</span></div>
        </div>
        <div className="portrait-wrap">
          <div className="portrait-shape" aria-hidden="true" />
          <img src="./zhanna.jpg" alt="Психолог Жанна Тарабанова" width={960} height={1200} className="portrait" />
          <div className="portrait-note"><MessageCircle aria-hidden="true" /><span><strong>50–55 минут</strong> спокойного разговора о том, что важно</span></div>
        </div>
      </section>

      <section className="section requests-section" id="requests">
        <div className="section-heading"><p className="eyebrow">С чем можно прийти</p><h2>Не обязательно справляться со всем самостоятельно</h2><p>Можно начать даже с простого: «Мне плохо, но я не понимаю почему».</p></div>
        <div className="request-grid">{requests.map((item, index) => <article className="request-card" key={item.title}><span className="request-number">0{index + 1}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
      </section>

      <section className="quote-section" aria-label="Подход к работе">
        <HeartHandshake aria-hidden="true" />
        <blockquote>«Мне важно, чтобы рядом со мной не нужно было казаться сильнее, спокойнее или “правильнее”, чем вы есть. Терапия для меня — это живой и честный разговор, в котором постепенно становится понятнее: что с вами происходит, чего вы хотите и как можно по-другому».</blockquote>
        <p>Жанна Тарабанова</p>
      </section>

      <section className="section about-section" id="about">
        <div className="about-intro"><p className="eyebrow">Обо мне</p><h2>Наука, практика и уважение к вашему темпу</h2><p>В работе я соединяю современные доказательные подходы и живой человеческий контакт. Не даю универсальных советов, а помогаю найти решения, которые подходят именно вам.</p><div className="practice-row"><span><ShieldCheck aria-hidden="true" /> Личная терапия</span><span><Brain aria-hidden="true" /> Супервизии</span><span><HeartHandshake aria-hidden="true" /> Интервизии</span></div></div>
        <div className="education-card"><h3>Образование и специализации</h3><ul>{education.map(item => <li key={item}><Check aria-hidden="true" /><span>{item}</span></li>)}</ul></div>
      </section>

      <section className="section format-section" id="format">
        <div className="format-copy"><p className="eyebrow">Формат работы</p><h2>Начнём со знакомства и вашего запроса</h2><p>На первой встрече обсудим, что привело вас в терапию и чего вы хотели бы изменить. Дальше будем двигаться в комфортном для вас темпе, периодически сверяясь с целями.</p></div>
        <div className="price-card"><p>Индивидуальная консультация</p><div className="price">3 500 ₽</div><span>50–55 минут</span><hr /><div className="price-details"><span><Monitor aria-hidden="true" /> Онлайн</span><span><MapPin aria-hidden="true" /> Санкт-Петербург</span></div><Button asChild size="lg" className="price-button"><a href="https://t.me/Jeanna_T" target="_blank" rel="noreferrer">Написать Жанне в Telegram <ArrowUpRight aria-hidden="true" /></a></Button></div>
      </section>

      <section className="closing-section"><p className="eyebrow">Можно не ждать, пока станет совсем тяжело</p><h2>Первый шаг — просто написать</h2><p>Расскажите в двух словах, что вас беспокоит, и договоримся о встрече.</p><Button asChild size="lg" className="closing-button"><a href="https://t.me/Jeanna_T" target="_blank" rel="noreferrer">Открыть Telegram <ArrowUpRight aria-hidden="true" /></a></Button></section>

      <footer><div><strong>Жанна Тарабанова</strong><span>Психолог · Санкт-Петербург и онлайн</span></div><p>Психологическая консультация не заменяет медицинскую помощь. При угрозе жизни или здоровью обратитесь в экстренную службу вашего региона.</p><span>© 2026</span></footer>
    </main>
  );
}
