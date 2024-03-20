import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';

import { localePrefix, locales } from 'src/navigation';

const nextIntlMiddleware = createMiddleware({
  locales,
  localePrefix,
  defaultLocale: 'en',
  localeDetection: false,
});

const handleNextIntlMiddleware = (req: NextRequest): NextResponse => {
  return nextIntlMiddleware(req);
};

export const config = {
  matcher: ['/', '/(en|ru|es)/:path*'],
};

export default handleNextIntlMiddleware;
