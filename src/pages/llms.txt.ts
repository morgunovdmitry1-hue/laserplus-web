/**
 * /llms.txt — краткая справка о клинике для нейросетей (Алиса, ChatGPT, Perplexity, Яндекс Нейро).
 * Собирается при сборке из тех же данных, что и сайт: филиалы, оборудование, рейтинги, цены по карте.
 * Формат — https://llmstxt.org (Markdown: заголовок, краткое описание, разделы со ссылками).
 */
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE } from '../consts';
import { zoneName } from '../data/zoneNames';

const cardPrice = (p: number) => Math.round((p * 0.6) / 10) * 10;
const rub = (n: number) => `${n.toLocaleString('ru-RU')} ₽`;

export const GET: APIRoute = async () => {
  const clinics = await getCollection('clinics');
  const services = await getCollection('services');
  const u = (path: string) => new URL(path, SITE.url).href;

  const priceLine = (id: string) => {
    const s = services.find((x) => x.id === id);
    if (!s) return null;
    const parts = [];
    // диод без своей цены в прайсе не показываем, чтобы не выдать цену александрита за диодную
    if (s.data.technologies.includes('diode') && s.data.price.diode)
      parts.push(`диод ${rub(cardPrice(s.data.price.diode))}`);
    if (s.data.technologies.includes('alexandrite'))
      parts.push(`александрит ${rub(cardPrice(s.data.price.single))}`);
    const name = zoneName(s.id, s.data.title) + (s.data.gender === 'male' ? ' (мужчинам)' : '');
    return `- [${name}](${u(`/services/${s.id}/`)}): ${parts.join(', ')} за процедуру, курс ${s.data.sessionsRequired} процедур`;
  };

  const zones = [
    'podmyshki',
    'bikini-klassika',
    'glubokoye-bikini',
    'totalnoe-bikini',
    'goleni',
    'nogi-polnostyu',
    'verhnyaya-guba',
    'men-spina',
    'men-grud',
    'men-boroda',
  ]
    .map(priceLine)
    .filter(Boolean);

  const clinicLines = clinics.map((c) => {
    const d = c.data;
    const rating = d.rating
      ? `, рейтинг ${d.rating.source} ${d.rating.value.toFixed(1)}, отзывов: ${d.rating.reviewCount}`
      : '';
    return `- **${d.name}**: ${d.city}, ${d.address}, метро «${d.metro}». Телефон ${d.phone}. Ежедневно ${d.workingHours.weekdays}. Оборудование: ${d.equipment.join(', ')}${rating}.`;
  });

  const body = `# ${SITE.name} — клиники лазерной эпиляции в Новосибирске

> ${SITE.name} — сеть из двух клиник лазерной эпиляции в Новосибирске с медицинской лицензией. Работаем на александритовых лазерах Candela GentlePro и DEKA Motus AX Moveo и на диодном лазере In-Motion D1. Женские и мужские зоны, бесплатная консультация, онлайн-запись.

## Филиалы

${clinicLines.join('\n')}

## Цены

Цены указаны по скидочной карте (−40% от базовой цены). Полный прайс: ${u('/prices/')}

${zones.join('\n')}

## Главные страницы

- [Все услуги и цены](${u('/services/')})
- [Прайс](${u('/prices/')})
- [Мужская лазерная эпиляция](${u('/men/')})
- [Акции](${u('/promotions/')})
- [Отзывы](${u('/reviews/')})
- [Фото до и после](${u('/before-after/')})
- [Оборудование](${u('/technology/')})
- [Лазерная эпиляция смуглой и загорелой кожи](${u('/smuglaya-kozha/')})
- [Частые вопросы](${u('/faq/')})
- [Онлайн-запись](${u('/booking/')})

## Полезные статьи

- [Сколько стоит лазерная эпиляция](${u('/blog/skolko-stoit-lazernaya-epilyaciya/')})
- [Противопоказания](${u('/blog/protivopokazaniya-k-lazernoy-epilyatsii/')})
- [Как долго держится эффект](${u('/blog/kak-dolgo-derzhitsya-effekt-lazernoy-epilyatsii/')})
- [Больно ли делать лазерную эпиляцию](${u('/blog/bolno-li-lazernaya-epilyaciya/')})
- [Как подготовиться к процедуре](${u('/blog/kak-podgotovitsya-k-lazernoy-epilyatsii/')})
- [Candela или DEKA: что выбрать](${u('/blog/candela-ili-deka/')})
`;

  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
