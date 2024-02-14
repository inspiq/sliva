import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: { domains: ['firebasestorage.googleapis.com'] },
};

export default withNextIntl(nextConfig);
