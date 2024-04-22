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
      BONK: data.data[coins.BONK]?.quote.USD.fully_diluted_market_cap,
      FLOKI: data.data[coins.FLOKI]?.quote.USD.fully_diluted_market_cap,
      PEPE: data.data[coins.PEPE]?.quote.USD.fully_diluted_market_cap,
      POPCAT: data.data[coins.POPCAT]?.quote.USD.fully_diluted_market_cap,
      SHIB: data.data[coins.SHIB]?.quote.USD.fully_diluted_market_cap,
      WIF: data.data[coins.WIF]?.quote.USD.fully_diluted_market_cap,
    };

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 },
    );
  }
}
