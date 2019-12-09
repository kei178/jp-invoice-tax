# jp-invoice-tax

This app calculates the expected increase of the after-tax net income for Japanese sole proprietors by becoming Taxable Business in Consumption Tax after October 2023 when Invoice System starts.

## Requirements

- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com/)
- [docker-compose](https://docs.docker.com/compose/)

## Running

```
docker-compose up
```

You can access the API server at `http://localhost:8080`.

If you change something, execute the following command, instead:

```
docker-compose up --build
```

## Shutdown

```
docker-compose down
```

## Run test only

```
docker-compose up test
```