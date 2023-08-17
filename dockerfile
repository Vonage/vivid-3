FROM mcr.microsoft.com/playwright:v1.27.1-focal
ENV update false
RUN apt update && apt install zstd
WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN chmod 777 ./libs/components/vite.config.ts
EXPOSE 8080
CMD ["/bin/sh", "./scripts/visual-tests/run.tests.sh"]
