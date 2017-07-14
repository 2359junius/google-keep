exports.seed = function(knex, Promise) {
  return knex('note')
  .del()
  .then(function () {
      var row = [
          {
              title: 'Finish my Homework',
              description: 'Read up on hapi.js and complete development for Google Keep',
              owner: 1
          },
          {
              title: 'Do the laundry',
              owner: 1
          }
      ]
      // Inserts seed entries (Different syntax)
      return knex('note').insert(row);
    });
};
