const { validate } = require("uuid");
const utils = require("../../utils");

function validateProjectUUID(request, response, next) {
  const { id } = request.params;

  if (!validate(id)) {
    return response
      .status(400)
      .json(utils.errorSyntax(400, "UUID do Projeto invalido"));
  }

  return next();
}

module.exports = validateProjectUUID;
