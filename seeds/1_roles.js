
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('roles').del()
    .then(function () {
      // Inserts seed entries
      return knex('roles').insert([
        {
          "id": 1,
          "role": "ADMIN"
        },
        {
          "id": 2,
          "role": "USER"
        }
      ]);
    });
};
