############################################
# 1️⃣ STAGE FRONTEND (Vite / Inertia)
############################################
FROM node:20-alpine AS frontend

WORKDIR /app

COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./

RUN npm install

COPY resources ./resources
COPY vite.config.* ./

RUN npm run build


############################################
# 2️⃣ STAGE BACKEND (Laravel + PHP)
############################################
FROM php:8.4-fpm

ENV COMPOSER_ALLOW_SUPERUSER=1

RUN apt-get update && apt-get install -y \
    git curl zip unzip libpng-dev libonig-dev libxml2-dev libzip-dev \
    && docker-php-ext-install \
        pdo_mysql \
        mbstring \
        zip \
        exif \
        pcntl \
        bcmath \
        gd

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Backend
COPY . .

# Frontend build pronto
COPY --from=frontend /app/public/build ./public/build

RUN composer install --no-dev --optimize-autoloader --no-interaction

RUN php artisan key:generate || true \
    && php artisan storage:link || true

EXPOSE 8080

CMD php artisan serve --host=0.0.0.0 --port=${PORT}
