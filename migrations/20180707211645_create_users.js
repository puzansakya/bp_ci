
exports.up = function (knex, Promise) {
    return knex.schema.createTable('users', function (table) {
        table.increments('id').unsigned().primary();
        table.string('first_name');
        table.string('last_name');
        table.string('avatar');
        table.string('username');
        table.string('email');
        table.string('bio');
        table.text('password_digest');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('modified_date');
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('users');
};

