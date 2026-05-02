export const SITE = {
  name: 'Laser Plus',
  url: 'https://laserplusnsk.ru',
  description:
    'Сеть клиник лазерной эпиляции в Новосибирске. Александритовый лазер Candela GentlePro, медицинская лицензия.',
  phone: '+7 (383) 000-00-00',
  email: 'info@laserplusnsk.ru',
  city: 'Новосибирск',
} as const;

export const CLINICS = [
  {
    id: 'krasny-prospekt',
    name: 'Красный Проспект',
    address: 'Красный Проспект, 94',
    phone: '+7 (383) 000-00-00',
    metro: 'Красный Проспект',
    workingHours: { weekdays: '10:00–21:00', weekends: '10:00–20:00' },
  },
  {
    id: 'oktyabrskaya',
    name: 'Октябрьская',
    address: 'ул. Октябрьская / Сакко и Ванцетти',
    phone: '+7 (383) 000-00-00',
    metro: 'Площадь Ленина',
    workingHours: { weekdays: '10:00–21:00', weekends: '10:00–20:00' },
  },
] as const;

export const SOCIAL = {
  instagram: 'https://instagram.com/laserplus_nsk',
  vk: 'https://vk.com/laserplus_nsk',
  telegram: 'https://t.me/laserplus_nsk',
  whatsapp: 'https://wa.me/73830000000',
} as const;

export const NAV_LINKS = [
  { href: '/services/', label: 'Услуги' },
  { href: '/prices/', label: 'Цены' },
  { href: '/technology/', label: 'Оборудование' },
  { href: '/before-after/', label: 'До/после' },
  { href: '/about/', label: 'О клинике' },
  { href: '/blog/', label: 'Блог' },
  { href: '/contacts/', label: 'Контакты' },
] as const;
