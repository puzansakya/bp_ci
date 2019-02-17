
exports.up = function (knex, Promise) {
    return knex.schema.createTable('article_categories', (table) => {
        table.increments('id').unsigned().primary();        
        table.integer('article_id').unsigned().references('articles.id');
        table.integer('category_id').unsigned().references('categories.id');
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('article_categories');
};
