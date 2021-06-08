help:
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

install: ## Install all dependencies
	yarn

dev: ## Start project
	yarn dev

build: ## Build for production
	yarn build

serve: ## Serve build files
	yarn build && yarn serve
