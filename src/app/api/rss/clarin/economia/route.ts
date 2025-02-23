import { CLARIN_ECONOMY_RSS } from '@/app/constants';

export async function GET() {
  try {
    const response = await fetch(CLARIN_ECONOMY_RSS, {
      next: { revalidate: 60 * 5 }, // 5 minutes
    });
    const data = await response.text();

    return new Response(data, {
      status: 200,
      headers: { 'Content-Type': 'application/xml' },
    });
  } catch (error) {
    return new Response('Error fetching RSS feed', { status: 500 });
  }
}
