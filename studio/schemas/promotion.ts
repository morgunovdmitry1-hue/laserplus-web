import { defineField, defineType } from 'sanity';

export const promotion = defineType({
  name: 'promotion',
  title: 'Акция',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Название акции', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'tag', title: 'Ярлык (напр. «До 31 мая»)', type: 'string' }),
    defineField({ name: 'description', title: 'Описание', type: 'text', rows: 4, validation: (r) => r.required() }),
    defineField({ name: 'dateStart', title: 'Дата начала', type: 'date' }),
    defineField({ name: 'dateEnd', title: 'Дата окончания', type: 'date' }),
    defineField({ name: 'active', title: 'Активна', type: 'boolean', initialValue: true }),
    defineField({ name: 'order', title: 'Порядок отображения', type: 'number', initialValue: 0 }),
  ],
  orderings: [{ title: 'Порядок', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'title', subtitle: 'active' },
    prepare({ title, subtitle }) {
      return { title, subtitle: subtitle ? 'Активна' : 'Не активна' };
    },
  },
});
