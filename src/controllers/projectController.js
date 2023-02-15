const { v4: uuidv4 } = require("uuid");
const utils = require("../utils/");
const projects = [];

/**
 * CONTROLLERS:
 *
 * Os controllers da aplicação carregam as funcionalidades de determinado modelo
 * Ou seja, nesse arquivo eu criei um controller que gerencia todas as funcionalidades do modelo "Project"
 * Então aqui dentro desse arquivo eu deixei separado as funções de mostrar, criar, editar, deletar os projetos
 */

exports.getAllProjects = (response) => {
  return response.status(200).json(projects);
};

exports.getProjectsById = (request, response) => {
  const { id } = request.params;

  const project = projects.find((project) => project.id === id);

  return response.status(200).json(project);
};

exports.createAProject = (request, response) => {
  const { title, owner } = request.body;
  const project = { id: uuidv4(), title, owner };
  projects.push(project);
  return response.json(project);
};

exports.editAProduct = (request, response) => {
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
};

exports.deleteAProduct = (request, response) => {
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
};
