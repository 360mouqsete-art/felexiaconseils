FROM node:24-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --include=dev
COPY src ./src
COPY scripts ./scripts
COPY public ./public
COPY reference/mylegal ./reference/mylegal
COPY server.mjs ./
ARG SITE_URL=https://felexiaconseils.com
ENV SITE_URL=$SITE_URL
RUN node scripts/build.mjs && npm prune --omit=dev
ENV NODE_ENV=production
ENV PORT=4173
EXPOSE 4173
USER node
CMD ["node", "server.mjs"]
