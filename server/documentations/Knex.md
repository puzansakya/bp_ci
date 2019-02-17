# Connect
```
require('knex')({
  client: 'pg',
  connection: 'postgres://user:pass@localhost:5432/dbname'
})
```

# Create table
```
knex.schema.createTable('user', (table) => {
  table.increments('id')
  table.string('name')
  table.integer('age')
})
.then(() => ···)
```

# Select
```
knex('users')
  .where({ email: 'hi@example.com' })
  .then(rows => ···)
```

# Update    
```
knex('users')
  .where({ id: 135 })
  .update({ email: 'hi@example.com' })
```

# Migrations
```
knex init
knex migrate:make migration_name
knex migrate:latest
knex migrate:rollback
```
# Schema Create Table
## Columns
```
knex.schema.createTable('accounts', table => {
```

```
table.increments('id')
table.string('account_name')
table.integer('age')
table.float('age')
table.decimal('balance', 8, 2)
table.boolean('is_admin')
table.date('birthday')
table.time('created_at')
table.timestamp('created_at').defaultTo(knex.fn.now())
table.json('profile')
table.jsonb('profile')
table.uuid('id').primary()
```

## Constaints
```
table.unique('email')
table.unique(['email', 'company_id'])
table.dropUnique(···)
```

## Indices
```
table.foreign('company_id')
    .references('companies.id')
table.dropForeign(···)
```

## Variations
```
table.integer('user_id')
    .unsigned()
    .references('users.id')
```

```
.then(() => ···)
```

# Schema Alter Table
```
knex.schema.createTable('accounts', table => {
```
## Create
```
table.string('first_name')
```

## Alter
```
table.string('first_name').alter()
table.renameColumn('admin', 'is_admin')
```
## Drop
```
table.dropColumn('admin')
table.dropTimestamps('created_at')
```

## Other methods
```
knex.schema
  .renameTable('persons', 'people')
  .dropTable('persons')

  .hasTable('users').then(exists => ···)
  .hasColumn('users', 'id').then(exists => ···)

```

```
.then(() => ···)
```
