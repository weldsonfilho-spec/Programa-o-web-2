# Atividade 02 — Programação Web 2

## Descrição

Implementação de uma API REST utilizando NestJS e TypeScript para gerenciamento de projetos.

O módulo de Projetos utiliza armazenamento em memória e permite operações de criação, consulta, atualização e exclusão (CRUD).

## Endpoints

| Método | Rota | Descrição |
|---|---|---|
| GET | `/api/projetos` | Lista os projetos |
| GET | `/api/projetos/:id` | Consulta um projeto |
| POST | `/api/projetos` | Cria um projeto |
| PUT | `/api/projetos/:id` | Atualiza um projeto |
| DELETE | `/api/projetos/:id` | Exclui um projeto |

## Tecnologias

- NestJS
- TypeScript
- Node.js
- API REST

## Evidências dos testes

### GET — Retorno 200

![GET 200](prints/retorno%20200.png)

### POST — Retorno 201

![POST 201](prints/retorno%20201.png)

### DELETE — Retorno 204

![DELETE 204](prints/retorno%20204.png)

### Validação — Erro 400

![Erro 400](prints/erro%20400.png)

### Projeto inexistente — Erro 404

![Erro 404](prints/erro%20404.png)