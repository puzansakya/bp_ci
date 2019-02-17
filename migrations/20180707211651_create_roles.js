
exports.up = function (knex, Promise) {
    return knex.schema.createTable('roles', function (table) {
        table.increments('id').unsigned().primary();
        table.string('role');
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('roles');
};
