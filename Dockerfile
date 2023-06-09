FROM node:18-alpine3.17
USER node

RUN apk update && apk add --no-cache nikto perl-net-ssleay

# Create symlink for nikto
RUN ln -s /usr/bin/nikto.pl /usr/bin/nikto

ENV NODE_ENV=production

WORKDIR /app

COPY package.json yarn.lock ./

# Install application dependencies
RUN yarn install --production

COPY . .

RUN yarn build

EXPOSE 4000

CMD ["yarn", "start"]
