.DEFAULT_GOAL := main-script
## GENERAL ##
SHELL := /bin/bash
.PHONY: combine

export OUTPUT_FILE=temp_combined.txt

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

#@FILE_LIST=$$( $(MAKE) list-files | grep 'bounded-context/financial-management/src' | grep -Ev "\.spec\.ts$$" ); \
list-files:
	@IGNORE_LIST="\.gitignore$$|Makefile$$|lerna\.md$$|bounded\.txt$$|package\.json$$|pre-push$$|pre-commit$$|README\.md$$|\.prettierrc$$|\.prettierignore$$|package-lock\.json$$|\.eslintrc\.js$$|tsconfig$$|husky$$|lerna\.json$$|ci\.yml$$|prettier$$|eslintrc$$|ia$$|\.zip$\"; \
	FILES_CMD="git ls-files"; \
	$$FILES_CMD | grep -Ev "$$IGNORE_LIST" || echo "No files found after applying filters"
	@#echo "Executing command: $$FILES_CMD | grep -Ev '$$IGNORE_LIST'";


files-financial-management:
	@FILE_LIST=$$( $(MAKE) list-files | grep 'bounded-context/financial-management/src' ); \
	echo "$$FILE_LIST"; \
	$(MAKE) process-content FILE_LIST="$$FILE_LIST" INIT_FILE="bounded-context/financial-management/doc/financial-management.prompt";

process-content:
	@if [ -z "$$FILE_LIST" ]; then \
		echo "Error: FILE_LIST is empty. No files found for bounded context."; \
		exit 1; \
	fi; \
	echo "Checking if $$OUTPUT_FILE exists"; \
	if [ -f $$OUTPUT_FILE ]; then \
		echo "Removing existing $$OUTPUT_FILE"; \
		rm $$OUTPUT_FILE; \
	fi; \
	echo "Creating and combining files from $$DIRECTORY into $$OUTPUT_FILE"; \
	> $$OUTPUT_FILE; \
	if [ -n "$$INIT_FILE" ] && [ -f "$$INIT_FILE" ]; then \
		echo "Adding initial content from $$INIT_FILE"; \
		cat "$$INIT_FILE" >> $$OUTPUT_FILE; \
	fi; \
	cat promts/bounded.txt >> $$OUTPUT_FILE; \
	echo "$$FILE_LIST" >> $$OUTPUT_FILE; \
	echo "$$FILE_LIST" | tr ' ' '\n' | while read -r file; do \
		if [ -f "$$file" ]; then \
		    echo -e "\n\n" >> $$OUTPUT_FILE; \
			echo "===== $$file =====" >> $$OUTPUT_FILE; \
			echo "" >> $$OUTPUT_FILE; \
			cat "$$file" >> $$OUTPUT_FILE; \
		else \
			echo "Warning: File $$file does not exist, skipping."; \
		fi; \
	done; \
	echo "Copying $$OUTPUT_FILE content to clipboard"; \
	cat $$OUTPUT_FILE | pbcopy; \
	echo "Content copied to clipboard";


help:
	@printf "\033[31m%-16s %-59s %s\033[0m\n" "Target" "Help" "Usage"; \
	printf "\033[31m%-16s %-59s %s\033[0m\n" "------" "----" "-----"; \
	grep -hE '^[a-zA-Z0-9_-]+:.## .+$$' $(MAKEFILE_LIST) | sed -E 's/:.##\s*/:/' | awk 'BEGIN {FS = ":"}; {printf "\033[32m%-16s\033[0m %-58s\n", $$1, $$2}'; \
	# Recorre todas las líneas y filtra ejemplos con #e#, eliminando #e# y mostrando completos
	@grep -hE '^\s*#e# ' $(MAKEFILE_LIST) | sed 's/#e#/ - /' | awk 'BEGIN {FS = ":"}; {printf "\033[32m%-16s\033[0m %-58s\n", $$1, $$2}';

