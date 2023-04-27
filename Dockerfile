# Common build stage
FROM node:16-slim as common-build-stage

#RUN echo "http://dl-cdn.alpinelinux.org/alpine/latest-stable/main" > /etc/apk/repositories
#RUN echo "http://dl-cdn.alpinelinux.org/alpine/latest-stable/community" >> /etc/apk/repositories

#new lines but commented
RUN groupadd -r pptruser && useradd -rm -g pptruser -G audio,video pptruser



RUN apt update -y
RUN apt-get install -y fonts-liberation gconf-service libappindicator1 libasound2 libatk1.0-0 libcairo2 libcups2 libfontconfig1 
RUN apt-get install -y libgbm-dev libgdk-pixbuf2.0-0 libgtk-3-0 libicu-dev libjpeg-dev libnspr4 libnss3 libpango-1.0-0 
RUN apt-get install -y libpangocairo-1.0-0 libpng-dev libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 
RUN apt-get install -y libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 xdg-utils
RUN apt-get install -y ca-certificates libappindicator3-1 libatk-bridge2.0-0 libc6 libdbus-1-3 libexpat1 libgcc1 libglib2.0-0 libstdc++6 lsb-release


# RUN apk add --update gcc
# RUN apk add --update g++
# RUN apk add --update make
# RUN apk add --update python3
# RUN apk add -u zlib-dev musl-dev
RUN apt-get install -y zlib1g-dev musl-dev
# RUN apk update
RUN apt-get autoclean -y
RUN apt-get update -y
RUN apt-get upgrade -y
RUN apt-get -u dist-upgrade -y
RUN apt-get -f install
RUN dpkg --configure -a
RUN apt-get -f install

# RUN apk add libc6-compat
RUN apt install libc6
# RUN apk add --update python3-dev py3-pip build-base wget freetype-dev openblas-dev
RUN apt install -y python3-dev python3-pip wget libfreetype6-dev libopenblas-dev
RUN apt install -y build-essential
# RUN apk add git curl
RUN apt install -y git curl
RUN ln -s /usr/include/locale.h /usr/include/xlocale.h
RUN apt install -y chromium
RUN apt-get install -y wget gnupg fonts-ipafont-gothic fonts-freefont-ttf firefox-esr --no-install-recommends 
ENV PUPPETEER_PRODUCT firefox


COPY . ./app

WORKDIR /app

#RUN npm install

EXPOSE 3000

# Development build stage
FROM common-build-stage as development-build-stage

RUN chmod +x /app/docker-entrypoint.sh
# RUNchmod -R o+rwx node_modules/puppeteer/.local-chromium

# RUN echo 'kernel.unprivileged_userns_clone=1' > /etc/sysctl.d/00-local-userns.conf
# RUN service procps restart

ENTRYPOINT [ "docker-entrypoint.sh" ]

ENV NODE_ENV development
# RUN npm install
# RUN chmod -R o+rwx /app/node_modules/
# USER pptruser
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=TRUE
ENV PUPPETEER_PRODUCT firefox


CMD ["npm", "run", "deploy:dev"]

# Production build stage
FROM common-build-stage as production-build-stage

ENV NODE_ENV production
USER pptruser
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=TRUE
ENV PUPPETEER_PRODUCT firefox


CMD ["npm", "run", "deploy:prod"]