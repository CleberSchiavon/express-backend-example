function logRequests(request, response, next) {
  const { method, url } = request;

  request.on('finish', () => {
    return 'Cabo'
  })

  const logLabel = `Requisição feita: [${method.toUpperCase()}] ${url}`;

  console.time(logLabel);

  next(); // Next serve pra falar pro express ir pra próxima linha de código
  console.timeEnd(logLabel);
}

module.exports = logRequests;
