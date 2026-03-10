import axios from 'axios';
import * as cheerio from 'cheerio';
import { UrlResult } from '../types';

const DEFAULT_TITLE = 'NO RESPONSE';
const REQUEST_TIMEOUT_MS = 10_000;

function normalizeUrl(url: string): string {
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return `https://${url}`;
  }
  return url;
}

async function fetchTitle(url: string): Promise<UrlResult> {
  const normalizedUrl = normalizeUrl(url);
  try {
    const response = await axios.get<string>(normalizedUrl, {
      timeout: REQUEST_TIMEOUT_MS,
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; TitleFetcher/1.0)' },
    });
    const $ = cheerio.load(response.data);
    const title = $('title').text().trim() || DEFAULT_TITLE;
    return { name: url, title };
  } catch {
    return { name: url, title: DEFAULT_TITLE };
  }
}

export async function fetchTitles(urls: string[]): Promise<UrlResult[]> {
  return Promise.all(urls.map(fetchTitle));
}
