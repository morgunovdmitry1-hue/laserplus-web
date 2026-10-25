import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: z.object({
    title: z.string(),
    gender: z.enum(['female', 'male', 'unisex']),
    category: z.enum(['basic', 'intimate', 'face', 'premium']),
    price: z.object({
      single: z.number(),
      diode: z.number().optional(),
      course3: z.number().optional(),
      course5: z.number().optional(),
      course6: z.number().optional(),
      course8: z.number().optional(),
      course10: z.number().optional(),
    }),
    duration: z.number(),
    sessionsRequired: z.string(),
    technologies: z.array(z.enum(['alexandrite', 'diode'])),
    availableIn: z.array(z.string()),
    metaTitle: z.string(),
    metaDescription: z.string(),
    ogImage: z.string().optional(),
  }),
});

const clinics = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/clinics' }),
  schema: z.object({
    name: z.string(),
    address: z.string(),
    city: z.string().default('Новосибирск'),
    phone: z.string(),
    yclientsId: z.number().optional(),
    geo: z.object({ lat: z.number(), lng: z.number() }),
    metro: z.string().optional(),
    metroDistance: z.union([z.number(), z.string()]).optional(),
    award: z.string().optional(),
    parkingNote: z.string().optional(),
    parking: z.boolean().default(false),
    workingHours: z.object({
      weekdays: z.string(),
      weekends: z.string(),
    }),
    equipment: z.array(z.string()),
    masters: z.array(z.string()).optional(),
    photos: z.array(z.string()).optional(),
    // Рейтинг филиала на внешних площадках. Нужен и людям на странице,
    // и поисковикам с нейросетями: без него клинику не видно в ответах
    // на вопрос «где лучше» — там цитируют карты и агрегаторы.
    rating: z
      .object({
        source: z.string(),
        value: z.number(),
        ratingCount: z.number(),
        reviewCount: z.number().optional(),
        url: z.string(),
        checkedAt: z.string(),
      })
      .optional(),
    // Ссылки на карточки организации — уходят в sameAs разметки
    maps: z
      .object({
        twogis: z.string().optional(),
        yandex: z.string().optional(),
      })
      .optional(),
    awards: z.array(z.string()).optional(),
  }),
});

const packages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/packages' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    price: z.number(),
    oldPrice: z.number().optional(),
    sessions: z.number(),
    zones: z.array(z.string()),
    gender: z.enum(['female', 'male', 'unisex']).default('unisex'),
    featured: z.boolean().default(false),
  }),
});

const faq = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/faq' }),
  schema: z.object({
    question: z.string(),
    category: z.string(),
    serviceIds: z.array(z.string()).optional(),
    order: z.number().default(0),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    author: z.string(),
    cover: z.string().optional(),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    excerpt: z.string(),
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    // зоны (slug из services) для блока записи с ценами вверху и внизу статьи
    bookingZones: z.array(z.string()).optional(),
  }),
});

const cases = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/cases' }),
  schema: z.object({
    zone: z.string(),
    gender: z.enum(['female', 'male']),
    sessionsCompleted: z.number(),
    photo: z.string(),
    story: z.string().optional(),
    clinicId: z.string().optional(),
  }),
});

const reviews = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/reviews' }),
  schema: z.object({
    rating: z.number().min(1).max(5),
    name: z.string(),
    date: z.string(),
    text: z.string(),
    clinicId: z.string().optional(),
    serviceId: z.string().optional(),
    source: z.enum(['internal', 'yandex', '2gis']).default('internal'),
  }),
});

export const collections = { services, clinics, packages, faq, blog, cases, reviews };
