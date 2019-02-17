
exports.up = function (knex, Promise) {
    return knex.schema.createTable('bookmarks', (table) => {
        table.increments('id').unsigned().primary();        
        table.integer('user_id').unsigned().references('users.id');
        table.integer('article_id').unsigned().references('articles.id');
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('bookmarks');
};
