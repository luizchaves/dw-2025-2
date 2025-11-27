# Hello API

Uma API simples construída com Express.js para demonstrar conceitos de roteamento, parâmetros de query, parâmetros de rota e body parameters.

## 📋 Requisitos

- Node.js (v14 ou superior)
- npm ou yarn

## 🛠️ Tecnologias

- **Express.js** - Framework web para Node.js
- **Morgan** - Middleware de logging HTTP

## 📁 Estrutura do Projeto

```
hello-api/
├── src/
│   ├── index.js       # Arquivo principal da aplicação
│   └── routes.js      # Definição das rotas da API
├── public/            # Arquivos estáticos (frontend)
├── package.json       # Dependências do projeto
└── README.md          # Este arquivo
```

## 📝 Notas

- A API retorna JSON para a maioria dos endpoints
- O primeiro endpoint (`GET /api/`) retorna texto puro
- Todos os erros são tratados com a classe `HttpError`
- A aplicação usa `morgan` para logar requisições HTTP

## 🚀 Instalação

1. Instale as dependências:

```bash
npm install
```

## 🏃 Como Executar

### Modo desenvolvimento (com auto-reload):

```bash
npm run dev
```

### Modo produção:

```bash
npm start
```

O servidor será iniciado em `http://localhost:3000`

## 📚 Endpoints

### GET `/api/`
Retorna uma mensagem simples em texto.

```bash
curl http://localhost:3000/api/
```

**Resposta:**
```
Hello, World!
```

---

### GET `/api/pt`
Retorna uma mensagem de saudação em português (JSON).

```bash
curl http://localhost:3000/api/pt
```

**Resposta:**
```json
{
  "message": "Olá, Mundo!"
}
```

---

### GET `/api/en`
Retorna uma mensagem de saudação em inglês (JSON).

```bash
curl http://localhost:3000/api/en
```

**Resposta:**
```json
{
  "message": "Hello, World!"
}
```

---

### GET `/api/hello/pt?name=<nome>`
Retorna uma mensagem personalizada em português usando **query parameters**.

```bash
curl "http://localhost:3000/api/hello/pt?name=Luiz"
```

**Resposta:**
```json
{
  "message": "Olá, Luiz!"
}
```

**Nota:** O parâmetro `name` é obrigatório.

---

### GET `/api/hello/en/:name`
Retorna uma mensagem personalizada em inglês usando **route parameters**.

```bash
curl http://localhost:3000/api/hello/en/Luiz
curl http://localhost:3000/api/hello/en/IFPB
```

**Resposta:**
```json
{
  "message": "Hello, Luiz!"
}
```

---

### POST `/api/hello/es`
Retorna uma mensagem personalizada em espanhol usando **body parameters** (JSON).

```bash
curl -X POST http://localhost:3000/api/hello/es \
  -H "Content-Type: application/json" \
  -d '{"name": "Luiz"}'
```

**Resposta:**
```json
{
  "message": "¡Hola, Luiz!"
}
```

## 📞 Suporte

Para dúvidas ou problemas, consulte a documentação oficial do [Express.js](https://expressjs.com/).
