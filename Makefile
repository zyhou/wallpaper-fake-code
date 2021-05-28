help:
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

install: ## Install all dependencies
	pnpm i

dev: ## Start project
	pnpm dev

build: ## Build for production
	pnpm build

serve: ## Serve build files
	pnpm build && pnpm serve
