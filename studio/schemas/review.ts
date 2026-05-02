import { defineField, defineType } from 'sanity';

export const review = defineType({
  name: 'review',
  title: 'Отзыв',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Имя клиента', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'rating', title: 'Оценка (1–5)', type: 'number', validation: (r) => r.required().min(1).max(5) }),
    defineField({ name: 'text', title: 'Текст отзыва', type: 'text', rows: 5, validation: (r) => r.required() }),
    defineField({ name: 'date', title: 'Дата', type: 'date' }),
    defineField({
      name: 'source', title: 'Источник', type: 'string',
      options: { list: [{ title: 'Сайт', value: 'internal' }, { title: 'Яндекс Карты', value: 'yandex' }, { title: '2ГИС', value: '2gis' }] },
      initialValue: 'internal',
    }),
    defineField({
      name: 'clinicId', title: 'Клиника', type: 'string',
      options: { list: [{ title: 'Красный Проспект', value: 'krasny-prospekt' }, { title: 'Октябрьская', value: 'oktyabrskaya' }] },
    }),
    defineField({ name: 'published', title: 'Опубликован', type: 'boolean', initialValue: true }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'rating' },
    prepare({ title, subtitle }) {
      return { title, subtitle: '★'.repeat(subtitle) };
    },
  },
});
