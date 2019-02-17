export const development = {
  client: 'postgres',
  connection: {
    host: '127.0.0.1',
    port: '5432',
    user: 'postgres',
    password: 'admin',
    database: 'blog',
    charset: 'utf8',
    debug: true
  }
};

export const production = { client: 'postgres', connection: process.env.DATABASE_URL };