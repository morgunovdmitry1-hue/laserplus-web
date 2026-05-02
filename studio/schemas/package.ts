import { defineField, defineType } from 'sanity';

export const packageSchema = defineType({
  name: 'package',
  title: 'Пакет',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Название', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'subtitle', title: 'Подзаголовок', type: 'string' }),
    defineField({ name: 'price', title: 'Цена (₽)', type: 'number', validation: (r) => r.required().min(0) }),
    defineField({ name: 'oldPrice', title: 'Старая цена (₽)', type: 'number' }),
    defineField({ name: 'sessions', title: 'Кол-во процедур', type: 'number', validation: (r) => r.required() }),
    defineField({ name: 'zones', title: 'Зоны', type: 'array', of: [{ type: 'string' }] }),
    defineField({
      name: 'gender', title: 'Пол', type: 'string',
      options: { list: [{ title: 'Женский', value: 'female' }, { title: 'Мужской', value: 'male' }, { title: 'Унисекс', value: 'unisex' }] },
      initialValue: 'unisex',
    }),
    defineField({ name: 'featured', title: 'Выделить', type: 'boolean', initialValue: false }),
    defineField({ name: 'description', title: 'Описание', type: 'text', rows: 4 }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'price' },
    prepare({ title, subtitle }) {
      return { title, subtitle: subtitle ? `${subtitle.toLocaleString('ru-RU')} ₽` : '' };
    },
  },
});
