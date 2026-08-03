import { createClient, type QueryParams, type SanityClient } from '@sanity/client';

// import.meta.env в проекте не типизирован, поэтому сужаем тип точечно здесь.
const env = import.meta.env as {
  PUBLIC_SANITY_PROJECT_ID?: string;
  PUBLIC_SANITY_DATASET?: string;
};

const projectId = env.PUBLIC_SANITY_PROJECT_ID ?? '';
const dataset = env.PUBLIC_SANITY_DATASET ?? 'production';

export function isSanityConfigured(): boolean {
  return Boolean(projectId);
}

// Клиент создаём только когда задан projectId: без него @sanity/client
// выбрасывает исключение прямо при импорте модуля и роняет весь билд.
// Все обращения к клиенту в проекте закрыты проверкой isSanityConfigured(),
// поэтому без конфигурации сюда вызовов не будет.
let client: SanityClient | null = null;

function getClient(): SanityClient {
  client ??= createClient({
    projectId,
    dataset,
    apiVersion: '2024-01-01',
    useCdn: true,
  });
  return client;
}

export const sanityClient = {
  fetch: <T>(query: string, params?: QueryParams): Promise<T> =>
    getClient().fetch<T>(query, params ?? {}),
};
