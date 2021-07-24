# dummy-api-gw-api

Just a dummy express service with response api gateway format for testing api gateway integration with eks

### run

```sh

docker pull samuraitruong/dummy-api-gw-api:latest

docker run -e PORT=8080 -p 8080:8080 samuraitruong/dummy-api-gw-api:latest
```
