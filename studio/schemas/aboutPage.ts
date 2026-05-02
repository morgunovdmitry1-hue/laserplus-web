import { defineField, defineType } from 'sanity';

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'Страница «О клинике»',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({ name: 'badge', title: 'Бейдж', type: 'string', initialValue: 'С 2017 года в Новосибирске' }),
    defineField({ name: 'title', title: 'Заголовок H1', type: 'string', initialValue: 'Клиника' }),
    defineField({ name: 'titleAccent', title: 'Акцентная часть', type: 'string', initialValue: 'Laser Plus' }),
    defineField({ name: 'intro', title: 'Вводный текст', type: 'text', rows: 4, initialValue: 'Специализированная сеть клиник лазерной эпиляции. Мы не делаем маникюр, массаж и «всё подряд» — только лазерная эпиляция, только профессиональное оборудование, только результат.' }),
    defineField({
      name: 'stats', title: 'Статистика', type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'value', title: 'Значение', type: 'string' }),
          defineField({ name: 'label', title: 'Подпись', type: 'string' }),
        ],
        preview: { select: { title: 'value', subtitle: 'label' } },
      }],
    }),
    defineField({
      name: 'license', title: 'Блок «Медицинская лицензия»', type: 'object',
      fields: [
        defineField({ name: 'title', title: 'Заголовок', type: 'string', initialValue: 'Медицинская лицензия' }),
        defineField({ name: 'text1', title: 'Первый абзац', type: 'text', rows: 3 }),
        defineField({ name: 'text2', title: 'Второй абзац', type: 'text', rows: 3 }),
        defineField({ name: 'badgeLabel', title: 'Подпись значка лицензии', type: 'string', initialValue: 'Лицензия Министерства здравоохранения' }),
        defineField({ name: 'badgeSub', title: 'Подзаголовок значка', type: 'string', initialValue: 'Новосибирская область' }),
      ],
    }),
    defineField({
      name: 'positioning', title: 'Блок «Почему только лазер»', type: 'object',
      fields: [
        defineField({ name: 'title', title: 'Заголовок', type: 'string', initialValue: 'Почему только лазер?' }),
        defineField({ name: 'items', title: 'Пункты', type: 'array', of: [{ type: 'string' }] }),
      ],
    }),
    defineField({
      name: 'values', title: 'Наши принципы', type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'title', title: 'Название', type: 'string' }),
          defineField({ name: 'text', title: 'Текст', type: 'text', rows: 2 }),
        ],
        preview: { select: { title: 'title' } },
      }],
    }),
    defineField({ name: 'seoTitle', title: 'SEO: Title', type: 'string' }),
    defineField({ name: 'seoDescription', title: 'SEO: Description', type: 'text', rows: 2 }),
  ],
  preview: { prepare: () => ({ title: 'О клинике' }) },
});
