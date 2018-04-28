FROM node:8
EXPOSE 3000

WORKDIR /app

COPY . /app/

RUN yarn

# yarn dev in Dockerfile is temporal
CMD ["yarn", "dev"]