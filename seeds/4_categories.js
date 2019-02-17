
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('categories').del()
    .then(function () {
      // Inserts seed entries
      return knex('categories').insert([
        {
          "id": 1,
          "category": "Life"
        },
        {
          "id": 2,
          "category": "Marketing"
        },
        {
          "id": 3,
          "category": "How to"
        },
        {
          "id": 4,
          "category": "Creativity"
        },
        {
          "id": 5,
          "category": "Social"
        },
        {
          "id": 6,
          "category": "DIY"
        },
        {
          "id": 7,
          "category": "Productivity"
        }
      ]);
    });
};
