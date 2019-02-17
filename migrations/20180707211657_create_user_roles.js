exports.up = function (knex, Promise) {
    return knex.schema.createTable('user_roles', function (table) {
        table.increments('id').unsigned().primary();
        table.integer('user_id').unsigned().references('users.id');
        table.integer('role_id').unsigned().references('roles.id');
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('user_roles');
};
