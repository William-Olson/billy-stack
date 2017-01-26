default:
	@make -s build
	@make -s run

run: build
	@docker-compose kill || true
	@docker-compose rm -f || true
	docker-compose up -d

build:
	docker build -t stack/backend:latest ./backend

