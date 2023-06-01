export default () => ({
  port: parseInt(process.env.PORT, 10) || 3001,
  dyssomniaApiUrl: process.env.DYSSOMNIA_API_URL,
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  },
});
