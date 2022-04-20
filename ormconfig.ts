export default {
  type: "postgres",
  synchronize: true,
  logging: false, // process.env.NODE_ENV !== 'production',
  host: process.env.DB_WRITE_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE_NAME,
  port: process.env.DB_PORT,
  entities: ["src/entity/**/*.ts", "dist/entity/**/*.js"],
};
