
exports.up = function (knex, Promise) {
    return knex.schema.createTable('articles', (table) => {
        table.increments('id').unsigned().primary();
        table.string('heading');
        table.string('slug');
        table.string('description');
        table.text('content');
        table.string('backdrop');
        table.integer('user_id').unsigned().references('users.id');
        table.integer('category_id').unsigned().references('categories.id');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('modified_date');
        table.boolean('status').defaultTo(true);
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('articles');
};
