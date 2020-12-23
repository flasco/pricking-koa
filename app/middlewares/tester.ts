export = options => async (ctx, next) => {
  console.log(options.env);
  await next();
  console.log('end');
};
