import type { APIRoute } from 'astro';
import { scientificBookTagCounts } from '../../../data/scientificBookPartitions';
import { bibliographyAll } from '../../../data/bibliographyAll';

export const prerender = true;
export const GET: APIRoute = () => new Response(JSON.stringify({
  total: bibliographyAll.length,
  groups: scientificBookTagCounts
}), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
