default:
	make -s kill
	make -s build
	make -s run
	@echo 'All Done.'
	@make -s log-msg

run:
	docker-compose up -d

build:
	docker build -t stack/backend:latest ./backend

kill:
		@docker-compose kill || echo 'nothing to kill'
		@docker-compose rm -f || echo 'nothing to rm'

log-msg:
	@echo
	@echo 'Try running any of the following:'
	@echo
	@echo ' docker-compose logs -f backend'
	@echo ' docker-compose logs -f db-init'
	@echo ' docker-compose logs -f db'
	@echo ' docker-compose logs -f haproxy'
	@echo