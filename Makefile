export PATH := node_modules/.bin:$(PATH)
export NODE_OPTIONS=--openssl-legacy-provider

include .env
export $(shell sed 's/=.*//' .env)

sources := tsconfig.json vite.config.js .eslintrc.js $(shell find ./src -type f)
npm_dep = package.json
libs = node_modules/installed_ts

build: VERSION
VERSION: $(libs) $(sources)
	rm -rf ./dist/*
	yarn run lint
	yarn run test
	yarn run build
	echo $(GIT_VERSION) > VERSION

clean:
	rm -rf VERSION dist

watch: $(libs)
	yarn run watch

deploy:
	firebase deploy

test:
	yarn run test

lint:
	tslint -p . -t codeFrame

$(libs): $(npm_dep)
	yarn install
	touch node_modules/installed_ts

.PHONY: deploy build watch clean test lint
