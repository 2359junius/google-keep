exports.seed = function(knex, Promise) {
    return knex('user')
    .del()
    .then(function () {
      // Data
      var rows = [
          {
              username: 'juniussim',
              email: 'junius.sim@gmail.com',
              password: 'password'
          },
          {
              username: 'vu',
              email: 'vu.nguyen@gmail.com',
              password: 'password'
          }
      ]
      // Inserts seed entries
      return knex.insert(rows).into('user');
    });
};
