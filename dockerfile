FROM mcr.microsoft.com/playwright:v1.48.2-focal
RUN apt update && apt install zstd && apt install -y build-essential && apt install -y sudo
WORKDIR /usr/src/app
COPY . .
RUN npm install
EXPOSE 8080
ENTRYPOINT ["/bin/sh", "/usr/src/app/scripts/visual-tests/run.tests.sh"]
