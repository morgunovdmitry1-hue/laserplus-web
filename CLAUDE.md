# CLAUDE.md — Laser Plus Web

## Бизнес-контекст
Сеть клиник лазерной эпиляции Laser Plus, Новосибирск. Две клиники: Красный Проспект 94 и Октябрьская/Сакко и Ванцетти. Позиционирование: «медицинская клиника с александритовым лазером Candela». Всегда обращаться к клиентам на «Вы».

## Ключевые документы
- ТЗ: `docs/TZ.md` (или `LaserPlus_TZ_ClaudeCode.docx`)
- Sitemap: `docs/sitemap.md` (в разработке)

## Стек
Astro (latest), TypeScript strict, Tailwind CSS 4, pnpm, Cloudflare Pages.

## Команды
```bash
pnpm dev          # локальный сервер на localhost:4321
pnpm build        # production build
pnpm preview      # превью build
pnpm lint         # ESLint
pnpm lint:fix     # ESLint с автоисправлением
pnpm format       # Prettier
pnpm typecheck    # tsc + astro check
```

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
