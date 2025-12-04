# Host Monitor

Uma API simples construída com Express.js para testar a disponibilidade e conectividade de hosts através de requisições HTTP que executam comandos ping.

## 🚀 Descrição

A Host Monitor fornece rotas para executar pings em hosts específicos, retornando informações detalhadas sobre a conectividade, perda de pacotes, e tempos de resposta. É útil para monitoramento de disponibilidade de servidores e diagnóstico de conectividade de rede.

## 📋 Pré-requisitos

- Node.js (v14 ou superior)
- npm

## 🔧 Instalação

1. Clone ou navegue até o diretório do projeto:

```bash
cd ping-api
```

2. Instale as dependências:

```bash
npm install
```

## ▶️ Como Executar

Para iniciar o servidor:

```bash
npm start
```

O servidor será iniciado em `http://localhost:3000` por padrão.

## 📍 Rotas Disponíveis

### Host Management

#### 1. POST `/hosts`
Cria um novo host para monitoramento.

**Body (JSON):**
```json
{
  "name": "Google",
  "address": "google.com"
}
```

**Resposta de Sucesso (201):**
```json
{
  "id": "clh7w1wf80000qz8d5z7z8z8z",
  "name": "Google",
  "address": "google.com"
}
```

**Resposta de Erro - Campo obrigatório faltando (400):**
```json
{
  "error": "Name and address are required"
}
```

---

#### 2. GET `/hosts`
Retorna a lista de todos os hosts cadastrados.

**Exemplo de Requisição:**
```bash
curl http://localhost:3000/hosts
```

**Resposta (200):**
```json
[
  {
    "id": "clh7w1wf80000qz8d5z7z8z8z",
    "name": "Google",
    "address": "google.com"
  },
  {
    "id": "clh7w1wf80001qz8d5z7z8z8z",
    "name": "Cloudflare DNS",
    "address": "1.1.1.1"
  }
]
```

---

#### 3. GET `/hosts/:hostId`
Retorna um host específico pelo ID.

**Parâmetros:**
- `hostId` (obrigatório) - ID do host

**Exemplo de Requisição:**
```bash
curl http://localhost:3000/hosts/clh7w1wf80000qz8d5z7z8z8z
```

**Resposta de Sucesso (200):**
```json
{
  "id": "clh7w1wf80000qz8d5z7z8z8z",
  "name": "Google",
  "address": "google.com"
}
```

**Resposta de Erro - Host não encontrado (404):**
```json
{
  "error": "Host not found"
}
```

---

#### 4. PUT `/hosts/:hostId`
Atualiza um host existente.

**Parâmetros:**
- `hostId` (obrigatório) - ID do host

**Body (JSON):**
```json
{
  "name": "Google Updated",
  "address": "8.8.8.8"
}
```

**Resposta de Sucesso (200):**
```json
{
  "id": "clh7w1wf80000qz8d5z7z8z8z",
  "name": "Google Updated",
  "address": "8.8.8.8"
}
```

**Resposta de Erro - Host não encontrado (404):**
```json
{
  "error": "Host not found"
}
```

---

#### 5. DELETE `/hosts/:hostId`
Remove um host do monitoramento.

**Parâmetros:**
- `hostId` (obrigatório) - ID do host

**Exemplo de Requisição:**
```bash
curl -X DELETE http://localhost:3000/hosts/clh7w1wf80000qz8d5z7z8z8z
```

**Resposta de Sucesso (204):**
Sem conteúdo

**Resposta de Erro - Host não encontrado (404):**
```json
{
  "error": "Host not found"
}
```

---

### Ping Operations

#### 6. POST `/ping/:host`
Executa um ping para um host específico com 3 tentativas padrão.

**Parâmetros:**
- `host` (obrigatório) - Endereço do host a ser testado (ex: google.com, 8.8.8.8)

**Exemplo de Requisição:**
```bash
curl -X POST http://localhost:3000/ping/google.com
```

