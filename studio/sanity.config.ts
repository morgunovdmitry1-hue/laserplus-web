import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';

const projectId = process.env.SANITY_STUDIO_PROJECT_ID ?? '';
const dataset = process.env.SANITY_STUDIO_DATASET ?? 'production';

export default defineConfig({
  name: 'laserplus',
  title: 'Laser Plus CMS',
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Контент')
          .items([
            S.listItem().title('Страницы').child(
              S.list().title('Страницы').items([
                S.documentTypeListItem('homePage').title('Главная'),
                S.documentTypeListItem('aboutPage').title('О клинике'),
                S.documentTypeListItem('technologyPage').title('Технологии'),
                S.documentTypeListItem('menPage').title('Мужчинам'),
              ])
            ),
            S.divider(),
            S.documentTypeListItem('service').title('Услуги'),
            S.documentTypeListItem('package').title('Пакеты'),
            S.documentTypeListItem('promotion').title('Акции'),
            S.documentTypeListItem('faq').title('FAQ'),
            S.documentTypeListItem('review').title('Отзывы'),
            S.documentTypeListItem('case').title('До / После'),
            S.divider(),
            S.documentTypeListItem('siteSettings').title('Настройки сайта'),
          ]),
    }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
});
