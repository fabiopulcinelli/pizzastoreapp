FROM node as builder

WORKDIR /opt

COPY . .

RUN npm i
RUN npm run build

FROM httpd
COPY --from=builder /opt/dist/pizzastoreapp/* /usr/local/apache2/htdocs/