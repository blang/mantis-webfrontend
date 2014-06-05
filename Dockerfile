FROM blang/nginx:latest

ADD dist/ /var/www/
ADD docker/nginx.conf /etc/nginx/sites-enabled/site