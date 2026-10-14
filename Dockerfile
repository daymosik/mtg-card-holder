FROM node:24-alpine

LABEL org.opencontainers.image.authors="Damian Majsner <d.majsner@gmail.com>"

RUN apk add --no-cache make python3 zsh vim

WORKDIR /app