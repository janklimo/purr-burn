import { NextResponse } from 'next/server';

const coins = {
  BONK: 23095,
  FLOKI: 10804,
  PEPE: 24478,
  POPCAT: 28782,
  SHIB: 5994,
  WIF: 28752,
};

const url = 'https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest';
const ids = Object.values(coins).join(',');

const marketCap = (data: any, symbol: keyof typeof coins): number => {
  return (
    data.data[coins[symbol]]?.self_reported_market_cap ||
    data.data[coins[symbol]]?.quote.USD.fully_diluted_market_cap
  );
};

export async function GET() {
  try {
    const response = await fetch(`${url}?id=${ids}`, {
      method: 'GET',
      headers: {
        'X-CMC_PRO_API_KEY': process.env.CMC_API_KEY as string,
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    const result = {
      POPCAT: marketCap(data, 'POPCAT'),
      BONK: marketCap(data, 'BONK'),
      FLOKI: marketCap(data, 'FLOKI'),
      PEPE: marketCap(data, 'PEPE'),
      WIF: marketCap(data, 'WIF'),
      SHIB: marketCap(data, 'SHIB'),
    };

    return NextResponse.json(result, {
      headers: {
        'Cache-Control': 'public, s-maxage=120',
        'CDN-Cache-Control': 'public, s-maxage=120',
        'Vercel-CDN-Cache-Control': 'public, s-maxage=3600',
      },
    });
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 },
    );
  }
}
