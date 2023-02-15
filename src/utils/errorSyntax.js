function errorSyntax(errorCode, errorMessage) {
  return {
    errorCode: errorCode,
    errorMessage: errorMessage,
  };
}

module.exports = errorSyntax;
