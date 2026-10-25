import type { APIRoute } from 'astro';
import { buildSearchIndex } from '../data/search-index';

export const prerender = true;

export const GET: APIRoute = async () =>
  new Response(JSON.stringify(await buildSearchIndex('uk')), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' }
  });
