// Названия зон в именительном падеже для таблиц и списков.
// Заголовки услуг стоят в родительном («Лазерная эпиляция подмышек»), поэтому автоматически их не сократить.
// Ключ — slug услуги из src/content/services. Мужские зоны — без пометки «(мужская)»: она понятна из раздела.
export const ZONE_NAMES: Record<string, string> = {
  areoly: 'Ареолы',
  'bikini-klassika': 'Бикини классическое',
  byodra: 'Бёдра',
  'dorozhka-na-zhivote': 'Дорожка на животе',
  'glubokoye-bikini': 'Бикини глубокое',
  goleni: 'Голени',
  grud: 'Грудь',
  'kisti-ruk': 'Кисти рук',
  'lico-polnostyu': 'Лицо полностью',
  'mezhyagod-poloska': 'Межъягодичная полоска',
  'nogi-polnostyu': 'Ноги полностью',
  'paltsy-nog': 'Пальцы ног',
  plechi: 'Плечи',
  podborodok: 'Подбородок',
  podmyshki: 'Подмышки',
  poyasnitsa: 'Поясница',
  predplechya: 'Предплечья',
  ruki: 'Руки полностью',
  sheki: 'Щёки',
  shey: 'Шея',
  spina: 'Спина полностью',
  'totalnoe-bikini': 'Бикини тотальное',
  'verhnyaya-guba': 'Верхняя губа',
  viski: 'Виски',
  yagodicy: 'Ягодицы',
  zhivot: 'Живот полностью',
  'men-areoly': 'Ареолы',
  'men-boroda': 'Борода / лицо',
  'men-byodra': 'Бёдра',
  'men-dorozhka': 'Дорожка на животе',
  'men-goleni': 'Голени',
  'men-grud': 'Грудь',
  'men-kisti-ruk': 'Кисти рук',
  'men-lico': 'Лицо полностью',
  'men-mezhyagod': 'Межъягодичная полоска',
  'men-nogi': 'Ноги полностью',
  'men-paltsy-nog': 'Пальцы ног',
  'men-plechi': 'Плечи',
  'men-podborodok': 'Подбородок',
  'men-podmyshki': 'Подмышки',
  'men-poyasnitsa': 'Поясница',
  'men-predplechya': 'Предплечья',
  'men-ruki': 'Руки полностью',
  'men-shey': 'Шея',
  'men-spina': 'Спина полностью',
  'men-verhnyaya-guba': 'Верхняя губа',
  'men-yagodicy': 'Ягодицы',
  'men-zhivot': 'Живот полностью',
};

// Для новой услуги без записи в словаре — заголовок без «Лазерная эпиляция» и пометки пола
export const zoneName = (id: string, title: string) =>
  ZONE_NAMES[id] ??
  title
    .replace(/^Лазерная эпиляция\s*/i, '')
    .replace(/\s*\(мужск[а-я]+\)/g, '')
    .replace(/^./, (c) => c.toUpperCase());
