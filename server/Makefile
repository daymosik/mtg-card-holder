SHELL=/bin/bash
export PATH := node_modules/.bin:$(PATH)

deploy:
	node build/server/src/Boot.js

deploy-dev:
	NODE_ENV=dev && nodemon build/server/src/Boot.js

build: node_modules/INSTALLED $(shell find src -type f)
	yarn run lint
	yarn run tsc

node_modules/INSTALLED: package.json
	yarn install --force --mutex file:/tmp/.yarn-mutex
	touch $@

.PHONY: deploy build
