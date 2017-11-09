exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('commentaire', function(table) {
      table.increments();
      table.integer('id_liste');
      table.string('nom');
      table.string('msg');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('commentaire')
  ]);
};
