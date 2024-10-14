.DEFAULT_GOAL := main-script
## GENERAL ##
SHELL := /bin/bash
.PHONY: combine

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

combine:
	@OUTPUT_FILE=temp_combined.txt; \
	DESTINATION=$(HOME)/Desktop/combined_output.txt; \
	echo "Checking if $$OUTPUT_FILE exists"; \
	if [ -f $$OUTPUT_FILE ]; then \
		echo "Removing existing $$OUTPUT_FILE"; \
		rm $$OUTPUT_FILE; \
	fi; \
	echo "Creating and combining files into $$OUTPUT_FILE"; \
	> $$OUTPUT_FILE; \
	cat ia >> $$OUTPUT_FILE; \
	git ls-files | grep -vE '(.gitignore|Makefile|README.md|package-lock.json|tsconfig|husky|lerna.json|ci.yml|prettier|eslintrc|ia)' | while read file; do \
		echo "===== $$file =====" >> $$OUTPUT_FILE; \
		echo "" >> $$OUTPUT_FILE; \
		cat "$$file" >> $$OUTPUT_FILE; \
		echo -e "\n\n" >> $$OUTPUT_FILE; \
	done; \
	echo "Checking if $$DESTINATION exists"; \
	if [ -f $$DESTINATION ]; then \
		echo "Removing existing file on Desktop"; \
		rm $$DESTINATION; \
	fi; \
	echo "Copying $$OUTPUT_FILE to Desktop"; \
	mv $$OUTPUT_FILE $$DESTINATION;
help:
	@printf "\033[31m%-16s %-59s %s\033[0m\n" "Target" "Help" "Usage"; \
	printf "\033[31m%-16s %-59s %s\033[0m\n" "------" "----" "-----"; \
	grep -hE '^\S+:.## .$$' $(MAKEFILE_LIST) | sed -e 's/:.##\s/:/' | sort | awk 'BEGIN {FS = ":"}; {printf "\033[32m%-16s\033[0m %-58s \033[34m%s\033[0m\n", $$1, $$2, $$3}'
