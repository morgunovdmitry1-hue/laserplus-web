import { defineField, defineType } from 'sanity';

export const faq = defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    defineField({ name: 'question', title: 'Вопрос', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'answer', title: 'Ответ', type: 'text', rows: 5, validation: (r) => r.required() }),
    defineField({
      name: 'category', title: 'Категория', type: 'string',
      options: {
        list: [
          { title: 'Общие вопросы', value: 'general' },
          { title: 'О процедуре', value: 'procedure' },
          { title: 'Подготовка', value: 'preparation' },
          { title: 'Противопоказания', value: 'contraindications' },
          { title: 'Результаты', value: 'results' },
          { title: 'Цены и скидки', value: 'price' },
        ],
      },
    }),
    defineField({ name: 'order', title: 'Порядок', type: 'number', initialValue: 0 }),
  ],
  orderings: [{ title: 'Порядок', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'question', subtitle: 'category' },
  },
});
