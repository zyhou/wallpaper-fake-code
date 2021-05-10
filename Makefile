help:
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

install: ## Install all dependencies
	npm i

dev: ## Start project
	npm run dev

build: ## Build for production
	npm run build

serve: ## Serve build files
	npm run build && npm run serve
