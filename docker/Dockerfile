# ─────────────────────────────────────────────────────────────
# Viscocity Landing · Dockerfile
# ─────────────────────────────────────────────────────────────

# ── Base ──────────────────────────────────────────────────────
FROM node:20-slim AS base
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@10.28.1 --activate

# ── Dependencies ──────────────────────────────────────────────
FROM base AS deps
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# ── Builder ───────────────────────────────────────────────────
FROM base AS builder
RUN corepack enable && corepack prepare pnpm@10.28.1 --activate
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build

# ── Runner (nginx) ────────────────────────────────────────────
FROM nginx:alpine AS runner

COPY --from=builder /app/out /usr/share/nginx/html
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
