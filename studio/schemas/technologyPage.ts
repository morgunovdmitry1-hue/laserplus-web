import { defineField, defineType } from 'sanity';

export const technologyPage = defineType({
  name: 'technologyPage',
  title: 'Страница «Технологии»',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({ name: 'title', title: 'Заголовок H1', type: 'string', initialValue: 'Технологии лазерной эпиляции' }),
    defineField({ name: 'description', title: 'Описание под заголовком', type: 'text', rows: 3 }),
    defineField({
      name: 'alexandrite', title: 'Александрит Candela GentlePro', type: 'object',
      fields: [
        defineField({ name: 'label', title: 'Ярлык', type: 'string', initialValue: 'Основная технология' }),
        defineField({ name: 'name', title: 'Название', type: 'string', initialValue: 'Александрит\nCandela GentlePro' }),
        defineField({ name: 'wavelength', title: 'Длина волны', type: 'string', initialValue: '755 нм' }),
        defineField({ name: 'description', title: 'Описание', type: 'text', rows: 4 }),
        defineField({ name: 'indications', title: 'Показания', type: 'array', of: [{ type: 'string' }] }),
        defineField({ name: 'advantages', title: 'Преимущества', type: 'array', of: [{ type: 'string' }] }),
      ],
    }),
    defineField({
      name: 'diode', title: 'Диод IN-MOTION D1', type: 'object',
      fields: [
        defineField({ name: 'label', title: 'Ярлык', type: 'string', initialValue: 'Дополнительная технология' }),
        defineField({ name: 'name', title: 'Название', type: 'string', initialValue: 'Диод\nIN-MOTION D1' }),
        defineField({ name: 'wavelength', title: 'Длина волны', type: 'string', initialValue: '810 нм' }),
        defineField({ name: 'description', title: 'Описание', type: 'text', rows: 4 }),
        defineField({ name: 'indications', title: 'Показания', type: 'array', of: [{ type: 'string' }] }),
        defineField({ name: 'advantages', title: 'Преимущества', type: 'array', of: [{ type: 'string' }] }),
      ],
    }),
    defineField({
      name: 'howItWorks', title: 'Как работает лазер (шаги)', type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'step', title: 'Номер шага', type: 'string' }),
          defineField({ name: 'title', title: 'Заголовок', type: 'string' }),
          defineField({ name: 'desc', title: 'Описание', type: 'text', rows: 2 }),
        ],
        preview: { select: { title: 'title', subtitle: 'step' } },
      }],
    }),
    defineField({ name: 'seoTitle', title: 'SEO: Title', type: 'string' }),
    defineField({ name: 'seoDescription', title: 'SEO: Description', type: 'text', rows: 2 }),
  ],
  preview: { prepare: () => ({ title: 'Технологии' }) },
});