**Resposta de Sucesso (200):**
```json
{
  "host": "google.com",
  "alive": true,
  "output": "...",
  "numeric_host": "142.250.185.46",
  "packets_sent": 3,
  "packets_received": 3,
  "percent_packet_loss": 0,
  "time_ms": 45.123,
  "min_response_time_ms": 12.5,
  "max_response_time_ms": 25.8,
  "avg_response_time_ms": 15.2
}
```

---

#### 7. POST `/ping/:host/count/:count`
Executa um ping para um host específico com uma quantidade de tentativas customizável.

**Parâmetros:**
- `host` (obrigatório) - Endereço do host a ser testado
- `count` (obrigatório) - Número de tentativas de ping

**Exemplo de Requisição:**
```bash
curl -X POST http://localhost:3000/ping/google.com/count/5
```

**Resposta de Sucesso (200):**
```json
{
  "host": "google.com",
  "alive": true,
  "output": "...",
  "numeric_host": "142.250.185.46",
  "packets_sent": 5,
  "packets_received": 5,
  "percent_packet_loss": 0,
  "time_ms": 75.456,
  "min_response_time_ms": 12.3,
  "max_response_time_ms": 28.9,
  "avg_response_time_ms": 15.1
}
```

**Resposta de Erro - Host Desconhecido (400):**
```json
{
  "error": "Unknown host"
}
```

**Resposta de Erro - Servidor (500):**
```json
{
  "error": "Internal Server Error"
}
```

## 🧪 Testando a API

### Usando curl

**Criar um novo host:**
```bash
curl -X POST http://localhost:3000/hosts \
  -H "Content-Type: application/json" \
  -d '{"name": "Google", "address": "google.com"}'
```

**Listar todos os hosts:**
```bash
curl http://localhost:3000/hosts
```

**Obter um host específico:**
```bash
curl http://localhost:3000/hosts/clh7w1wf80000qz8d5z7z8z8z
```

**Atualizar um host:**
```bash
curl -X PUT http://localhost:3000/hosts/clh7w1wf80000qz8d5z7z8z8z \
  -H "Content-Type: application/json" \
  -d '{"name": "Google DNS", "address": "8.8.8.8"}'
```

**Deletar um host:**
```bash
curl -X DELETE http://localhost:3000/hosts/clh7w1wf80000qz8d5z7z8z8z
```

**Fazer ping (3 tentativas padrão):**
```bash
curl -X POST http://localhost:3000/ping/google.com
```

**Fazer ping com quantidade customizada:**
```bash
curl -X POST http://localhost:3000/ping/google.com/count/5
curl -X POST http://localhost:3000/ping/8.8.8.8/count/3
```

### Usando o arquivo requests.http

Se você tiver a extensão REST Client instalada, pode usar o arquivo `requests.http` para testar as rotas diretamente no VS Code.

## 📁 Estrutura do Projeto

```
ping-api/
├── src/
│   ├── index.js       # Arquivo principal da aplicação
│   └── routes.js      # Definição das rotas
├── package.json       # Dependências do projeto
└── README.md          # Este arquivo
```

## 🛠️ Tecnologias Utilizadas

- **Express.js** - Framework web minimalista para Node.js
- **Node.js** - Runtime JavaScript

## 📝 Exemplo de Uso

```bash
# Fazer ping em google.com com 3 tentativas
curl -X POST http://localhost:3000/api/ping/google.com

# Fazer ping em 8.8.8.8 com 5 tentativas
curl -X POST http://localhost:3000/api/ping/8.8.8.8/count/5
```

## 🤝 Contribuindo

Sinta-se livre para abrir issues ou pull requests para melhorias.

## 📄 Licença

Este projeto é de código aberto e está disponível sob a licença MIT.

## 📞 Suporte

Para dúvidas ou problemas, abra uma issue no repositório.
