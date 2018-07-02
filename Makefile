SHELL=/bin/bash
export PATH := node_modules/.bin:$(PATH)

run: build
	cd server && make deploy

build:
	cd server && make build
	cd front && make build

.PHONY: run build
