const express = require("express");
const middlewares = require("./middlewares/");

const { v4: uuidv4, validate } = require("uuid");
const utils = require("./utils");

const app = express();

const PORT = 3001

/**
 * Tipos de parametros existentes
 *
 * Query Params: Normalmente são usados pra filtros e paginação
 * Route Params: Usados pra identificar recursos (Atualizar/Deletar)
 * Request Body: Conteúdo enviado na request com as informações pra criar ou editar um recurso
 */

/**
 * Middleware:
 *
 * O Middleware é um interceptador de requisições que pode interromper totalmente uma requisição ou alterar dados da requisição
 */

// MIDDLEWARES
const { logRequests, validateProjectUUID } = middlewares;
app.use(express.json()); // Middleware declarando que os servidores vão receber parametros JSON
app.use(logRequests); // Middleware que informa por console qual rota está sendo requisitada
app.use("/projects/:id", validateProjectUUID); // Middleware informando que TODAS as rotas que tiver um ID vão ser interceptadas pra verificar se o UUID é valido

const projects = [];

app.get("/projects", (request, response) => {
  const { title } = request.query;

  const results = title
    ? projects.filter((project) => project.title.includes(title))
    : projects;

  return response.json(results);
});

app.post("/projects", (request, response) => {
  const { title, owner } = request.body;
  const project = { id: uuidv4(), title, owner };

  projects.push(project);
  return response.json(project);
});

app.put("/projects/:id", (request, response) => {
  // Pegando os parametros que foram enviados com a rota
  const { id } = request.params;
  const { title, owner } = request.body;

  const projectIndex = projects.findIndex((project) => project.id === id);

  if (projectIndex < 0) {
    return response
      .status(400)
      .json(utils.errorSyntax(404, "Project not found"));
  }

  const project = {
    id,
    title,
    owner,
  };

  projects[projectIndex] = project;

  return response.json(project);
});

app.delete("/projects/:id", (request, response) => {
  // Pegando os parametros que foram enviados com a rota
  const { id } = request.params;

  const projectIndex = projects.findIndex((project) => project.id === id);

  if (projectIndex < 0) {
    return response
      .status(400)
      .json(utils.errorSyntax(400, "Projeto não encontrado"));
  }

  projects.splice(projectIndex, 1); // Removendo o projeto do array de projetos baseado no Index

  return response.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server rodando na porta ${PORT}`);
});
