FROM node:16 AS build

WORKDIR /usr/src/app

RUN ls -lah
COPY package.json ./
RUN ls -lah

RUN npm install

RUN ls -lah
COPY . ./
RUN ls -lah

RUN npm run build

#FROM nginx:alpine
#FROM nginx:stable-alpine
FROM nginx:mainline-alpine

COPY --from=build /usr/src/app/dist /usr/share/nginx/html

ARG BUILD_DATE
ARG VCS_REF

LABEL org.label-schema.build-date="$BUILD_DATE" \
      org.label-schema.vcs-url="https://github.com/vegarda/joknuden" \
      org.label-schema.vcs-ref="$VCS_REF" \
      org.label-schema.schema-version="1.0.0-rc1"

#ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
