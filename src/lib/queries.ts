import { sanityClient, isSanityConfigured } from './sanity';
import { getCollection } from 'astro:content';

// ── Services ───────────────────────────────────────────────────────────────

export async function getServices() {
  if (!isSanityConfigured()) {
    const entries = await getCollection('services');
    return entries.map((e) => ({
      _id: e.id,
      slug: e.id,
      title: e.data.title,
      gender: e.data.gender,
      category: e.data.category,
      price: e.data.price,
      duration: e.data.duration,
      sessionsRequired: e.data.sessionsRequired,
      technologies: e.data.technologies,
      metaTitle: e.data.metaTitle,
      metaDescription: e.data.metaDescription,
    }));
  }
  return sanityClient.fetch(`
    *[_type == "service"] | order(price.single asc) {
      _id,
      "slug": slug.current,
      title, gender, category, price, duration,
      sessionsRequired, technologies, metaTitle, metaDescription
    }
  `);
}

export async function getServiceBySlug(slug: string) {
  if (!isSanityConfigured()) {
    const entries = await getCollection('services');
    const entry = entries.find((e) => e.id === slug);
    if (!entry) return null;
    return {
      _id: entry.id,
      slug: entry.id,
      title: entry.data.title,
      gender: entry.data.gender,
      category: entry.data.category,
      price: entry.data.price,
      duration: entry.data.duration,
      sessionsRequired: entry.data.sessionsRequired,
      technologies: entry.data.technologies,
      metaTitle: entry.data.metaTitle,
      metaDescription: entry.data.metaDescription,
    };
  }
  return sanityClient.fetch(
    `*[_type == "service" && slug.current == $slug][0] {
      _id, "slug": slug.current, title, gender, category, price,
      duration, sessionsRequired, technologies, metaTitle, metaDescription, description
    }`,
    { slug }
  );
}

// ── Packages ───────────────────────────────────────────────────────────────

export async function getPackages() {
  if (!isSanityConfigured()) {
    const entries = await getCollection('packages');
    return entries.map((e) => ({
      _id: e.id,
      title: e.data.title,
      subtitle: e.data.subtitle,
      price: e.data.price,
      oldPrice: e.data.oldPrice,
      sessions: e.data.sessions,
      zones: e.data.zones,
      gender: e.data.gender,
      featured: e.data.featured,
    }));
  }
  return sanityClient.fetch(
    `*[_type == "package"] | order(price asc) {
      _id, title, subtitle, price, oldPrice, sessions, zones, gender, featured
    }`
  );
}

// ── FAQ ────────────────────────────────────────────────────────────────────

export async function getFaq() {
  if (!isSanityConfigured()) {
    const entries = await getCollection('faq');
    return entries
      .sort((a, b) => a.data.order - b.data.order)
      .map((e) => ({
        _id: e.id,
        question: e.data.question,
        answer: e.body,
        category: e.data.category,
        order: e.data.order,
      }));
  }
  return sanityClient.fetch(
    `*[_type == "faq"] | order(order asc) { _id, question, answer, category, order }`
  );
}

// ── Reviews ────────────────────────────────────────────────────────────────

export async function getReviews() {
  if (!isSanityConfigured()) {
    const entries = await getCollection('reviews');
    return entries
      .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime())
      .map((e) => ({
        _id: e.id,
        name: e.data.name,
        rating: e.data.rating,
        text: e.data.text,
        date: e.data.date,
        source: e.data.source,
        clinicId: e.data.clinicId,
      }));
  }
  return sanityClient.fetch(
    `*[_type == "review" && published == true] | order(date desc) {
      _id, name, rating, text, date, source, clinicId
    }`
  );
}

// ── Cases ──────────────────────────────────────────────────────────────────

export async function getCases() {
  if (!isSanityConfigured()) {
    const entries = await getCollection('cases');
    return entries.map((e) => ({
      _id: e.id,
      zone: e.data.zone,
      gender: e.data.gender,
      sessionsCompleted: e.data.sessionsCompleted,
      photoBefore: null,
      photoAfter: null,
      story: e.data.story,
      clinicId: e.data.clinicId,
    }));
  }
  return sanityClient.fetch(
    `*[_type == "case" && published == true] | order(_createdAt desc) {
      _id, zone, gender, sessionsCompleted,
      photoBefore { asset->{ url } },
      photoAfter  { asset->{ url } },
      story, clinicId
    }`
  );
}
