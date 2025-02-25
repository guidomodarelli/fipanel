import type { NextRequest } from 'next/server';

export const revalidate = 900; // 15 minutes

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const rssUrl = searchParams.get('url');

    if (!rssUrl) {
      return new Response('Missing `url` in query parameters', { status: 400 });
    }

    const response = await fetch(rssUrl);
    if (!response.ok) {
      return new Response('Error fetching RSS feed', { status: response.status });
    }

    const data = await response.text();

    return new Response(data, {
      status: 200,
      headers: { 'Content-Type': 'application/xml' },
    });
  } catch (error) {
    return new Response('Error fetching RSS feed', { status: 500 });
  }
}
