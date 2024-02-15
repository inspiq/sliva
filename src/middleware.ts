import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';

import { localePrefix, locales } from 'src/navigation';

const nextIntlMiddleware = createMiddleware({
  locales,
  localePrefix,
  defaultLocale: 'en',
  localeDetection: false,
});

// eslint-disable-next-line import/no-anonymous-default-export
export default function (req: NextRequest): NextResponse {
  return nextIntlMiddleware(req);
}

export const config = {
  matcher: ['/', '/(en|ru|es)/:path*'],
};
