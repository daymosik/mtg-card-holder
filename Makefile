SHELL=/bin/bash
export PATH := node_modules/.bin:$(PATH)

include .env
export $(shell sed 's/=.*//' .env)

build: node_modules/INSTALLED $(shell find src -type f)
	yarn run lint
	yarn run test
	yarn run build
	touch $@

watch:
	yarn run dev

clean:
	rm -rf builds

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
