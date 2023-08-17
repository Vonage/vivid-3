FROM mcr.microsoft.com/playwright:v1.27.1-focal
ENV update false
RUN apt update && apt install zstd && apt install gzip
WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN chmod -R 777 ./libs/components
EXPOSE 8080
CMD ["/bin/sh", "./scripts/visual-tests/run.tests.sh"]
