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

console.log(`Current stage: ${process.env.NEXT_PUBLIC_STAGE}`); //TODO: remove this line after debugging

  return {
    rules: {
      userAgent: '*',
      disallow: '/',
    },
  }
}