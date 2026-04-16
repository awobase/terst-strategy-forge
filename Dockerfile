FROM node:22-alpine AS builder

WORKDIR /app

ARG VITE_WHATSAPP_PHONE
ENV VITE_WHATSAPP_PHONE=${VITE_WHATSAPP_PHONE}

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginxinc/nginx-unprivileged:stable-alpine AS runner

ENV NODE_ENV=production

COPY --from=builder /app/dist /usr/share/nginx/html
COPY --from=builder /app/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -q -O /dev/null http://127.0.0.1:8080/ || exit 1
