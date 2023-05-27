FROM node:18-alpine3.17

ENV NODE_ENV production

WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

RUN chown -R nextjs:nodejs ./.next

EXPOSE 4000

USER nextjs

CMD yarn start
