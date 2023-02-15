const express = require("express");
const middlewares = require("./middlewares/");

const controllers = require("./controllers/");

const app = express();

const PORT = 3001;
const { projectController } = controllers;

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

// DECLARANDO OS MIDDLEWARES
const { logRequests, validateProjectUUID } = middlewares;
app.use(express.json()); // Middleware declarando que os servidores vão receber parametros JSON
app.use(logRequests); // Middleware que informa por console qual rota está sendo requisitada
app.use("/projects/:id", validateProjectUUID); // Middleware informando que TODAS as rotas que tiver um ID vão ser interceptadas pra verificar se o UUID é valido

const projects = [];

app.get("/projects", (request, response) => {
  return projectController.getAllProjects(response, projects);
});

app.get("/projects/:id", (request, response) => {
  return projectController.getProjectsById(request, response, projects);
});

app.post("/projects", (request, response) => {
  return projectController.createAProject(request, response, projects);
});

app.put("/projects/:id", (request, response) => {
  return projectController.editAProduct(request, response, projects);
});

app.delete("/projects/:id", (request, response) => {
  return projectController.deleteAProduct(request, response, projects);
});

app.listen(PORT, () => {
  console.log(`Server rodando na porta ${PORT}`);
});
