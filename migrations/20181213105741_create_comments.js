
exports.up = function (knex, Promise) {
    return knex.schema.createTable('review_hotels', (table) => {
        table.increments('id').unsigned().primary();
        table.integer('user_id').unsigned().references('users.id');
        table.integer('article_id').unsigned().references('articles.id');
        table.string('comment');
        table.timestamp('created_at').defaultTo(knex.fn.now())
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('review_hotels');
};
