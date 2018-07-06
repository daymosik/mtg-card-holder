SHELL=/bin/bash
export PATH := node_modules/.bin:$(PATH)

build: node_modules/INSTALLED $(shell find src -type f)
	tslint -p . -t codeFrame
	webpack
	touch $@

watch:
	webpack --watch

clean:
	rm -rf build

deploy:
	firebase deploy

run:
	firebase serve

node_modules/INSTALLED: package.json
	yarn install
	touch $@

.PHONY: run deploy build watch clean
