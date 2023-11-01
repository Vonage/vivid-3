FROM mcr.microsoft.com/playwright:v1.38.0-focal
ENV update false
RUN apt update && apt install zstd && apt install -y build-essential && apt install -y sudo
WORKDIR /usr/src/app
COPY . .
RUN npm install
EXPOSE 8080
CMD ["/bin/sh", "./scripts/visual-tests/run.tests.sh"]
