
exports.seed = function (knex, Promise) {
  // Inserts seed entries
  return knex('users').insert([
    {
      "id": 3,
      "first_name": "nitant",
      "last_name": "rai",
      "avatar": "https:\/\/scontent.fktm8-1.fna.fbcdn.net\/v\/t1.0-1\/c12.98.160.160a\/p200x200\/50259513_10215142534331725_319841988285300736_n.jpg?_nc_cat=109&_nc_ht=scontent.fktm8-1.fna&oh=82cee377a0023faa687b97fcfa47972f&oe=5CF376EA",
      "username": "puzansakya",
      "email": "admin@gmail.com",
      "bio": "One man’s crappy software is another man’s full time job",
      "password_digest": "ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f",
      "created_at": "2018-12-09T09:18:07Z",
      "modified_date": null
    },
    {
      "id": 1,
      "first_name": "puzan",
      "last_name": "sakya",
      "avatar": "https:\/\/lh3.googleusercontent.com\/-bczRmSEaJ4Y\/AAAAAAAAAAI\/AAAAAAAAAAA\/AKxrwcY2IukPTEIR2AEgDbQwOQI4g0uL7w\/s96-c-mo\/photo.jpg",
      "username": "puzansakya",
      "email": "superadmin@gmail.com",
      "bio": "One man’s crappy software is another man’s full time job",
      "password_digest": "ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f",
      "created_at": "2018-12-09T09:18:07Z",
      "modified_date": null
    },
    {
      "id": 2,
      "first_name": "nitant",
      "last_name": "rai",
      "avatar": "https:\/\/scontent.fktm8-1.fna.fbcdn.net\/v\/t1.0-1\/c12.98.160.160a\/p200x200\/50259513_10215142534331725_319841988285300736_n.jpg?_nc_cat=109&_nc_ht=scontent.fktm8-1.fna&oh=82cee377a0023faa687b97fcfa47972f&oe=5CF376EA",
      "username": "puzansakya",
      "email": "user@gmail.com",
      "bio": "One man’s crappy software is another man’s full time job",
      "password_digest": "ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f",
      "created_at": "2018-12-09T09:18:07Z",
      "modified_date": null
    }
  ]);
};
