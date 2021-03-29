FROM nginx:1.19.8-alpine

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY ./dist/ /usr/share/nginx/html/