FROM node:18-alpine3.17
#installing packages
RUN apk update && \
  apk add --no-cache nikto perl-net-ssleay
#    rm -f /tmp/* /etc/apk/cache/*

RUN ln -s /usr/bin/nikto.pl  /usr/bin/nikto

ENV NODE_ENV production

WORKDIR /nest

COPY package.json yarn.lock /nest/

RUN yarn

COPY . .

RUN yarn build

EXPOSE 4000

CMD ["yarn", "start"]

