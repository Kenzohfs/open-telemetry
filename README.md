# OpenTelemetry com RabbitMQ e Jaeger

Projeto demonstrando instrumentação OpenTelemetry com RabbitMQ e visualização de traces no Jaeger.

## Pré-requisitos

- Node.js (v20 ou superior)
- Docker e Docker Compose
- pnpm (ou npm/yarn)

## Instalação

1. Instale as dependências:

```bash
pnpm install
```

## Execução

### 1. Subir os serviços Docker

Inicie o RabbitMQ e o Jaeger:

```bash
docker-compose up -d
```

Isso irá subir:
- **RabbitMQ** na porta `5672` (AMQP) e `15672` (Management UI)
- **Jaeger** na porta `16686` (UI) e `14268` (Collector)

### 2. Iniciar o Consumer

Em um terminal, execute:

```bash
SERVICE=consumer node --require './observability/tracing.js' ./apps/consumer.js
```

### 3. Iniciar o Publisher

Em outro terminal, execute:

```bash
SERVICE=publisher node --require './observability/tracing.js' ./apps/publisher.js
```

O publisher estará rodando em `http://localhost:3000`. Para enviar uma mensagem, acesse:

```bash
curl http://localhost:3000
```

## Acessar as Interfaces

- **RabbitMQ Management UI**: http://localhost:15672
  - Usuário: `guest`
  - Senha: `guest`

- **Jaeger UI**: http://localhost:16686
  - Visualize os traces distribuídos entre publisher e consumer

## Parar os Serviços

Para parar os containers Docker:

```bash
docker-compose down
```

Para remover os volumes (dados persistentes):

```bash
docker-compose down -v
```

