import { defineField, defineType } from 'sanity';

export const homePage = defineType({
  name: 'homePage',
  title: 'Главная страница',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({
      name: 'hero', title: 'Герой (первый экран)', type: 'object',
      fields: [
        defineField({ name: 'badge', title: 'Бейдж над заголовком', type: 'string', initialValue: 'Медицинская лицензия · Candela GentlePro' }),
        defineField({ name: 'title', title: 'Заголовок H1', type: 'string', initialValue: 'Лазерная эпиляция' }),
        defineField({ name: 'titleAccent', title: 'Акцентная часть заголовка', type: 'string', initialValue: 'в Новосибирске' }),
        defineField({ name: 'description', title: 'Описание', type: 'text', rows: 3, initialValue: 'Избавьтесь от нежелательных волос навсегда. Александритовый лазер Candela — мировой стандарт качества. Результат с первой процедуры.' }),
        defineField({ name: 'ctaPrimary', title: 'Кнопка: основная', type: 'string', initialValue: 'Записаться онлайн' }),
        defineField({ name: 'ctaSecondary', title: 'Кнопка: дополнительная', type: 'string', initialValue: 'Посмотреть цены' }),
      ],
    }),
    defineField({
      name: 'stats', title: 'Статистика под героем', type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'value', title: 'Значение', type: 'string' }),
          defineField({ name: 'label', title: 'Подпись', type: 'string' }),
        ],
        preview: { select: { title: 'value', subtitle: 'label' } },
      }],
      initialValue: [
        { value: '7+', label: 'лет работы' },
        { value: '5 000+', label: 'довольных клиентов' },
        { value: '2', label: 'клиники в городе' },
      ],
    }),
    defineField({
      name: 'trust', title: 'Блок доверия (4 пункта)', type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'title', title: 'Заголовок', type: 'string' }),
          defineField({ name: 'text', title: 'Текст', type: 'text', rows: 2 }),
        ],
        preview: { select: { title: 'title' } },
      }],
    }),
    defineField({
      name: 'cta', title: 'CTA-баннер внизу', type: 'object',
      fields: [
        defineField({ name: 'title', title: 'Заголовок', type: 'string', initialValue: 'Первое посещение — пробная процедура' }),
        defineField({ name: 'text', title: 'Текст', type: 'text', rows: 2, initialValue: 'Убедитесь в результате лично. Запишитесь на пробную процедуру и получите консультацию специалиста.' }),
        defineField({ name: 'button', title: 'Кнопка', type: 'string', initialValue: 'Записаться онлайн' }),
      ],
    }),
    defineField({ name: 'seoTitle', title: 'SEO: Title', type: 'string' }),
    defineField({ name: 'seoDescription', title: 'SEO: Description', type: 'text', rows: 2 }),
  ],
  preview: { prepare: () => ({ title: 'Главная страница' }) },
});
