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

ARG NEXT_PUBLIC_STAGE
ARG NEXT_BACKEND_URL
ARG NEXT_PUBLIC_REDIRECT_BASE_URL

ENV NEXT_PUBLIC_STAGE=$NEXT_PUBLIC_STAGE
ENV NEXT_PUBLIC_REDIRECT_BASE_URL=$NEXT_PUBLIC_REDIRECT_BASE_URL
ENV NEXT_BACKEND_URL=$NEXT_BACKEND_URL

ENV NEXT_TELEMETRY_DISABLED=1

RUN --mount=type=secret,id=KINDE_ISSUER_URL,env=KINDE_ISSUER_URL \
    --mount=type=secret,id=KINDE_SITE_URL,env=KINDE_SITE_URL \
    --mount=type=secret,id=KINDE_CLIENT_ID,env=KINDE_CLIENT_ID \
    --mount=type=secret,id=KINDE_CLIENT_SECRET,env=KINDE_CLIENT_SECRET \
    --mount=type=secret,id=KINDE_POST_LOGIN_REDIRECT_URL,env=KINDE_POST_LOGIN_REDIRECT_URL \
    --mount=type=secret,id=KINDE_POST_LOGOUT_REDIRECT_URL,env=KINDE_POST_LOGOUT_REDIRECT_URL \
    corepack enable pnpm && pnpm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1


RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs


COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000

CMD ["node", "server.js"]