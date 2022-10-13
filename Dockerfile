FROM node:18.10.0-alpine as build

ENV PROJECT_DIR /opt/app/
WORKDIR ${PROJECT_DIR}
RUN mkdir -p ${PROJECT_DIR}

COPY package*.json ./
RUN yarn global add @quasar/cli
ADD . ${PROJECT_DIR}

RUN yarn
RUN quasar build

FROM nginx:1.23.1
COPY --from=build-stage /opt/app/dist/spa /public
ADD nginx.conf /etc/nginx/templates/default.template
ENV PORT 8080
ENV BACKEND http://localhost:8000
