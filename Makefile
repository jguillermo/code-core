.DEFAULT_GOAL := main-script
## GENERAL ##
SHELL := /bin/bash

main-script:
	npm run format
	npm run lint:fix
	npm run lint
	npm run build
	make test

test:
	npm run test

build:
	npm run build

version:
	npx lerna version

publish:
	npx lerna publish from-package --yes

help:
	@printf "\033[31m%-16s %-59s %s\033[0m\n" "Target" "Help" "Usage"; \
	printf "\033[31m%-16s %-59s %s\033[0m\n" "------" "----" "-----"; \
	grep -hE '^\S+:.## .$$' $(MAKEFILE_LIST) | sed -e 's/:.##\s/:/' | sort | awk 'BEGIN {FS = ":"}; {printf "\033[32m%-16s\033[0m %-58s \033[34m%s\033[0m\n", $$1, $$2, $$3}'
