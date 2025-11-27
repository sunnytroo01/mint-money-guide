function notFound(req, res, next) {
  res.status(404).render('pages/404', {
    title: 'Page Not Found',
    path: req.path
  });
}

function errorHandler(err, req, res, next) {
  console.error('Error:', err);

  const statusCode = err.statusCode || 500;
  const message = process.env.NODE_ENV === 'production'
    ? 'Something went wrong. Please try again later.'
    : err.message;

  if (req.accepts('html')) {
    return res.status(statusCode).render('pages/error', {
      title: 'Error',
      message,
      statusCode
    });
  }

  res.status(statusCode).json({
    error: message,
    statusCode
  });
}

module.exports = { notFound, errorHandler };
