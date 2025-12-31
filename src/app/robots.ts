import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const isProd = process.env.NEXT_PUBLIC_STAGE === 'production';

  if (isProd) {
    return {
      rules: {
        userAgent: '*',
        allow: '/',
      },
    }
  }

  return {
    rules: {
      userAgent: '*',
      disallow: '/',
    },
  }
}