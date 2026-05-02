# Laser Plus — сайт клиник лазерной эпиляции

Сайт сети клиник лазерной эпиляции Laser Plus в Новосибирске.
[laserplusnsk.ru](https://laserplusnsk.ru)

## Стек

- [Astro](https://astro.build/) — фреймворк
- [TypeScript](https://www.typescriptlang.org/) strict mode
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Preact](https://preactjs.com/) — интерактивные острова
- [pnpm](https://pnpm.io/)
- [Cloudflare Pages](https://pages.cloudflare.com/) — хостинг

## Запуск

```bash
pnpm install
pnpm dev       # localhost:4321
pnpm build
pnpm preview
```

## Разработка

```bash
pnpm lint         # ESLint
pnpm lint:fix     # ESLint с автоисправлением
pnpm format       # Prettier
pnpm typecheck    # TypeScript + Astro check
```

## Структура

```
src/
├── components/
│   ├── layout/    # Header, Footer
│   ├── ui/        # Button, Card, Accordion
│   ├── sections/  # секции страниц
│   ├── booking/   # YClients виджет
│   ├── forms/     # формы
│   ├── seo/       # Schema.org компоненты
│   └── islands/   # Preact острова (.tsx)
├── content/       # Astro Content Collections
├── layouts/       # BaseLayout, ServicePageLayout...
├── pages/         # роутинг
├── styles/        # global.css, tokens.css
└── consts.ts      # константы сайта
```

## Деплой

Push в `main` → автодеплой на Cloudflare Pages.
PR → preview `{branch}.laserplus.pages.dev`.
