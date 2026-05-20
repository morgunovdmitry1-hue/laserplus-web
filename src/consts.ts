export const SITE = {
  name: 'Laser Plus',
  url: 'https://laserplusnsk.ru',
  description:
    'Сеть клиник лазерной эпиляции в Новосибирске. Александритовый лазер Candela GentlePro, медицинская лицензия.',
  phone: '+7-913-917-76-77',
  email: 'info@laserplusnsk.ru',
  city: 'Новосибирск',
} as const;

export const CLINICS = [
  {
    id: 'krasny-prospekt',
    name: 'Гагаринская',
    address: 'Красный Проспект, 94',
    phone: '+7-913-917-76-77',
    metro: 'Гагаринская',
    workingHours: { weekdays: '10:00–21:00', weekends: '10:00–21:00' },
    geo: { lat: 55.0411, lng: 82.9344 },
    yandexOrgId: '31641970248',
    twoGisUrl: 'https://2gis.ru/novosibirsk/geo/70000001050751397',
    twoGisId: '70000001050751397',
  },
  {
    id: 'oktyabrskaya',
    name: 'Октябрьская',
    address: 'ул. Сакко и Ванцетти 25/1',
    phone: '+7-993-017-00-22',
    metro: 'Октябрьская',
    workingHours: { weekdays: '10:00–21:00', weekends: '10:00–21:00' },
    geo: { lat: 54.9884, lng: 82.8964 },
    yandexOrgId: '75479436542',
    twoGisUrl: 'https://2gis.ru/novosibirsk/geo/70000001034458833',
    twoGisId: '70000001034458833',
  },
] as const;

export const SOCIAL = {
  instagram: 'https://instagram.com/laserplus_nsk',
  vk: 'https://vk.ru/laserplus_nsk',
  telegram: 'https://t.me/Laser_Plus_Gagarinskaya',
  whatsapp: 'https://wa.me/message/3S3XINQOYYV7L1',
  max: 'https://max.ru/u/f9LHodD0cOLgs5e1wxj3QQnSYshFybigFDSTWl53mJux8Znrue0a_k6YJpI',
} as const;

export const NAV_LINKS = [
  { href: '/services/', label: 'Услуги' },
  { href: '/packages/', label: 'Абонементы' },
  { href: '/technology/', label: 'Оборудование' },
  { href: '/before-after/', label: 'До/после' },
  { href: '/about/', label: 'О клинике' },
  { href: '/blog/', label: 'Блог' },
  { href: '/contacts/', label: 'Контакты' },
] as const;
