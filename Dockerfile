FROM node:12.17-slim

ENV NPM_CONFIG_LOGLEVEL error

RUN useradd --user-group --create-home --shell /bin/false app

ENV HOME=/home/app
RUN mkdir -p ${HOME}/adonis
COPY package*.json $HOME/adonis/
RUN chown -R app:app $HOME/*

USER root
WORKDIR $HOME/adonis
RUN npm i -g @adonisjs/cli
RUN npm install
