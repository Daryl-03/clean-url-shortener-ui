# Hopper - URL Shortener

A modern URL shortener built with Next.js 15, React 19, and TypeScript.

## Features

- **URL Shortening**: Create and manage short links with custom aliases
- **Analytics**: Track link performance with detailed click analytics  
- **Authentication**: Secure user authentication via Kinde OAuth
- **Responsive Design**: Mobile-first design with Tailwind CSS

## Tech Stack

- **Next.js** 15.5.4 - React framework with App Router
- **React** 19.1.0 - UI library with server components
- **TypeScript** 5.9.2 - Type safety
- **Tailwind CSS** 4.x - Styling
- **Kinde Auth** 2.10.0 - Authentication
- **Playwright** 1.56.1 - E2E testing [1](#1-0) 

## Getting Started

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Set up Kinde authentication environment variables

3. Run development server:
   ```bash
   pnpm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) [2](#1-1) 

## Scripts

- `pnpm run dev` - Start development server
- `pnpm run build` - Create production build
- `pnpm run test-e2e` - Run Playwright tests

## Deployment

The application uses Docker with GitHub Actions CI/CD for automated deployment to production via Dokploy. [3](#1-2) 

---

## Notes

Wiki pages you might want to explore:
- [Architecture (Daryl-03/clean-url-shortener-ui)](/wiki/Daryl-03/clean-url-shortener-ui#2)
- [Application Structure and Routing (Daryl-03/clean-url-shortener-ui)](/wiki/Daryl-03/clean-url-shortener-ui#2.2)
- [Production Environment (Daryl-03/clean-url-shortener-ui)](/wiki/Daryl-03/clean-url-shortener-ui#3.3)

