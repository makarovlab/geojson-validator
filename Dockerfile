FROM node:16.16.0-alpine3.16 as build 
RUN npm install --location=global npm@8.19.2
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm ci --silent --legacy-peer-deps --only=production
RUN npm install react-scripts@5.0.1 -g --silent
COPY . ./
RUN npm run build

FROM nginx:stable-alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80 433
CMD ["nginx", "-g", "daemon off;"]