module.exports = {
    options: {
      origin: '*',
      methods: ['GET', 'POST', 'HEAD', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: [
        'Content-Type',
        'Authorization',
        'Access-Control-Allow-Origin',
      ],
      preflightContinue: false,
      optionsSuccessStatus: 204 || 200,
    },
  };
