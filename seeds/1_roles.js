
exports.seed = function (knex, Promise) {
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
};
