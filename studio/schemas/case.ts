import { defineField, defineType } from 'sanity';

export const caseSchema = defineType({
  name: 'case',
  title: 'До / После',
  type: 'document',
  fields: [
    defineField({ name: 'zone', title: 'Зона', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'gender', title: 'Пол', type: 'string',
      options: { list: [{ title: 'Женская', value: 'female' }, { title: 'Мужская', value: 'male' }] },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'sessionsCompleted', title: 'Пройдено процедур', type: 'number' }),
    defineField({
      name: 'photoBefore', title: 'Фото ДО', type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'photoAfter', title: 'Фото ПОСЛЕ', type: 'image',
      options: { hotspot: true },
    }),
    defineField({ name: 'story', title: 'Комментарий', type: 'text', rows: 3 }),
    defineField({
      name: 'clinicId', title: 'Клиника', type: 'string',
      options: { list: [{ title: 'Красный Проспект', value: 'krasny-prospekt' }, { title: 'Октябрьская', value: 'oktyabrskaya' }] },
    }),
    defineField({ name: 'published', title: 'Опубликован', type: 'boolean', initialValue: true }),
  ],
  preview: {
    select: { title: 'zone', subtitle: 'sessionsCompleted', media: 'photoAfter' },
    prepare({ title, subtitle, media }) {
      return { title, subtitle: subtitle ? `${subtitle} процедур` : '', media };
    },
  },
});
