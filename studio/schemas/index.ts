import { service } from './service';
import { packageSchema } from './package';
import { faq } from './faq';
import { review } from './review';
import { caseSchema } from './case';
import { siteSettings } from './siteSettings';
import { homePage } from './homePage';
import { aboutPage } from './aboutPage';
import { technologyPage } from './technologyPage';
import { menPage } from './menPage';
import { promotion } from './promotion';

export const schemaTypes = [
  // Pages
  homePage, aboutPage, technologyPage, menPage,
  // Content collections
  service, packageSchema, faq, review, caseSchema, promotion,
  // Settings
  siteSettings,
];
