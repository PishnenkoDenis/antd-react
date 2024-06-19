FROM node:20 AS build
WORKDIR /app
COPY package-lock.json package.json nginx.conf tsconfig.json ./
RUN npm ci
COPY src ./src
COPY public ./public
RUN npm run build
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]
