# CLAUDE.md — Laser Plus Web

## Бизнес-контекст

Сеть клиник лазерной эпиляции Laser Plus, Новосибирск. Две клиники: Красный Проспект 94 и Октябрьская/Сакко и Ванцетти. Позиционирование: «медицинская клиника с александритовым лазером Candela». Всегда обращаться к клиентам на «Вы».

## Ключевые документы

- ТЗ: `docs/TZ.md` (или `LaserPlus_TZ_ClaudeCode.docx`)
- Sitemap: `docs/sitemap.md` (в разработке)

## Стек

Astro 6, TypeScript strict, Tailwind CSS 4, **npm** (`package-lock.json`), **Sanity** (CMS: `@sanity/client`, `@sanity/image-url`).

## Деплой — Timeweb App Platform (НЕ Vercel, НЕ Cloudflare)

**Выкатка: `git push origin main`** → Timeweb собирает и деплоит автоматически. Больше ничего запускать не нужно.

Проверено 25.08.2026: сайт отдаёт `server: Caddy` (Vercel отдавал бы `server: Vercel` + заголовки `x-vercel-*`), а падение сайта в тот день лечилось пополнением баланса **Timeweb**.

> ⚠️ Папка `.vercel/` в проекте — **рудимент**, сайт через Vercel не деплоится. Не ориентироваться на неё и не запускать здесь `vercel --prod`. (Vercel используется у **CRM** `laser-plus-app` — это другой проект.)

**Если сайт отдаёт пустой 404 вообще на всё** (включая `robots.txt` и `favicon.ico`) — это остановленное приложение, чаще всего из-за баланса Timeweb, а не ошибка в коде.

**Пуши, сделанные пока приложение лежало, автодеплоем не подхватываются.** После восстановления нужен триггер:

```bash
git commit --allow-empty -m "chore: trigger redeploy" && git push
```

**Воспроизвести прод-сборку локально** (локальный билд может проходить за счёт `.env`, которого на сервере нет):

```bash
git archive HEAD | tar -x -C /tmp/build && cd /tmp/build && npm ci && npm run build
```

Клиент Sanity инициализируется лениво — не ломать это при рефакторинге: жадная инициализация валит сборку, если переменные окружения недоступны на этапе билда (проверено — валится весь билд, а не одна страница).

## Команды

Пакетный менеджер — **npm** (в проекте `package-lock.json`, а не pnpm-lock).

```bash
npm run dev        # локальный сервер на localhost:4321
npm run build      # production build
npm run preview    # превью build
npm run lint       # ESLint
npm run lint:fix   # ESLint с автоисправлением
npm run format     # Prettier
npm run typecheck  # tsc + astro check
```

> `npm run typecheck` показывает ошибки в `studio/schemas/*` — они предсуществующие, к сайту отношения не имеют.

## Конвенции именования

- Компоненты: `PascalCase.astro` / `.tsx`
- Страницы: `kebab-case.astro`
- Утилиты: `camelCase.ts`
- CSS-переменные: `--kebab-case`
- Content slug: только латиница, kebab-case (стабильны после публикации)

## Что НЕ делать

- Не добавлять библиотеки без обсуждения
- Не использовать Google Analytics (только Яндекс.Метрика)
- Не использовать reCAPTCHA
- Не грузить YClients-виджет на каждой странице — только на `/booking/` и по клику CTA
- Не использовать `any` в TypeScript без обоснования в комментарии
- Не оставлять `console.log` в коде
- Не создавать `git commit` автоматически
- Не использовать эмодзи в UI

## Структура контента

`src/content/` — Astro Content Collections (services, clinics, packages, faq, blog, cases, reviews).
Схемы в `src/content/config.ts`.

## Дизайн-система

Токены: `src/styles/tokens.css`. Глобальные стили: `src/styles/global.css`.
Палитра тентативная до ребрендинга (март–апрель 2026).
