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


#	@IGNORE_LIST="\.gitignore$|Makefile$|README.md$|package-lock.json$|tsconfig$|husky$|lerna.json$|ci.yml$|prettier$|eslintrc$|ia$|.zip$\"; \


list-files:
	@IGNORE_LIST="\.gitignore$$|Makefile$$|lerna\.md$$|package\.json$$|pre-push$$|pre-commit$$|README\.md$$|\.prettierrc$$|\.prettierignore$$|package-lock\.json$$|\.eslintrc\.js$$|tsconfig$$|husky$$|lerna\.json$$|ci\.yml$$|prettier$$|eslintrc$$|ia$$|\.zip$\"; \
	if [ -z "$(DIR_PATH)" ]; then \
		FILES_CMD="git ls-files"; \
	else \
		FILES_CMD="git ls-files $(DIR_PATH)"; \
	fi; \
	$$FILES_CMD | grep -Ev "$$IGNORE_LIST" || echo "No files found after applying filters.";
	@#echo "Executing command: $$FILES_CMD | grep -Ev '$$IGNORE_LIST'";






process-files:
	@OUTPUT_FILE=temp_combined.txt; \
	if [ -f $$OUTPUT_FILE ]; then \
		echo "Removing existing $$OUTPUT_FILE"; \
		rm -f $$OUTPUT_FILE; \
	fi; \
	echo "Creating $$OUTPUT_FILE"; \
	touch $$OUTPUT_FILE; \
	[ -f promts/ia ] && cat promts/ia >> $$OUTPUT_FILE; \
	while read -r file; do \
		echo "===== $$file =====" >> $$OUTPUT_FILE; \
		echo "" >> $$OUTPUT_FILE; \
		cat "$$file" >> $$OUTPUT_FILE; \
		echo -e "\n\n" >> $$OUTPUT_FILE; \
	done; \
	echo "File processing completed. Output saved to $$OUTPUT_FILE."

#e# make combine DIR_PATH=src
#e# make combine IGNORE_EXTRA="test.txt config.yml"
#e# make combine DIR_PATH=src IGNORE_EXTRA="test.txt config.yml"
combine:
	@make list-files DIR_PATH=$(DIR_PATH) | make process-files
	@DESTINATION=$(HOME)/Desktop/combined_output.txt; \
	echo "Checking if $$DESTINATION exists"; \
	if [ -f $$DESTINATION ]; then \
		echo "Removing existing file on Desktop"; \
		rm -f $$DESTINATION; \
	fi; \
	echo "Copying $$OUTPUT_FILE content to clipboard"; \
	cat temp_combined.txt | pbcopy; \
	echo "Copying $$OUTPUT_FILE to Desktop"; \
	mv temp_combined.txt $$DESTINATION; \
	echo "Process completed. Combined file moved to Desktop as combined_output.txt."


combine3:
	@OUTPUT_FILE=temp_combined.txt; \
	DESTINATION=$(HOME)/Desktop/combined_output.txt; \
	IGNORE_FILES=".gitignore Makefile README.md package-lock.json tsconfig husky lerna.json ci.yml prettier eslintrc ia"; \
	if [ -n "$(IGNORE_EXTRA)" ]; then \
		IGNORE_FILES="$$IGNORE_FILES $$IGNORE_EXTRA"; \
	fi; \
	DIRECTORY=${DIR:-.}; \
	echo "Checking if $$OUTPUT_FILE exists"; \
	if [ -f $$OUTPUT_FILE ]; then \
		echo "Removing existing $$OUTPUT_FILE"; \
		rm $$OUTPUT_FILE; \
	fi; \
	echo "Creating and combining files from $$DIRECTORY into $$OUTPUT_FILE"; \
	> $$OUTPUT_FILE; \
	cat promts/ia >> $$OUTPUT_FILE; \
	find $$DIRECTORY -type f | grep -vE "($$(echo $$IGNORE_FILES | tr ' ' '|'))" | while read file; do \
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
	mv $$OUTPUT_FILE $$DESTINATION; \
	echo "Copying $$OUTPUT_FILE content to clipboard"; \
	cat $$OUTPUT_FILE | pbcopy; \
	echo "Content copied to clipboard";


help:
	@printf "\033[31m%-16s %-59s %s\033[0m\n" "Target" "Help" "Usage"; \
	printf "\033[31m%-16s %-59s %s\033[0m\n" "------" "----" "-----"; \
	grep -hE '^[a-zA-Z0-9_-]+:.## .+$$' $(MAKEFILE_LIST) | sed -E 's/:.##\s*/:/' | awk 'BEGIN {FS = ":"}; {printf "\033[32m%-16s\033[0m %-58s\n", $$1, $$2}'; \
	# Recorre todas las líneas y filtra ejemplos con #e#, eliminando #e# y mostrando completos
	@grep -hE '^\s*#e# ' $(MAKEFILE_LIST) | sed 's/#e#/ - /' | awk 'BEGIN {FS = ":"}; {printf "\033[32m%-16s\033[0m %-58s\n", $$1, $$2}';

