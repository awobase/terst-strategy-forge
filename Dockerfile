FROM node:22-alpine AS builder

WORKDIR /app

ARG VITE_WHATSAPP_PHONE
ENV VITE_WHATSAPP_PHONE=${VITE_WHATSAPP_PHONE}

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:22-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=8080

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server ./server
COPY --from=builder /app/src/config ./src/config
COPY --from=builder /app/src/assets/trust-partners ./src/assets/trust-partners

RUN mkdir -p data/uploads/trust-partners

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD wget -q -O /dev/null http://127.0.0.1:8080/api/health || exit 1

CMD ["npx", "tsx", "server/index.ts"]
