/**
 * Migrates local markdown/json content to Sanity dataset.
 * Run: node scripts/migrate-to-sanity.mjs
 */
import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

// Auth token from ~/.config/sanity/config.json
const TOKEN = JSON.parse(fs.readFileSync(path.join(process.env.HOME, '.config/sanity/config.json'), 'utf8')).authToken;

const client = createClient({
  projectId: '9tlo89ni',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: TOKEN,
  useCdn: false,
});

// ── Helpers ────────────────────────────────────────────────────────────────

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) return { data: {}, body: content };
  const data = {};
  const yamlLines = match[1].split('\n');
  for (const line of yamlLines) {
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    let val = line.slice(colonIdx + 1).trim();
    if (val === 'true') data[key] = true;
    else if (val === 'false') data[key] = false;
    else if (!isNaN(val) && val !== '') data[key] = Number(val);
    else if (val.startsWith('"') && val.endsWith('"')) data[key] = val.slice(1, -1);
    else if (val.startsWith("'") && val.endsWith("'")) data[key] = val.slice(1, -1);
    else data[key] = val;
  }
  // Parse nested price object
  const priceMatch = match[1].match(/price:\n(\s+single:\s*(\d+)\n)?(\s+course6:\s*(\d+)\n)?(\s+course8:\s*(\d+)\n)?/);
  if (priceMatch) {
    data.price = {};
    if (priceMatch[2]) data.price.single = Number(priceMatch[2]);
    if (priceMatch[4]) data.price.course6 = Number(priceMatch[4]);
    if (priceMatch[6]) data.price.course8 = Number(priceMatch[6]);
  }
  // Parse arrays
  const arrayMatches = match[1].matchAll(/^(\w+):\n((?:\s+-[^\n]+\n?)+)/gm);
  for (const m of arrayMatches) {
    const arrKey = m[1];
    data[arrKey] = m[2].trim().split('\n').map(l => l.replace(/^\s+-\s*"?/, '').replace(/"$/, '').trim());
  }
  return { data, body: match[2].trim() };
}

function readDir(dir) {
  const fullDir = path.join(ROOT, 'src/content', dir);
  if (!fs.existsSync(fullDir)) return [];
  return fs.readdirSync(fullDir)
    .filter(f => f.endsWith('.md') || f.endsWith('.json'))
    .map(f => ({ file: f, slug: f.replace(/\.(md|json)$/, ''), full: path.join(fullDir, f) }));
}

async function upsert(doc) {
  return client.createOrReplace(doc);
}

// ── Migrate services ───────────────────────────────────────────────────────

async function migrateServices() {
  const files = readDir('services');
  console.log(`\nMigrating ${files.length} services...`);
  for (const { file, slug, full } of files) {
    const { data } = parseFrontmatter(fs.readFileSync(full, 'utf8'));
    const doc = {
      _id: `service-${slug}`,
      _type: 'service',
      title: data.title,
      slug: { _type: 'slug', current: slug },
      gender: data.gender,
      category: data.category,
      price: data.price ?? { single: 0 },
      duration: data.duration ?? 30,
      sessionsRequired: data.sessionsRequired ?? '6–8',
      technologies: data.technologies ?? ['alexandrite'],
      metaTitle: data.metaTitle ?? data.title,
      metaDescription: data.metaDescription ?? '',
    };
    await upsert(doc);
    process.stdout.write(`  ✓ ${slug}\n`);
  }
}

// ── Migrate packages ───────────────────────────────────────────────────────

async function migratePackages() {
  const files = readDir('packages');
  console.log(`\nMigrating ${files.length} packages...`);
  for (const { slug, full } of files) {
    const { data, body } = parseFrontmatter(fs.readFileSync(full, 'utf8'));
    const doc = {
      _id: `package-${slug}`,
      _type: 'package',
      title: data.title,
      subtitle: data.subtitle ?? '',
      price: data.price,
      oldPrice: data.oldPrice,
      sessions: data.sessions,
      zones: data.zones ?? [],
      gender: data.gender ?? 'unisex',
      featured: data.featured ?? false,
      description: body,
    };
    await upsert(doc);
    process.stdout.write(`  ✓ ${slug}\n`);
  }
}

// ── Migrate FAQ ────────────────────────────────────────────────────────────

async function migrateFaq() {
  const files = readDir('faq');
  console.log(`\nMigrating ${files.length} FAQ items...`);
  for (const { slug, full } of files) {
    const { data, body } = parseFrontmatter(fs.readFileSync(full, 'utf8'));
    const doc = {
      _id: `faq-${slug}`,
      _type: 'faq',
      question: data.question,
      answer: body,
      category: data.category ?? 'general',
      order: data.order ?? 0,
    };
    await upsert(doc);
    process.stdout.write(`  ✓ ${data.question?.slice(0, 50)}\n`);
  }
}

// ── Migrate reviews ────────────────────────────────────────────────────────

async function migrateReviews() {
  const files = readDir('reviews');
  console.log(`\nMigrating ${files.length} reviews...`);
  for (const { slug, full } of files) {
    const data = JSON.parse(fs.readFileSync(full, 'utf8'));
    const doc = {
      _id: `review-${slug}`,
      _type: 'review',
      name: data.name,
      rating: data.rating,
      text: data.text,
      date: data.date,
      source: data.source ?? 'internal',
      clinicId: data.clinicId,
      published: true,
    };
    await upsert(doc);
    process.stdout.write(`  ✓ ${data.name}\n`);
  }
}

// ── Migrate cases ──────────────────────────────────────────────────────────

async function migrateCases() {
  const files = readDir('cases');
  console.log(`\nMigrating ${files.length} cases...`);
  for (const { slug, full } of files) {
    const { data, body } = parseFrontmatter(fs.readFileSync(full, 'utf8'));
    const doc = {
      _id: `case-${slug}`,
      _type: 'case',
      zone: data.zone,
      gender: data.gender,
      sessionsCompleted: data.sessionsCompleted ?? 6,
      story: data.story ?? body,
      clinicId: data.clinicId,
      published: true,
    };
    await upsert(doc);
    process.stdout.write(`  ✓ ${data.zone}\n`);
  }
}

// ── Run all ────────────────────────────────────────────────────────────────

(async () => {
  console.log('Starting migration to Sanity project 9tlo89ni...');
  await migrateServices();
  await migratePackages();
  await migrateFaq();
  await migrateReviews();
  await migrateCases();
  console.log('\nMigration complete!');
})().catch((e) => { console.error(e); process.exit(1); });
