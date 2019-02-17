// Update with your config settings.

module.exports = {

  development: {
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
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'blog',
      user: 'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
