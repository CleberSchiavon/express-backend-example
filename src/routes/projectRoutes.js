/**
 * ROTAS
 * 
 * Todas as rotas de produtos estão sendo  unificadas aqui
 * É uma melhor abordagem, comparado a colocar todas as rotas no arquivo index.js
 * Aqui eu declaro as rotas e invocando os controllers pra agir assim que cada uma for chamada
 */

const express = require("express");
const { projectController } = require("../controllers/");

const router = express.Router();

router.get("/projects", (req, res, next) => {
  return projectController.getAllProjects(res);
});

router.post("/projects", (req, res, next) => {
  return projectController.createAProject(req, res);
});

router.get("/projects/:id", (req, res, next) => {
  return projectController.getProjectsById(req, res);
});

router.put("/projects/:id", (req, res, next) => {
  return projectController.editAProduct(req, res);
});

router.delete("/projects/:id", (req, res, next) => {
  return projectController.deleteAProduct(req, res);
});

module.exports = router;
