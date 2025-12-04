# Ping API

Uma API simples construída com Express.js para testar a disponibilidade e conectividade de hosts através de requisições HTTP que executam comandos ping.

## 🚀 Descrição

A Ping API fornece rotas para executar pings em hosts específicos, retornando informações detalhadas sobre a conectividade, perda de pacotes, e tempos de resposta. É útil para monitoramento de disponibilidade de servidores e diagnóstico de conectividade de rede.

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

### 1. POST `/api/ping/:host`
Executa um ping para um host específico com 3 tentativas padrão.

**Parâmetros:**
- `host` (obrigatório) - Endereço do host a ser testado (ex: google.com, 8.8.8.8)

**Exemplo de Requisição:**
```bash
curl -X POST http://localhost:3000/api/ping/google.com
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

### 2. POST `/api/ping/:host/count/:count`
Executa um ping para um host específico com uma quantidade de tentativas customizável.

**Parâmetros:**
- `host` (obrigatório) - Endereço do host a ser testado
- `count` (obrigatório) - Número de tentativas de ping

**Exemplo de Requisição:**
```bash
curl -X POST http://localhost:3000/api/ping/google.com/count/5
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

```bash
# POST /api/ping/:host (com 3 tentativas padrão)
curl -X POST http://localhost:3000/api/ping/google.com

# POST /api/ping/:host/count/:count (com quantidade customizável)
curl -X POST http://localhost:3000/api/ping/google.com/count/5

# Ping para outros hosts
curl -X POST http://localhost:3000/api/ping/8.8.8.8/count/3
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
