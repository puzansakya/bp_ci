
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('user_roles').del()
    .then(function () {
      return knex('users').del();
    })
    .then(function () {
      return knex('roles').del();
    })
    .then(function () {
      return knex('articles').del()
    })
    .then(function () {
      return knex('categories').del()
    });
};
