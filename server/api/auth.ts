export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const config = useRuntimeConfig();

  return {
    success: body.password === config.adminPassword,
  };
});
