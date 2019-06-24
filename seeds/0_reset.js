
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('tbl_user_roles').del()
    .then(function () {
      return knex('tbl_users').del();
    })
    .then(function () {
      return knex('tbl_roles').del();
    })
    .then(function () {
      return knex('articles').del()
    })
    .then(function () {
      return knex('categories').del()
    });
};
