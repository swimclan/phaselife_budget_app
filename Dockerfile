FROM nginx
COPY ./config/nginx.conf /etc/nginx/
COPY ./ssl/* /etc/ssl/
COPY ./build/* /data/www