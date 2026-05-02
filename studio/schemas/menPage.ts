import { defineField, defineType } from 'sanity';

export const menPage = defineType({
  name: 'menPage',
  title: 'Страница «Мужчинам»',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({ name: 'badge', title: 'Бейдж', type: 'string', initialValue: 'Мужская лазерная эпиляция' }),
    defineField({ name: 'title', title: 'Заголовок H1', type: 'string', initialValue: 'Лазерная эпиляция' }),
    defineField({ name: 'titleAccent', title: 'Акцентная часть', type: 'string', initialValue: 'для мужчин' }),
    defineField({ name: 'description', title: 'Описание', type: 'text', rows: 3 }),
    defineField({ name: 'benefits', title: 'Преимущества (список)', type: 'array', of: [{ type: 'string' }] }),
    defineField({
      name: 'why', title: 'Почему мужчины выбирают (карточки)', type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'title', title: 'Заголовок', type: 'string' }),
          defineField({ name: 'desc', title: 'Текст', type: 'text', rows: 2 }),
        ],
        preview: { select: { title: 'title' } },
      }],
    }),
    defineField({
      name: 'cta', title: 'CTA-баннер', type: 'object',
      fields: [
        defineField({ name: 'title', title: 'Заголовок', type: 'string', initialValue: 'Мужской пакет — спина + грудь + плечи' }),
        defineField({ name: 'text', title: 'Текст', type: 'string', initialValue: 'Три ключевые зоны, курс 6 процедур — скидка 17% от розничной цены.' }),
      ],
    }),
    defineField({ name: 'seoTitle', title: 'SEO: Title', type: 'string' }),
    defineField({ name: 'seoDescription', title: 'SEO: Description', type: 'text', rows: 2 }),
  ],
  preview: { prepare: () => ({ title: 'Мужчинам' }) },
});
