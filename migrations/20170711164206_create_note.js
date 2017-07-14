
exports.up = function(knex, Promise) {
  return knex.schema.createTable('note', function(noteTable) { 
      // Primary Key
      noteTable.increments('id').primary()
      // Foreign Key - is a field in one table that uniquely identifies a row of another table or the same table
      noteTable.integer('owner').unsigned().references('id').inTable('user')
      // Data
      noteTable.string('title', 250).notNullable()
      noteTable.string('description', 2000)
      
      
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('note')
};
