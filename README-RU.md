# Сайт психолога Жанны Тарабановой

Исходники одностраничного сайта-визитки на React, TypeScript и Vite.

Проект собирается в статические файлы и может независимо размещаться на обычном VPS через Docker и Nginx. Привязка к ChatGPT Sites, `.openai/hosting.json`, Cloudflare Workers, Vinext, БД и серверные API не требуются.

## Требования для разработки

- Node.js 22.13 или новее
- npm
- Docker и Docker Compose для проверки контейнера

## Запуск из IntelliJ IDEA

1. Откройте папку проекта: `/Users/alex/Downloads/zhanna-psychologist-site-source`.
2. Убедитесь, что IDEA использует Node.js 22 или новее.
3. В терминале IDEA выполните:

```bash
nvm use
npm ci
npm run dev
```

После запуска Vite покажет локальный адрес. Обычно это:

```text
http://127.0.0.1:5173
```

Если порт занят, Vite выберет следующий свободный порт.

## Локальная проверка без Docker

```bash
nvm use
npm ci
npm run dev
```

Production-сборка:

```bash
npm run build
```

Результат сборки появится в каталоге `dist/`.

## GitHub Pages и домен

Сайт публикуется как статическая сборка Vite через GitHub Pages. Основной production-домен:

```text
https://jeanna-psy.ru/
```

Файл `public/CNAME` должен оставаться в проекте: при сборке он попадает в `dist/CNAME` и сохраняет custom domain в GitHub Pages.

SEO-URL в `index.html`, `public/robots.txt` и `public/sitemap.xml` должны указывать на `https://jeanna-psy.ru/`, а не на технический адрес `github.io`.

## Docker

Сборка образа:

```bash
docker compose build
```

Запуск контейнера:

```bash
docker compose up -d --build
```

Контейнер публикует сайт только на loopback-интерфейсе:

```yaml
ports:
  - "127.0.0.1:8080:80"
```

Порты `80` и `443` VPS не открываются. `network_mode: host` не используется.

Проверка ответа:

```bash
curl -I http://127.0.0.1:8080
```

Просмотр состояния:

```bash
docker compose ps
```

Просмотр логов:

```bash
docker compose logs -f
```

Остановка:

```bash
docker compose down
```

## Копирование проекта на VPS

Через `rsync`:

```bash
rsync -av --delete \
  --exclude .git \
  --exclude node_modules \
  --exclude dist \
  --exclude .sites-runtime \
  --exclude .wrangler \
  /Users/alex/Downloads/zhanna-psychologist-site-source/ \
  root@144.31.196.195:/opt/zhanna-psychologist-site/
```

Или через `scp` архивом:

```bash
cd /Users/alex/Downloads
tar --exclude node_modules --exclude dist --exclude .git --exclude .sites-runtime --exclude .wrangler \
  -czf zhanna-psychologist-site-source.tar.gz zhanna-psychologist-site-source
scp zhanna-psychologist-site-source.tar.gz root@144.31.196.195:/opt/
```

На VPS после копирования:

```bash
cd /opt/zhanna-psychologist-site
docker compose up -d --build
curl -I http://127.0.0.1:8080
docker compose ps
```

## Проверка с Mac через SSH-туннель

На Mac:

```bash
ssh -L 8080:127.0.0.1:8080 root@144.31.196.195
```

Пока SSH-сессия открыта, сайт будет доступен на Mac:

```text
http://localhost:8080
```

## Основные файлы

- `src/main.tsx` — точка входа Vite/React.
- `app/page.tsx` — содержимое страницы.
- `app/globals.css` — дизайн и адаптивная вёрстка.
- `public/zhanna.jpg` — фотография Жанны.
- `Dockerfile` — многоэтапная сборка: Node.js 22 для build, Nginx для runtime.
- `deploy/nginx.conf` — конфигурация Nginx для SPA.
- `docker-compose.yml` — локальная публикация на `127.0.0.1:8080`.

## Ссылки

Все Telegram-кнопки ведут на:

```text
https://t.me/Jeanna_T
```

## Важно

На текущем этапе не нужно менять Xray, OpenVPN, firewall, DNS, SSL и системные службы VPS. HTTPS и внешний reverse proxy можно подключить позднее отдельным шагом.
