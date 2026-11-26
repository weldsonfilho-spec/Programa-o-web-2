import express from "express";
import cors from "cors";
import { produtos } from "./produtos.js";
import { categorias } from "./categorias.js";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(cors({ origin: "http://localhost:8094" }));

// Registra as requisições recebidas.
app.use((req, res, next) => {
  const inicio = Date.now();

  res.on("finish", () => {
    console.log(
      `[API] ${req.method} ${req.originalUrl} - ${res.statusCode} - ${Date.now() - inicio}ms`
    );
  });

  next();
});

// Lista todos os produtos.
app.get("/api/produtos", (req, res) => {
  res.json(produtos);
});

// Busca um produto pelo ID.
app.get("/api/produtos/:id", (req, res) => {
  const id = Number(req.params.id);
  const produto = produtos.find((p) => p.id === id);

  if (!produto) {
    return res.status(404).json({
      error: "Produto não encontrado",
    });
  }

  res.json(produto);
});

// Lista todas as categorias.
app.get("/api/categorias", (req, res) => {
  res.json(categorias);
});

// Busca uma categoria e seus produtos.
app.get("/api/categorias/:id", (req, res) => {
  const id = Number(req.params.id);
  const categoria = categorias.find((c) => c.id === id);

  if (!categoria) {
    return res.status(404).json({
      error: "Categoria não encontrada",
    });
  }

  const produtosDaCategoria = produtos.filter(
    (p) => p.categoria === categoria.nome
  );

  res.json({
    ...categoria,
    produtos: produtosDaCategoria,
  });
});

// Inicia a API.
app.listen(PORT, () => {
  console.log(`API da Loja rodando na porta ${PORT}`);
  console.log(`Ex.: http://localhost:8093/api/produtos`);
});