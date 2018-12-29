SHELL=/bin/bash
export PATH := node_modules/.bin:$(PATH)

include .env
export $(shell sed 's/=.*//' .env)

build: node_modules/INSTALLED $(shell find src -type f)
	yarn run build
	touch $@

build-dev:
	yarn run build-dev

watch:
	yarn run watch

clean:
	rm -rf build

deploy:
	firebase deploy

run:
	firebase serve

test:
	yarn run test

lint:
	tslint -p . -t codeFrame

node_modules/INSTALLED: package.json
	yarn install
	touch $@

.PHONY: run deploy build watch clean test
