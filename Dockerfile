FROM node:22.2.0-bookworm-slim AS base

RUN apt-get update && apt-get upgrade -y && rm -rf /var/lib/apt/lists/*
RUN npm install -g corepack@latest
RUN corepack enable pnpm

FROM base AS deps
WORKDIR /app

COPY package.json pnpm-lock.yaml* ./
RUN pnpm i --frozen-lockfile

FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules 
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
ENV KINDE_ISSUER_URL="https://dummy.kinde.com"
ENV KINDE_SITE_URL="http://localhost:3000"
ENV KINDE_POST_LOGIN_REDIRECT_URL="/dashboard"
ENV KINDE_POST_LOGOUT_REDIRECT_URL="/"
RUN corepack enable pnpm && pnpm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# On crée un user pour la sécurité (ne pas tourner en root)
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# On copie uniquement le dossier "standalone" généré par Next.js
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000

CMD ["node", "server.js"]