FROM mcr.microsoft.com/playwright:v1.27.1-focal
ENV update false
WORKDIR /usr/src/app
COPY . .
RUN npm install
EXPOSE 8080
CMD ["/bin/sh", "./scripts/visual-tests/run.tests.sh"]
