

export function errorHandler(err:any, req:any, res:any, next:any) {
  console.error(err); // Log the error for debugging

  const statusCode = err.status || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message
  });
}
