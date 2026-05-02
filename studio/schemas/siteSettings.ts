import { defineField, defineType } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Настройки сайта',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({ name: 'siteName', title: 'Название клиники', type: 'string' }),
    defineField({ name: 'phone', title: 'Телефон', type: 'string' }),
    defineField({ name: 'email', title: 'Email', type: 'string' }),
    defineField({ name: 'metaDescription', title: 'SEO: Описание по умолчанию', type: 'text', rows: 3 }),
    defineField({
      name: 'clinics', title: 'Клиники', type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'id', title: 'ID (slug)', type: 'string' }),
          defineField({ name: 'name', title: 'Название', type: 'string' }),
          defineField({ name: 'address', title: 'Адрес', type: 'string' }),
          defineField({ name: 'phone', title: 'Телефон', type: 'string' }),
          defineField({ name: 'metro', title: 'Метро', type: 'string' }),
          defineField({
            name: 'workingHours', title: 'Часы работы', type: 'object',
            fields: [
              defineField({ name: 'weekdays', title: 'Пн–Пт', type: 'string' }),
              defineField({ name: 'weekends', title: 'Сб–Вс', type: 'string' }),
            ],
          }),
          defineField({
            name: 'geo', title: 'Координаты', type: 'object',
            fields: [
              defineField({ name: 'lat', title: 'Широта', type: 'number' }),
              defineField({ name: 'lng', title: 'Долгота', type: 'number' }),
            ],
          }),
        ],
        preview: { select: { title: 'name', subtitle: 'address' } },
      }],
    }),
    defineField({
      name: 'social', title: 'Соцсети', type: 'object',
      fields: [
        defineField({ name: 'vk', title: 'ВКонтакте', type: 'url' }),
        defineField({ name: 'instagram', title: 'Instagram', type: 'url' }),
        defineField({ name: 'telegram', title: 'Telegram', type: 'url' }),
      ],
    }),
  ],
  preview: {
    select: { title: 'siteName' },
  },
});
