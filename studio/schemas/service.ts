import { defineField, defineType } from 'sanity';

export const service = defineType({
  name: 'service',
  title: 'Услуга',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Название', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'slug', title: 'URL (slug)', type: 'slug',
      options: { source: 'title', maxLength: 80 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'gender', title: 'Пол', type: 'string',
      options: { list: [{ title: 'Женская', value: 'female' }, { title: 'Мужская', value: 'male' }, { title: 'Унисекс', value: 'unisex' }] },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'category', title: 'Категория', type: 'string',
      options: { list: [{ title: 'Основные зоны', value: 'basic' }, { title: 'Интимные зоны', value: 'intimate' }, { title: 'Лицо', value: 'face' }, { title: 'Крупные зоны', value: 'premium' }] },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'price', title: 'Цены', type: 'object',
      fields: [
        defineField({ name: 'single', title: 'Разовая процедура (₽)', type: 'number', validation: (r) => r.required().min(0) }),
        defineField({ name: 'course6', title: 'Курс 6 процедур (₽)', type: 'number' }),
        defineField({ name: 'course8', title: 'Курс 8 процедур (₽)', type: 'number' }),
      ],
    }),
    defineField({ name: 'duration', title: 'Длительность (мин)', type: 'number', validation: (r) => r.required().min(5) }),
    defineField({ name: 'sessionsRequired', title: 'Количество процедур', type: 'string', initialValue: '6–8' }),
    defineField({
      name: 'technologies', title: 'Технологии', type: 'array',
      of: [{ type: 'string' }],
      options: { list: [{ title: 'Александрит Candela', value: 'alexandrite' }, { title: 'Диод IN-MOTION', value: 'diode' }] },
    }),
    defineField({ name: 'description', title: 'Описание', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'metaTitle', title: 'SEO: Title', type: 'string' }),
    defineField({ name: 'metaDescription', title: 'SEO: Description', type: 'text', rows: 3 }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'price.single', media: 'gender' },
    prepare({ title, subtitle }) {
      return { title, subtitle: subtitle ? `от ${subtitle} ₽` : '' };
    },
  },
});
